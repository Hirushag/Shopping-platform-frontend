import { Component, OnInit } from "@angular/core";
import { AuthenticationService } from "../../../core/_services/authentication.service";

@Component({
  selector: "app-report-menu",
  templateUrl: "./report-menu.component.html",
  styleUrls: ["./report-menu.component.scss"],
})
export class ReportMenuComponent implements OnInit {
  sysuser: any;
  LoadUI: boolean = false;
  constructor(private authservice: AuthenticationService) {}

  ngOnInit() {
    this.authservice.validateUser().subscribe((sysuser) => {
      this.sysuser = sysuser;
      this.LoadUI = true;
    });
  }
}
