import { Component, OnInit } from '@angular/core';

import { CopyService } from './../../services/copy.service';
import { environment } from 'projects/docs/src/environments/environment';

@Component({
  templateUrl: './index.component.html',
  styles: [
  ]
})
export class IndexComponent implements OnInit {
  version: string = environment.libVersion;

  mobileMenuOpened: boolean = false;

  constructor(private copyService: CopyService) { }

  ngOnInit(): void {
  }

  copy(cmd: string): void {
    this.copyService.copy(cmd);
  }
}
