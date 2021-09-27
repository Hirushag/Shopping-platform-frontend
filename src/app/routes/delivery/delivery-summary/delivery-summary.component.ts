import { Component, OnInit } from '@angular/core';
import { ToasterConfig, ToasterService } from 'angular2-toaster';
import { AuthenticationService } from '../../../core/_services/authentication.service';
import { DeliveryService } from '../../../core/_services/delivery.service';
const swal = require("sweetalert");
@Component({
  selector: 'app-delivery-summary',
  templateUrl: './delivery-summary.component.html',
  styleUrls: ['./delivery-summary.component.scss']
})
export class DeliverySummaryComponent implements OnInit {
  sysuser: any;
  LoadUI: boolean = false;
  deliverylist: any;

  toaster: any;
  toasterConfig: any;
  toasterconfig: ToasterConfig = new ToasterConfig({
    positionClass: "toast-bottom-right",
    showCloseButton: true,
  });
  cols: (
    | { field: string; header: string; sortable?: undefined }
    | { field: string; header: string; sortable: boolean }
  )[];

  rider_name: any;
  rider_mobile: any;
  vehicle_number: any;

  edit_rider_name: any;
  edit_rider_mobile: any;
  edit_vehicle_number: any;
  riderslist: any;
  riders: (
    | { field: string; header: string; sortable?: undefined }
    | { field: string; header: string; sortable: boolean }
  )[];
  rider_id: any;
  constructor(
    private deliveryservice: DeliveryService,
    private authservice: AuthenticationService,
    private toasterService: ToasterService
  ) { }

  ngOnInit() {
    this.authservice.validateUser().subscribe((sysuser) => {
      this.sysuser = sysuser;
      this.LoadUI = true;
    });

    this.cols = [
      { field: "name", header: "Customet Name" },
      { field: "address", header: "Customer Address" },
      { field: "rider", header: "Delivery Rider" },
      { field: "status", header: "Status" },
      { field: "actions", header: "Actions", sortable: true },
    ];

    this.riders = [
      { field: "name", header: "Rider Name" },
      { field: "mobile", header: "Rider Mobile" },
      { field: "vehicle", header: "Vehicle Number" },
      { field: "actions", header: "Actions", sortable: true },
    ];
    this.deliveryservice.getAll().subscribe((data) => {
      if (data) {
        this.deliverylist = data;
      }
    });
    this.getAllRiders();
  }

  getAllRiders() {
    this.deliveryservice.getAllRiders().subscribe((data) => {
      if (data) {
        this.riderslist = data;
      }
    });
  }

  addRiderModalShow(modal) {
    this.rider_mobile = null;
    this.rider_name = null;
    this.vehicle_number = null;
    modal.show();
  }

  editRiderModalShow(id, name, mobile, vehicle, modal) {
    this.rider_id = id;
    this.edit_rider_mobile = mobile;
    this.edit_rider_name = name;
    this.edit_vehicle_number = vehicle;
    modal.show();
  }

  editRider(modal) {
    var obj = {
      id: this.rider_id,
      name: this.edit_rider_name,
      mobile: this.edit_rider_mobile,
      vehicle: this.edit_vehicle_number,
    };

    this.deliveryservice.editRider(obj).subscribe((data) => {
      if (data.status) {
        swal("Done!", "Rider Successfully updated", "success");

        modal.hide();

        this.getAllRiders();
      }
    });
  }

  addRider(modal) {
    var obj = {
      name: this.rider_name,
      mobile: this.rider_mobile,
      vehicle: this.vehicle_number,
    };

    this.deliveryservice.addRider(obj).subscribe((data) => {
      if (data.status) {
        swal("Done!", "Rider Successfully added", "success");
        this.getAllRiders();

        modal.hide();
      }
    });
  }


}
