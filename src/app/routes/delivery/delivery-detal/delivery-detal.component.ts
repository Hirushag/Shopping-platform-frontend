import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '../../../core/_services/authentication.service';
import { DeliveryService } from '../../../core/_services/delivery.service';
const swal = require("sweetalert");
@Component({
  selector: 'app-delivery-detal',
  templateUrl: './delivery-detal.component.html',
  styleUrls: ['./delivery-detal.component.scss']
})
export class DeliveryDetalComponent implements OnInit {
  sysuser: any;
  LoadUI: boolean = false;
  id: number;
  sub: any;
  delivery: any;
  constructor(
    private route: ActivatedRoute,
    private authservice: AuthenticationService,
    private router: Router,
    private deliveryService: DeliveryService
  ) { }

  ngOnInit(
    
  ) {
    this.authservice.validateUser().subscribe((sysuser) => {
      this.sysuser = sysuser;
      this.LoadUI = true;
    });

    this.sub = this.route.params.subscribe((params) => {
      this.id = +params["id"];
      this.getData(this.id);
    });
  }

  getData(id) {
    this.deliveryService.getDelivery({ id: this.id }).subscribe((data) => {
      console.log(data);
      this.delivery = data;
    });
  }

  changeStatus(status) {
    var statuschange;

    if (status == 1) {
      statuschange = "This Supplier Record will be Activated";
    }
    if (status == 0) {
      statuschange = "This Supplier Record will be Disabled";
    }

    var obj = {
      id: this.id,
      status: status,
    };
    swal(
      {
        title: "Are You sure?",
        text: statuschange,
        icon: "warning",
        buttons: {
          cancel: true,
          confirm: true,
        },
        confirmButtonColor: "#149916",
        confirmButtonText: "Yes, Update!",
        cancelButtonText: "Cancel",
        closeOnConfirm: false,
      },
      () => {
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
    );
  }

}
