import { UserService } from "./../../../core/_services/user.service";
import { Component, OnInit } from "@angular/core";
import { AuthenticationService } from "../../../core/_services/authentication.service";
import { ClientService } from "../../../core/_services/client.service";
import { User } from "../../../core/_models/user";

@Component({
  selector: "app-client-summary",
  templateUrl: "./client-summary.component.html",
  styleUrls: ["./client-summary.component.scss"],
})
export class ClientSummaryComponent implements OnInit {
  sysuser: any;
  LoadUI = false;

  cols: any[];

  userslist: User[];

  constructor(
    private authservice: AuthenticationService,
    private userservice: UserService
  ) {}

  ngOnInit() {
    this.authservice.validateUser().subscribe((sysuser) => {
      this.sysuser = sysuser;
      this.LoadUI = true;
    });

    this.cols = [
      { field: "firstname", header: "#ID" },
      { field: "lastname", header: "Invoice Code" },
      { field: "username", header: "Client Name" },
      { field: "username", header: "Date" },
      { field: "username", header: "Action" },
    ];

    this.getAll();
  }

  getAll() {
    this.userservice
      .getAll()
      .subscribe((customers) => (this.userslist = customers.customers));

    console.log(this.userslist);
  }
}
