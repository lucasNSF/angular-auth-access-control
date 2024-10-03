import { inject, Injectable } from '@angular/core';
import { FirebaseError } from '@angular/fire/app';
import {
  Auth,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signInWithEmailAndPassword,
  updateProfile,
} from '@angular/fire/auth';
import { Router } from '@angular/router';

import { ToastService } from '../../shared/services/toast.service';
import {
  userExists,
  userHasEmailAndIsVerified,
} from '../../shared/utils/auth.utils';

export interface EmailAndPasswordFormData {
  name: string;
  lastName: string;
  email: string;
  password: string;
}

@Injectable({ providedIn: 'root' })
export class EmailAndPasswordLoginService {
  private auth = inject(Auth);
  private toast = inject(ToastService);
  private router = inject(Router);

  async signIn(email: string, password: string) {
    try {
      if (userExists(this.auth) && !userHasEmailAndIsVerified(this.auth)) {
        this.toast.error(
          'Ocorreu um erro',
          'Verifique seu email para que você possa fazer o login'
        );

        throw new Error(
          'Verifique seu email para que você possa fazer o login.'
        );
      }

      await signInWithEmailAndPassword(this.auth, email, password);

      this.toast.success('Login efetuado');

      this.router.navigate(['home'], { replaceUrl: true });
    } catch (err) {
      const { code } = err as FirebaseError;
      if (code === 'auth/invalid-credential') {
        this.toast.error('Ocorreu um erro', 'Email ou senha incorretos');
      }
    }
  }

  async signUp(data: EmailAndPasswordFormData) {
    try {
      await createUserWithEmailAndPassword(
        this.auth,
        data.email,
        data.password
      );

      if (!this.auth.currentUser) {
        throw new Error('Firebase User is null');
      }

      await updateProfile(this.auth.currentUser, {
        displayName: `${data.name} ${data.lastName}`,
      });

      await sendEmailVerification(this.auth.currentUser);
    } catch (err) {
      console.error(err);
    }
  }
}
