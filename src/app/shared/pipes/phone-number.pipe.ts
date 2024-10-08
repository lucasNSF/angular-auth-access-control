import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'phoneNumber', standalone: true })
export class PhoneNumberPipe implements PipeTransform {
  transform(value: string): string {
    // +5571940028922
    const countryCode = value.slice(0, 3);
    const regionCode = value.slice(3, 5);
    const firstNumberSection = value.slice(5, 10);
    const secondNumberSection = value.slice(10, value.length);

    return `${countryCode} ${regionCode} ${firstNumberSection}-${secondNumberSection}`;
  }
}
