import { Injectable } from '@angular/core';
import {GlobalVariable} from './globals';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {catchError, map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SupplierService {

  private BaseAPIurl = GlobalVariable.BaseUrl + "api/v1/suppliers/";

  constructor(private http: HttpClient) {}

  // error checking handler for api response and trigger errors
  private handleError(error: HttpErrorResponse | any) {
    console.error("SupplierService::handleError", error);
    return Observable.throw(error);
  }

  // Get All payments
  getAllSuppliers() {
    let APIurl = this.BaseAPIurl + "get-all-suppliers";
    return this.http.get<any>(APIurl).pipe(
      map((response) => {
        return response;
      }),
      catchError(this.handleError)
    );
  }

  createSupplier(user) {
    let APIurl = this.BaseAPIurl + "add-supplier";
    return this.http.post<any>(APIurl, JSON.stringify(user)).pipe(
      map((response) => {
        return response;
      }),
      catchError(this.handleError)
    );
  }

  EditSupplier(user) {
    let APIurl = this.BaseAPIurl + "edit-supplier";
    return this.http.post<any>(APIurl, JSON.stringify(user)).pipe(
      map((response) => {
        return response;
      }),
      catchError(this.handleError)
    );
  }

  getSupplier(user) {
    let APIurl = this.BaseAPIurl + "get-supplier";
    return this.http.post<any>(APIurl, JSON.stringify(user)).pipe(
      map((response) => {
        return response;
      }),
      catchError(this.handleError)
    );
  }

  changeStatus(obj) {
    let APIurl = this.BaseAPIurl + "update-status";
    return this.http.post<any>(APIurl, JSON.stringify(obj)).pipe(
      map((response) => {
        return response;
      }),
      catchError(this.handleError)
    );
  }
}
