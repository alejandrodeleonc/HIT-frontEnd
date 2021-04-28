import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { SharedRoutingModule } from './shared.routing';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from './register/register.component';


const components = [HeaderComponent,
  FooterComponent, LoginComponent, RegisterComponent]

@NgModule({
  declarations: components,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    SharedRoutingModule
  ],
  exports: components
})
export class SharedModule { }
