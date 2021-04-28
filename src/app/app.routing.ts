import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RedirectComponent } from 'src/shared/redirect/redirect.component';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('src/app/layout/layout.module').then((m) => m.LayoutModule),
  },
  {
    path: 'auth',
    loadChildren: () => import('src/app/auth/auth-layout.module').then((m) => m.AuthLayoutModule),
  },
  {
    path: ':shortURl',
    component: RedirectComponent
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
