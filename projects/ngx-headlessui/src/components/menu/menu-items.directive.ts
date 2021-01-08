import { AfterViewInit, Directive, forwardRef, Inject, OnInit, Renderer2, TemplateRef, ViewContainerRef } from "@angular/core";
import { fromEvent } from "rxjs";
import { distinctUntilChanged } from 'rxjs/operators';
import { Focus } from "../../utils/calculate-active-index";
import { Keys } from "../../utils/keyboard";
import { useId } from "../../utils/use-id";
import { MenuStates } from "./menu-states.enum";
import { MenuComponent } from "./menu.component";

@Directive({
  selector: '[MenuItems], [HeadlessMenuItems]',
})
export class MenuItemsDirective implements OnInit, AfterViewInit {
  id: string = `headlessui-menu-items-${useId()}`;
  searchDebounce: ReturnType<typeof setTimeout> | null = null;

  elementRef!: HTMLElement;

  constructor(
    @Inject(forwardRef(() => MenuComponent)) public menu: any,
    public templateRef: TemplateRef<any>,
    public viewContainer: ViewContainerRef,
    private renderer: Renderer2
  ) {
  }

  ngAfterViewInit(): void {
    if (this.menu.static) {
      this.setAttributes();
    }
  }

  ngOnInit(): void {
    if (this.menu.static) {
      this.embedTemplate();
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
    // If the menu is static don't modify anything let the user modify it's state
    if (this.menu.static) {
      return;
    }

    this.embedTemplate();
    this.setAttributes();
  }

  hide(): void {
    // If the menu is static don't modify anything let the user modify it's state
    if (this.menu.static) {
      return;
    }
    this.viewContainer.clear();
  }

  private embedTemplate(): void {
    let view = this.viewContainer.createEmbeddedView(this.templateRef);
    this.elementRef = view.rootNodes[0] as HTMLElement;
    this.menu.itemsRef = this.elementRef;
  }

  private setAttributes(): void {
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


