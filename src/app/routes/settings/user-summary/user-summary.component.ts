import { Component, OnInit } from "@angular/core";
import { User } from "../../../core/_models/user";
import {
  ToasterConfig,
  ToasterService,
} from "../../../../../node_modules/angular2-toaster";
import { UserService } from "../../../core/_services/user.service";
import { AuthenticationService } from "../../../core/_services/authentication.service";

@Component({
  selector: "app-user-summary",
  templateUrl: "./user-summary.component.html",
  styleUrls: ["./user-summary.component.scss"],
})
export class UserSummaryComponent implements OnInit {
  sysuser: any;
  LoadUI: boolean = false;

  userslist: User[];

  resetreq: boolean = false;
  resetuserid;
  fname;
  lname;

  cols: any[];

  toaster: any;
  toasterConfig: any;
  toasterconfig: ToasterConfig = new ToasterConfig({
    positionClass: "toast-bottom-right",
    showCloseButton: true,
  });

  constructor(
    private userservice: UserService,
    private authservice: AuthenticationService,
    private toasterService: ToasterService
  ) {}

  ngOnInit() {
    this.authservice.validateUser().subscribe((sysuser) => {
      this.sysuser = sysuser;
      this.LoadUI = true;
    });

    this.userservice
      .getAll()
      .subscribe((users) => (this.userslist = users.users));
    this.cols = [
      { field: "id", header: "#", width: "50px" },
      { field: "firstname", header: "Firstname" },
      { field: "lastname", header: "Lastname" },
      { field: "username", header: "Username" },
      { field: "userlevel", header: "Userlevel", sortable: true },
      { field: "actions", header: "Actions", sortable: true },
    ];
  }

  resetrequest(id, fname, lname) {
    this.resetreq = true;
    this.resetuserid = id;
    this.fname = fname;
    this.lname = lname;
  }

  resetpw(newpw) {
    if (newpw != "" && newpw.length > 3) {
      this.userservice
        .masterResetUserPassword(this.resetuserid, newpw)
        .subscribe(
          (data) => {
            if (data.status) {
              this.toaster = {
                type: "success",
                title: "Success !!",
                text: "Password has been changed !",
              };
              this.toasterService.pop(
                this.toaster.type,
                this.toaster.title,
                this.toaster.text
              );
              this.resetreq = false;
            } else {
              this.toaster = {
                type: "warning",
                title: "Error !!",
                text: data.err,
              };
              this.toasterService.pop(
                this.toaster.type,
                this.toaster.title,
                this.toaster.text
              );
            }
          },
          (error) => {
            this.toaster = {
              type: "warning",
              title: "Error !!",
              text: "API ERROR OCCURED",
            };
            this.toasterService.pop(
              this.toaster.type,
              this.toaster.title,
              this.toaster.text
            );
          }
        );
    }
  }
}
