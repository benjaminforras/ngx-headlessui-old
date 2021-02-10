import { CommonModule } from '@angular/common';
import { DocumentationComponent } from './components/documentation/documentation.component';
import { ExamplesComponent } from './components/examples/examples.component';
import { MarkdownModule } from 'ngx-markdown';
import { NgModule } from '@angular/core';
import { PreviewModule } from '../../../components/preview/preview.module';
import { SimpleSwitchComponent } from './demos/simple-switch/simple-switch.component';
import { SwitchModule } from 'projects/ngx-headlessui/src/public-api';
import { SwitchRoutingModule } from './switch-routing.module';

@NgModule({
  declarations: [DocumentationComponent, ExamplesComponent, SimpleSwitchComponent],
  imports: [
    CommonModule,
    SwitchRoutingModule,
    SwitchModule,
    MarkdownModule,
    PreviewModule
  ]
})
export class DocsSwitchModule { }
