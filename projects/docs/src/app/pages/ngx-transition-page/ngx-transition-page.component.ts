import { Component, OnInit } from '@angular/core';

import { ComponentProperty } from './../../interface/component-property';

@Component({
  templateUrl: './ngx-transition-page.component.html',
  styles: [
  ]
})
export class NgxTransitionPageComponent implements OnInit {

  simpleTransitionSnippet = `<div class="relative inline-block text-left">
  <button (click)="condition = !condition" type="button" class="hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500 inline-flex justify-center w-full px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm" id="options-menu" aria-haspopup="true" aria-expanded="true">
    Options
    <svg class="w-5 h-5 ml-2 -mr-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
      <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
    </svg>
  </button>
  <ngx-transition [show]="condition" [enter]="'transition ease-out duration-100'" [enterFrom]="'transform opacity-0 scale-95'" [enterTo]="'transform opacity-100 scale-100'" [leave]="'transition ease-in duration-75'" [leaveFrom]="'transform opacity-100 scale-100'" [leaveTo]="'transform opacity-0 scale-95'">
    <div class="ring-1 ring-black ring-opacity-5 absolute right-0 z-10 w-56 mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
      <div class="py-1">
        <a href="#" class="hover:bg-gray-100 hover:text-gray-900 block px-4 py-2 text-sm text-gray-700" role="menuitem">Edit</a>
        <a href="#" class="hover:bg-gray-100 hover:text-gray-900 block px-4 py-2 text-sm text-gray-700" role="menuitem">Duplicate</a>
      </div>
      <div class="py-1">
        <a href="#" class="hover:bg-gray-100 hover:text-gray-900 block px-4 py-2 text-sm text-gray-700" role="menuitem">Archive</a>
        <a href="#" class="hover:bg-gray-100 hover:text-gray-900 block px-4 py-2 text-sm text-gray-700" role="menuitem">Move</a>
      </div>
      <div class="py-1">
        <a href="#" class="hover:bg-gray-100 hover:text-gray-900 block px-4 py-2 text-sm text-gray-700" role="menuitem">Share</a>
        <a href="#" class="hover:bg-gray-100 hover:text-gray-900 block px-4 py-2 text-sm text-gray-700" role="menuitem">Add to favorites</a>
      </div>
      <div class="py-1">
        <a disabled href="#" class="hover:bg-gray-100 hover:text-gray-900 block px-4 py-2 text-sm text-gray-700 opacity-50 cursor-not-allowed" role="menuitem">Delete</a>
      </div>
    </div>
  </ngx-transition>
</div>
`;

  componentProperties: ComponentProperty[] = [
    {
      name: 'show',
      description: `Wrap the content that should be conditionally rendered in a <code>ngx-transition</code> component, and use the <code>show</code> prop to control whether the content should be visible or hidden.`,
      default: 'false'
    },
    {
      name: 'enter',
      description: `Applied the entire time an element is entering. Usually you define your duration and what properties you want to transition here, for example <code>transition-opacity duration-75</code>.`,
      default: 'none'
    },
    {
      name: 'enterFrom',
      description: `The starting point to enter from, for example <code>opacity-0</code> if something should fade in.`,
      default: 'none'
    },
    {
      name: 'enterTo',
      description: `The ending point to enter to, for example <code>opacity-100</code> after fading in.`,
      default: 'none'
    },
    {
      name: 'leave',
      description: `Applied the entire time an element is leaving. Usually you define your duration and what properties you want to transition here, for example <code>transition-opacity duration-75</code>.`,
      default: 'none'
    },
    {
      name: 'leaveFrom',
      description: `The starting point to leave from, for example <code>opacity-100</code> if something should fade out.`,
      default: 'none'
    },
    {
      name: 'leaveTo',
      description: `The ending point to leave to, for example <code>opacity-0</code> after fading out.`,
      default: 'none'
    },
  ];

  componentPropertiesEvents: ComponentProperty[] = [
    {
      name: 'beforeEnter',
      description: `Fired right before the transition starts entering.`,
    },
    {
      name: 'afterEnter',
      description: `Fired when the transition finished entering.`,
    },
    {
      name: 'beforeLeave',
      description: `Fired right before the transition starts leaving.`,
    },
    {
      name: 'afterLeave',
      description: `Fired when the transition finished leaving.`,
    },
  ];

  condition: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

}
