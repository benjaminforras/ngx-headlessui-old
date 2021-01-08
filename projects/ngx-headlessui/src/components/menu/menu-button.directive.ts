import { AfterViewInit, Directive, ElementRef, forwardRef, HostListener, Inject, Input } from "@angular/core";
import { Focus } from "../../utils/calculate-active-index";
import { Keys } from "../../utils/keyboard";
import { useId } from "../../utils/use-id";
import { MenuStates } from "./menu-states.enum";
import { MenuComponent } from "./menu.component";

function nextFrame(cb: () => void) {
  requestAnimationFrame(() => requestAnimationFrame(cb));
}

@Directive({
  selector: '[MenuButton], [HeadlessMenuButton]',
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

  constructor(@Inject(forwardRef(() => MenuComponent)) public menu: any, private elementRef: ElementRef) {
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
    if (this.menu.isOpened()) {
      this.menu.closeMenu();
      setTimeout(() => this.menu.buttonRef?.focus({ preventScroll: true }));
    } else {
      event.preventDefault();
      this.menu.openMenu();
      nextFrame(() => this.menu.itemsRef?.focus({ preventScroll: true }));
    }
  }
}
