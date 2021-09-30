import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { throwError } from "rxjs";
import { catchError, map } from "rxjs/operators";
import { GlobalVariable } from "./globals";

@Injectable({
  providedIn: "root",
})
export class ReportService {
  private BaseAPIurl = GlobalVariable.BaseUrl.concat("api/v1/reports/");
  constructor(private http: HttpClient) {}

  private handleError(error: HttpErrorResponse | any) {
    console.error("ReportsService::handleError", error);
    return throwError(error);
  }

  inventoryReport(data) {
    const APIurl = this.BaseAPIurl.concat("inventory-report");
    return this.http.post<any>(APIurl, data).pipe(
      map((response) => {
        return response;
      }),
      catchError(this.handleError)
    );
  }
}
