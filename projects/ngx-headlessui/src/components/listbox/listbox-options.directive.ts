import { AfterViewInit, Directive, forwardRef, Inject, OnInit, Renderer2, TemplateRef, ViewContainerRef } from '@angular/core';
import { fromEvent } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';
import { Focus } from '../../utils/calculate-active-index';
import { Keys } from '../../utils/keyboard';
import { useId } from '../../utils/use-id';
import { ListboxStates } from './listbox-states.enum';
import { ListboxComponent } from './listbox.component';


@Directive({
  selector: '[ListboxOptions]'
})
export class ListboxOptionsDirective implements OnInit, AfterViewInit {
  id = `headlessui-listbox-options-${useId()}`;

  elementRef!: HTMLDivElement;
  searchDebounce!: ReturnType<typeof setTimeout> | null;

  constructor(
    @Inject(forwardRef(() => ListboxComponent)) public listbox: any,
    private renderer: Renderer2,
    private templateRef: TemplateRef<any>,
    private viewContainerRef: ViewContainerRef
  ) { }

  ngAfterViewInit(): void {
    if (this.listbox.static) {
      this.setAttributes();
    }
  }

  ngOnInit(): void {
    if (this.listbox.static) {
      this.embedTemplate();
      return;
    }

    this.listbox.listboxState.pipe(distinctUntilChanged()).subscribe((listboxState: ListboxStates) => {
      this.hide();

      if (listboxState === ListboxStates.Open) {
        this.show();
      }
    });
  }

  show(): void {
    // If the listbox is static don't modify anything let the user modify it's state
    if (this.listbox.static) {
      return;
    }

    this.embedTemplate();
    this.setAttributes();
  }

  hide(): void {
    // If the listbox is static don't modify anything let the user modify it's state
    if (this.listbox.static) {
      return;
    }
    this.viewContainerRef.clear();
  }

  private embedTemplate(): void {
    let view = this.viewContainerRef.createEmbeddedView(this.templateRef);
    this.elementRef = view.rootNodes[0] as HTMLDivElement;
    this.listbox.optionsRef = this.elementRef;
  }

  private setAttributes(): void {
    this.renderer.setAttribute(this.elementRef, 'aria-activedescendant', `${this.listbox.activeOptionIndex === null ? undefined : this.listbox.options[this.listbox.activeOptionIndex]?.id}`);
    this.renderer.setAttribute(this.elementRef, 'aria-labelledby', `${this.listbox.buttonRef?.id}`);
    this.renderer.setAttribute(this.elementRef, 'id', this.id);
    this.renderer.setAttribute(this.elementRef, 'role', 'listbox');
    this.renderer.setAttribute(this.elementRef, 'tabIndex', '0');
    this.renderer.setAttribute(this.elementRef, 'ref', 'el');

    fromEvent(this.elementRef, 'keydown').subscribe((event: KeyboardEvent | any) => {
      if (this.searchDebounce) clearTimeout(this.searchDebounce);

      switch (event.key) {
        // Ref: https://www.w3.org/TR/wai-aria-practices-1.2/#keyboard-interaction-12

        // @ts-expect-error Fallthrough is expected here
        case Keys.Space:
          if (this.listbox.searchQuery !== '') {
            event.preventDefault();
            return this.listbox.search(event.key);
          }
        // When in type ahead mode, fallthrough
        case Keys.Enter:
          event.preventDefault();
          if (this.listbox.activeOptionIndex !== null) {
            let { dataRef } = this.listbox.options[this.listbox.activeOptionIndex];
            this.listbox.select(dataRef.value);
          }
          this.listbox.closeListbox();
          setTimeout(() => this.listbox.buttonRef?.focus({ preventScroll: true }));
          break;

        case Keys.ArrowDown:
          event.preventDefault();
          return this.listbox.goToOption(Focus.Next);

        case Keys.ArrowUp:
          event.preventDefault();
          return this.listbox.goToOption(Focus.Previous);

        case Keys.Home:
        case Keys.PageUp:
          event.preventDefault();
          return this.listbox.goToOption(Focus.First);

        case Keys.End:
        case Keys.PageDown:
          event.preventDefault();
          return this.listbox.goToOption(Focus.Last);

        case Keys.Escape:
          event.preventDefault();
          this.listbox.closeListbox();
          setTimeout(() => this.listbox.buttonRef?.focus({ preventScroll: true }));
          break;

        case Keys.Tab:
          return event.preventDefault();

        default:
          if (event.key.length === 1) {
            this.listbox.search(event.key);
            this.searchDebounce = setTimeout(() => this.listbox.clearSearch(), 350);
          }
          break;
      }
    });
  }
}
