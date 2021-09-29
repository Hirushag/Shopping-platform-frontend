import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { GlobalVariable } from './globals';

@Injectable({
  providedIn: 'root'
})
export class DeliveryService {
  private BaseAPIurl = GlobalVariable.BaseUrl + "api/v1/delivery/";

  constructor(private http: HttpClient) { }

  private handleError(error: HttpErrorResponse | any) {
    console.error("DeliveryService::handleError", error);
    return Observable.throw(error);
  }


   // Get All Products
   getAll() {
    let APIurl = this.BaseAPIurl + "get-all-deliveries";
    return this.http.get<any>(APIurl).pipe(
      map((response) => {
        return response;
      }),
      catchError(this.handleError)
    );
  }
  addRider(data) {
    let APIurl = this.BaseAPIurl + "add-rider";
    return this.http.post<any>(APIurl, data).pipe(
      map((response) => {
        return response;
      }),
      catchError(this.handleError)
    );
  }
  getAllRiders() {
    let APIurl = this.BaseAPIurl + "get-all-riders";
    return this.http.get<any>(APIurl).pipe(
      map((response) => {
        return response;
      }),
      catchError(this.handleError)
    );
  }

  editRider(data) {
    let APIurl = this.BaseAPIurl + "edit-rider";
    return this.http.post<any>(APIurl, data).pipe(
      map((response) => {
        return response;
      }),
      catchError(this.handleError)
    );
  }

  deleteRider(data) {
    let APIurl = this.BaseAPIurl + "delete-rider";
    return this.http.post<any>(APIurl, data).pipe(
      map((response) => {
        return response;
      }),
      catchError(this.handleError)
    );
  }

  getDelivery(data) {
    let APIurl = this.BaseAPIurl + "get-delivery";
    return this.http.post<any>(APIurl, data).pipe(
      map((response) => {
        return response;
      }),
      catchError(this.handleError)
    );
  }
  changeStatus(data) {
    let APIurl = this.BaseAPIurl + "update-delivery-status";
    return this.http.post<any>(APIurl, data).pipe(
      map((response) => {
        return response;
      }),
      catchError(this.handleError)
    );
  }




}
