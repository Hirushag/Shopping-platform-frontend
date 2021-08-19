import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { catchError, map } from "rxjs/operators";
import { GlobalVariable } from "./globals";

@Injectable({
  providedIn: "root",
})
export class CartService {
  private BaseAPIurl = GlobalVariable.BaseUrl + "api/v1/cart/";

  constructor(private http: HttpClient) {}

  private handleError(error: HttpErrorResponse | any) {
    console.error("ClientService::handleError", error);
    return Observable.throw(error);
  }

  getCartItems() {
    let APIurl = this.BaseAPIurl + "get-cart-items";
    return this.http.get<any>(APIurl).pipe(
      map((response) => {
        return response;
      }),
      catchError(this.handleError)
    );
  }

  // update qty +1 -!
  updateQuantity(obj) {
    let APIurl = this.BaseAPIurl + "update-quantity";
    return this.http.post<any>(APIurl, JSON.stringify(obj)).pipe(
      map((response) => {
        return response;
      }),
      catchError(this.handleError)
    );
  }
  deleteItem(obj) {
    let APIurl = this.BaseAPIurl + "delete-item";
    return this.http.post<any>(APIurl, JSON.stringify(obj)).pipe(
      map((response) => {
        return response;
      }),
      catchError(this.handleError)
    );
  }

  calculateTotals() {
    let APIurl = this.BaseAPIurl + "calculate-totals";
    return this.http.get<any>(APIurl).pipe(
      map((response) => {
        return response;
      }),
      catchError(this.handleError)
    );
  }

  addDelivery(items) {
    let APIurl = this.BaseAPIurl + "add-delivery-details";
    return this.http.post<any>(APIurl, JSON.stringify(items)).pipe(
      map((response) => {
        return response;
      }),
      catchError(this.handleError)
    );
  }
}
