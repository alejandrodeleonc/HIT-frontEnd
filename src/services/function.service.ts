import { Injectable, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root',
})
export class FunctionService {

  private currentUser: any;

  constructor(private router: Router) {}

  public toasError(mensaje: string, timeInSeg?: number): void {
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: timeInSeg ? timeInSeg * 1000 : 3000,
      timerProgressBar: true,
    });

    Toast.fire({
      icon: 'error',
      background: 'rgb(244,173,192)',
      title: mensaje,
    });
  }

  public toasSuccess(mensaje: string, timeInSeg?: number): void {
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: timeInSeg ? timeInSeg * 1000 : 3000,
      timerProgressBar: true,
    });

    Toast.fire({
      icon: 'success',
      background: 'rgb(173,244,215)',
      title: mensaje,
    });
  }
  public toasWarning(mensaje: string, timeInSeg?: number): void {
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: timeInSeg ? timeInSeg * 1000 : 3000,
      timerProgressBar: true,
    });

    Toast.fire({
      icon: 'warning',
      background: '#f6c23e',
      iconColor: 'white',
      title: mensaje,
    });
  }

  getUser() {
    return this.currentUser;
  }

  setUser(user:any){
    this.currentUser = user;
  }

  public getToken(): string {
    return localStorage.getItem('token') || 'null';
  }

  public redirectToLogin(): void {
    localStorage.removeItem('token');
    this.router.navigateByUrl('/auth/login');
  }
}
