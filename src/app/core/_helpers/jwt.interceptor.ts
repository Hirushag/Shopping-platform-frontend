import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add authorization header with jwt token if available
        let currentUser = JSON.parse(localStorage.getItem('currentUser'));

        if (currentUser && currentUser.token) {
            request = request.clone({
                // headers: new HttpHeaders({
                //     'Content-Type':  'application/json',
                //     'Access-Control-Allow-Headers': 'Content-Type, Authorization',
                //     // 'Access-Control-Allow-Origin': '*',
                //     'Authorization': `Bearer ${currentUser.token}`
                //   })
                setHeaders: {
                    Authorization: `Bearer ${currentUser.token}`
                }
            });
        }

        return next.handle(request);
    }
}