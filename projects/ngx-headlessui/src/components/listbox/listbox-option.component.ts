import { AfterViewInit, Component, ContentChild, ElementRef, forwardRef, HostListener, Inject, Input, OnDestroy, OnInit, TemplateRef, ViewEncapsulation } from '@angular/core';
import { Focus } from '../../utils/calculate-active-index';
import { useId } from '../../utils/use-id';
import { ListboxOptionDataRef } from './listbox-option.data-ref';
import { ListboxComponent } from './listbox.component';


@Component({
  selector: 'ListboxOption, [ListboxOption]',
  templateUrl: './listbox-option.component.html',
  encapsulation: ViewEncapsulation.None,
  host: {
    '[attr.id]': 'id',
    '[attr.role]': '"option"',
    '[attr.tabIndex]': '-1',
    '[attr.aria-disabled]': '_disabled ? true : undefined',
    '[attr.aria-selected]': 'selected ? selected : undefined',
  }
})
export class ListboxOptionComponent implements OnInit, AfterViewInit, OnDestroy {
  @ContentChild(TemplateRef)
  template!: TemplateRef<any>;

  id = `headlessui-listbox-option-${useId()}`;

  @Input()
  set disabled(value: boolean | string | undefined) {
    if (value || value === '') {
      this._disabled = true;
    } else {
      this._disabled = false;
    }
  }
  _disabled!: boolean;

  get selected() {
    return this.listbox.value === this.value;
  }

  get active(): boolean {
    return this.listbox.activeOptionIndex !== null ? this.listbox.options[this.listbox.activeOptionIndex].id === this.id : false
  }

  @Input()
  value!: unknown;

  dataRef: ListboxOptionDataRef = { disabled: this._disabled, value: null, textValue: '' };

  constructor(
    @Inject(forwardRef(() => ListboxComponent)) public listbox: any,
    private elementRef: ElementRef
  ) { }

  ngOnDestroy(): void {
    this.listbox.unregisterOption(this.id);
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    const textValue = this.elementRef.nativeElement?.textContent?.toLowerCase().trim();
    if (textValue !== undefined) this.dataRef.textValue = textValue;

    this.dataRef = {
      disabled: this._disabled,
      value: this.value,
      textValue: textValue !== undefined ? textValue : ''
    };

    this.listbox.registerOption(this.id, this.dataRef);

    if (!this.selected) return;
    setTimeout(() => document.getElementById(this.id)?.scrollIntoView?.({ block: 'nearest' }));
  }

  @HostListener('click', ['$event'])
  handleClick(event: MouseEvent): void {
    if (this._disabled) return event.preventDefault();
    this.listbox.select(this.value);
    this.listbox.closeListbox();
    setTimeout(() => this.listbox.buttonRef?.focus({ preventScroll: true }));
  }

  @HostListener('focus')
  handleFocus(): void {
    if (this._disabled) return this.listbox.goToOption(Focus.Nothing);
    this.listbox.goToOption(Focus.Specific, this.id);
  }

  @HostListener('pointermove')
  handleMove(): void {
    if (this._disabled) return;
    if (this.active) return;
    this.listbox.goToOption(Focus.Specific, this.id);
  }

  @HostListener('pointerleave')
  handleLeave(): void {
    if (this._disabled) return;
    if (!this.active) return;
    this.listbox.goToOption(Focus.Nothing);
  }
}
