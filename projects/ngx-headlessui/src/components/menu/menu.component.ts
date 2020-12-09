import {
  AfterViewInit,
  Component,
  ContentChild,
  ElementRef,
  HostListener,
  Input,
  TemplateRef,
  ViewChild,
  ViewContainerRef,
  ViewEncapsulation
} from '@angular/core';

import { TransitionComponent } from '../transition/transition.component';
import { fromEvent } from 'rxjs';
import { take } from 'rxjs/operators';

@Component({
  selector: '[ngx-menu], ngx-menu',
  templateUrl: './menu.component.html',
  encapsulation: ViewEncapsulation.None,
  styles: [
    `
      :host {
        all: unset;
      }
    `
  ]
})
export class MenuComponent implements AfterViewInit {
  @Input()
  opened: boolean = false;

  closed: boolean = true;

  @ViewChild('menuButtonTemplate', { read: TemplateRef })
  menuButtonTemplate!: TemplateRef<any>;

  @ViewChild('menuButtonContainer', { read: ViewContainerRef })
  menuButtonContainer!: ViewContainerRef | any;

  @ViewChild('menuItemsContainer', { read: ViewContainerRef })
  menuItemsContainer!: ViewContainerRef | any;

  @Input()
  closeOnItemClick: boolean = true;

  @Input()
  closeOnClickOutside: boolean = true;

  @Input()
  closeOnDisabled: boolean = false;

  @ContentChild(TransitionComponent)
  transitionComponent!: TransitionComponent;

  constructor(private elementRef: ElementRef) {
  }

  ngAfterViewInit(): void {
    const view = this.menuButtonTemplate.createEmbeddedView(null);
    this.menuButtonContainer.insert(view);

    const button = this.menuButtonContainer.get(0)?.rootNodes[0];
    fromEvent(button, 'click').subscribe(() => {
      if (this.opened) {
        this.closeMenu();
        return;
      }

      this.openMenu();
    });
  }

  @HostListener('document:pointerup', ['$event.target'])
  public onClick(target: any): void {
    const clickedInside = this.elementRef.nativeElement.contains(target);
    if (!clickedInside && this.closeOnClickOutside) {
      this.closeMenu();
    }
  }

  private openMenu(): void {
    this.opened = true;
    this.closed = false;

    setTimeout(() => {
      const elementRef = this.menuItemsContainer.get(0).rootNodes[0];
      fromEvent(elementRef, 'click').pipe(take(1)).subscribe((event: any) => {
        if (!this.closeOnDisabled && event.target && event.target.getAttribute('disabled') !== null) {
          return;
        }

        if (this.closeOnItemClick) {
          this.closeMenu();
        }
      });
    });
  }

  private closeMenu(): void {
    this.opened = false;
    if (this.transitionComponent) {
      this.transitionComponent.afterLeave.subscribe(() => {
        this.closed = true;
      });
    } else {
      this.closed = true;
    }
  }
}
