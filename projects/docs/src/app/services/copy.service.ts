import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CopyService {

  copied: BehaviorSubject<any> = new BehaviorSubject(false);

  constructor() { }

  copy(code: string): void {
    if (this.copied.value) {
      return;
    }

    const selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = code;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);

    this.copied.next(true);
    setTimeout(() => {
      this.copied.next(false);
    }, 3000);
  }
}
