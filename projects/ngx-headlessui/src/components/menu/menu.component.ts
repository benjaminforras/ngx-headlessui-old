import { Component, ElementRef, HostListener, Input } from "@angular/core";
import { Focus, calculateActiveIndex } from "../../utils/calculate-active-index";

import { BehaviorSubject } from "rxjs";
import { MenuItemDataRef } from "./menu-item.data-ref";
import { MenuStates } from "./menu-states.enum";

@Component({
  selector: '[Menu], [HeadlessMenu]',
  template: `<ng-content></ng-content>`
})
export class MenuComponent {

  @Input()
  static: boolean = false;

  menuState: BehaviorSubject<MenuStates> = new BehaviorSubject<MenuStates>(MenuStates.Closed);

  buttonRef: HTMLElement | null = null;
  itemsRef: HTMLElement | null = null;

  items: { id: string; dataRef: MenuItemDataRef }[] = [];
  searchQuery: string = '';
  activeItemIndex: number | null = null;

  constructor(public elementRef: ElementRef) { }

  public closeMenu(): void {
    this.menuState.next(MenuStates.Closed);
    this.activeItemIndex = null;
  }

  public openMenu(): void {
    this.menuState.next(MenuStates.Open);
  }

  public isOpened(): boolean {
    return this.menuState && this.menuState.value === MenuStates.Open;
  }

  public goToItem(focus: Focus, id?: string): void {
    const nextActiveItemIndex = calculateActiveIndex(
      focus === Focus.Specific ? { focus: Focus.Specific, id: id! } : { focus: focus as Exclude<Focus, Focus.Specific> },
      {
        resolveItems: () => this.items,
        resolveActiveIndex: () => this.activeItemIndex,
        resolveId: item => item.id,
        resolveDisabled: item => item.dataRef.disabled,
      }
    )

    if (this.searchQuery === '' && this.activeItemIndex === nextActiveItemIndex) return;
    this.searchQuery = '';
    this.activeItemIndex = nextActiveItemIndex;

    let elementId = null;
    if (this.activeItemIndex !== null) {
      elementId = this.items[this.activeItemIndex].id;
    }
  }

  public search(value: string): void {
    this.searchQuery += value;

    const match = this.items.findIndex(
      item => item.dataRef.textValue.startsWith(this.searchQuery) && !item.dataRef.disabled
    );

    if (match === -1 || match === this.activeItemIndex) return;

    this.activeItemIndex = match;
  }

  public clearSearch(): void {
    this.searchQuery = '';
  }

  public registerItem(id: string, dataRef: MenuItemDataRef): void {
    this.items.push({ id, dataRef });
  }

  public unregisterItem(id: string): void {
    const nextItems = this.items.slice();
    const currentActiveItem = this.activeItemIndex !== null ? nextItems[this.activeItemIndex] : null;
    const idx = nextItems.findIndex(a => a.id === id);
    if (idx !== -1) nextItems.splice(idx, 1);
    this.items = nextItems;
    this.activeItemIndex = (() => {
      if (idx === this.activeItemIndex) return null;
      if (currentActiveItem === null) return null;

      // If we removed the item before the actual active index, then it would be out of sync. To
      // fix this, we will find the correct (new) index position.
      return nextItems.indexOf(currentActiveItem);
    })();
  }

  @HostListener('window:click', ['$event'])
  handler(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    const active = document.activeElement;

    if (this.menuState.value !== MenuStates.Open) return;
    if (this.buttonRef?.contains(target)) return;

    if (!this.elementRef.nativeElement?.contains(target)) this.closeMenu();
    if (active !== document.body && active?.contains(target)) return; // Keep focus on newly clicked/focused element
    if (!event.defaultPrevented) this.buttonRef?.focus({ preventScroll: true });
  }
}
