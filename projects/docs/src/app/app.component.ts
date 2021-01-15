import { Component } from '@angular/core';
import { CopyService } from './services/copy.service';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {

  version: string = environment.libVersion;

  mobileMenuOpened: boolean = false;
  componentsOpened: boolean = false;

  copied: any;

  constructor(private copyService: CopyService) {
    this.copyService.copied.subscribe((value) => {
      this.copied = value;
    });
  }

  close(): void {
    this.copyService.copied.next(false);
  }
}
