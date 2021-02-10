import { CommonModule } from '@angular/common';
import { HeadlessComponentDirective } from './headless-component.directive';
import { NgModule } from '@angular/core';

@NgModule({
  declarations: [
    HeadlessComponentDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    HeadlessComponentDirective
  ]
})
export class HeadlessComponentModule { }
