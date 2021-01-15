import { Component, OnInit } from '@angular/core';

@Component({
  templateUrl: './test.component.html',
  styles: [
  ]
})
export class TestComponent implements OnInit {
  people = [
    { id: 1, name: 'Durward Reynolds', unavailable: false },
    { id: 2, name: 'Kenton Towne', unavailable: false },
    { id: 3, name: 'Therese Wunsch', unavailable: false },
    { id: 4, name: 'Benedict Kessler', unavailable: true },
    { id: 5, name: 'Katelyn Rohan', unavailable: false },
  ];
  selectedPerson: any;
  selectedPerson2: any;

  activeItem: any;
  toggle: boolean = false;
  mobileOpen: boolean = false;
  switchValue: boolean = false;

  constructor() { }

  onChange(value: boolean) {
    this.switchValue = value;
  }

  ngOnInit(): void {
  }

  selectionChange(event: any): void {
    this.selectedPerson2 = event.value;
  }

  renderer(value: any): string {
    return value.map((el: any) => el.name).join(', ');
  }

}
