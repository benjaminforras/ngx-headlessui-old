import { Component, OnInit } from '@angular/core';

import { environment } from 'projects/docs/src/environments/environment';

@Component({
  templateUrl: './docs-layout.component.html',
})
export class DocsLayoutComponent implements OnInit {
  version: string = environment.libVersion;
  mobileOpen: boolean = false;

  components = [
    {
      route: '/docs/menu',
      title: 'Menu'
    },
    {
      route: '/docs/transition',
      title: 'Transition'
    },
    {
      route: '/docs/switch',
      title: 'Switch (WIP)',
      disabled: true
    }
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
