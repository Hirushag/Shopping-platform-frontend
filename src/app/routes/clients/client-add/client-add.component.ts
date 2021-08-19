import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ToasterConfig, ToasterService } from "angular2-toaster";
import { AuthenticationService } from "../../../core/_services/authentication.service";
import { Router } from "@angular/router";
const swal = require("sweetalert");
import { UserService } from "../../../core/_services/user.service";

@Component({
  selector: "app-client-add",
  templateUrl: "./client-add.component.html",
  styleUrls: ["./client-add.component.scss"],
})
export class ClientAddComponent implements OnInit {
  sysuser: any;
  LoadUI = false;

  uniqueid: string;
  submitted = false;

  toaster: any;
  toasterConfig: any;
  toasterconfig: ToasterConfig = new ToasterConfig({
    positionClass: "toast-bottom-right",
    showCloseButton: true,
  });

  valForm: FormGroup;
  stores: any[];

  constructor(
    fb: FormBuilder,
    private authservice: AuthenticationService,
    private toasterService: ToasterService,
    private userservice: UserService,
    private router: Router
  ) {
    this.valForm = fb.group({
      firstname: [null, Validators.required],
      lastname: [null],
      username: [null, Validators.required],
      password: [null, Validators.required],
    });
  }

  ngOnInit() {
    this.generateuniquekey();
    this.authservice.validateUser().subscribe((sysuser) => {
      this.sysuser = sysuser;
      this.LoadUI = true;
    });
  }

  generateuniquekey() {
    const num1 = new Date().valueOf();
    const num2 = Math.random().toString(36).substring(7);
    this.uniqueid = num1 + num2;
  }

  submitForm($ev, value: any) {
    $ev.preventDefault();
    for (const c in this.valForm.controls) {
      this.valForm.controls[c].markAsTouched();
    }
    if (this.valForm.valid) {
      value.uniquekey = this.uniqueid;
      this.userservice.createUser(value).subscribe(
        (data) => {
          if (data.status) {
            swal("User Added !!", "User has been added.", "success");
            this.valForm.reset();
            this.generateuniquekey();
            this.router.navigate(["clients/detail/" + data.id]);
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
