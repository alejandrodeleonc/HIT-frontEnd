import { Router } from '@angular/router';

import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

import { catchError, tap, map, finalize } from 'rxjs/operators';
import { FunctionService } from './function.service';
import { HttpApiService } from './http-api.service';


@Injectable({
  providedIn: 'root',
})
export class InterceptorService {
  constructor(private fun: FunctionService, private requests: HttpApiService, private router: Router) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {


    const token: any = localStorage.getItem('token');
    // //console.log('token --> ', token);

    if (token) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      });
    } else {
      const ruta = window.location.pathname;
      const ruta_split = ruta.split('/');
      //console.log('ruta --> ', ruta_split);

      // if (ruta_split[1] !== 'auth') {
      //   this.fun.redirectToLogin();
      // }
    }

    return next.handle(request).pipe(
      // catchError((response: HttpErrorResponse) => {
      //   // this.spin.hide();

      //   //console.log("respuesta ->", response)

      //   if(response.error){
      //     if(response.error.msg){
      //       //console.log(response);
      //       this.fun.toasError(response.error.msg);
      //     }else{
      //       //console.log(response);
      //       this.fun.toasError(response.error);
      //     }
      //   }
      //   if (response.status === 401) {
      //     this.fun.showSpinner(false);
      //     // Do something here
      //     // Do something here
      //   }
      //   return throwError(response);
      // }),
      // finalize(() =>),
    );
  }
}
