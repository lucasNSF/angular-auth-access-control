import { inject, Injectable } from '@angular/core';
import { LoginMethod } from './login-method';
import { PrimeIcons } from 'primeng/api';
import { Auth, GoogleAuthProvider, signInWithPopup } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { ToastService } from '../../shared/services/toast.service';
import { LoadingBarService } from '../../shared/services/loading-bar.service';

@Injectable({ providedIn: 'root' })
export class GoogleLoginService implements LoginMethod {
  readonly icon = PrimeIcons.GOOGLE;
  readonly id = 'google';
  readonly label = 'Login com o Google';
  private auth = inject(Auth);
  private provider = new GoogleAuthProvider();
  private router = inject(Router);
  private toast = inject(ToastService);
  private loadingBar = inject(LoadingBarService);

  async signIn(): Promise<void> {
    this.loadingBar.isLoading = true;

    try {
      await signInWithPopup(this.auth, this.provider);
      this.toast.success('Login efetuado', 'Você logou com sua conta Google');
      this.router.navigate(['home'], { replaceUrl: true });
    } catch (err) {
      this.toast.error(
        'Ocorreu um erro',
        'Ocorreu um erro durante a operação de login, tente novamente'
      );
    } finally {
      this.loadingBar.isLoading = false;
    }
  }
}
