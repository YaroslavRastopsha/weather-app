import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function forbiddenNameValidator(forbiddenName: RegExp): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;

    if (!value) {
      return null;
    }

    const forbidden = forbiddenName.test(value);

    return forbidden
      ? { forbiddenName: { value: control.value } }
      : null;
  };
}