import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { GlobalVariable } from "./globals";
import { map, catchError } from "rxjs/operators";
import { Observable } from "rxjs";

@Injectable({ providedIn: "root" })
export class PaymentService {
  private BaseAPIurl = GlobalVariable.BaseUrl + "api/v1/payment/";

  constructor(private http: HttpClient) {}

  // error checking handler for api response and trigger errors
  private handleError(error: HttpErrorResponse | any) {
    console.error("PaymentService::handleError", error);
    return Observable.throw(error);
  }

  // Get All payments
  getAll() {
    let APIurl = this.BaseAPIurl + "get-all-payment";
    return this.http.get<any>(APIurl).pipe(
      map((response) => {
        return response;
      }),
      catchError(this.handleError)
    );
  }

  // Get payment
  getPayment(id) {
    let APIurl = this.BaseAPIurl + "get-payment";
    return this.http.get<any>(APIurl + "?id=" + id).pipe(
      map((response) => {
        return response;
      }),
      catchError(this.handleError)
    );
  }

  //update payment status
  changeStatus(obj) {
    let APIurl = this.BaseAPIurl + "update-payment-status";
    return this.http.post<any>(APIurl, JSON.stringify(obj)).pipe(
      map((response) => {
        return response;
      }),
      catchError(this.handleError)
    );
  }
}
