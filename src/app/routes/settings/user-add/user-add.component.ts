import { Component, OnInit } from "@angular/core";
import {
  ToasterConfig,
  ToasterService,
} from "../../../../../node_modules/angular2-toaster";
import {
  FormGroup,
  FormBuilder,
  Validators,
} from "../../../../../node_modules/@angular/forms";
import { UserService } from "../../../core/_services/user.service";
import { AuthenticationService } from "../../../core/_services/authentication.service";
import { SelectItem } from "primeng/components/common/selectitem";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: "app-user-add",
  templateUrl: "./user-add.component.html",
  styleUrls: ["./user-add.component.scss"],
})
export class UserAddComponent implements OnInit {
  sysuser: any;
  LoadUI: boolean = false;

  roles_list: SelectItem[] = [];

  valForm: FormGroup;
  toaster: any;
  toasterConfig: any;
  toasterconfig: ToasterConfig = new ToasterConfig({
    positionClass: "toast-bottom-right",
    showCloseButton: true,
  });

  role: any;

  constructor(
    fb: FormBuilder,
    private userservice: UserService,
    private authservice: AuthenticationService,
    private toasterService: ToasterService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.valForm = fb.group({
      firstname: [null, Validators.required],
      lastname: [null, Validators.required],
      username: [null, Validators.required],
      password: [null, Validators.required],
      userlevel: [null, Validators.required],
    });
  }

  ngOnInit() {
    this.authservice.validateUser().subscribe((sysuser) => {
      this.sysuser = sysuser;
      this.LoadUI = true;
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
      this.userservice.createUser(value).subscribe(
        (data) => {
          if (data.status) {
            this.toaster = {
              type: "success",
              title: "Done ! !!",
              text: "System User added",
            };
            this.toasterService.pop(
              this.toaster.type,
              this.toaster.title,
              this.toaster.text
            );

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
