import { SystemlogsService } from "./../../../core/_services/systemlogs.service";
import { Component, OnInit } from "@angular/core";
import { AuthenticationService } from "../../../core/_services/authentication.service";

@Component({
  selector: "app-system-logs",
  templateUrl: "./system-logs.component.html",
  styleUrls: ["./system-logs.component.scss"],
})
export class SystemLogsComponent implements OnInit {
  sysuser: any;
  LoadUI: boolean = false;
  cols: (
    | { field: string; header: string; sortable?: undefined }
    | { field: string; header: string; sortable: boolean }
  )[];
  system_logs: any;
  constructor(
    private authservice: AuthenticationService,
    private systemlogsService: SystemlogsService
  ) {}

  ngOnInit() {
    this.cols = [
      { field: "id", header: "#ID" },
      { field: "description", header: "Description" },
      // { field: "user", header: "User" },
      { field: "timestamp", header: "Timestamp" },
    ];
    this.authservice.validateUser().subscribe((sysuser) => {
      this.sysuser = sysuser;
      this.LoadUI = true;
    });

    this.getData();
  }

  getData() {
    this.systemlogsService.getAll().subscribe((data) => {
      this.system_logs = data;
    });
  }
}
