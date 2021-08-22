import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { ToasterConfig, ToasterService } from "angular2-toaster";
import { AuthenticationService } from "../../../core/_services/authentication.service";
import { InventoryService } from "../../../core/_services/inventory.service";
import { ItemCategoriesService } from "../../../core/_services/itemCategories.service";
import { ItemsService } from "../../../core/_services/items.service";
const swal = require("sweetalert");
@Component({
  selector: "app-shopping-list",
  templateUrl: "./shopping-list.component.html",
  styleUrls: ["./shopping-list.component.scss"],
})
export class ShoppingListComponent implements OnInit {
  toaster: any;
  toasterConfig: any;
  toasterconfig: ToasterConfig = new ToasterConfig({
    positionClass: "toast-top-right",
    showCloseButton: true,
  });

  categories: any;
  category = null;
  store_items: any[];
  searchText: string = "";
  uniqueid: string;
  constructor(
    private authservice: AuthenticationService,
    private toasterService: ToasterService,
    private categoryservice: ItemCategoriesService,
    private inventoryservice: InventoryService,
    private itemsservice: ItemsService
  ) {}
  ngOnInit() {
    this.getAllCategories();
    this.getProducts();
  }

  getProducts() {
    var obj = {
      category: this.category,
    };

    this.inventoryservice.getProductDetailsByCategory(obj).subscribe((data) => {
      this.store_items = data;
    });
  }

  getAllCategories() {
    this.categoryservice
      .getAll()
      .subscribe((categories) => (this.categories = categories));
  }

  addToCart(items) {
    var obj = {
      id: items.id,
      name: items.productname,
      price: items.sellingprice,
    };
    this.itemsservice.addToCart(obj).subscribe((data) => {
      if (data.status) {
        swal(
          "Added To the Cart !!",
          "Item has been added to the Cart.",
          "success"
        );
        this.generateuniquekey();
      } else {
        this.toaster = {
          type: "warning",
          title: "ERROR !!",
          text: data.err,
        };
        this.toasterService.pop(
          this.toaster.type,
          this.toaster.title,
          this.toaster.text
        );
      }
    });
  }
  generateuniquekey() {
    const num1 = new Date().valueOf();
    const num2 = Math.random().toString(36).substring(7);
    this.uniqueid = num1 + num2;
  }
}
