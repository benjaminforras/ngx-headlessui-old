import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SwitchComponent } from './switch.component';
import { SwitchGroupDirective } from './switch-group.directive';
import { SwitchLabelDirective } from './switch-label.directive';

@NgModule({
  declarations: [SwitchComponent, SwitchGroupDirective, SwitchLabelDirective],
  imports: [
    CommonModule
  ],
  exports: [SwitchComponent, SwitchGroupDirective, SwitchLabelDirective]
})
export class SwitchModule { }
