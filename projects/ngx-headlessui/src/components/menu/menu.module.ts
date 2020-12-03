import { CommonModule } from '@angular/common';
import { MenuComponent } from './menu.component';
import { NgModule } from '@angular/core';

@NgModule({
  declarations: [MenuComponent],
  imports: [
    CommonModule
  ],
  exports: [MenuComponent]
})
export class MenuModule { }
