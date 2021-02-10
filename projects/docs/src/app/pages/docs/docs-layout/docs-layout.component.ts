import { Component, OnInit } from '@angular/core';

import { environment } from 'projects/docs/src/environments/environment';

interface ComponentRoute {
  route: string;
  title: string;
  disabled?: boolean;
}

@Component({
  templateUrl: './docs-layout.component.html',
})
export class DocsLayoutComponent implements OnInit {
  version: string = environment.libVersion;
  mobileOpen: boolean = false;

  components: ComponentRoute[] = [
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
      title: 'Switch'
    }
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
