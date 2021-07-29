import { Directive } from '@angular/core';
import { NG_VALIDATORS, Validator, ValidationErrors, AbstractControl } from '@angular/forms';

@Directive({
  selector: '[unsigned]',
  providers: [{ provide: NG_VALIDATORS, useExisting: UnsignedNumberDirective, multi: true }]
})
export class UnsignedNumberDirective implements Validator {
  validate(control: AbstractControl): ValidationErrors | null {
    if (control.value < 0) {
      return { unsigned: 'must not be negative' }
    }
    return null;
  }
}
