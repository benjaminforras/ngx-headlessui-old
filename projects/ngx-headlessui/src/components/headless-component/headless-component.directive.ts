import { Directive, TemplateRef } from '@angular/core';

@Directive({
  selector: '[headlessComponent]'
})
export class HeadlessComponentDirective<TImplicitContext = any> {
  constructor(public template: TemplateRef<{ $implicit: TImplicitContext }>) {
    console.log(template);
  }
}
