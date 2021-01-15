import { Directive } from '@angular/core';

type StateDefinition = {
  switchRef: HTMLButtonElement | null;
  labelRef: HTMLLabelElement | null;
}

@Directive({
  selector: '[ngx-switch-group], [switch-group]',
})
export class SwitchGroupDirective {
  dataRef: StateDefinition = { switchRef: null, labelRef: null };

  constructor() { }
}
