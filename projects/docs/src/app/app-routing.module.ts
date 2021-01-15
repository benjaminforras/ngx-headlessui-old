import { RouterModule, Routes } from '@angular/router';

import { IndexComponent } from './pages/index/index.component';
import { NgModule } from '@angular/core';
import { TestComponent } from './pages/test/test.component';

const routes: Routes = [
  {
    path: 'docs',
    loadChildren: () => import('./pages/docs/docs.module').then((m) => m.DocsModule)
  },
  {
    path: 'test',
    component: TestComponent
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

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
