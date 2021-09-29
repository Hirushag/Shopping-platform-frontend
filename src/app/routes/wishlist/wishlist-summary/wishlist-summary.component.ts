import { ItemsService } from "./../../../core/_services/items.service";
import { Component, OnInit } from "@angular/core";
import { AuthenticationService } from "../../../core/_services/authentication.service";
const swal = require("sweetalert");
@Component({
  selector: "app-wishlist-summary",
  templateUrl: "./wishlist-summary.component.html",
  styleUrls: ["./wishlist-summary.component.scss"],
})
export class WishlistSummaryComponent implements OnInit {
  sysuser: any;
  LoadUI: boolean = false;
  wishlist: any;
  constructor(
    private authservice: AuthenticationService,
    private itemservice: ItemsService
  ) {}

  ngOnInit() {
    this.authservice.validateUser().subscribe((sysuser) => {
      this.sysuser = sysuser;
      this.LoadUI = true;
    });

    this.getData();
  }

  getData() {
    this.itemservice.getAllWishlist().subscribe((data) => {
      console.log(data);
      this.wishlist = data;
    });
  }
  deleteItem(id) {
    this.itemservice.deleteIteFromWishlist({ id: id }).subscribe((data) => {
      if (data.status) {
        swal("Done!", "Delete Item from Wishlist !", "success");

        this.getData();
      }
    });
  }
}
