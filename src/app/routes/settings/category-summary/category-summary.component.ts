import { Component, OnInit, ViewChild } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { ToasterConfig, ToasterService } from "angular2-toaster";
import { ModalDirective } from "ngx-bootstrap/modal";
import { AuthenticationService } from "../../../core/_services/authentication.service";
import { ItemCategoriesService } from "../../../core/_services/itemCategories.service";
const swal = require("sweetalert");
@Component({
  selector: "app-category-summary",
  templateUrl: "./category-summary.component.html",
  styleUrls: ["./category-summary.component.scss"],
})
export class CategorySummaryComponent implements OnInit {
  @ViewChild("sortParentTopicModal")
  public sortParentTopicModal: ModalDirective;
  sysuser: any;
  LoadUI = false;
  categoryList: any;
  subCategoryList: any;
  valForm: FormGroup;
  valForm2: FormGroup;
  uniqueid: any;

  // cols: any[];
  cols: any[];
  xcols: any[];
  toaster: any;
  toasterConfig: any;
  toasterconfig: ToasterConfig = new ToasterConfig({
    positionClass: "toast-bottom-right",
    showCloseButton: true,
  });
  edit_category_id: any;
  edit_category_Name: any;
  edit_subcategory_Name: any;
  edit_subcategory_id: any;
  edit_maincategory_Name: any;
  constructor(
    private authservice: AuthenticationService,
    private toasterService: ToasterService,
    private categoryService: ItemCategoriesService,
    fb: FormBuilder
  ) {
    this.valForm = fb.group({
      catname: [null, Validators.required],
    });

    this.valForm2 = fb.group({
      name: [null, Validators.required],
      category: [null, Validators.required],
    });
  }

  ngOnInit() {
    this.authservice.validateUser().subscribe((sysuser) => {
      this.sysuser = sysuser;
      this.LoadUI = true;
    });

    //main category columns
    this.cols = [
      { field: "catname", header: "Category Name" },
      { field: "actions", header: "Actions" },
    ];

    //sub category columns
    this.xcols = [
      { field: "name", header: "Sub Category Name" },
      { field: "category_name", header: "Category Name" },
      { field: "actions", header: "Actions" },
    ];

    this.getAllCategories();
    this.getAllSubCategories();
    this.generateuniquekey();
  }

  //get all categories
  getAllCategories() {
    this.categoryService
      .getAll()
      .subscribe((data) => (this.categoryList = data));
  }

  //get all sub categories
  getAllSubCategories() {
    this.categoryService
      .getAllSubCategories({ category: null })
      .subscribe((data) => (this.subCategoryList = data));
  }

  //generate unique key for unique requests
  generateuniquekey() {
    const num1 = new Date().valueOf();
    const num2 = Math.random().toString(36).substring(7);
    this.uniqueid = num1 + num2;
  }

  //edit category function
  editCategory(modal) {
    if (this.edit_category_Name == null || this.edit_category_Name == "") {
      swal("Error Occured.", "Category Name is Required", "warning");
      return;
    }

    var value = {
      id: this.edit_category_id,
      catname: this.edit_category_Name,
      uniquekey: this.uniqueid,
    };
    this.categoryService.editCategory(value).subscribe(
      (data) => {
        if (data.status) {
          this.toaster = {
            type: "success",
            title: "Done ! !!",
            text: " Table Updated",
          };
          this.toasterService.pop(
            this.toaster.type,
            this.toaster.title,
            this.toaster.text
          );
          this.getAllCategories();

          modal.hide();
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
      },
      (error) => {
        alert("API ERROR [ERRCODE:001]");
      }
    );
  }

  //edit sub category function
  editSubCategory(modal) {
    if (
      this.edit_subcategory_Name == null ||
      this.edit_subcategory_Name == ""
    ) {
      swal("Error Occured.", "Sub Category Name is Required", "warning");
      return;
    }
    if (
      this.edit_maincategory_Name == null ||
      this.edit_maincategory_Name == ""
    ) {
      swal("Error Occured.", "Category Name is Required", "warning");
      return;
    }

    var value = {
      id: this.edit_subcategory_id,
      name: this.edit_subcategory_Name,
      category: this.edit_maincategory_Name,
      uniquekey: this.uniqueid,
    };
    this.categoryService.editSubCategory(value).subscribe(
      (data) => {
        if (data.status) {
          this.toaster = {
            type: "success",
            title: "Done ! !!",
            text: " Category Updated",
          };
          this.toasterService.pop(
            this.toaster.type,
            this.toaster.title,
            this.toaster.text
          );
          this.getAllSubCategories();

          modal.hide();
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
      },
      (error) => {
        alert("API ERROR [ERRCODE:001]");
      }
    );
  }

  //add category function
  submitForm($ev, value: any) {
    $ev.preventDefault();
    for (const c in this.valForm.controls) {
      this.valForm.controls[c].markAsTouched();
    }
    if (this.valForm.valid) {
      value.uniquekey = this.uniqueid;
      // value.catcode = null;
      this.categoryService.createCategory(value).subscribe(
        (data) => {
          if (data.status) {
            this.toaster = {
              type: "success",
              title: "Done ! !!",
              text: "Category added",
            };
            this.toasterService.pop(
              this.toaster.type,
              this.toaster.title,
              this.toaster.text
            );

            this.generateuniquekey();
            this.getAllCategories();
            this.getAllSubCategories();

            this.valForm.reset();
            this.sortParentTopicModal.show;
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

  //show edit category modal
  editCategoryModalShow(data, modal) {
    this.edit_category_id = data.id;
    this.edit_category_Name = data.catname;

    modal.show();
  }

  //show edit sub category modal
  editSubCategoryModalShow(data, modal) {
    this.edit_subcategory_id = data.id;
    this.edit_subcategory_Name = data.name;
    this.edit_maincategory_Name = data.category;

    modal.show();
  }

  //add sub categories function
  submitForm2($ev, value: any) {
    $ev.preventDefault();
    for (const c in this.valForm2.controls) {
      this.valForm2.controls[c].markAsTouched();
    }
    if (this.valForm2.valid) {
      value.uniquekey = this.uniqueid;
      this.categoryService.createSubCategory(value).subscribe(
        (data) => {
          if (data.status) {
            this.toaster = {
              type: "success",
              title: "Done ! !!",
              text: "Category added",
            };
            this.toasterService.pop(
              this.toaster.type,
              this.toaster.title,
              this.toaster.text
            );

            this.valForm2.reset();
            this.generateuniquekey();
            this.getAllCategories();
            this.getAllSubCategories();
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

  // sort Categories

  updateCategorySortOrder(modal) {
    var obj = {
      data_array: this.categoryList,
    };

    this.categoryService.updateSort(obj).subscribe(
      (data) => {
        if (data.status) {
          this.toaster = {
            type: "success",
            title: "Done ! !!",
            text: "Category Sorted !",
          };
          this.toasterService.pop(
            this.toaster.type,
            this.toaster.title,
            this.toaster.text
          );

          modal.hide();
          this.getAllCategories();
          this.getAllSubCategories();
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
      },
      (error) => {
        swal("API Error Occured. Try Again!");
      }
    );
  }

  //delete sub categories function
  deleteSubCategories(id) {
    this.categoryService.deleteCategory({ id: id }).subscribe((data) => {
      if (data.status) {
        swal("Done!", "Inventory Deleted!", "success");
        this.getAllSubCategories();
      } else {
        swal("Error Occured. Try Again!");
      }
    });
  }
}
