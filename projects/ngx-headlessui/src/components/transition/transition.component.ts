import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild, ViewContainerRef } from '@angular/core';
import { Reason, transition } from './utils/transitions';

@Component({
  selector: 'ngx-transition',
  templateUrl: './transition.component.html',
  styles: [
  ]
})
export class TransitionComponent implements OnInit, OnChanges {

  @ViewChild('transitionContainer', { read: ViewContainerRef })
  transitionContainer!: ViewContainerRef | any;

  @Input()
  show: boolean = false;

  @Input()
  enter: string = '';
  @Input()
  enterFrom: string = '';
  @Input()
  enterTo: string = '';

  @Input()
  leave: string = '';
  @Input()
  leaveFrom: string = '';
  @Input()
  leaveTo: string = '';

  @Output()
  beforeEnter = new EventEmitter();

  @Output()
  afterEnter = new EventEmitter();

  @Output()
  beforeLeave = new EventEmitter();

  @Output()
  afterLeave = new EventEmitter();

  closed!: boolean;
  private elementRef!: HTMLElement;

  constructor() {
    this.closed = !this.show;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.show) {
      if (this.show) {
        this.closed = false;
        setTimeout(() => {
          this.elementRef = this.transitionContainer.get(0).rootNodes[0];
        });
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

  ngOnInit(): void {
  }

  transitionEnter(elementRef: HTMLElement): void {
    transition(elementRef, this.useSplitClasses(this.enter), this.useSplitClasses(this.enterFrom), this.useSplitClasses(this.enterTo), (reason: Reason) => {
      this.afterEnter.emit();
    });
  }

  transitionLeave(elementRef: HTMLElement): void {
    transition(elementRef, this.useSplitClasses(this.leave), this.useSplitClasses(this.leaveFrom), this.useSplitClasses(this.leaveTo), (reason: Reason) => {
      this.afterLeave.emit();
      this.closed = true;
    });
  }

  log(msg: any): void {
    console.log(`[${Date.now()}] ${msg}`);
  }

  useSplitClasses(classes: string = ''): string[] {
    return classes.split(' ').filter(className => className.trim().length > 1);
  }
}
