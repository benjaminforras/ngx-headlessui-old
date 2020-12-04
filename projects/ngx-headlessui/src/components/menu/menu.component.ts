import { AfterViewInit, Component, ElementRef, HostListener, Input, TemplateRef, ViewChild, ViewContainerRef, ViewEncapsulation } from '@angular/core';

import { fromEvent } from 'rxjs';

@Component({
  selector: 'ngx-menu',
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

  @ViewChild('menuButtonTemplate', { read: TemplateRef })
  menuButtonTemplate!: TemplateRef<any>;

  @ViewChild('menuButtonContainer', { read: ViewContainerRef })
  menuButtonContainer!: ViewContainerRef | any;

  @Input()
  closeOnItemClick: boolean = true;

  @Input()
  closeOnClickOutside: boolean = true;

  @Input()
  disableAnimations: boolean = false;

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
  public onClick(target: any) {
    const clickedInside = this.elementRef.nativeElement.contains(target);
    if (!clickedInside && this.closeOnClickOutside) {
      this.closeMenu();
    }
  }

  private openMenu(): void {
    this.opened = true;
    /*fromEvent(this.transitionComponent.nativeElement, 'click').pipe(take(1)).subscribe((event: any) => {
      if (event.target && event.target.getAttribute('disabled') !== null) {
        return;
      }

      if (this.closeOnItemClick) {
        this.closeMenu();
      }
    });*/
  }

  private closeMenu(): void {
    this.opened = false;
  }
}
