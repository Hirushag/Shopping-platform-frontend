import { Component, OnInit } from "@angular/core";
import { AuthenticationService } from "../../../core/_services/authentication.service";
import { ActivatedRoute } from "@angular/router";
import { ClientService } from "../../../core/_services/client.service";
const swal = require("sweetalert");

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
  }

  getData(clientId) {
    this.clientService.getClient(clientId).subscribe((data) => {
      this.client = data;
    });
  }

  changeStatus(status, id) {
    var obj = {
      id: this.id,
      order_id: id,
      status: status,
    };

    this.clientService.updateOrder(obj).subscribe(
      (data) => {
        if (data.status) {
          this.getData(this.id);

          swal(
            "Done!",
            "Status of the Order Record has been updated",
            "success"
          );
        } else {
          swal("Error Occured. Try Again!");
        }
      },
      (error) => {
        swal("Error Occured. Try Again!");
      }
    );
  }
}
