import { NgModule, LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app.routing';
import { AppComponent } from './app.component';
import { HttpApiService } from 'src/services/http-api.service';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { InterceptorService } from 'src/services/interceptor.service';
import { LayoutModule } from './layout/layout.module';
import { AuthLayoutModule } from './auth/auth-layout.module';


@NgModule({
  declarations: [
    AppComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LayoutModule,
    HttpClientModule,
    AuthLayoutModule
  ],
  providers: [HttpApiService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorService,
      multi: true,
    },
    { provide: LOCALE_ID, useValue: 'es' },],
  bootstrap: [AppComponent]
})
export class AppModule { }
