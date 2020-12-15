import { Component, OnInit } from '@angular/core';

import { ComponentProperty } from './../../interface/component-property';

@Component({
  templateUrl: './ngx-menu-page.component.html',
  styles: []
})
export class NgxMenuPageComponent implements OnInit {
  simpleMenuSnippet = `<div Menu>
  <button MenuButton type="button">
    Menu
  </button>

  <ul *MenuItems>
    <li MenuItem>Item #1</li>
    <li MenuItem>Item #2</li>
    <li MenuItem>Item #3</li>
    <li MenuItem>Item #4</li>
  </ul>
</div>`;

  tailwindMenuSnippet = `<div Menu class="relative inline-block text-left">
  <div MenuButton>
    <button aria-expanded="true" aria-haspopup="true" class="hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500 inline-flex justify-center w-full px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm" id="options-menu" type="button">
      Options
      <svg aria-hidden="true" class="w-5 h-5 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
        <path clip-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" fill-rule="evenodd" />
      </svg>
    </button>
  </div>

  <div *MenuItems aria-labelledby="options-menu" aria-orientation="vertical" class="ring-1 ring-black ring-opacity-5 absolute right-0 z-10 w-56 mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg" role="menu">
    <div class="py-1">
      <a MenuItem class="hover:bg-gray-100 hover:text-gray-900 block px-4 py-2 text-sm text-gray-700" role="menuitem">Edit</a>
      <a MenuItem class="hover:bg-gray-100 hover:text-gray-900 block px-4 py-2 text-sm text-gray-700" role="menuitem">Duplicate</a>
    </div>
    <div class="py-1">
      <a MenuItem class="hover:bg-gray-100 hover:text-gray-900 block px-4 py-2 text-sm text-gray-700" role="menuitem">Archive</a>
      <a MenuItem class="hover:bg-gray-100 hover:text-gray-900 block px-4 py-2 text-sm text-gray-700" role="menuitem">Move</a>
    </div>
    <div class="py-1">
      <a MenuItem class="hover:bg-gray-100 hover:text-gray-900 block px-4 py-2 text-sm text-gray-700" role="menuitem">Share</a>
      <a MenuItem class="hover:bg-gray-100 hover:text-gray-900 block px-4 py-2 text-sm text-gray-700" role="menuitem">Add
        to favorites</a>
    </div>
    <div class="py-1">
      <a class="hover:bg-gray-100 hover:text-gray-900 block px-4 py-2 text-sm text-gray-700 opacity-50 cursor-not-allowed" disabled role="menuitem">Delete</a>
    </div>
  </div>
</div>`;

  transitionMenuSnippet = `<div Menu #menu class="relative inline-block text-left">
  <div MenuButton>
    <button aria-expanded="true" aria-haspopup="true" class="hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500 inline-flex justify-center w-full px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm" id="options-menu" type="button">
      Options
      <svg aria-hidden="true" class="w-5 h-5 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
        <path clip-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" fill-rule="evenodd" />
      </svg>
    </button>
  </div>

  <div ngx-transition [enterFrom]="'transform opacity-0 scale-95'" [enterTo]="'transform opacity-100 scale-100'" [enter]="'transition ease-out duration-100'" [leaveFrom]="'transform opacity-100 scale-100'" [leaveTo]="'transform opacity-0 scale-95'" [leave]="'transition ease-in duration-75'" [show]="menu.isOpened()">
    <div aria-labelledby="options-menu" aria-orientation="vertical" class="ring-1 ring-black ring-opacity-5 absolute right-0 z-10 w-56 mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg" role="menu">
      <div *MenuItems>
        <div class="py-1">
          <a MenuItem class="hover:bg-gray-100 hover:text-gray-900 block px-4 py-2 text-sm text-gray-700" role="menuitem">Edit</a>
          <a MenuItem class="hover:bg-gray-100 hover:text-gray-900 block px-4 py-2 text-sm text-gray-700" role="menuitem">Duplicate</a>
        </div>
        <div class="py-1">
          <a MenuItem class="hover:bg-gray-100 hover:text-gray-900 block px-4 py-2 text-sm text-gray-700" role="menuitem">Archive</a>
          <a MenuItem class="hover:bg-gray-100 hover:text-gray-900 block px-4 py-2 text-sm text-gray-700" role="menuitem">Move</a>
        </div>
        <div class="py-1">
          <a MenuItem class="hover:bg-gray-100 hover:text-gray-900 block px-4 py-2 text-sm text-gray-700" role="menuitem">Share</a>
          <a MenuItem class="hover:bg-gray-100 hover:text-gray-900 block px-4 py-2 text-sm text-gray-700" role="menuitem">Add
            to favorites</a>
        </div>
        <div class="py-1" disabled>
          <a class="hover:bg-gray-100 hover:text-gray-900 block px-4 py-2 text-sm text-gray-700 opacity-50 cursor-not-allowed">Delete</a>
        </div>
      </div>
    </div>
  </div>
</div>`;

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
