import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { GlobalVariable } from "./globals";
import { map, catchError } from "rxjs/operators";
import { Observable } from "rxjs";

@Injectable({ providedIn: "root" })
export class InventoryService {
  private BaseAPIurl = GlobalVariable.BaseUrl + "api/v1/inventory/";
  private ItemDetailAPIurl = GlobalVariable.BaseUrl + "api/v1/item-details/";

  constructor(private http: HttpClient) {}

  // error checking handler for api response and trigger errors
  private handleError(error: HttpErrorResponse | any) {
    console.error("InventoryService::handleError", error);
    return Observable.throw(error);
  }

  // Get All Products
  getAll() {
    let APIurl = this.BaseAPIurl + "get-all-products";
    return this.http.get<any>(APIurl).pipe(
      map((response) => {
        return response;
      }),
      catchError(this.handleError)
    );
  }

  // Get Inventory detail
  findInventory(id) {
    let APIurl = this.BaseAPIurl + "get-inventory";
    return this.http.get<any>(APIurl + "?id=" + id).pipe(
      map((response) => {
        return response;
      }),
      catchError(this.handleError)
    );
  }

  getMaintype() {
    let APIurl = this.BaseAPIurl + "get-maintype";
    return this.http.get<any>(APIurl).pipe(
      map((response) => {
        return response;
      }),
      catchError(this.handleError)
    );
  }

  // Create inventory
  createInventory(inventory) {
    let APIurl = this.BaseAPIurl + "create-inventory";
    return this.http.post<any>(APIurl, JSON.stringify(inventory)).pipe(
      map((response) => {
        return response;
      }),
      catchError(this.handleError)
    );
  }

  updateImageInventory(inventory) {
    let APIurl = this.BaseAPIurl + "update-image";
    return this.http.post<any>(APIurl, JSON.stringify(inventory)).pipe(
      map((response) => {
        return response;
      }),
      catchError(this.handleError)
    );
  }

  deleteInventory(inventory) {
    let APIurl = this.BaseAPIurl + "delete-inventory";
    return this.http.post<any>(APIurl, JSON.stringify(inventory)).pipe(
      map((response) => {
        return response;
      }),
      catchError(this.handleError)
    );
  }

  getSuppliersByCategory(inventory) {
    let APIurl = this.BaseAPIurl + "get-suppliers-by-category";
    return this.http.post<any>(APIurl, JSON.stringify(inventory)).pipe(
      map((response) => {
        return response;
      }),
      catchError(this.handleError)
    );
  }

  // Edit Inventory
  editInventory(inventory) {
    let APIurl = this.BaseAPIurl + "edit-inventory";

    return this.http.post<any>(APIurl, JSON.stringify(inventory)).pipe(
      map((response) => {
        return response;
      }),
      catchError(this.handleError)
    );
  }

  // Item detail api calls
  // Get Item Detail
  findItemDetail(id) {
    let APIurl = this.ItemDetailAPIurl + "get-item-detail";
    return this.http.get<any>(APIurl + "?id=" + id).pipe(
      map((response) => {
        return response;
      }),
      catchError(this.handleError)
    );
  }
  // Edit Item Deitail
  editItemDetail(item) {
    console.log(item);
    let APIurl = this.ItemDetailAPIurl + "edit-item-details";

    return this.http.post<any>(APIurl, JSON.stringify(item)).pipe(
      map((response) => {
        return response;
      }),
      catchError(this.handleError)
    );
  }

  // Item Deitail
  createItemDetail(item) {
    let APIurl = this.ItemDetailAPIurl + "create-item-detail";
    return this.http.post<any>(APIurl, JSON.stringify(item)).pipe(
      map((response) => {
        return response;
      }),
      catchError(this.handleError)
    );
  }

  updateProductImage(obj) {
    let APIurl = this.BaseAPIurl + "update-product-image";
    return this.http.post<any>(APIurl, JSON.stringify(obj)).pipe(
      map((response) => {
        return response;
      }),
      catchError(this.handleError)
    );
  }

  editAvailability(obj) {
    let APIurl = this.ItemDetailAPIurl + "update-products-by-stores";
    return this.http.post<any>(APIurl, JSON.stringify(obj)).pipe(
      map((response) => {
        return response;
      }),
      catchError(this.handleError)
    );
  }

  getProductDetailsByCategory(obj) {
    let APIurl = this.ItemDetailAPIurl + "get-available-menu-items-by-category";
    return this.http.post<any>(APIurl, obj).pipe(
      map((response) => {
        return response;
      }),
      catchError(this.handleError)
    );
  }

  public uploadImage(image: File): Observable<Response> {
    const formData = new FormData();

    formData.append("image", image);

    return this.http.post<any>(
      "http://localhost:1337/api/v1/inventory/upload-image",
      formData
    );
  }
}
