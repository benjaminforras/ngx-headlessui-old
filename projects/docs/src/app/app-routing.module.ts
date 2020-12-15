import { RouterModule, Routes } from '@angular/router';

import { IndexComponent } from './pages/index/index.component';
import { NgModule } from '@angular/core';
import { NgxMenuPageComponent } from './pages/ngx-menu-page/ngx-menu-page.component';
import { NgxTransitionPageComponent } from './pages/ngx-transition-page/ngx-transition-page.component';
import { TestComponent } from './pages/test/test.component';

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
    path: '',
    component: IndexComponent
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: '/'
  }
];

const testRoutes: Routes = [
  {
    path: 'test',
    component: TestComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot([...routes, ...testRoutes], { scrollPositionRestoration: 'enabled' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
