import { AfterViewInit, Directive, ElementRef, forwardRef, HostListener, Inject } from '@angular/core';
import { Focus } from '../../utils/calculate-active-index';
import { Keys } from '../../utils/keyboard';
import { useId } from '../../utils/use-id';
import { ListboxStates } from './listbox-states.enum';
import { ListboxComponent } from './listbox.component';

function nextFrame(cb: () => void) {
  requestAnimationFrame(() => requestAnimationFrame(cb));
}

@Directive({
  selector: '[ListboxButton]',
  host: {
    '[attr.ref]': '"el"',
    '[attr.id]': 'id',
    '[attr.type]': '"button"',
    '[attr.aria-haspopup]': 'true',
    '[attr.aria-controls]': 'listbox.optionsRef?.id',
    '[attr.aria-expanded]': "listbox.listboxState.value === 'Open' ? true : undefined",
    '[attr.aria-labelledby]': "listbox.labelRef  ? [listbox.labelRef.id, id].join(' ') : undefined",
    '[attr.disabled]': 'listbox.disabled ? listbox.disabled : undefined'
  }
})
export class ListboxButtonDirective implements AfterViewInit {
  id = `headlessui-listbox-button-${useId()}`;

  constructor(@Inject(forwardRef(() => ListboxComponent)) public listbox: any, private elementRef: ElementRef) { }

  ngAfterViewInit(): void {
    this.listbox.buttonRef = this.elementRef.nativeElement;
  }

  @HostListener('keydown', ['$event'])
  onKeydown(event: KeyboardEvent): void {
    switch (event.key) {
      // Ref: https://www.w3.org/TR/wai-aria-practices-1.2/#keyboard-interaction-13

      case Keys.Space:
      case Keys.Enter:
      case Keys.ArrowDown:
        event.preventDefault();
        this.listbox.openListbox();
        setTimeout(() => {
          this.listbox.optionsRef?.focus({ preventScroll: true });
          if (!this.listbox.value) this.listbox.goToOption(Focus.First);
        });
        break;

      case Keys.ArrowUp:
        event.preventDefault();
        this.listbox.openListbox();
        setTimeout(() => {
          this.listbox.optionsRef?.focus({ preventScroll: true });
          if (!this.listbox.value) this.listbox.goToOption(Focus.Last);
        });
        break;
    }
  }

  @HostListener('click', ['$event'])
  onClick(event: MouseEvent): void {
    if (this.listbox.disabled) return;
    if (this.listbox.listboxState.value === ListboxStates.Open) {
      this.listbox.closeListbox();
      setTimeout(() => this.listbox.buttonRef?.focus({ preventScroll: true }));
    } else {
      event.preventDefault();
      this.listbox.openListbox();
      nextFrame(() => this.listbox.optionsRef?.focus({ preventScroll: true }));
    }
  }
}
