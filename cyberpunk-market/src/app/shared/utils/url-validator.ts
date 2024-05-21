import { ValidatorFn } from "@angular/forms";

export function urlValidator(): ValidatorFn {
    const regExp = new RegExp(/^http?s:\/\//);

    return (control) => {
        const isUrlInvalid = control.value === '' || regExp.test(control.value);
        return isUrlInvalid ? null : { urlValidator: true };
    }
}