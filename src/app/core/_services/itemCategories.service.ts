import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { GlobalVariable } from "./globals";
import { map, catchError } from "rxjs/operators";
import { Observable } from "rxjs";

@Injectable({ providedIn: "root" })
export class ItemCategoriesService {
  private BaseAPIurl = GlobalVariable.BaseUrl + "api/v1/itemCategories/";

  constructor(private http: HttpClient) {}

  // error checking handler for api response and trigger errors
  private handleError(error: HttpErrorResponse | any) {
    console.error("ItemCategoriesService::handleError", error);
    return Observable.throw(error);
  }

  // Get All Item Categories
  getAll() {
    let APIurl = this.BaseAPIurl + "get-all-categories";
    return this.http.get<any>(APIurl).pipe(
      map((response) => {
        return response;
      }),
      catchError(this.handleError)
    );
  }

  // Get Category details
  findCategory(id) {
    let APIurl = this.BaseAPIurl + "get-category";
    return this.http.get<any>(APIurl + "?id=" + id).pipe(
      map((response) => {
        return response;
      }),
      catchError(this.handleError)
    );
  }

  // Create category
  createCategory(category) {
    const APIurl = this.BaseAPIurl.concat("add-category");
    return this.http.post<any>(APIurl, category).pipe(
      map((response) => {
        return response;
      }),
      catchError(this.handleError)
    );
  }

  //delete Category
  deleteCategory(category) {
    const APIurl = this.BaseAPIurl.concat("delete-sub-categories");
    return this.http.post<any>(APIurl, category).pipe(
      map((response) => {
        return response;
      }),
      catchError(this.handleError)
    );
  }

  // Edit Category
  editCategory(category) {
    const APIurl = this.BaseAPIurl.concat("edit-category");
    return this.http.post<any>(APIurl, category).pipe(
      map((response) => {
        return response;
      }),
      catchError(this.handleError)
    );
  }

  // Create sub category
  createSubCategory(category) {
    const APIurl = this.BaseAPIurl.concat("add-sub-category");
    return this.http.post<any>(APIurl, category).pipe(
      map((response) => {
        return response;
      }),
      catchError(this.handleError)
    );
  }

  //edit subCategory
  editSubCategory(category) {
    const APIurl = this.BaseAPIurl.concat("edit-sub-category");
    return this.http.post<any>(APIurl, category).pipe(
      map((response) => {
        return response;
      }),
      catchError(this.handleError)
    );
  }

  // Get all sub categories
  getAllSubCategories(category) {
    const APIurl = this.BaseAPIurl.concat("get-all-sub-categories");
    return this.http.post<any>(APIurl, category).pipe(
      map((response) => {
        return response;
      }),
      catchError(this.handleError)
    );
  }

  updateSort(obj) {
    const APIurl = this.BaseAPIurl.concat("update-category-sort-order");
    return this.http.post<any>(APIurl, obj).pipe(
      map((response) => {
        return response;
      }),
      catchError(this.handleError)
    );
  }
}
