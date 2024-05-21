import { Directive } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';
import { numberValidator } from '../utils/number-validator';

@Directive({
  selector: '[appNumber]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: NumberDirective,
      multi: true
    }
  ]
})
export class NumberDirective implements Validator {

  validate(control: AbstractControl<any, any>): ValidationErrors | null {
    const validatorFn = numberValidator();
    return validatorFn(control);
  }
}
