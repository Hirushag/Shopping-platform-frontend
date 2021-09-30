import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { GlobalVariable } from "./globals";
import { map, catchError } from "rxjs/operators";
import { Observable } from "rxjs";

@Injectable({ providedIn: "root" })
export class ClientService {
  private BaseAPIurl = GlobalVariable.BaseUrl + "api/v1/client/";

  constructor(private http: HttpClient) {}

  // error checking handler for api response and trigger errors
  private handleError(error: HttpErrorResponse | any) {
    console.error("ClientService::handleError", error);
    return Observable.throw(error);
  }

  // Get All clients
  getAll() {
    let APIurl = this.BaseAPIurl + "get-all-clients";
    return this.http.get<any>(APIurl).pipe(
      map((response) => {
        return response;
      }),
      catchError(this.handleError)
    );
  }

  // Get client detail
  getClient(id) {
    let APIurl = this.BaseAPIurl + "get-client";
    return this.http.get<any>(APIurl + "?id=" + id).pipe(
      map((response) => {
        return response;
      }),
      catchError(this.handleError)
    );
  }

  // Edit client
  updateOrder(data) {
    let APIurl = this.BaseAPIurl + "update-order-status";
    return this.http.post<any>(APIurl, JSON.stringify(data)).pipe(
      map((response) => {
        return response;
      }),
      catchError(this.handleError)
    );
  }
}
