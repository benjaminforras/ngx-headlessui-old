import { Component, ContentChild, EventEmitter, HostListener, Input, OnInit, Output, TemplateRef, ViewEncapsulation, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Focus, calculateActiveIndex } from '../../utils/calculate-active-index';

import { BehaviorSubject } from 'rxjs';
import { ListboxOptionDataRef } from './listbox-option.data-ref';
import { ListboxStates } from './listbox-states.enum';

@Component({
  selector: 'listbox, [Listbox]',
  templateUrl: './listbox.component.html',
  encapsulation: ViewEncapsulation.None,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ListboxComponent),
      multi: true
    }
  ]
})
export class ListboxComponent implements OnInit, ControlValueAccessor {
  @ContentChild(TemplateRef)
  template!: TemplateRef<any>;

  @Input()
  disabled: boolean = false;

  @Input()
  static: boolean = false;

  @Input()
  value: unknown = null;

  @Output()
  valueChange: EventEmitter<any> = new EventEmitter();

  listboxState: BehaviorSubject<ListboxStates> = new BehaviorSubject<ListboxStates>(ListboxStates.Closed);

  labelRef!: HTMLLabelElement | null;
  buttonRef!: HTMLButtonElement | null;
  optionsRef!: HTMLDivElement | null;
  options: { id: string; dataRef: ListboxOptionDataRef }[] = [];
  searchQuery: string = '';
  activeOptionIndex: number | null = null;

  propagateChange = (_: any) => { };

  constructor() { }

  writeValue(obj: any): void {
    this.select(obj);
  }

  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }

  registerOnTouched(fn: any): void {

  }

  ngOnInit(): void {
  }

  closeListbox(): void {
    if (this.disabled) return;
    if (this.listboxState.value === ListboxStates.Closed) return;
    this.listboxState.next(ListboxStates.Closed);
    this.activeOptionIndex = null;
  }

  openListbox(): void {
    if (this.disabled) return;
    if (this.listboxState.value === ListboxStates.Open) return;
    this.listboxState.next(ListboxStates.Open);
  }

  goToOption(focus: Focus, id?: string): void {
    if (this.disabled) return;
    if (this.listboxState.value === ListboxStates.Closed) return;

    let nextActiveOptionIndex = calculateActiveIndex(
      focus === Focus.Specific
        ? { focus: Focus.Specific, id: id! }
        : { focus: focus as Exclude<Focus, Focus.Specific> },
      {
        resolveItems: () => this.options,
        resolveActiveIndex: () => this.activeOptionIndex,
        resolveId: option => option.id,
        resolveDisabled: option => option.dataRef.disabled,
      }
    );

    if (this.searchQuery === '' && this.activeOptionIndex === nextActiveOptionIndex) return;
    this.searchQuery = '';
    this.activeOptionIndex = nextActiveOptionIndex;

    if (this.activeOptionIndex !== null && this.activeOptionIndex >= 0) {
      const id = this.options[this.activeOptionIndex].id;
      setTimeout(() => document.getElementById(id)?.scrollIntoView?.({ block: 'nearest' }));
    }
  }

  search(value: string): void {
    if (this.disabled) return;
    if (this.listboxState.value === ListboxStates.Closed) return;

    this.searchQuery += value;

    let match = this.options.findIndex(
      option => !option.dataRef.disabled && option.dataRef.textValue.startsWith(this.searchQuery)
    );

    if (match === -1 || match === this.activeOptionIndex) return;
    this.activeOptionIndex = match;
  }

  clearSearch(): void {
    if (this.disabled) return;
    if (this.listboxState.value === ListboxStates.Closed) return;
    if (this.searchQuery === '') return;

    this.searchQuery = '';
  }

  registerOption(id: string, dataRef: ListboxOptionDataRef): void {
    this.options.push({ id, dataRef });
  }

  unregisterOption(id: string): void {
    let nextOptions = this.options.slice();
    let currentActiveOption = this.activeOptionIndex !== null ? nextOptions[this.activeOptionIndex] : null;
    let idx = nextOptions.findIndex(a => a.id === id);
    if (idx !== -1) nextOptions.splice(idx, 1);
    this.options = nextOptions;
    this.activeOptionIndex = (() => {
      if (idx === this.activeOptionIndex) return null;
      if (currentActiveOption === null) return null;

      // If we removed the option before the actual active index, then it would be out of sync. To
      // fix this, we will find the correct (new) index position.
      return nextOptions.indexOf(currentActiveOption);
    })();
  }

  select(value: unknown): void {
    if (this.disabled) return;
    this.value = value;
    this.valueChange.emit(value);
  }

  @HostListener('mousedown', ['$event'])
  onMousedown(event: MouseEvent): void {
    let target = event.target as HTMLElement;
    let active = document.activeElement;

    if (this.listboxState.value !== ListboxStates.Open) return;
    if (this.buttonRef?.contains(target)) return;

    if (!this.optionsRef?.contains(target)) this.closeListbox();
    if (active !== document.body && active?.contains(target)) return; // Keep focus on newly clicked/focused element
    if (!event.defaultPrevented) this.buttonRef?.focus({ preventScroll: true });
  }
}
