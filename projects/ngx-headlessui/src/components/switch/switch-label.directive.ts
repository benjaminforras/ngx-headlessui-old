import { Directive, ElementRef, forwardRef, HostListener, Inject } from '@angular/core';
import { useId } from '../../utils/use-id';
import { SwitchGroupDirective } from './switch-group.directive';

@Directive({
  selector: '[ngx-switch-label], [switch-label]',
  host: {
    '[attr.id]': 'id'
  }
})
export class SwitchLabelDirective {
  id = `headlessui-switch-label-${useId()}`;

  constructor(@Inject(forwardRef(() => SwitchGroupDirective)) public switchGroup: any, elementRef: ElementRef) {
    this.switchGroup.dataRef.labelRef = elementRef.nativeElement;
   }

   @HostListener('pointerup')
   handlePointerUp(): void {
    this.switchGroup.dataRef.switchRef?.click();
    this.switchGroup.dataRef.switchRef?.focus({ preventScroll: true });
  }
}
