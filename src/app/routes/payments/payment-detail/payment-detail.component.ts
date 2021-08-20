import { Component, OnInit } from "@angular/core";
import { ToasterConfig, ToasterService } from "angular2-toaster";
import { ActivatedRoute } from "@angular/router";
import { AuthenticationService } from "../../../core/_services/authentication.service";
import { PaymentService } from "../../../core/_services/payment.service";

const swal = require("sweetalert");

@Component({
  selector: "app-payment-detail",
  templateUrl: "./payment-detail.component.html",
  styleUrls: ["./payment-detail.component.scss"],
})
export class PaymentDetailComponent implements OnInit {
  sysuser: any;
  LoadUI: boolean = false;
  payment: any;
  id: number;
  private sub: any;

  toaster: any;
  toasterConfig: any;
  toasterconfig: ToasterConfig = new ToasterConfig({
    positionClass: "toast-bottom-right",
    showCloseButton: true,
  });

  uniqueid: string;

  constructor(
    private route: ActivatedRoute,
    private authservice: AuthenticationService,
    private paymentservice: PaymentService,
    private toasterService: ToasterService
  ) {}

  ngOnInit() {
    this.generateuniquekey();

    this.authservice.validateUser().subscribe((sysuser) => {
      this.sysuser = sysuser;
      this.LoadUI = true;
    });

    this.sub = this.route.params.subscribe((params) => {
      this.id = +params["id"];
      this.getData(this.id);
    });
  }
  generateuniquekey() {
    var num1 = new Date().valueOf();
    var num2 = Math.random().toString(36).substring(7);
    this.uniqueid = num1 + num2;
  }

  getData(id) {
    this.paymentservice.getPayment(this.id).subscribe((data) => {
      console.log(data);
      this.payment = data.payment;
    });
  }
  addDiscountModalShow(modal) {
    modal.show();
  }
  changeStatus(status) {
    var statuschange;

    if (status == 1) {
      statuschange = "This Payment Record will be Approved";
    }

    var obj = {
      id: this.id,
      status: status,
      uniquekey: this.uniqueid,
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
        closeOnConfirm: false,
      },
      () => {
        this.paymentservice.changeStatus(obj).subscribe(
          (data) => {
            if (data.status) {
              this.getData(this.id);
              this.generateuniquekey();

              swal(
                "Done!",
                "Status of the Payment Record has been updated",
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
