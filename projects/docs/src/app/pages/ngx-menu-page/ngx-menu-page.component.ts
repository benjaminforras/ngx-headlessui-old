import { Component, OnInit } from '@angular/core';

import { ComponentProperty } from './../../interface/component-property';

@Component({
  templateUrl: './ngx-menu-page.component.html',
  styles: []
})
export class NgxMenuPageComponent implements OnInit {
  simpleMenuSnippet = `<ngx-menu>
  <button MenuButton type="button">
    Menu
  </button>

  <ul MenuItems>
    <li>Item #1</li>
    <li>Item #2</li>
    <li>Item #3</li>
    <li>Item #4</li>
  </ul>
</ngx-menu>`;

  tailwindMenuSnippet = `<ngx-menu class="relative inline-block text-left">
  <div MenuButton>
    <button type="button" class="hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500 inline-flex justify-center w-full px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm" id="options-menu" aria-haspopup="true" aria-expanded="true">
      Options
      <svg class="w-5 h-5 ml-2 -mr-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
        <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
      </svg>
    </button>
  </div>

  <div MenuItems class="ring-1 ring-black ring-opacity-5 absolute right-0 z-10 w-56 mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
    <div class="py-1">
      <a class="hover:bg-gray-100 hover:text-gray-900 block px-4 py-2 text-sm text-gray-700" role="menuitem">Edit</a>
      <a class="hover:bg-gray-100 hover:text-gray-900 block px-4 py-2 text-sm text-gray-700" role="menuitem">Duplicate</a>
    </div>
    <div class="py-1">
      <a class="hover:bg-gray-100 hover:text-gray-900 block px-4 py-2 text-sm text-gray-700" role="menuitem">Archive</a>
      <a class="hover:bg-gray-100 hover:text-gray-900 block px-4 py-2 text-sm text-gray-700" role="menuitem">Move</a>
    </div>
    <div class="py-1">
      <a class="hover:bg-gray-100 hover:text-gray-900 block px-4 py-2 text-sm text-gray-700" role="menuitem">Share</a>
      <a class="hover:bg-gray-100 hover:text-gray-900 block px-4 py-2 text-sm text-gray-700" role="menuitem">Add to favorites</a>
    </div>
    <div class="py-1">
      <a disabled class="hover:bg-gray-100 hover:text-gray-900 block px-4 py-2 text-sm text-gray-700 opacity-50 cursor-not-allowed" role="menuitem">Delete</a>
    </div>
  </div>
</ngx-menu>`;

  transitionMenuSnippet = `<ngx-menu #menu class="relative inline-block text-left">
  <div MenuButton>
    <button aria-expanded="true" aria-haspopup="true" class="hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500 inline-flex justify-center w-full px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm" id="options-menu" type="button">
      Options
      <svg aria-hidden="true" class="w-5 h-5 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
        <path clip-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" fill-rule="evenodd"/>
      </svg>
    </button>
  </div>

  <ngx-transition MenuItems [enterFrom]="'transform opacity-0 scale-95'"
                  [enterTo]="'transform opacity-100 scale-100'"
                  [enter]="'transition ease-out duration-100'"
                  [leaveFrom]="'transform opacity-100 scale-100'"
                  [leaveTo]="'transform opacity-0 scale-95'"
                  [leave]="'transition ease-in duration-75'"
                  [show]="menu.opened">
    <div aria-labelledby="options-menu" aria-orientation="vertical" class="ring-1 ring-black ring-opacity-5 absolute right-0 z-10 w-56 mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg" role="menu">
      <div class="py-1">
        <a class="hover:bg-gray-100 hover:text-gray-900 block px-4 py-2 text-sm text-gray-700" role="menuitem">Edit</a>
        <a class="hover:bg-gray-100 hover:text-gray-900 block px-4 py-2 text-sm text-gray-700" role="menuitem">Duplicate</a>
      </div>
      <div class="py-1">
        <a class="hover:bg-gray-100 hover:text-gray-900 block px-4 py-2 text-sm text-gray-700" role="menuitem">Archive</a>
        <a class="hover:bg-gray-100 hover:text-gray-900 block px-4 py-2 text-sm text-gray-700" role="menuitem">Move</a>
      </div>
      <div class="py-1">
        <a class="hover:bg-gray-100 hover:text-gray-900 block px-4 py-2 text-sm text-gray-700" role="menuitem">Share</a>
        <a class="hover:bg-gray-100 hover:text-gray-900 block px-4 py-2 text-sm text-gray-700" role="menuitem">Add
          to favorites</a>
      </div>
      <div class="py-1">
        <a class="hover:bg-gray-100 hover:text-gray-900 block px-4 py-2 text-sm text-gray-700 opacity-50 cursor-not-allowed" disabled role="menuitem">Delete</a>
      </div>
    </div>
  </ngx-transition>
</ngx-menu>`;

  componentProperties: ComponentProperty[] = [
    {
      name: 'closeOnItemClick',
      description: `Close Menu when clicked on Item`,
      default: 'true'
    },
    {
      name: 'closeOnClickOutside',
      description: `Close Menu when clicked outside of Menu`,
      default: 'true'
    },
    {
      name: 'closeOnDisabled',
      description: `Close Menu when clicked on a disabled item`,
      default: 'false'
    },
  ];

  constructor() {
  }

  ngOnInit(): void {
  }

}
