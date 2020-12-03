import { AfterViewInit, Component, ElementRef, HostListener, Input, TemplateRef, ViewChild, ViewContainerRef, ViewEncapsulation } from '@angular/core';
import { AnimationBuilder, AnimationMetadata, animate, style } from '@angular/animations';

import { fromEvent } from 'rxjs';
import { take } from 'rxjs/operators';

@Component({
  selector: 'NgxMenu',
  templateUrl: './menu.component.html',
  encapsulation: ViewEncapsulation.None
})
export class MenuComponent implements AfterViewInit {
  @Input()
  opened: boolean = false;

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
  disableAnimations: boolean = false;

  private openAnimation: any;
  private closeAnimation: any;

  menuElementRef: ElementRef | any;

  constructor(private elementRef: ElementRef, private animationBuilder: AnimationBuilder) {
    this.openAnimation = this.animationBuilder.build(this.getOpenAnimation());
    this.closeAnimation = this.animationBuilder.build(this.getCloseAnimation());
  }

  ngAfterViewInit(): void {
    const view = this.menuButtonTemplate.createEmbeddedView(null);
    this.menuButtonContainer.insert(view);

    const button = this.menuButtonContainer.get(0)?.rootNodes[0];

    fromEvent(button, 'click').subscribe(() => {
      // Closing with the trigger button
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

  private getOpenAnimation(): AnimationMetadata[] {
    return [
      style({ opacity: 0, transform: 'scaleX(.95) scaleY(.95)' }),
      animate('100ms ease-out', style({ opacity: 1, transform: 'scaleX(1) scaleY(1)' }))
    ];
  }

  private getCloseAnimation(): AnimationMetadata[] {
    return [
      style({ opacity: 1, transform: 'scaleX(1) scaleY(1)' }),
      animate('75ms ease-in', style({ opacity: 0, transform: 'scaleX(.95) scaleY(.95)' }))
    ];
  }

  private openMenu(): void {
    this.opened = true;
    setTimeout(() => {
      this.menuElementRef = this.menuItemsContainer.get(0)?.rootNodes[0];

      this.playAnimation(true);

      fromEvent(this.menuElementRef, 'click').pipe(take(1)).subscribe((event: any) => {
        if (event.target && event.target.getAttribute('disabled') !== null) {
          return;
        }

        if (this.closeOnItemClick) {
          this.closeMenu();
        }
      });
    }, 0);
  }

  private closeMenu(): void {
    this.playAnimation(false);
    setTimeout(() => {
      this.opened = false;
      this.menuElementRef = undefined;
    }, 100);
  }

  private playAnimation(opened: boolean): void {
    if (this.disableAnimations || !this.menuElementRef) {
      return;
    }

    let player;
    if (opened) {
      player = this.openAnimation.create(this.menuElementRef);
    } else {
      player = this.closeAnimation.create(this.menuElementRef);
    }
    player.play();
  }
}
