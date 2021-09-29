import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { catchError, map } from "rxjs/operators";
import { GlobalVariable } from "./globals";

@Injectable({
  providedIn: "root",
})
export class FeedbackService {
  private BaseAPIurl = GlobalVariable.BaseUrl + "api/v1/feedbacks/";

  constructor(private http: HttpClient) {}

  private handleError(error: HttpErrorResponse | any) {
    console.error("FeedbacksService::handleError", error);
    return Observable.throw(error);
  }

  addFeedback(data) {
    let APIurl = this.BaseAPIurl + "add-feedback";
    return this.http.post<any>(APIurl, data).pipe(
      map((response) => {
        return response;
      }),
      catchError(this.handleError)
    );
  }
  getFeedbacks() {
    let APIurl = this.BaseAPIurl + "get-all-feedbacks";
    return this.http.get<any>(APIurl).pipe(
      map((response) => {
        return response;
      }),
      catchError(this.handleError)
    );
  }

  editFeedbacks(data) {
    let APIurl = this.BaseAPIurl + "edit-feedback";
    return this.http.post<any>(APIurl, data).pipe(
      map((response) => {
        return response;
      }),
      catchError(this.handleError)
    );
  }

  deleteFeedbacks(data) {
    let APIurl = this.BaseAPIurl + "delete-feedbacks";
    return this.http.post<any>(APIurl, data).pipe(
      map((response) => {
        return response;
      }),
      catchError(this.handleError)
    );
  }
}
