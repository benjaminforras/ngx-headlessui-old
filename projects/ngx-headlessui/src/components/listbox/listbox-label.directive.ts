import { Directive, forwardRef, HostListener, Inject } from '@angular/core';
import { useId } from '../../utils/use-id';
import { ListboxComponent } from './listbox.component';

@Directive({
  selector: '[ListboxLabel]',
  host: {
    '[attr.id]': 'id',
    '[attr.ref]': '"el"'
  }
})
export class ListboxLabelDirective {
  id = `headlessui-listbox-label-${useId()}`;

  constructor(@Inject(forwardRef(() => ListboxComponent)) private listbox: any) { }

  @HostListener('click')
  onClick(): void {
    this.listbox.buttonRef?.focus({ preventScroll: true });
  }
}
