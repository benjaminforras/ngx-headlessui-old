import * as simpleSwitch from '!!raw-loader!./../../demos/simple-switch/simple-switch.component.html';

import { Component, OnInit } from '@angular/core';

@Component({
  templateUrl: './examples.component.html',
  styles: [
  ]
})
export class ExamplesComponent implements OnInit {
  simpleSwitch = (simpleSwitch as any).default;

  constructor() { }

  ngOnInit(): void {
  }

}
