import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { LayoutComponent } from './layout.component';
import { SharedModule } from 'src/shared/shared.module';
import { LayoutRoutingModule } from './layout.routing';


@NgModule({
  declarations: [
    LayoutComponent
  ],
  imports: [
    CommonModule,
    LayoutRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule
  ]

})
export class LayoutModule { }
