import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { AuthenticationService } from "../../../core/_services/authentication.service";
import { DeliveryService } from "../../../core/_services/delivery.service";
const swal = require("sweetalert");
@Component({
  selector: "app-delivery-detal",
  templateUrl: "./delivery-detal.component.html",
  styleUrls: ["./delivery-detal.component.scss"],
})
export class DeliveryDetalComponent implements OnInit {
  sysuser: any;
  LoadUI: boolean = false;
  id: number;
  sub: any;
  delivery: any;
  riderslist: any;
  selectedrider: any = null;
  constructor(
    private route: ActivatedRoute,
    private authservice: AuthenticationService,
    private router: Router,
    private deliveryService: DeliveryService
  ) {}

  ngOnInit() {
    this.authservice.validateUser().subscribe((sysuser) => {
      this.sysuser = sysuser;
      this.LoadUI = true;
    });

    this.sub = this.route.params.subscribe((params) => {
      this.id = +params["id"];
      this.getData(this.id);
      this.getAllRiders();
    });
  }

  getData(id) {
    this.deliveryService.getDelivery({ id: this.id }).subscribe((data) => {
      this.delivery = data;
    });
  }

  changeStatus(status) {
    if (status == 1) {
      if (this.selectedrider == null) {
        swal("Done!", "Please Select the Rider !", "warning");
        return;
      }
    }

    if (status != 1) {
      this.selectedrider = null;
    }
    var obj = {
      id: this.id,
      status: status,
      rider: this.selectedrider,
    };

    this.deliveryService.changeStatus(obj).subscribe(
      (data) => {
        if (data.status) {
          this.getData(this.id);

          swal(
            "Done!",
            "Status of the Delivery Record has been updated",
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

  getAllRiders() {
    this.deliveryService.getAllRiders().subscribe((data) => {
      if (data) {
        this.riderslist = [];

        this.riderslist.push({ label: "Please Select", value: null });
        for (var i = 0; i < data.length; i++) {
          this.riderslist.push({
            label: data[i].name,
            value: data[i].id,
          });
        }
      }
    });
  }
}
