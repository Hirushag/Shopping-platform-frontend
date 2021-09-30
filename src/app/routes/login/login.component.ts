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

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
  valForm: FormGroup;

  toaster: any;
  toasterConfig: any;
  toasterconfig: ToasterConfig = new ToasterConfig({
    positionClass: "toast-bottom-right",
    showCloseButton: true,
  });
  returnUrl: string;

  constructor(
    fb: FormBuilder,
    private router: Router,
    private authenticationservice: AuthenticationService,
    private compiler: Compiler,
    private toasterService: ToasterService,
    private route: ActivatedRoute
  ) {
    this.valForm = fb.group({
      username: [null, Validators.required],
      password: [null, Validators.required],
    });
  }

  ngOnInit() {
    // reset login status
    this.authenticationservice.logout();

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams["returnUrl"] || "/";
    this.compiler.clearCache();
  }

  submitForm($ev, value: any) {
    $ev.preventDefault();
    for (let c in this.valForm.controls) {
      this.valForm.controls[c].markAsTouched();
    }
    if (this.valForm.valid) {
      this.authenticationservice
        .login(value.username, value.password)

        .subscribe(
          (data) => {
            if (data.body.userlevel == 1) {
              this.router.navigate(["/shopping/summary"]);
            } else {
              this.router.navigate(["/settings/users/summary"]);
            }
          },
          (error) => {
            //this.loading = false;
            this.toaster = {
              type: "error",
              title: "ERROR !!",
              text: "Username or Password Invalid",
            };
            this.toasterService.pop(
              this.toaster.type,
              this.toaster.title,
              this.toaster.text
            );
          }
        );
    }
  }
}
