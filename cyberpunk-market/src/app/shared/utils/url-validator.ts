import { ValidatorFn } from "@angular/forms";

export function urlValidator(string: string): ValidatorFn {
    const regExp = new RegExp(`^http?s:\/\/`);

    return (control) => {
        const isUrlInvalid = control.value === '' || regExp.test(string);
        return isUrlInvalid ? null : { urlValidator: true };
    }
}