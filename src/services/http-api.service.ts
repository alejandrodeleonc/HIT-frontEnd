import { Injectable, Pipe } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { CrudG } from './crudG';
@Injectable({
  providedIn: 'root',
})
export class HttpApiService {
  mantenimiento: CrudG<any>;
  auth: CrudG<any>;
  home: CrudG<any>;
  constructor(private http: HttpClient) {
    this.mantenimiento = new CrudG<any>('mantenimiento', this);
    this.auth = new CrudG<any>('auth', this);
    this.home = new CrudG<any>('', this);
  }

  request({
    endpoint,
    method,
    data,
  }: {
    endpoint: any;
    method: string;
    data?: any;
  }): Observable<any> {
    let ovb: Observable<any> = new Observable<any>();
    switch (method.toUpperCase()) {
      case 'GET':
        ovb = this.http.get(`${environment.sever_url}/${endpoint}`).pipe(
          map((val) => {
            return val;
          })
        );
        break;
      case 'DELETE':
        ovb = this.http.delete(`${environment.sever_url}/${endpoint}`).pipe(
          map((val) => {
            return val;
          })
        );
        break;
      case 'POST':
        ovb = this.http.post(`${environment.sever_url}/${endpoint}`, data).pipe(
          map((val) => {
            return val;
          })
        );
        break;
      case 'PATCH':
        ovb = this.http
          .patch(`${environment.sever_url}/${endpoint}`, data)
          .pipe(
            map((val) => {
              return val;
            })
          );
        break;
    }
    return ovb;
  }
}
