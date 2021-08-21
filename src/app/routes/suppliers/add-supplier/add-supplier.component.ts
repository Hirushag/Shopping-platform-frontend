import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ToasterConfig, ToasterService} from 'angular2-toaster';
import {AuthenticationService} from '../../../core/_services/authentication.service';
import {SupplierService} from '../../../core/_services/supplier.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-add-supplier',
  templateUrl: './add-supplier.component.html',
  styleUrls: ['./add-supplier.component.scss']
})
export class AddSupplierComponent implements OnInit {

  sysuser: any;
  LoadUI: boolean = false;

  valForm: FormGroup;
  toaster: any;
  toasterConfig: any;
  toasterconfig: ToasterConfig = new ToasterConfig({
    positionClass: "toast-bottom-right",
    showCloseButton: true,
  });

  constructor(
    fb: FormBuilder,
    private authservice: AuthenticationService,
    private toasterService: ToasterService,
    private supplierservice:SupplierService,
    private router: Router
  ) {
    this.valForm = fb.group({
      supplier_name: [null, Validators.required],
      phone: [null, Validators.required],
      address: [null, Validators.required],
    });
  }

  ngOnInit() {
    this.authservice.validateUser().subscribe((sysuser) => {
      this.sysuser = sysuser;
      this.LoadUI = true;
    });
  }

  submitForm($ev, value: any) {
    $ev.preventDefault();
    for (let c in this.valForm.controls) {
      this.valForm.controls[c].markAsTouched();
    }
    if (this.valForm.valid) {
      this.supplierservice.createSupplier(value).subscribe(
        (data) => {
          if (data.status) {
            this.toaster = {
              type: "success",
              title: "Done ! !!",
              text: "Supplier Added !",
            };
            this.toasterService.pop(
              this.toaster.type,
              this.toaster.title,
              this.toaster.text
            );

            this.valForm.reset();
            this.router.navigate(['/suppliers/detail/data.id'])
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
