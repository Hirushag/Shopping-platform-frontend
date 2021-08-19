import { Component, OnInit } from "@angular/core";
import { ToasterConfig, ToasterService } from "angular2-toaster";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AuthenticationService } from "../../../core/_services/authentication.service";
import { ClientService } from "../../../core/_services/client.service";
import { ActivatedRoute, Router } from "@angular/router";
const swal = require("sweetalert");
import * as moment from "moment";

@Component({
  selector: "app-client-edit",
  templateUrl: "./client-edit.component.html",
  styleUrls: ["./client-edit.component.scss"],
})
export class ClientEditComponent implements OnInit {
  sysuser: any;
  LoadUI = false;

  client: {};
  private sub: any;
  id: number;
  toaster: any;
  toasterConfig: any;
  toasterconfig: ToasterConfig = new ToasterConfig({
    positionClass: "toast-bottom-right",
    showCloseButton: true,
  });

  valForm: FormGroup;
  stores: any;

  constructor(
    fb: FormBuilder,
    private authservice: AuthenticationService,
    private toasterService: ToasterService,
    private clientService: ClientService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.valForm = fb.group({
      id: [null, Validators.required],
      clientname: [null, Validators.required],
      phone: [null],
      store: [null, Validators.required],
    });
  }

  ngOnInit() {
    this.authservice.validateUser().subscribe((sysuser) => {
      this.sysuser = sysuser;
      this.LoadUI = true;
    });

    this.sub = this.route.params.subscribe((params) => {
      this.id = +params["id"];
      this.getData(this.id);
    });
  }

  getData(clientId) {
    this.clientService.getClient(clientId).subscribe((data) => {
      this.client = data;
    });
  }

  patchValues() {
    const objects = [];

    for (const key in this.client) {
      const obj = {};
      if (this.client.hasOwnProperty(key)) {
        obj[key] = this.client[key];
      }
      objects.push(obj);
    }

    for (const index in objects) {
      this.valForm.patchValue(objects[index]);
    }
  }

  submitForm($ev, value: any) {
    $ev.preventDefault();
    for (const c in this.valForm.controls) {
      this.valForm.controls[c].markAsTouched();
    }
    if (this.valForm.valid) {
      this.clientService.editClient(value).subscribe(
        (data) => {
          if (data.status) {
            swal("Client Updated !!", "Client has been updated.", "success");
            this.valForm.reset();
            this.router.navigate(["clients/detail/" + this.id]);
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
