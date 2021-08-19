import { Component, OnInit } from "@angular/core";
import { User } from "../../../core/_models/user";
import {
  FormGroup,
  FormBuilder,
  Validators,
} from "../../../../../node_modules/@angular/forms";
import {
  ToasterConfig,
  ToasterService,
} from "../../../../../node_modules/angular2-toaster";
import {
  ActivatedRoute,
  Router,
} from "../../../../../node_modules/@angular/router";
import { UserService } from "../../../core/_services/user.service";
import { AuthenticationService } from "../../../core/_services/authentication.service";
import { SelectItem } from "primeng/components/common/selectitem";

const swal = require("sweetalert");
@Component({
  selector: "app-user-edit",
  templateUrl: "./user-edit.component.html",
  styleUrls: ["./user-edit.component.scss"],
})
export class UserEditComponent implements OnInit {
  sysuser: any;
  LoadUI: boolean = false;
  user: User;

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

  constructor(
    private route: ActivatedRoute,
    fb: FormBuilder,
    private userservice: UserService,
    private authservice: AuthenticationService,
    private toasterService: ToasterService,
    private router: Router
  ) {
    this.valForm = fb.group({
      firstname: [null, Validators.required],
      lastname: [null, Validators.required],
      storecode: [null, Validators.required],
      userlevel: [null, Validators.required],
    });
  }

  ngOnInit() {
    this.authservice.validateUser().subscribe((sysuser) => {
      this.sysuser = sysuser;
      this.LoadUI = true;
    });

    this.sub = this.route.params.subscribe((params) => {
      this.id = +params["id"];
      this.userservice.findStaffUser(this.id).subscribe((data) => {
        if (data) {
          // Do if true
          this.user = data;
          this.valForm.patchValue({ firstname: this.user.firstname });
          this.valForm.patchValue({ lastname: this.user.lastname });
          this.valForm.patchValue({ storecode: this.user.storecode });
          this.valForm.patchValue({ userlevel: this.user.userlevel });
        }
      });
    });
    this.userservice.getAllUserRoles().subscribe((data) => {
      if (data) {
        this.roles_list = [];
        this.roles_list.push({ label: "Please Select", value: null });
        for (var i = 0; i < data.length; i++) {
          this.roles_list.push({
            label: data[i].rolename,
            value: data[i].id,
          });
        }
      }
    });
  }

  submitForm($ev, value: any) {
    $ev.preventDefault();
    for (let c in this.valForm.controls) {
      this.valForm.controls[c].markAsTouched();
    }
    if (this.valForm.valid) {
      value.id = this.id;

      this.userservice.editUser(value).subscribe(
        (data) => {
          if (data.status) {
            swal("Done!", "User details Successfully updated", "success");

            this.valForm.reset();
            this.router.navigate(["/settings/users/summary"]);
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
}
