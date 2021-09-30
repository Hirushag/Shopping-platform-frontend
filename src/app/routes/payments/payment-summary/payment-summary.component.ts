import { Component, OnInit } from "@angular/core";
import { User } from "../../../core/_models/user";
import { AuthenticationService } from "../../../core/_services/authentication.service";
import { PaymentService } from "../../../core/_services/payment.service";
import { timer } from "rxjs";

@Component({
  selector: "app-payment-summary",
  templateUrl: "./payment-summary.component.html",
  styleUrls: ["./payment-summary.component.scss"],
})
export class PaymentSummaryComponent implements OnInit {
  sysuser: User;
  LoadUI: boolean = false;
  private sub: any;
  cols: any[];

  payments: any[] = [];

  constructor(
    private authservice: AuthenticationService,
    private paymentservice: PaymentService
  ) {}

  ngOnInit() {
    this.cols = [
      { field: "method", header: "Method" },
      { field: "client", header: "User" },
      { field: "amount", header: "Amount" },
      { field: "status", header: "status" },
      { field: "actions", header: "Actions", sortable: true },
    ];

    this.authservice.validateUser().subscribe((sysuser) => {
      this.sysuser = sysuser;
      this.LoadUI = true;
    });

    this.getData();
  }

  getData() {
    const refreshInterval$ = timer(0, 60000);
    this.sub = refreshInterval$.subscribe(() =>
      this.paymentservice.getAll().subscribe((data) => {
        this.payments = data.payments;
      })
    );
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
