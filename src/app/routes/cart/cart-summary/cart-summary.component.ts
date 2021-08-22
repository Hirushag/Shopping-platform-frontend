import { CartService } from "./../../../core/_services/cart.service";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { ToasterConfig, ToasterService } from "angular2-toaster";
import { AuthenticationService } from "../../../core/_services/authentication.service";
const swal = require("sweetalert");
const qz = require("qz-tray");
var r = require("jsrsasign");
import { ModalDirective } from "ngx-bootstrap/modal";
@Component({
  selector: "app-cart-summary",
  templateUrl: "./cart-summary.component.html",
  styleUrls: ["./cart-summary.component.scss"],
})
export class CartSummaryComponent implements OnInit {
  sysuser: any;
  LoadUI: boolean = false;
  toaster: any;
  toasterConfig: any;
  toasterconfig: ToasterConfig = new ToasterConfig({
    positionClass: "toast-top-right",
    showCloseButton: true,
  });
  uniqueid: string;

  valForm: FormGroup;

  showButton: boolean = false;

  items: any[];
  cart: any;
  payment_method: any = null;

  subtotal: any;

  contace_person_name: any;
  contace_person_number: any;
  address1: any;
  address2: any;
  city: any;
  email: any;

  account_name: any;
  card_number: any;
  month: any;
  year: any;
  cvv: any;
  aemail: any;
  contact: any;

  constructor(
    private authservice: AuthenticationService,
    private toasterService: ToasterService,
    private router: Router,
    fb: FormBuilder,
    private cartservice: CartService
  ) {
    this.valForm = fb.group({
      clientname: [null, Validators.required],
      address: [null],
      phone: [null, Validators.required],
    });
  }

  ngOnInit() {
    this.generateuniquekey();
    this.getcartItems();
    this.getTotals();
    this.authservice.validateUser().subscribe((sysuser) => {
      this.sysuser = sysuser;

      if (this.sysuser.userlevel != 10) {
        this.showButton = true;
      }
      this.LoadUI = true;
    });
  }

  generateuniquekey() {
    var num1 = new Date().valueOf();
    var num2 = Math.random().toString(36).substring(7);
    this.uniqueid = num1 + num2;
  }

  add1Qty(index) {
    let obj = {
      item: this.items[index].id,
      quantity: 1,
      uniquekey: this.uniqueid,
    };
    this.cartservice.updateQuantity(obj).subscribe(
      (data) => {
        if (data.status) {
          this.getTotals();
          this.getcartItems();

          this.toaster = {
            type: "success",
            title: "Added",
            text: "Item Added",
          };
          // this.toasterService.pop(this.toaster.type, this.toaster.title, this.toaster.text);
          this.generateuniquekey();
        } else {
          swal("Error!", data.err, "warning");
        }
      },
      (error) => {
        alert("API ERROR [ERRCODE:001]");
      }
    );
  }

  remove1Qty(index) {
    let obj = {
      item: this.items[index].id,
      quantity: -1,
      uniquekey: this.uniqueid,
    };
    this.cartservice.updateQuantity(obj).subscribe(
      (data) => {
        if (data.status) {
          this.getTotals();
          this.getcartItems();
          this.toaster = {
            type: "success",
            title: "Added",
            text: "Item Added",
          };
          // this.toasterService.pop(this.toaster.type, this.toaster.title, this.toaster.text);
          this.generateuniquekey();
        } else {
          swal("Error!", data.err, "warning");
        }
      },
      (error) => {
        alert("API ERROR [ERRCODE:001]");
      }
    );
  }

  removeFromCart(index, item) {
    //remove item from saved invoice
    let obj = {
      item: this.items[index].id,
      uniquekey: this.uniqueid,
    };
    this.cartservice.deleteItem(obj).subscribe(
      (data) => {
        if (data.status) {
          this.getTotals();
          this.getcartItems();
          this.toaster = {
            type: "success",
            title: "Deleted",
            text: "Item deleted",
          };
          // this.toasterService.pop(this.toaster.type, this.toaster.title, this.toaster.text);
          this.generateuniquekey();
        } else {
          swal("Error!", data.err, "warning");
        }
      },
      (error) => {
        alert("API ERROR [ERRCODE:001]");
      }
    );
  }

  getcartItems() {
    this.cartservice.getCartItems().subscribe((data) => {
      this.items = data.item;
      this.cart = data.cart;
    });
  }

  getTotals() {
    this.cartservice.calculateTotals().subscribe((data) => {
      this.subtotal = data;
    });
  }

  submitCardDetails(modal) {
    swal(
      {
        title: "Are You sure?",
        text: "Do you want to Confirm Order?",
        icon: "info",
        buttons: {
          cancel: true,
          confirm: true,
        },
        confirmButtonColor: "#149916",
        confirmButtonText: "Confirm!",
        closeOnConfirm: true,
      },
      () => {
        var obj = {
          payment_method: this.payment_method,
          amount: this.subtotal.nettotal,
          name: this.contace_person_name,
          number: this.contace_person_number,
          address1: this.address1,
          address2: this.address2,
          city: this.city,
          email: this.email,
          account_name: this.account_name,
          card_number: this.card_number,
          month: this.month,
          year: this.year,
          cvv: this.cvv,
          account_email: this.aemail,
          contact: this.contact,
          uniquekey: this.uniqueid,
        };

        this.cartservice.addDelivery(obj).subscribe(
          (data) => {
            if (data.status) {
              this.router.navigate(["/shopping/summary/"]);
              this.toaster = {
                type: "success",
                title: "Done ! !!",
                text: "Order has been Added",
              };
              this.toasterService.pop(
                this.toaster.type,
                this.toaster.title,
                this.toaster.text
              );
            } else {
              swal("Error Occured.", data.err);
            }
          },
          (error) => {
            swal("API Error Occured. Try Again!");
          }
        );
      }
    );
  }
}
