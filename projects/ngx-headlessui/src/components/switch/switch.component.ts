import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ContentChild, ElementRef, EventEmitter, forwardRef, HostListener, Inject, Optional, Output, TemplateRef, ViewEncapsulation } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Keys } from '../../utils/keyboard';
import { useId } from '../../utils/use-id';
import { SwitchGroupDirective } from './switch-group.directive';


@Component({
  selector: 'ngx-switch, switch, [Switch]',
  templateUrl: './switch.component.html',
  host: {
    '[attr.id]': 'id',
    '[attr.role]': '"switch"',
    '[attr.tabIndex]': '0',
    '[attr.aria-checked]': 'value',
    '[attr.aria-labelledby]': 'switchGroup ? switchGroup.dataRef.labelRef?.id : undefined',
    '[attr.aria-describedby]': 'switchGroup ? switchGroup.dataRef.descriptionRef?.id : undefined',
  },
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SwitchComponent),
      multi: true
    }
  ],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SwitchComponent implements ControlValueAccessor {

  id = `headlessui-switch-${useId()}`;
  value: boolean = false;

  @ContentChild(TemplateRef)
  templateRef!: TemplateRef<any>;

  @Output()
  change: EventEmitter<boolean> = new EventEmitter<boolean>();

  propagateChange = (_: any) => { };

  constructor(@Optional() @Inject(forwardRef(() => SwitchGroupDirective)) public switchGroup: any, elementRef: ElementRef, private changeDetection: ChangeDetectorRef) {
    if(this.switchGroup) {
      this.switchGroup.dataRef.switchRef = elementRef.nativeElement;
    }
  }

  toggle(): void {
    this.value = !this.value;
    this.change.emit(this.value);
    this.changeDetection.detectChanges();
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
