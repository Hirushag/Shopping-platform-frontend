import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { GlobalVariable } from "./globals";
import { map, catchError } from "rxjs/operators";
import { Observable } from "rxjs";

@Injectable({ providedIn: "root" })
export class UserService {
  private BaseAPIurl = GlobalVariable.BaseUrl + "api/v1/user/";

  constructor(private http: HttpClient) {}

  // error checking handler for api response and trigger errors
  private handleError(error: HttpErrorResponse | any) {
    console.error("UserService::handleError", error);
    return Observable.throw(error);
  }

  // Get All Users
  getAll() {
    let APIurl = this.BaseAPIurl + "get-all-users";
    return this.http.get<any>(APIurl).pipe(
      map((response) => {
        return response;
      }),
      catchError(this.handleError)
    );
  }

  // Get Staff member detail
  findStaffUser(id) {
    let APIurl = this.BaseAPIurl + "get-user";
    return this.http.get<any>(APIurl + "?id=" + id).pipe(
      map((response) => {
        return response;
      }),
      catchError(this.handleError)
    );
  }

  // Create System User
  createUser(user) {
    let APIurl = this.BaseAPIurl + "create-user";
    return this.http.post<any>(APIurl, JSON.stringify(user)).pipe(
      map((response) => {
        return response;
      }),
      catchError(this.handleError)
    );
  }

  // Edit System User
  editUser(user) {
    let APIurl = this.BaseAPIurl + "edit-user";
    return this.http.post<any>(APIurl, JSON.stringify(user)).pipe(
      map((response) => {
        return response;
      }),
      catchError(this.handleError)
    );
  }

  // Master Reset  User Password
  masterResetUserPassword(id, password) {
    let APIurl = this.BaseAPIurl + "reset-password";
    return this.http
      .post<any>(APIurl, JSON.stringify({ id: id, password: password }))
      .pipe(
        map((response) => {
          return response;
        }),
        catchError(this.handleError)
      );
  }

  createUserRole(role) {
    let APIurl = this.BaseAPIurl + "create-user-role";
    return this.http.post<any>(APIurl, JSON.stringify(role)).pipe(
      map((response) => {
        return response;
      }),
      catchError(this.handleError)
    );
  }

  // Get All User Roles
  getAllUserRoles() {
    let APIurl = this.BaseAPIurl + "get-all-user-roles";
    return this.http.get<any>(APIurl).pipe(
      map((response) => {
        return response;
      }),
      catchError(this.handleError)
    );
  }
  // Get user permissions
  getPermissionsByUser(id) {
    let APIurl = this.BaseAPIurl + "get-permissions-by-user";
    return this.http.get<any>(APIurl + "?id=" + id).pipe(
      map((response) => {
        return response;
      }),
      catchError(this.handleError)
    );
  }

  // update User Permissions
  setPermission(data) {
    let APIurl = this.BaseAPIurl + "update-permission";
    return this.http.post<any>(APIurl, JSON.stringify(data)).pipe(
      map((response) => {
        return response;
      }),
      catchError(this.handleError)
    );
  }

  // update User Role Permissions
  setRolePermission(data) {
    let APIurl = this.BaseAPIurl + "update-user-role-permission";
    return this.http.post<any>(APIurl, JSON.stringify(data)).pipe(
      map((response) => {
        return response;
      }),
      catchError(this.handleError)
    );
  }

  getPermissionsByUserRole(obj) {
    let APIurl = this.BaseAPIurl + "get-permissions-by-user-role";
    return this.http.post<any>(APIurl, JSON.stringify(obj)).pipe(
      map((response) => {
        return response;
      }),
      catchError(this.handleError)
    );
  }

  // Get  permission Groups
  getPermissionGroupsByUserLevel(id) {
    let APIurl = this.BaseAPIurl + "get-permission-groups-by-userlevel";
    return this.http.get<any>(APIurl + "?userlevel=" + id).pipe(
      map((response) => {
        return response;
      }),
      catchError(this.handleError)
    );
  }

  // update Permissions Group
  setPermissionGroup(data) {
    let APIurl = this.BaseAPIurl + "update-permission-groups";
    return this.http.post<any>(APIurl, JSON.stringify(data)).pipe(
      map((response) => {
        return response;
      }),
      catchError(this.handleError)
    );
  }
}
