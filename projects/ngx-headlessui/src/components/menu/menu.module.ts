import { CommonModule } from '@angular/common';
import { MenuComponent } from './menu.component';
import { NgModule } from '@angular/core';
import { TransitionModule } from './../transition/transition.module';

@NgModule({
  declarations: [MenuComponent],
  imports: [
    CommonModule,
    TransitionModule
  ],
  exports: [MenuComponent]
})
export class MenuModule { }
