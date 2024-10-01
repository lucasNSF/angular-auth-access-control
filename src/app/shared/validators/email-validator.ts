import { AbstractControl, ValidationErrors } from '@angular/forms';

export function emailValidator({
  value,
}: AbstractControl): ValidationErrors | null {
  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const isValid = regex.test(value);

  if (!isValid) {
    return { invalidEmail: true };
  }

  return null;
}
