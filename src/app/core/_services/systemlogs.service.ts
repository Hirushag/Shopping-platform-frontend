import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { catchError, map } from "rxjs/operators";
import { GlobalVariable } from "./globals";

@Injectable({
  providedIn: "root",
})
export class SystemlogsService {
  private BaseAPIurl = GlobalVariable.BaseUrl + "api/v1/system-logs/";

  constructor(private http: HttpClient) {}

  private handleError(error: HttpErrorResponse | any) {
    console.error("SystemLogsService::handleError", error);
    return Observable.throw(error);
  }

  getAll() {
    let APIurl = this.BaseAPIurl + "get-all-system-logs";
    return this.http.get<any>(APIurl).pipe(
      map((response) => {
        return response;
      }),
      catchError(this.handleError)
    );
  }
}
