import { inject, Injectable } from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  updateProfile,
} from '@angular/fire/auth';

export interface EmailAndPasswordFormData {
  name: string;
  lastName: string;
  email: string;
  password: string;
}

@Injectable({ providedIn: 'root' })
export class EmailAndPasswordLoginService {
  private auth = inject(Auth);

  signIn() {
    try {
    } catch (err) {}
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
