import { CommonModule } from '@angular/common';
import { ListboxButtonDirective } from './listbox-button.directive';
import { ListboxComponent } from './listbox.component';
import { ListboxLabelDirective } from './listbox-label.directive';
import { ListboxOptionComponent } from './listbox-option.component';
import { ListboxOptionsDirective } from './listbox-options.directive';
import { NgModule } from '@angular/core';

@NgModule({
  declarations: [
    ListboxComponent,
    ListboxOptionComponent,
    ListboxOptionsDirective,
    ListboxButtonDirective,
    ListboxLabelDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ListboxComponent,
    ListboxOptionComponent,
    ListboxOptionsDirective,
    ListboxButtonDirective,
    ListboxLabelDirective
  ]
})
export class ListboxModule { }
