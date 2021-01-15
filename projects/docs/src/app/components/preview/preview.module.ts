import { CommonModule } from '@angular/common';
import { HighlightModule } from 'ngx-highlightjs';
import { NgModule } from '@angular/core';
import { PreviewComponent } from './preview.component';

@NgModule({
  declarations: [PreviewComponent],
  imports: [
    CommonModule,
    HighlightModule
  ],
  exports: [
    PreviewComponent
  ]
})
export class PreviewModule { }
