import { ValidatorFn } from "@angular/forms";


export function numberValidator(): ValidatorFn {
    return (control) => {
        const isNumber = typeof control.value === 'number' || control.value > 0;
        return isNumber ? null : { numberValidator: true };
    }
}