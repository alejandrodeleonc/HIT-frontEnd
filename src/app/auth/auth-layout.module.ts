import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthLayoutComponent } from './auth-layout.component';
import { AuthLayoutRoutingModule } from './auth-layout.routing';
import { LoginComponent } from 'src/shared/login/login.component';
import { SharedModule } from 'src/shared/shared.module';


@NgModule({
  declarations: [
    AuthLayoutComponent
  ],
  imports: [
    CommonModule,
    AuthLayoutRoutingModule,
    SharedModule
  ]
})
export class AuthLayoutModule { }
