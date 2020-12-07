import { Component, Input, OnInit } from '@angular/core';
import { CopyService } from './../../services/copy.service';


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

  constructor(private copyService: CopyService) { }

  ngOnInit(): void {

  }

  copy(): void {
    this.copyService.copy(this.code);
  }
}
