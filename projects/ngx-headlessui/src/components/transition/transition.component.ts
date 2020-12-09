import {
  AfterContentInit,
  Component,
  EventEmitter,
  HostBinding,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import { Reason, transition } from './utils/transitions';

@Component({
  selector: '[ngx-transition], ngx-transition',
  templateUrl: './transition.component.html',
  styles: [],
})
export class TransitionComponent implements OnChanges, AfterContentInit {

  @ViewChild('transitionContainer', {read: ViewContainerRef})
  transitionContainer!: ViewContainerRef | any;

  /**
   * Whether to show or not the contents of ngx-transition
   */
  @Input()
  show: boolean = false;

  /**
   * Classes to be applied on the element when showing
   */
  @Input()
  enter: string = '';
  @Input()
  enterFrom: string = '';
  @Input()
  enterTo: string = '';

  /**
   * Classes to be applied on the element when leaving
   */
  @Input()
  leave: string = '';
  @Input()
  leaveFrom: string = '';
  @Input()
  leaveTo: string = '';

  @Output()
  beforeEnter: EventEmitter<any> = new EventEmitter();

  @Output()
  afterEnter: EventEmitter<any> = new EventEmitter();

  @Output()
  beforeLeave: EventEmitter<any> = new EventEmitter();

  @Output()
  afterLeave: EventEmitter<any> = new EventEmitter();

  init: boolean = true;
  closed: boolean = true;
  private elementRef!: HTMLElement;

  constructor() {
    this.closed = !this.show;
  }

  @HostBinding('style.visibility')
  get getVisibility(): string {
    return this.init ? 'hidden' : 'visible';
  }

  ngAfterContentInit(): void {
    this.init = !this.show;
    if (this.closed) {
      this.closed = false;
      setTimeout(() => {
        this.elementRef = this.transitionContainer.get(0).rootNodes[0];

        setTimeout(() => {
          this.closed = true;
          this.init = false;
        });
      });
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.show) {
      if (this.show) {
        this.closed = false;
        this.beforeEnter.emit();
        this.transitionEnter(this.elementRef);
      } else {
        if (!this.transitionContainer) {
          return;
        }
        this.elementRef = this.transitionContainer.get(0).rootNodes[0];
        this.beforeLeave.emit();
        this.transitionLeave(this.elementRef);
      }
    }
  }

  private transitionEnter(elementRef: HTMLElement): void {
    transition(elementRef, this.useSplitClasses(this.enter), this.useSplitClasses(this.enterFrom), this.useSplitClasses(this.enterTo), (reason: Reason) => {
      this.afterEnter.emit();
    });
  }

  private transitionLeave(elementRef: HTMLElement): void {
    transition(elementRef, this.useSplitClasses(this.leave), this.useSplitClasses(this.leaveFrom), this.useSplitClasses(this.leaveTo), (reason: Reason) => {
      this.afterLeave.emit();
      this.closed = true;
    });
  }

  private useSplitClasses(classes: string = ''): string[] {
    return classes.split(' ').filter(className => className.trim().length > 1);
  }
}
