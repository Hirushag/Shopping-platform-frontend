import { ItemCategoriesService } from "./../../../core/_services/itemCategories.service";
import { Component, OnInit } from "@angular/core";
import { InventoryService } from "../../../core/_services/inventory.service";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { ToasterConfig, ToasterService } from "angular2-toaster";
import { ActivatedRoute, Router } from "@angular/router";
import { AuthenticationService } from "../../../core/_services/authentication.service";

const swal = require("sweetalert");
@Component({
  selector: "app-inventory-edit",
  templateUrl: "./inventory-edit.component.html",
  styleUrls: ["./inventory-edit.component.scss"],
})
export class InventoryEditComponent implements OnInit {
  sysuser: any;
  LoadUI: boolean = false;
  inventory: any;
  categorylist: any;
  sub_categories: any;

  valForm: FormGroup;
  toaster: any;
  toasterConfig: any;
  toasterconfig: ToasterConfig = new ToasterConfig({
    positionClass: "toast-bottom-right",
    showCloseButton: true,
  });

  id: number;
  private sub: any;
  suppliers: any;

  constructor(
    private route: ActivatedRoute,
    fb: FormBuilder,
    private inventoryservice: InventoryService,
    private authservice: AuthenticationService,
    private toasterService: ToasterService,
    private router: Router,
    private itemcategoriesservice: ItemCategoriesService
  ) {
    this.valForm = fb.group({
      productcode: [null, Validators.required],
      productname: [null, Validators.required],
      cat: [null, Validators.required],
      sub_cat: [null],
      supplier: [null, Validators.required],
      cost: [null, Validators.required],
      sellingprice: [null, Validators.required],
      quantity: [null, Validators.required],
    });
  }

  ngOnInit() {
    this.onChanges();
    this.authservice.validateUser().subscribe((sysuser) => {
      this.sysuser = sysuser;
      this.LoadUI = true;
    });

    this.itemcategoriesservice
      .getAll()
      .subscribe((categories) => (this.categorylist = categories));

    this.sub = this.route.params.subscribe((params) => {
      this.id = +params["id"];
      this.inventoryservice.findInventory(this.id).subscribe((data) => {
        if (data) {
          // Do if true
          this.inventory = data;

          this.getSuppliersByCategory(this.inventory.cat.id);

          console.log(this.inventory);
          this.getSubCategories(this.inventory.cat_id);
          this.valForm.patchValue({ productcode: this.inventory.productcode });
          this.valForm.patchValue({ productname: this.inventory.productname });
          this.valForm.patchValue({ image: this.inventory.image });
          this.valForm.patchValue({ cat: this.inventory.cat.id });
          this.valForm.patchValue({ sub_cat: this.inventory.cat.subcatid });
          this.valForm.patchValue({ supplier: this.inventory.supplier.id });
          this.valForm.patchValue({ cost: this.inventory.cost });
          this.valForm.patchValue({
            sellingprice: this.inventory.sellingprice,
          });
          this.valForm.patchValue({ quantity: this.inventory.quantity });
        }
      });
    });
  }

  onChanges(): void {
    this.valForm.get("cat").valueChanges.subscribe((val) => {
      if (val != null) {
        this.getSubCategories(val);
      }
      this.valForm.patchValue({ sub_cat: null });
    });
  }

  getSubCategories(c) {
    this.itemcategoriesservice
      .getAllSubCategories({ category: c })
      .subscribe((data) => (this.sub_categories = data));
  }

  submitForm($ev, value: any) {
    $ev.preventDefault();
    for (let c in this.valForm.controls) {
      this.valForm.controls[c].markAsTouched();
    }
    if (this.valForm.valid) {
      value.id = this.id;

      this.inventoryservice.editInventory(value).subscribe(
        (data) => {
          if (data.status) {
            swal("Done!", "Inventory details Successfully updated", "success");

            this.valForm.reset();
            this.router.navigate(["/inventory/inventory/detail/" + this.id]);
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
        },
        (error) => {
          alert("API ERROR [ERRCODE:001]");
        }
      );
    }
  }

  getSuppliersByCategory(id) {
    this.inventoryservice
      .getSuppliersByCategory({ id: id })
      .subscribe((data) => {
        this.suppliers = data;
      });
  }
}
