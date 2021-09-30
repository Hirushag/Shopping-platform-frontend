import { Component, OnInit } from "@angular/core";
import { ToasterConfig } from "angular2-toaster";
import { ActivatedRoute, Router } from "@angular/router";
import { AuthenticationService } from "../../../core/_services/authentication.service";
import { SupplierService } from "../../../core/_services/supplier.service";
const swal = require("sweetalert");
@Component({
  selector: "app-supplier-detail",
  templateUrl: "./supplier-detail.component.html",
  styleUrls: ["./supplier-detail.component.scss"],
})
export class SupplierDetailComponent implements OnInit {
  sysuser: any;
  LoadUI: boolean = false;
  id: number;
  private sub: any;

  suppliers: any;

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
    private supplierservice: SupplierService,
    private router: Router
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

  getData(id) {
    this.supplierservice.getSupplier({ id: this.id }).subscribe((data) => {
      this.suppliers = data;
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
        this.supplierservice.changeStatus(obj).subscribe(
          (data) => {
            if (data.status) {
              this.getData(this.id);

              swal(
                "Done!",
                "Status of the Supplier Record has been updated",
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

  deleteSupplier() {
    var obj = {
      id: this.id,
    };
    this.supplierservice.deleteSupplier(obj).subscribe((data) => {
      if (data.status) {
        swal("Done!", "Supplier Deleted!", "success");

        this.router.navigate(["/suppliers/summary/"]);
      } else {
        swal("Error Occured. Try Again!");
      }
    });
  }
}
