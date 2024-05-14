import { ValidatorFn } from "@angular/forms";

export function matchPasswordsValidator(passControl: string, rePassControl: string): ValidatorFn {
    return (control) => {
        const password = control.get(passControl);
        const rePass = control.get(rePassControl);
        const areMatching = password?.value === rePass?.value;
        return areMatching ? null : { matchPasswordsValidator: true };
    }
}