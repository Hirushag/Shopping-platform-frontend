import { InventoryService } from "./../../../core/_services/inventory.service";
import { Component, OnInit, Input } from "@angular/core";
import { ToasterConfig, ToasterService } from "angular2-toaster";
import { ActivatedRoute, Router } from "@angular/router";

import { AuthenticationService } from "../../../core/_services/authentication.service";
import { GlobalVariable } from "./../../../core/_services/globals";
import { ColorsService } from "../../../shared/colors/colors.service";
const swal = require("sweetalert");

class ImageSnippet {
  constructor(public src: string, public file: File) {}
}
@Component({
  selector: "app-inventory-detail",
  templateUrl: "./inventory-detail.component.html",
  styleUrls: ["./inventory-detail.component.scss"],
})
export class InventoryDetailComponent implements OnInit {
  sysuser: any;
  LoadUI: boolean = false;
  inventorylist: any;
  categorylist: any;
  itemdetaillist: any;
  itemprices: any;
  storelist: any;
  enablepriceform: boolean = false;
  newitemdetaillist: any = {};

  validated: boolean = false;
  not_available: boolean = false;
  product_name_list: any = [];
  new_quantity: any;
  new_unit: any;

  isDefault: boolean = false;

  @Input() storeitem: any = {};

  updateitem: boolean = false;
  updatingid: number = null;

  @Input() newqty: number = 0;
  @Input() newcost: number = 0;
  @Input() newsellingprice: number = 0;
  uploadedFiles: any[] = [];
  toaster: any;
  toasterConfig: any;
  toasterconfig: ToasterConfig = new ToasterConfig({
    positionClass: "toast-bottom-right",
    showCloseButton: true,
  });

  id: number;
  private sub: any;

  product_list: any;
  uniqueid: string;
  draft_data: boolean;

  selectedFile: ImageSnippet;

  public UPLDURL = "http://localhost:1337/api/v1/inventory/upload-image";
  blob: any;
  waiting: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private inventoryservice: InventoryService,
    private authservice: AuthenticationService,
    private toasterService: ToasterService,
    private router: Router,
    public colors: ColorsService
  ) {}

  ngOnInit() {
    this.authservice.validateUser().subscribe((sysuser) => {
      this.sysuser = sysuser;
      this.LoadUI = true;
    });

    this.sub = this.route.params.subscribe((params) => {
      this.id = +params["id"];
      this.inventoryservice
        .findInventory(this.id)
        .subscribe((inventory) => (this.inventorylist = inventory));
    });

    this.generateuniquekey();
    this.getData(this.id);
  }

  getData(id) {
    this.inventoryservice.findInventory(id).subscribe((data) => {
      if (data) {
        // Do if true
        this.inventorylist = data;
      }
    });
  }

  getAllProducts() {
    this.inventoryservice.getAll().subscribe((data) => {
      this.product_list = data;
      console.log(this.product_list);
      if (data) {
        // Do if true
        this.product_name_list = [];
        this.product_name_list.push({
          label: "Please Select",
          value: null,
        });
        for (var i = 0; i < data.length; i++) {
          if (data[i].id != this.id) {
            this.product_name_list.push({
              label: data[i].productcode + ": " + data[i].productname,
              value: data[i],
            });
          }
        }
      }
    });
  }

  updateImage(modal) {
    var obj = {
      id: this.id,
      blob: this.blob,
    };
    this.inventoryservice.updateImageInventory(obj).subscribe((data) => {
      if (data.status) {
        modal.hide();
        this.toaster = {
          type: "success",
          title: "Success !!",
          text: "Added to database !",
        };
        this.toasterService.pop(
          this.toaster.type,
          this.toaster.title,
          this.toaster.text
        );

        this.getData(this.id);
      }
    });
  }

  processFile(imageInput: any) {
    this.waiting = true;
    const file: File = imageInput.files[0];
    const reader = new FileReader();

    reader.addEventListener("load", (event: any) => {
      this.selectedFile = new ImageSnippet(event.target.result, file);

      console.log(this.selectedFile);

      this.blob = this.selectedFile.src;

      this.inventoryservice.uploadImage(this.selectedFile.file).subscribe(
        (res) => {
          console.log(res);

          this.waiting = false;
        },
        (err) => {}
      );
    });

    reader.readAsDataURL(file);
  }

  generateuniquekey() {
    var num1 = new Date().valueOf();
    var num2 = Math.random().toString(36).substring(7);
    this.uniqueid = num1 + num2;
  }

  deleteInventory() {
    var obj = {
      id: this.id,
    };
    this.inventoryservice.deleteInventory(obj).subscribe((data) => {
      if (data.status) {
        swal("Done!", "Inventory Deleted!", "success");

        this.router.navigate(["/inventory/inventory/summary"]);
      } else {
        swal("Error Occured. Try Again!");
      }
    });
  }
}
