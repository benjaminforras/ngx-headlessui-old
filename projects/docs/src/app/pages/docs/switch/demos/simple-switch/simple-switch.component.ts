import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-simple-switch',
  templateUrl: './simple-switch.component.html',
  styles: [
  ]
})
export class SimpleSwitchComponent implements OnInit {
  switchValue: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  onChange(value: boolean) {
    this.switchValue = value;
  }
}
