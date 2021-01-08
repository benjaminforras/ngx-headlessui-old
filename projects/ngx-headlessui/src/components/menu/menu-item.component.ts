import { AfterViewInit, Component, ContentChild, ElementRef, forwardRef, HostListener, Inject, Input, OnDestroy, TemplateRef } from "@angular/core";
import { Focus } from "../../utils/calculate-active-index";
import { useId } from "../../utils/use-id";
import { MenuItemDataRef } from "./menu-item.data-ref";
import { MenuComponent } from "./menu.component";

@Component({
  selector: '[MenuItem], [HeadlessMenuItem]',
  host: {
    '[attr.id]': 'id',
    '[attr.role]': '"menuitem"',
    '[attr.tabIndex]': '"-1"',
    '[attr.aria-disabled]': '_disabled === true ? true : undefined'
  },
  template: `
    <ng-template [ngTemplateOutlet]="template" [ngTemplateOutletContext]="{$implicit: dataRef, 'active': active}"></ng-template>
    <ng-content></ng-content>
  `
})
export class MenuItemComponent implements AfterViewInit, OnDestroy {

  @ContentChild(TemplateRef)
  template!: TemplateRef<any>;

  @Input()
  set disabled(value: boolean | string | undefined) {
    if (value || value === '') {
      this._disabled = true;
    } else {
      this._disabled = false;
    }
  }
  _disabled!: boolean;

  id: string = `headlessui-menu-item-${useId()}`;
  dataRef: MenuItemDataRef = { textValue: '', disabled: this._disabled };

  constructor(@Inject(forwardRef(() => MenuComponent)) public menu: any, private elementRef: ElementRef) {
  }

  ngOnDestroy(): void {
    this.menu.unregisterItem(this.id);
  }

  ngAfterViewInit(): void {
    const textValue = this.elementRef.nativeElement?.textContent?.toLowerCase().trim();
    if (textValue !== undefined) this.dataRef.textValue = textValue;

    this.menu.registerItem(this.id, this.dataRef);
  }

  get active(): boolean {
    return this.menu.activeItemIndex !== null ? this.menu.items[this.menu.activeItemIndex].id === this.id : false
  }

  @HostListener('click', ['$event'])
  handleClick(event: MouseEvent): void {
    if (this.disabled) return event.preventDefault();
    this.menu.closeMenu();
    setTimeout(() => this.menu.buttonRef?.focus({ preventScroll: true }));
  }

  @HostListener('focus')
  handleFocus() {
    if (this.disabled) return this.menu.goToItem(Focus.Nothing);
    this.menu.goToItem(Focus.Specific, this.id);
  }

  @HostListener('pointermove')
  handlePointerMove() {
    if (this.disabled) return;
    if (this.active) return;
    this.menu.goToItem(Focus.Specific, this.id);
  }

  @HostListener('pointerleave')
  handlePointerLeave() {
    if (this.disabled) return;
    if (!this.active) return;
    this.menu.goToItem(Focus.Nothing);
  }
}

