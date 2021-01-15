import { Component, ContentChild, ElementRef, EventEmitter, forwardRef, HostListener, Inject, Output, TemplateRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Keys } from '../../utils/keyboard';
import { useId } from '../../utils/use-id';
import { SwitchGroupDirective } from './switch-group.directive';


@Component({
  selector: 'ngx-switch, switch, [switch]',
  templateUrl: './switch.component.html',
  host: {
    '[attr.id]': 'id',
    '[attr.role]': '"switch"',
    '[attr.tabIndex]': '0',
    '[attr.aria-checked]': 'value',
    '[attr.aria-labelledby]': 'switchGroup.dataRef.labelRef?.id',
  },
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SwitchComponent),
      multi: true
    }
  ]
})
export class SwitchComponent implements ControlValueAccessor {

  id = `headlessui-switch-${useId()}`;
  value: boolean = false;

  @ContentChild(TemplateRef)
  templateRef!: TemplateRef<any>;

  @Output()
  change: EventEmitter<boolean> = new EventEmitter<boolean>();

  propagateChange = (_: any) => { };

  constructor(@Inject(forwardRef(() => SwitchGroupDirective)) public switchGroup: any, elementRef: ElementRef) {
    this.switchGroup.dataRef.switchRef = elementRef.nativeElement;
  }

  toggle(): void {
    this.value = !this.value;
    this.change.emit(this.value);
  }

  @HostListener('click', ['$event'])
  handleClick(event: MouseEvent) {
    event.preventDefault();
    this.toggle();
  }

  @HostListener('onkeyup', ['$event'])
  handleKeyUp(event: KeyboardEvent) {
    if (event.key !== Keys.Tab) event.preventDefault();
    if (event.key === Keys.Space) this.toggle();
  }

  @HostListener('onkeydown', ['$event'])
  handleKeyPress(event: KeyboardEvent) {
    event.preventDefault();
  }

  writeValue(obj: any): void {
    this.value = obj;
  }

  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }

  registerOnTouched(fn: any): void {

  }
}
