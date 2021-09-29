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
    private clientservice: ClientService
  ) {}

  ngOnInit() {
    this.authservice.validateUser().subscribe((sysuser) => {
      this.sysuser = sysuser;
      this.LoadUI = true;
    });

    this.cols = [
      { field: "id", header: "#ORDER ID" },
      { field: "clientname", header: "Client Name" },
      { field: "status", header: "Status" },
      { field: "action", header: "Action" },
    ];

    this.getAll();
  }

  getAll() {
    this.clientservice
      .getAll()
      .subscribe((customers) => (this.userslist = customers));
  }
}
