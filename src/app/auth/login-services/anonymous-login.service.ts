import { ToastService } from '../../shared/services/toast.service';
import { LoginMethod } from './login-method';
import { inject, Injectable } from '@angular/core';
import { Auth, signInAnonymously } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { PrimeIcons } from 'primeng/api';
import { LoadingBarService } from '../../shared/services/loading-bar.service';

@Injectable({ providedIn: 'root' })
export class AnonymousLoginService implements LoginMethod {
  readonly icon = PrimeIcons.USER;
  readonly id = 'anonymous';
  readonly label = 'Login anônimo';
  private auth = inject(Auth);
  private router = inject(Router);
  private toast = inject(ToastService);
  private loadingBar = inject(LoadingBarService);

  async signIn(): Promise<void> {
    this.loadingBar.isLoading = true;

    try {
      await signInAnonymously(this.auth);
      this.toast.success(
        'Login efetuado',
        'Você realizou login com uma conta anônima'
      );

      this.router.navigate(['home'], {
        replaceUrl: true,
      });
    } catch (err) {
      console.error(err);
      this.toast.error(
        'Ocorreu um erro',
        'Erro ao fazer login, tente novamente'
      );
    } finally {
      this.loadingBar.isLoading = false;
    }
  }
}
