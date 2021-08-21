import { Component, OnInit, Input } from "@angular/core";
import { ToasterConfig, ToasterService } from "angular2-toaster";
import { ActivatedRoute, Router } from "@angular/router";
import { InventoryService } from "../../../core/_services/inventory.service";
import { AuthenticationService } from "../../../core/_services/authentication.service";
import { GlobalVariable } from "./../../../core/_services/globals";
import { ColorsService } from "../../../shared/colors/colors.service";
const swal = require("sweetalert");

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
  uploadinprogress: boolean = false;
  uploadprogressevent: number = 0;
  id: number;
  private sub: any;
  baseUrl = GlobalVariable.BaseUrl;
  public UPLDURL = GlobalVariable.BaseUrl + "api/v1/inventory/upload-image";
  product_list: any;
  uniqueid: string;
  draft_data: boolean;

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
        console.log(this.inventorylist);
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

  UploadInProgress(event) {
    this.uploadinprogress = true;
    this.uploadprogressevent = event.progress;
  }

  onBeforeSend(event) {
    event.xhr.setRequestHeader(
      "Authorization",
      "Bearer " + sessionStorage.getItem("currentUser")
    );
    event.xhr.setRequestHeader("Access-Control-Allow-Origin", "* ");
  }

  onUpload(event, model) {
    let data = event.originalEvent.body;
    //console.log(event)
    if (data.status) {
      // add files to db and re fetch files list here

      var obj = {
        id: this.id,
        imageArray: data.fileinfo,
      };

      this.inventoryservice.updateProductImage(obj).subscribe((data) => {
        if (data.status) {
          //get images related to the report
          this.getData(this.id);
          this.uploadinprogress = false;
          model.hide();

          this.toaster.success("Product Image Updated", "Success !!", {
            positionClass: "toast-top-right",
            closeButton: true,
          });
        } else {
          this.toaster.warning(data.err, "ERROR !!", {
            positionClass: "toast-top-right",
            closeButton: true,
          });
        }
      });
    } else {
      this.toaster.warning(
        "An error occured while uploading files",
        "ERROR !!",
        {
          positionClass: "toast-top-right",
          closeButton: true,
        }
      );
    }
  }

  enablepriceinput() {
    this.enablepriceform = true;
  }

  AddPrices(lnform: any) {
    if (this.storeitem.sellingprice != null) {
      if (this.storeitem.quantity == null) {
        this.storeitem.quantity = 0;
      }
      if (this.storeitem.cost == null) {
        if (this.inventorylist.itemtype == 1) {
          this.storeitem.cost = (this.storeitem.sellingprice / 100) * 75;
        } else {
          this.storeitem.cost = (this.storeitem.sellingprice / 100) * 85;
        }
      }
      this.storeitem.itemid = this.id;
      console.log(this.storeitem);
      this.inventoryservice.createItemDetail(this.storeitem).subscribe(
        (data) => {
          if (data.status) {
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
            lnform.reset();
            this.enablepriceform = false;
            this.inventoryservice
              .findItemDetail(this.id)
              .subscribe((item) => (this.itemdetaillist = item));
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
          alert("Error adding Pricing details [ERRCODE:001]");
        }
      );
    }
  }

  edititem(updatingid, currentqty, currentcost, currentsellingprice) {
    this.updateitem = true;
    this.updatingid = updatingid;
    this.newqty = currentqty;
    this.newcost = currentcost;
    this.newsellingprice = currentsellingprice;
  }

  updatecancel() {
    this.updatingid = null;
    this.updateitem = false;
  }

  updateItem() {
    if (this.newqty != null && this.newsellingprice != null) {
      if (this.newcost == null) {
        if (this.inventorylist.itemtype == 1) {
          this.newcost = (this.newsellingprice / 100) * 75;
        } else {
          this.newcost = (this.newsellingprice / 100) * 85;
        }
      }

      this.newitemdetaillist.id = this.updatingid;
      this.newitemdetaillist.quantity = this.newqty;
      this.newitemdetaillist.cost = this.newcost;
      this.newitemdetaillist.sellingprice = this.newsellingprice;
      console.log(this.newitemdetaillist);
      this.inventoryservice.editItemDetail(this.newitemdetaillist).subscribe(
        (data) => {
          if (data.status) {
            this.toaster = {
              type: "success",
              title: "Success !!",
              text: "Pricing Updated !",
            };
            this.toasterService.pop(
              this.toaster.type,
              this.toaster.title,
              this.toaster.text
            );
            this.updatingid = null;
            this.updateitem = false;

            this.inventoryservice
              .findItemDetail(this.id)
              .subscribe((item) => (this.itemdetaillist = item));
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
          alert("Error adding Item details [ERRCODE:001]");
        }
      );
    }
  }

  generateuniquekey() {
    var num1 = new Date().valueOf();
    var num2 = Math.random().toString(36).substring(7);
    this.uniqueid = num1 + num2;
  }

  itemDataAltered(item) {
    item.synced_status = false;
    this.draft_data = true;
  }
}
