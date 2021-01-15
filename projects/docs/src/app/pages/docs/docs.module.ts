import { CommonModule } from '@angular/common';
import { DocsLayoutComponent } from './docs-layout/docs-layout.component';
import { DocsRoutingModule } from './docs-routing.module';
import { NgModule } from '@angular/core';
import { TransitionModule } from 'projects/ngx-headlessui/src/public-api';

@NgModule({
  declarations: [DocsLayoutComponent],
  imports: [
    CommonModule,
    DocsRoutingModule,
    TransitionModule,
  ]
})
export class DocsModule { }
