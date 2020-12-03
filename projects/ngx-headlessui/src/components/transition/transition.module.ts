import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TransitionComponent } from './transition.component';



@NgModule({
  declarations: [TransitionComponent],
  imports: [
    CommonModule
  ],
  exports: [TransitionComponent]
})
export class TransitionModule { }
