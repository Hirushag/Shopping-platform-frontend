import { Component, OnInit, Compiler } from "@angular/core";
import { first } from "rxjs/operators";
import {
  FormGroup,
  FormBuilder,
  Validators,
} from "../../../../node_modules/@angular/forms";
import {
  ToasterConfig,
  ToasterService,
} from "../../../../node_modules/angular2-toaster";
import {
  Router,
  ActivatedRoute,
} from "../../../../node_modules/@angular/router";
import { AuthenticationService } from "../../core/_services/authentication.service";
import { UserService } from "../../core/_services/user.service";
const swal = require("sweetalert");
@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.scss"],
})
export class RegisterComponent implements OnInit {
  valForm: FormGroup;

  toaster: any;
  toasterConfig: any;
  toasterconfig: ToasterConfig = new ToasterConfig({
    positionClass: "toast-bottom-right",
    showCloseButton: true,
  });
  returnUrl: string;
  uniqueid: string;

  constructor(
    fb: FormBuilder,
    private router: Router,
    private authenticationservice: AuthenticationService,
    private compiler: Compiler,
    private toasterService: ToasterService,
    private route: ActivatedRoute,
    private userservice: UserService
  ) {
    this.valForm = fb.group({
      firstname: [null, Validators.required],
      lastname: [null],
      username: [null, Validators.required],
      password: [null, Validators.required],
    });
  }

  ngOnInit() {
    this.authenticationservice.logout();

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams["returnUrl"] || "/";
    this.compiler.clearCache();
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
      this.userservice
        .createUser(value)
        .pipe(first())
        .subscribe(
          (data) => {
            if (data.status) {
              swal("User Added !!", "User has been added.", "success");
              this.valForm.reset();
              this.generateuniquekey();
              this.router.navigate(["/login"]);
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
