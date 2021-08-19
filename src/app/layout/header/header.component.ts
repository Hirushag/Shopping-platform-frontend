import { Component, OnInit, ViewChild, OnDestroy } from "@angular/core";
const screenfull = require("screenfull");
const browser = require("jquery.browser");
declare var $: any;

import { UserblockService } from "../sidebar/userblock/userblock.service";
import { SettingsService } from "../../core/settings/settings.service";
import { MenuService } from "../../core/menu/menu.service";
import { User } from "../../core/_models/user";
import { AuthenticationService } from "../../core/_services/authentication.service";
import { BlockUI, NgBlockUI } from "ng-block-ui";
import { timer } from "rxjs";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
})
export class HeaderComponent implements OnInit, OnDestroy {
  sysuser: User;
  navCollapsed = true; // for horizontal layout
  menuItems = []; // for horizontal layout
  @BlockUI() blockUI: NgBlockUI;
  isNavSearchVisible: boolean;
  @ViewChild("fsbutton") fsbutton; // the fullscreen button
  private sub: any;

  constructor(
    public menu: MenuService,
    public userblockService: UserblockService,
    public settings: SettingsService,
    private authservice: AuthenticationService
  ) {
    // show only a few items on demo
    this.menuItems = menu.getMenu().slice(0, 4); // for horizontal layout
  }

  ngOnInit() {
    this.authservice.validateUser().subscribe((sysuser) => {
      this.sysuser = sysuser;
      if (this.settings.getAppSetting("version") < sysuser.version[0].s_key) {
        //check for updates
        this.blockUI.start(
          "System update required. Installing Version " +
            sysuser.version[0].s_key +
            " in 5 Seconds.. [or Refresh manually]"
        );
        setTimeout(function () {
          location.reload();
        }, 5000);
      }
    });

    this.isNavSearchVisible = false;
    if (browser.msie) {
      // Not supported under IE
      this.fsbutton.nativeElement.style.display = "none";
    }
    this.checkSoftwareUpdate();
  }

  checkSoftwareUpdate() {
    const refreshInterval2$ = timer(0, 300000);
    this.sub = refreshInterval2$.subscribe(() =>
      this.authservice.validateUser().subscribe((sysuser) => {
        this.sysuser = sysuser;
      })
    );
  }

  toggleUserBlock(event) {
    event.preventDefault();
    this.userblockService.toggleVisibility();
  }

  openNavSearch(event) {
    event.preventDefault();
    event.stopPropagation();
    this.setNavSearchVisible(true);
  }

  setNavSearchVisible(stat: boolean) {
    // console.log(stat);
    this.isNavSearchVisible = stat;
  }

  getNavSearchVisible() {
    return this.isNavSearchVisible;
  }

  toggleOffsidebar() {
    this.settings.toggleLayoutSetting("offsidebarOpen");
  }

  toggleCollapsedSideabar() {
    this.settings.toggleLayoutSetting("isCollapsed");
  }

  isCollapsedText() {
    return this.settings.getLayoutSetting("isCollapsedText");
  }

  toggleFullScreen(event) {
    if (screenfull.enabled) {
      screenfull.toggle();
    }
    // Switch icon indicator
    let el = $(this.fsbutton.nativeElement);
    if (screenfull.isFullscreen) {
      el.children("em").removeClass("fa-expand").addClass("fa-compress");
    } else {
      el.children("em").removeClass("fa-compress").addClass("fa-expand");
    }
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.sub.unsubscribe();
  }
}
