import { InventoryService } from "./../../../core/_services/inventory.service";
import { Component, OnInit } from "@angular/core";
import {
  ToasterConfig,
  ToasterService,
} from "../../../../../node_modules/angular2-toaster";
import { AuthenticationService } from "../../../core/_services/authentication.service";

@Component({
  selector: "app-inventory-summary",
  templateUrl: "./inventory-summary.component.html",
  styleUrls: ["./inventory-summary.component.scss"],
})
export class InventorySummaryComponent implements OnInit {
  sysuser: any;
  LoadUI: boolean = false;
  inventorylist: any;

  cols: any[];

  toaster: any;
  toasterConfig: any;
  toasterconfig: ToasterConfig = new ToasterConfig({
    positionClass: "toast-bottom-right",
    showCloseButton: true,
  });
  constructor(
    private inventoryservice: InventoryService,
    private authservice: AuthenticationService,
    private toasterService: ToasterService
  ) {}

  ngOnInit() {
    this.authservice.validateUser().subscribe((sysuser) => {
      this.sysuser = sysuser;
      this.LoadUI = true;
    });

    this.cols = [
      { field: "productcode", header: "Code#" },
      { field: "productname", header: "Product Name" },
      { field: "category", header: "Category" },
      { field: "sub_category", header: "Sub Category" },
      { field: "actions", header: "Actions", sortable: true },
    ];

    this.inventoryservice.getAll().subscribe((inventory) => {
      if (inventory) {
        this.inventorylist = inventory;
      }
    });
  }
}
