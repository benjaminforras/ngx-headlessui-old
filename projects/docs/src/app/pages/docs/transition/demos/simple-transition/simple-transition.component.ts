import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-simple-transition',
  templateUrl: './simple-transition.component.html',
  styles: [
  ]
})
export class SimpleTransitionComponent implements OnInit {
  show: boolean = false;
  constructor() { }

  ngOnInit(): void {
  }

}
