import { RouterModule, Routes } from '@angular/router';

import { DocumentationComponent } from './components/documentation/documentation.component';
import { ExamplesComponent } from './components/examples/examples.component';
import { NgModule } from '@angular/core';

const routes: Routes = [
  {
    path: '',
    component: DocumentationComponent
  },
  {
    path: 'examples',
    component: ExamplesComponent
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
export class MenuRoutingModule { }
