import { Component, OnInit } from '@angular/core';

@Component({
  templateUrl: './ngx-transition-page.component.html',
  styles: [
  ]
})
export class NgxTransitionPageComponent implements OnInit {

  simpleTransitionSnippet = `<span (click)="condition = !condition" class="block mb-1 text-sm font-medium text-gray-700">
  Fade-In Demo
</span>
<ngx-transition [show]="condition" enter="transition-opacity duration-75" enterFrom="opacity-0" enterTo="opacity-100" leave="transition-opacity duration-150" leaveFrom="opacity-100" leaveTo="opacity-0">
  <div class="p-5 bg-white shadow">I will fade in and out</div>
</ngx-transition>`;

  condition: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

}
