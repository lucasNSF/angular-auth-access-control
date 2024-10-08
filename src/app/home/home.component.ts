import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';

import { LoadingBarService } from '../shared/services/loading-bar.service';
import { ToastService } from '../shared/services/toast.service';
import { CardModule } from 'primeng/card';
import { PhoneNumberPipe } from '../shared/pipes/phone-number.pipe';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ButtonModule, CardModule, PhoneNumberPipe],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {
  private auth = inject(Auth);
  private loadingBar = inject(LoadingBarService);
  private toast = inject(ToastService);
  private router = inject(Router);
  userInfo = {
    displayName:
      this.auth.currentUser?.displayName ||
      `Usuário${this.auth.currentUser?.uid?.slice(0, 6)}`,
    phoneNumber: this.auth.currentUser?.phoneNumber,
    email: this.auth.currentUser?.email,
  };

  async signOut() {
    this.loadingBar.isLoading = true;

    try {
      await this.auth.signOut();
      this.toast.info('Sessão encerrada', 'Você saiu da sua sessão');
      this.router.navigate(['auth', 'login'], { replaceUrl: true });
    } catch (err) {
      console.error(err);
      this.toast.error(
        'Ocorreu um erro',
        'Ocorreu um erro inesperado, tente novamente'
      );
    } finally {
      this.loadingBar.isLoading = false;
    }
  }
}
