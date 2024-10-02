import { inject, Injectable } from '@angular/core';
import { Auth, signInAnonymously } from '@angular/fire/auth';
import { PrimeIcons } from 'primeng/api';

import { LoginMethod } from './login-method';

@Injectable({ providedIn: 'root' })
export class AnonymousLoginService implements LoginMethod {
  readonly icon = PrimeIcons.USER;
  readonly id = 'anonymous';
  readonly label = 'Login anônimo';
  private auth = inject(Auth);

  async signIn(): Promise<void> {
    try {
      const userCredential = await signInAnonymously(this.auth);
      console.log('anonymous credential', userCredential);
    } catch (err) {
      console.error(err);
    }
  }
}
