import {
  Component,
  ContentChildren,
  EventEmitter,
  HostBinding,
  Input,
  OnInit,
  Output,
  QueryList,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import { Reason, transition } from './utils/transitions';
import { first, skip } from 'rxjs/operators';

import { BehaviorSubject } from 'rxjs';

@Component({
  selector: '[ngx-transition], [transition], transition, ngx-transition',
  templateUrl: './transition.component.html',
})
export class TransitionComponent implements OnInit {

  @ContentChildren(TransitionComponent, { descendants: true })
  _children: QueryList<TransitionComponent> = new QueryList<TransitionComponent>();

  @ViewChild('transitionContainer', { read: ViewContainerRef, static: true })
  _viewContainer!: ViewContainerRef | any;

  /**
   * Whether to show or not the contents of ngx-transition
   */
  @Input()
  set show(value: boolean) {
    this._show.next(value);
  }

  get show(): boolean {
    return this._show.value;
  }

  _show: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

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

  closed: boolean = true;

  private _elementRef!: HTMLElement;
  private _init: boolean = true;

  constructor() {
  }

  @HostBinding('style.display')
  get getDisplay(): string {
    return this._init ? 'none' : '';
  }

  ngOnInit(): void {
    this.closed = !this.show;

    if (this.closed) {
      this._init = true;
      if (this.closed) {
        this.closed = false;
        setTimeout(() => {
          this._elementRef = this._getElement();
          this.closed = true;
        });
      }
    } else {
      setTimeout(() => {
        this._elementRef = this._getElement();
        this._updateView();
      });
    }

    this._show.pipe(skip(1)).subscribe(() => {
      this._updateView();
    });
  }

  private async _updateView(): Promise<any> {
    if (this.show) {
      this.closed = false;
      this._transitionEnter();
    } else {
      if (this._children.length > 0) {
        let childrenFinished: BehaviorSubject<number> = new BehaviorSubject<number>(0);

        for (let child of this._children.toArray().reverse()) {
          child.afterLeave.pipe(first()).subscribe(() => {
            childrenFinished.pipe(first()).subscribe((value) => {
              childrenFinished.next(++value);
            });
          });
          child.show = false;
        }

        childrenFinished.subscribe((value) => {
          if (value === this._children.length)
            this._transitionLeave();
        });
      } else {
        this._transitionLeave();
      }
    }
  }

  private _getElement(): HTMLElement {
    if (!this._elementRef) {
      this._elementRef = this._viewContainer.get(0).rootNodes.find((element: HTMLElement) => element.tagName);
      this._init = false;
    }
    return this._elementRef;
  }

  private _transitionEnter(): void {
    this.beforeEnter.emit();
    transition(this._getElement(), this._useSplitClasses(this.enter), this._useSplitClasses(this.enterFrom), this._useSplitClasses(this.enterTo), (reason: Reason) => {
      this.afterEnter.emit();

      if (this._children.length > 0) {
        this._children.forEach((child: TransitionComponent) => {
          child.show = true;
        });
      }
    });
  }

  private _transitionLeave(): void {
    this.beforeLeave.emit();
    transition(this._getElement(), this._useSplitClasses(this.leave), this._useSplitClasses(this.leaveFrom), this._useSplitClasses(this.leaveTo), (reason: Reason) => {
      this.afterLeave.emit();
      this.closed = true;
    });
  }

  private _useSplitClasses(classes: string = ''): string[] {
    return classes.split(' ').filter(className => className.trim().length > 1);
  }
}
