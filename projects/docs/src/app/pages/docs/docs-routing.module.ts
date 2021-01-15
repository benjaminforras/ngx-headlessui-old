import { RouterModule, Routes } from '@angular/router';

import { DocsLayoutComponent } from './docs-layout/docs-layout.component';
import { NgModule } from '@angular/core';

const routes: Routes = [
  {
    path: 'menu',
    loadChildren: () => import('./menu/menu.module').then(m => m.DocsMenuModule),
    component: DocsLayoutComponent
  },
  {
    path: 'transition',
    loadChildren: () => import('./transition/transition.module').then(m => m.DocsTransitionModule),
    component: DocsLayoutComponent
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: '/docs/menu'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DocsRoutingModule { }
