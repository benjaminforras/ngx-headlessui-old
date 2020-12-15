import { MenuButtonDirective, MenuComponent, MenuItemDirective, MenuItemsDirective } from './headlessmenu';

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

@NgModule({
  declarations: [
    MenuComponent,
    MenuItemsDirective,
    MenuItemDirective,
    MenuButtonDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    MenuComponent,
    MenuItemsDirective,
    MenuItemDirective,
    MenuButtonDirective
  ]
})
export class HeadlessMenuModule { }
