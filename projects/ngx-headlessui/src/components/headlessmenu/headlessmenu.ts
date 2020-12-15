import { AfterViewInit, Component, Directive, ElementRef, forwardRef, HostListener, Inject, Input, OnDestroy, OnInit, Optional, Renderer2, TemplateRef, ViewContainerRef } from '@angular/core';
import { BehaviorSubject, fromEvent } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';
import { calculateActiveIndex, Focus } from '../../utils/calculate-active-index';
import { Keys } from '../../utils/keyboard';
import { useId } from '../../utils/use-id';
import { TransitionComponent } from './../transition/transition.component';

enum MenuStates {
  Closed,
  Open
}

function nextFrame(cb: () => void) {
  requestAnimationFrame(() => requestAnimationFrame(cb));
}

type MenuItemDataRef = { textValue: string; disabled: boolean };

@Directive({
  selector: '[MenuItem]',
  host: {
    '[attr.id]': 'id',
    '[attr.role]': '"menuitem"',
    '[attr.tabIndex]': '"-1"',
    '[attr.aria-disabled]': 'disabled === true ? true : undefined'
  }
})
export class MenuItemDirective implements AfterViewInit, OnDestroy {
  @Input()
  set disabled(value: boolean | string | undefined) {
    if(value || value === '') {
      this._disabled = true;
    } else {
      this._disabled = false;
    }
    console.log(this._disabled);
  }
  _disabled!: boolean;

  id: string = `headlessui-menu-item-${useId()}`;
  dataRef: MenuItemDataRef = { textValue: '', disabled: this._disabled };

