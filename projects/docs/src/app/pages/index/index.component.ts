import { Component, OnInit } from '@angular/core';
import { CopyService } from './../../services/copy.service';


@Component({
  templateUrl: './index.component.html',
  styles: [
  ]
})
export class IndexComponent implements OnInit {

  constructor(private copyService: CopyService) { }

  ngOnInit(): void {
  }

  copy(cmd: string): void {
    this.copyService.copy(cmd);
  }
}
