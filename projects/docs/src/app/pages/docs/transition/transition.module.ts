import { CommonModule } from '@angular/common';
import { DocumentationComponent } from './components/documentation/documentation.component';
import { ExamplesComponent } from './components/examples/examples.component';
import { MarkdownModule } from 'ngx-markdown';
import { MenuTransitionComponent } from './demos/menu-transition/menu-transition.component';
import { NgModule } from '@angular/core';
import { PreviewModule } from '../../../components/preview/preview.module';
import { SimpleTransitionComponent } from './demos/simple-transition/simple-transition.component';
import { TransitionModule } from 'projects/ngx-headlessui/src/public-api';
import { TransitionRoutingModule } from './transition-routing.module';

@NgModule({
  declarations: [DocumentationComponent, ExamplesComponent, SimpleTransitionComponent, MenuTransitionComponent],
  imports: [
    CommonModule,
    TransitionRoutingModule,
    TransitionModule,
    MarkdownModule,
    PreviewModule
  ]
})
export class DocsTransitionModule { }