  constructor(@Inject(forwardRef(() => MenuComponent)) public menu: MenuComponent, private elementRef: ElementRef) {
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

@Directive({
  selector: '[MenuItems]',
})
export class MenuItemsDirective implements OnInit, AfterViewInit {
  static: boolean = false;

  id: string = `headlessui-menu-items-${useId()}`;
  searchDebounce: ReturnType<typeof setTimeout> | null = null;

  elementRef!: HTMLElement;

  constructor(
    @Inject(forwardRef(() => MenuComponent)) public menu: MenuComponent,
    @Optional() @Inject(forwardRef(() => TransitionComponent)) public transition: TransitionComponent,
    public templateRef: TemplateRef<any>,
    public viewContainer: ViewContainerRef,
    private renderer: Renderer2
  ) {
  }

  ngAfterViewInit(): void {
    if (this.static) {
      this.setAttributes();
    }
  }

  ngOnInit(): void {
    if (this.static) {
      let view = this.viewContainer.createEmbeddedView(this.templateRef);
      this.elementRef = view.rootNodes[0] as HTMLElement;
      return;
    }

    this.menu.menuState.pipe(distinctUntilChanged()).subscribe((menuState: MenuStates) => {
      this.hide();
      if (menuState === MenuStates.Open) {
        this.show();
      }
    });
  }

  show(): void {
    let view = this.viewContainer.createEmbeddedView(this.templateRef);
    this.elementRef = view.rootNodes[0] as HTMLElement;
    this.menu.itemsRef = this.elementRef;
    this.setAttributes();
  }

  hide(): void {
    if (this.transition) {
      this.transition.afterLeave.subscribe(() => {
        this.viewContainer.clear();
      });
    } else {
      this.viewContainer.clear();
    }
  }

  setAttributes(): void {
    this.renderer.setAttribute(this.elementRef, 'aria-activedescendant', `${this.menu.activeItemIndex === null ? undefined : this.menu.items[this.menu.activeItemIndex]?.id}`);
    this.renderer.setAttribute(this.elementRef, 'aria-labelledby', `${this.menu.buttonRef?.id}`);
    this.renderer.setAttribute(this.elementRef, 'id', this.id);
    this.renderer.setAttribute(this.elementRef, 'role', 'menu');
    this.renderer.setAttribute(this.elementRef, 'tabIndex', '0');

    fromEvent(this.elementRef, 'keydown').subscribe((event: KeyboardEvent | any) => {
      if (this.searchDebounce) clearTimeout(this.searchDebounce);

      switch (event.key) {
        // Ref: https://www.w3.org/TR/wai-aria-practices-1.2/#keyboard-interaction-12

        // @ts-expect-error Fallthrough is expected here
        case Keys.Space:
          if (this.menu.searchQuery !== '') {
            event.preventDefault();
            return this.menu.search(event.key);
          }
        // When in type ahead mode, fallthrough
        case Keys.Enter:
          event.preventDefault()
          if (this.menu.activeItemIndex !== null) {
            const { id } = this.menu.items[this.menu.activeItemIndex];
            document.getElementById(id)?.click();
          }
          this.menu.closeMenu();
          setTimeout(() => this.menu.buttonRef?.focus({ preventScroll: true }));
          break;

        case Keys.ArrowDown:
          event.preventDefault();
          return this.menu.goToItem(Focus.Next);

        case Keys.ArrowUp:
          event.preventDefault();
          return this.menu.goToItem(Focus.Previous);

        case Keys.Home:
        case Keys.PageUp:
          event.preventDefault();
          return this.menu.goToItem(Focus.First);

        case Keys.End:
        case Keys.PageDown:
          event.preventDefault();
          return this.menu.goToItem(Focus.Last);

        case Keys.Escape:
          event.preventDefault();
          this.menu.closeMenu();
          setTimeout(() => this.menu.buttonRef?.focus({ preventScroll: true }));
          break;

        case Keys.Tab:
          return event.preventDefault();

        default:
          if (event.key.length === 1) {
            this.menu.search(event.key)
            this.searchDebounce = setTimeout(() => this.menu.clearSearch(), 350);
          }
          break;
      }
    });
  }
}


@Directive({
  selector: '[MenuButton]',
  host: {
    '[attr.id]': 'id',
    '[attr.type]': '"button"',
    '[attr.aria-haspopup]': 'true',
    // '[attr.aria-controls]': 'menu.itemsRef.id',
    '[attr.aria-expanded]': 'isOpen()',
    // '[attr.ref]': 'menu.buttonRef',
  }
})
export class MenuButtonDirective implements AfterViewInit {
  @Input()
  disabled: boolean = false;

  id: string = `headlessui-menu-button-${useId()}`;

  constructor(@Inject(forwardRef(() => MenuComponent)) public menu: MenuComponent, private elementRef: ElementRef) {
  }

  ngAfterViewInit(): void {
    this.menu.buttonRef = this.elementRef.nativeElement;
  }

  isOpen(): boolean | undefined {
    return this.menu.menuState.value === MenuStates.Open ? true : undefined;
  }

  @HostListener('keydown', ['$event'])
  handleKeyDown(event: KeyboardEvent): void {
    switch (event.key) {
      // Ref: https://www.w3.org/TR/wai-aria-practices-1.2/#keyboard-interaction-13

      case Keys.Space:
      case Keys.Enter:
      case Keys.ArrowDown:
        event.preventDefault();
        this.menu.openMenu();
        setTimeout(() => {
          this.menu.itemsRef?.focus({ preventScroll: true });
          this.menu.goToItem(Focus.First);
        });
        break;

      case Keys.ArrowUp:
        event.preventDefault();
        this.menu.openMenu();
        setTimeout(() => {
          this.menu.itemsRef?.focus({ preventScroll: true });
          this.menu.goToItem(Focus.Last);
        })
        break;
    }
  }

  @HostListener('pointerup', ['$event'])
  handlePointerUp(event: MouseEvent): void {
    if (this.disabled) return;
    if (this.menu.menuState.value === MenuStates.Open) {
      this.menu.closeMenu();
      setTimeout(() => this.menu.buttonRef?.focus({ preventScroll: true }));
    } else {
      event.preventDefault();
      this.menu.openMenu();
      nextFrame(() => this.menu.itemsRef?.focus({ preventScroll: true }));
    }
  }
}

@Component({
  selector: '[Menu]',
  template: `<ng-content></ng-content>`
})
export class MenuComponent {
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

    // Force focus state
    if (this.activeItemIndex !== null) {
      const { id } = this.items[this.activeItemIndex];
      document.getElementById(id)?.focus();
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
