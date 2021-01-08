import { CommonModule } from '@angular/common';
import { MenuButtonDirective } from './menu-button.directive';
import { MenuComponent } from './menu.component';
import { MenuItemComponent } from './menu-item.component';
import { MenuItemsDirective } from './menu-items.directive';
import { NgModule } from '@angular/core';

@NgModule({
  declarations: [
    MenuComponent,
    MenuItemsDirective,
    MenuItemComponent,
    MenuButtonDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    MenuComponent,
    MenuItemsDirective,
    MenuItemComponent,
    MenuButtonDirective
  ],
})
export class MenuModule { }
