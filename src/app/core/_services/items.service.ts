import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { catchError, map } from "rxjs/operators";
import { GlobalVariable } from "./globals";

@Injectable({
  providedIn: "root",
})
export class ItemsService {
  private BaseAPIurl = GlobalVariable.BaseUrl + "api/v1/items/";

  constructor(private http: HttpClient) {}
  private handleError(error: HttpErrorResponse | any) {
    console.error("ClientService::handleError", error);
    return Observable.throw(error);
  }

  addToCart(items) {
    let APIurl = this.BaseAPIurl + "add-to-cart";
    return this.http.post<any>(APIurl, JSON.stringify(items)).pipe(
      map((response) => {
        return response;
      }),
      catchError(this.handleError)
    );
  }
}
