import { Component, OnInit } from "@angular/core";
import { SelectItem } from "primeng/components/common/selectitem";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ToasterConfig, ToasterService } from "angular2-toaster";
import { ActivatedRoute, Router } from "@angular/router";
import { AuthenticationService } from "../../../core/_services/authentication.service";
import { SupplierService } from "../../../core/_services/supplier.service";
import { ItemCategoriesService } from "../../../core/_services/itemCategories.service";
const swal = require("sweetalert");
@Component({
  selector: "app-edit-supplier",
  templateUrl: "./edit-supplier.component.html",
  styleUrls: ["./edit-supplier.component.scss"],
})
export class EditSupplierComponent implements OnInit {
  sysuser: any;
  LoadUI: boolean = false;
  user: any;

  roles_list: SelectItem[] = [];
  valForm: FormGroup;
  toaster: any;
  toasterConfig: any;
  toasterconfig: ToasterConfig = new ToasterConfig({
    positionClass: "toast-bottom-right",
    showCloseButton: true,
  });

  id: number;
  private sub: any;
  categoryList: any;
  constructor(
    private route: ActivatedRoute,
    fb: FormBuilder,
    private authservice: AuthenticationService,
    private toasterService: ToasterService,
    private router: Router,
    private supplierservice: SupplierService,
    private categoryService: ItemCategoriesService
  ) {
    this.valForm = fb.group({
      supplier_name: [null, Validators.required],
      phone: [null, Validators.required],
      address: [null, Validators.required],
      category: [null, Validators.required],
    });
  }

  ngOnInit() {
    this.authservice.validateUser().subscribe((sysuser) => {
      this.sysuser = sysuser;
      this.LoadUI = true;
    });

    this.getAllCategories();

    this.sub = this.route.params.subscribe((params) => {
      this.id = +params["id"];
      this.supplierservice.getSupplier({ id: this.id }).subscribe((data) => {
        if (data) {
          // Do if true

          this.user = data;
          this.valForm.patchValue({ supplier_name: this.user.supplier_name });
          this.valForm.patchValue({ phone: this.user.phone });
          this.valForm.patchValue({ address: this.user.company_address });
          this.valForm.patchValue({ category: this.user.category.id });
        }
      });
    });
  }

  submitForm($ev, value: any) {
    $ev.preventDefault();
    for (let c in this.valForm.controls) {
      this.valForm.controls[c].markAsTouched();
    }
    if (this.valForm.valid) {
      value.id = this.id;

      console.log(value);
      this.supplierservice.EditSupplier(value).subscribe(
        (data) => {
          if (data.status) {
            swal("Done!", "Supplier details Successfully updated", "success");

            this.valForm.reset();
            this.router.navigate(["/suppliers/summary"]);
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
  getAllCategories() {
    this.categoryService
      .getAll()
      .subscribe((data) => (this.categoryList = data));
  }
}
