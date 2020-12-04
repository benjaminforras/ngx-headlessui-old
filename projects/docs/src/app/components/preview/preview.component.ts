import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styles: [
  ]
})
export class PreviewComponent implements OnInit {

  activeTab = 'preview';

  @Input()
  code!: string;

  @Input()
  title!: string;

  constructor() { }

  ngOnInit(): void {

  }

  copy(): void {
    const selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = this.code;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
  }
}
