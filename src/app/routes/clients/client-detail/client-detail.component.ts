import { Component, OnInit } from "@angular/core";
import { AuthenticationService } from "../../../core/_services/authentication.service";
import { ActivatedRoute } from "@angular/router";
import { ClientService } from "../../../core/_services/client.service";

@Component({
  selector: "app-client-detail",
  templateUrl: "./client-detail.component.html",
  styleUrls: ["./client-detail.component.scss"],
})
export class ClientDetailComponent implements OnInit {
  sysuser: any;
  LoadUI = false;

  private sub: any;
  id: number;
  client: {};
  invoice_list: any[] = [];

  cols: any[];

  constructor(
    private route: ActivatedRoute,
    private authservice: AuthenticationService,
    private clientService: ClientService
  ) {}

  ngOnInit() {
    this.authservice.validateUser().subscribe((sysuser) => {
      this.sysuser = sysuser;
      this.LoadUI = true;
    });

    this.sub = this.route.params.subscribe((params) => {
      this.id = +params["id"];
      this.getData(this.id);
    });

    this.cols = [
      { field: "invcode", header: "Invoice#" },
      { field: "timestamp", header: "Date" },
      { field: "nettotal", header: "Net Total" },
      { field: "paidamt", header: "Paid Amount" },
      { field: "openbalance", header: "Open Balance" },
      // { field: "status", header: "Status", sortable: true },
      // { field: "actions", header: "Actions", sortable: true }
    ];
  }

  getData(clientId) {
    this.clientService.getClient(clientId).subscribe((data) => {
      this.client = data;
    });
  }
}
