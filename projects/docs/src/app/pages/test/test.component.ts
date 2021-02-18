import { Component, OnInit } from '@angular/core';

import { FormControl } from '@angular/forms';

@Component({
  templateUrl: './test.component.html',
  styles: [
  ]
})
export class TestComponent implements OnInit {
  people = [
    { id: 1, name: 'Durward Reynolds', unavailable: false, image: 'https://randomuser.me/api/portraits/men/80.jpg' },
    { id: 2, name: 'Kenton Towne', unavailable: false, image: 'https://randomuser.me/api/portraits/men/81.jpg' },
    { id: 3, name: 'Therese Wunsch', unavailable: false, image: 'https://randomuser.me/api/portraits/men/82.jpg' },
    { id: 4, name: 'Benedict Kessler', unavailable: true, image: 'https://randomuser.me/api/portraits/men/83.jpg' },
    { id: 5, name: 'Katelyn Rohan', unavailable: false, image: 'https://randomuser.me/api/portraits/men/84.jpg' },
    { id: 6, name: 'Katelyn Rohan', unavailable: false, image: 'https://randomuser.me/api/portraits/men/85.jpg' },
    { id: 7, name: 'Katelyn Rohan', unavailable: false, image: 'https://randomuser.me/api/portraits/men/86.jpg' },
    { id: 8, name: 'Katelyn Rohan', unavailable: false, image: 'https://randomuser.me/api/portraits/men/87.jpg' },
    { id: 9, name: 'Katelyn Rohan', unavailable: false, image: 'https://randomuser.me/api/portraits/men/88.jpg' },
    { id: 10, name: 'Katelyn Rohan', unavailable: false, image: 'https://randomuser.me/api/portraits/men/89.jpg' },
    { id: 11, name: 'Katelyn Rohan', unavailable: false, image: 'https://randomuser.me/api/portraits/men/90.jpg' },
    { id: 12, name: 'Katelyn Rohan', unavailable: false, image: 'https://randomuser.me/api/portraits/men/91.jpg' },
    { id: 13, name: 'Katelyn Rohan', unavailable: false, image: 'https://randomuser.me/api/portraits/men/92.jpg' },
    { id: 14, name: 'Katelyn Rohan', unavailable: false, image: 'https://randomuser.me/api/portraits/men/93.jpg' },
    { id: 15, name: 'Katelyn Rohan', unavailable: false, image: 'https://randomuser.me/api/portraits/men/94.jpg' },
  ];
  selectedPerson: any = null;


  selectFormControl: FormControl = new FormControl();

  activeItem: any;
  toggle: boolean = false;
  mobileOpen: boolean = false;
  switchValue: boolean = false;

  constructor() { }

  onChange(value: boolean) {
    this.switchValue = value;
  }

  ngOnInit(): void {
    this.selectFormControl.valueChanges.subscribe((value) => {
      console.log(value);
    });
  }


  change(): void {
    this.selectFormControl.setValue(this.people[2]);
  }

  renderer(value: any): string {
    return value.map((el: any) => el.name).join(', ');
  }

}
