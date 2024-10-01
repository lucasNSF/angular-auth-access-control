import { InjectionToken } from '@angular/core';
import { PrimeIcons } from 'primeng/api';

export interface LoginMethod {
  id: string;
  icon: string;
  label: string;
}

const LOGIN_PROVIDERS: ReadonlyArray<LoginMethod> = [
  { id: 'google', icon: PrimeIcons.GOOGLE, label: 'Login com Google' },
  {
    id: 'phone',
    icon: PrimeIcons.PHONE,
    label: 'Login com número de telefone',
  },
  { id: 'anonymous', icon: PrimeIcons.USER, label: 'Login anônimo' },
];

export const LOGIN_METHODS = new InjectionToken('auth login methods', {
  providedIn: 'root',
  factory: () => LOGIN_PROVIDERS,
});
