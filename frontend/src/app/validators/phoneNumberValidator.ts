import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function phoneNumberValidator(size?: number): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;

    if (value === null || value === undefined || value === '') {
      return null;
    }

    const isValidNumeric = /^[0-9]*$/.test(value);
    const isValidLength = size !== undefined ? value.length === size : true;

    return isValidNumeric && isValidLength ? null : {
      numeric: !isValidNumeric,
      length: size !== undefined && value.length !== size
    };
  };
}