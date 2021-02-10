import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SwitchComponent } from './switch.component';
import { SwitchDescriptionDirective } from './switch-description.directive';
import { SwitchGroupDirective } from './switch-group.directive';
import { SwitchLabelDirective } from './switch-label.directive';

@NgModule({
  declarations: [SwitchComponent, SwitchGroupDirective, SwitchLabelDirective, SwitchDescriptionDirective],
  imports: [
    CommonModule
  ],
  exports: [SwitchComponent, SwitchGroupDirective, SwitchLabelDirective, SwitchDescriptionDirective]
})
export class SwitchModule { }
