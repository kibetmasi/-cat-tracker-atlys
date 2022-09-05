import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs';

@Injectable()
export class ServerErrorInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      return next.handle(request).pipe(
        retry(1),
        catchError((error:HttpErrorResponse) =>{
          if (error.status === 404){
            return throwError(error.message)
          } else {
            return throwError(error)
          }
        })
      )
    }
  }
  