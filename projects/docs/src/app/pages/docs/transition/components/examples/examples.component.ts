import * as menuTransition from '!!raw-loader!./../../demos/menu-transition/menu-transition.component.html';
import * as simpleTransition from '!!raw-loader!./../../demos/simple-transition/simple-transition.component.html';

import { Component, OnInit } from '@angular/core';

@Component({
  templateUrl: './examples.component.html',
  styles: [
  ]
})
export class ExamplesComponent implements OnInit {
  simpleTransition = (simpleTransition as any).default;
  menuTransition = (menuTransition as any).default;

  constructor() { }

  ngOnInit(): void {
  }

}
