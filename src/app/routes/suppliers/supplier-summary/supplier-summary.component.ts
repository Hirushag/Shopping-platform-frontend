import { Component, OnInit } from "@angular/core";
import { User } from "../../../core/_models/user";
import { AuthenticationService } from "../../../core/_services/authentication.service";
import { SupplierService } from "../../../core/_services/supplier.service";

@Component({
  selector: "app-supplier-summary",
  templateUrl: "./supplier-summary.component.html",
  styleUrls: ["./supplier-summary.component.scss"],
})
export class SupplierSummaryComponent implements OnInit {
  suppliers: any = [];
  sysuser: any;
  LoadUI: boolean = false;

  private sub: any;
  cols: any[];
  constructor(
    private authservice: AuthenticationService,
    private supplierservice: SupplierService
  ) {}

  ngOnInit() {
    this.cols = [
      { field: "supplier_id", header: "Supplier ID" },
      { field: "suppliername", header: "Supplier Name" },
      { field: "suppliercode", header: "Supplier Code" },
      { field: "category", header: "Category" },
      { field: "phone", header: "Supplier Phone" },
      { field: "company", header: "Company Address" },
      { field: "status", header: "Status" },
      { field: "actions", header: "Actions", sortable: true },
    ];

    this.authservice.validateUser().subscribe((sysuser) => {
      this.sysuser = sysuser;
      this.LoadUI = true;
    });
    this.getData();
  }

  getData() {
    this.supplierservice.getAllSuppliers().subscribe((data) => {
      console.log(data);
      this.suppliers = data;
    });
  }
}
