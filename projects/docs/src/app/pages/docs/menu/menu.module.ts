import { MenuModule, TransitionModule } from 'projects/ngx-headlessui/src/public-api';

import { CommonModule } from '@angular/common';
import { DocumentationComponent } from './components/documentation/documentation.component';
import { ExamplesComponent } from './components/examples/examples.component';
import { MarkdownModule } from 'ngx-markdown';
import { MenuRoutingModule } from './menu-routing.module';
import { NgModule } from '@angular/core';
import { PreviewModule } from '../../../components/preview/preview.module';
import { SimpleMenuComponent } from './demos/simple-menu/simple-menu.component';
import { TailwindMenuComponent } from './demos/tailwind-menu/tailwind-menu.component';
import { TailwindMenuTransitionNgTemplateComponent } from './demos/tailwind-menu-transition-ng-template/tailwind-menu-transition-ng-template.component';

@NgModule({
  declarations: [DocumentationComponent, ExamplesComponent, SimpleMenuComponent, TailwindMenuComponent, TailwindMenuTransitionNgTemplateComponent],
  imports: [
    CommonModule,
    MenuRoutingModule,
    MenuModule,
    TransitionModule,
    PreviewModule,
    MarkdownModule
  ]
})
export class DocsMenuModule { }
