import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { TypeaheadOptions } from "ngx-bootstrap/typeahead";
import { AuthenticationService } from "../../../core/_services/authentication.service";
import { GlobalVariable } from "../../../core/_services/globals";
import { InventoryService } from "../../../core/_services/inventory.service";
import { ItemCategoriesService } from "../../../core/_services/itemCategories.service";
import { base64StringToBlob } from "blob-util";

const swal = require("sweetalert");
class ImageSnippet {
  constructor(public src: string, public file: File) {}
}

@Component({
  selector: "app-inventory-add",
  templateUrl: "./inventory-add.component.html",
  styleUrls: ["./inventory-add.component.scss"],
})
export class InventoryAddComponent implements OnInit {
  sysuser: any;
  LoadUI: boolean = false;
  inventorylist: any;
  categorylist: any;
  valForm: FormGroup;
  uniqueid: string;
  sub_categories: any;
  suppliers: any;

  selectedFile: ImageSnippet;

  uploadedFiles: any[] = [];
  public UPLDURL = "http://localhost:1337/api/v1/inventory/upload-image";

  constructor(
    fb: FormBuilder,
    private router: Router,
    private authservice: AuthenticationService,
    private inventoryservice: InventoryService,
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
    this.generateuniquekey();

    this.authservice.validateUser().subscribe((sysuser) => {
      this.sysuser = sysuser;
      this.LoadUI = true;
    });
    this.inventoryservice
      .getAll()
      .subscribe((inventory) => (this.inventorylist = inventory));
    this.itemcategoriesservice
      .getAll()
      .subscribe((categories) => (this.categorylist = categories));
  }

  generateuniquekey() {
    var num1 = new Date().valueOf();
    var num2 = Math.random().toString(36).substring(7);
    this.uniqueid = num1 + num2;
  }

  getSuppliersByCategory(id) {
    this.inventoryservice
      .getSuppliersByCategory({ id: id.value })
      .subscribe((data) => {
        this.suppliers = data;
      });
  }

  onChanges(): void {
    this.valForm.get("cat").valueChanges.subscribe((val) => {
      if (val != null) {
        this.getSubCategories(val);
      }
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
      value.uniquekey = this.uniqueid;

      this.inventoryservice.createInventory(value).subscribe(
        (data) => {
          if (data.status) {
            swal("Done!", "Inventory Item Successfully created", "success");

            this.valForm.reset();
            this.router.navigate(["/inventory/inventory/detail/" + data.id]);
          } else {
            swal("Error!", data.err, "warning");
          }
        },
        (error) => {
          alert("API ERROR [ERRCODE:001]");
        }
      );
    }
  }

  processFile(imageInput: any) {
    const file: File = imageInput.files[0];
    const reader = new FileReader();

    reader.addEventListener("load", (event: any) => {
      this.selectedFile = new ImageSnippet(event.target.result, file);

      console.log(this.selectedFile);

      var b64toBlob = require("b64-to-blob");

      var contentType = "image/png";
      var b64Data = this.selectedFile.src;
      var blob = b64toBlob(b64Data, contentType);

      var blobUrl = URL.createObjectURL(blob);
      this.inventorylist.uploadImage(this.selectedFile.file).subscribe(
        (res) => {
          console.log(res);
        },
        (err) => {}
      );
    });

    reader.readAsDataURL(file);
  }

  onUpload(event) {
    for (let file of event.files) {
      this.uploadedFiles.push(file);
    }
  }
}
