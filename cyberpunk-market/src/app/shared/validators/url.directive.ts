import { Directive } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';
import { urlValidator } from '../utils/url-validator';

@Directive({
  selector: '[appUrl]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: UrlDirective,
      multi: true
    }
  ]
})
export class UrlDirective implements Validator {

  validate(control: AbstractControl<any, any>): ValidationErrors | null {
    if(!control.value) {
      return null;
    }
    const validatorFn = urlValidator(control.value);
    return validatorFn(control);
  }
}
