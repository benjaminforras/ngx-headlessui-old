import { RouterModule, Routes } from '@angular/router';

import { NgModule } from '@angular/core';
import { NgxMenuPageComponent } from './pages/ngx-menu-page/ngx-menu-page.component';
import { NgxTransitionPageComponent } from './pages/ngx-transition-page/ngx-transition-page.component';

const routes: Routes = [
  {
    path: 'menu',
    component: NgxMenuPageComponent
  },
  {
    path: 'transition',
    component: NgxTransitionPageComponent
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: '/menu'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
