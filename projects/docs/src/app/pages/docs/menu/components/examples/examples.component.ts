import * as simpleMenu from '!!raw-loader!./../../demos/simple-menu/simple-menu.component.html';
import * as tailwindMenu from '!!raw-loader!./../../demos/tailwind-menu/tailwind-menu.component.html';
import * as tailwindMenuTransitionNgTemplate from '!!raw-loader!./../../demos/tailwind-menu-transition-ng-template/tailwind-menu-transition-ng-template.component.html';

import { Component, OnInit } from '@angular/core';

@Component({
  templateUrl: './examples.component.html',
})
export class ExamplesComponent implements OnInit {

  simpleMenu = (simpleMenu as any).default;
  tailwindMenu = (tailwindMenu as any).default;
  tailwindMenuTransitionNgTemplate = (tailwindMenuTransitionNgTemplate as any).default;

  constructor() { }

  ngOnInit(): void {
  }

}
