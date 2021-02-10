import { Directive } from '@angular/core';

type StateDefinition = {
  switchRef: HTMLButtonElement | null;
  labelRef: HTMLLabelElement | null;
  descriptionRef: HTMLParagraphElement | null;
}

@Directive({
  selector: '[ngx-switch-group], [switch-group], [SwitchGroup]',
})
export class SwitchGroupDirective {
  dataRef: StateDefinition = { switchRef: null, labelRef: null, descriptionRef: null };

  constructor() { }
}
