import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu-transition',
  templateUrl: './menu-transition.component.html',
  styles: [
  ]
})
export class MenuTransitionComponent implements OnInit {
  condition: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

}
