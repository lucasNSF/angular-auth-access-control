import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import {
  Auth,
  ConfirmationResult,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from '@angular/fire/auth';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastService } from '../../shared/services/toast.service';
import { LoadingBarService } from '../../shared/services/loading-bar.service';
import { DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-phone-verification-code',
  templateUrl: './phone-verification-code.component.html',
  styleUrl: './phone-verification-code.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  preserveWhitespaces: false,
})
export class PhoneVerificationCodeComponent implements AfterViewInit {
  activeStep = signal(0);
  isLoading = signal(false);
  private formBuilder = inject(FormBuilder);
  formGroup = this.formBuilder.group({
    phoneNumber: ['', [Validators.required, Validators.minLength(15)]],
    verificationCode: ['', [Validators.required, Validators.minLength(6)]],
  });
  private auth = inject(Auth);
  private rv: RecaptchaVerifier | null = null;
  private cr: ConfirmationResult | null = null;
  private router = inject(Router);
  private toast = inject(ToastService);
  private loadingBar = inject(LoadingBarService);
  private dialogRef = inject(DynamicDialogRef);

  ngAfterViewInit(): void {
    this.rv = new RecaptchaVerifier(this.auth, 'recaptcha-container', {
      size: 'normal',
      callback: () => {},
      'expired-callback': () => {},
    });
    this.rv.render();
  }

  async sendVerificationCode() {
    try {
      if (!this.formGroup.get('phoneNumber')!.valid) {
        throw new Error('Formulário inválido.');
      }

      this.loadingBar.isLoading = true;

      const phoneNumber =
        '+55 ' + this.formGroup.value.phoneNumber!.replace(/\(|\)/g, '');

      this.activeStep.set(1);

      this.cr = await signInWithPhoneNumber(
        this.auth,
        phoneNumber,
        this.rv as RecaptchaVerifier
      );
    } catch (err) {
      console.error(err);
    } finally {
      this.loadingBar.isLoading = false;
    }
  }

  async verifyCode() {
    try {
      if (!this.formGroup.get('verificationCode')!.valid) {
        throw new Error('Código de verificação inválido.');
      }

      this.isLoading.set(true);

      const { verificationCode } = this.formGroup.value;

      if (!this.cr) {
        throw new Error('ConfirmationResult is null');
      }

      await this.cr.confirm(verificationCode as string);

      this.toast.success(
        'Login efetuado',
        'Você realizou login com seu número de telefone'
      );

      this.dialogRef.destroy();

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
      this.isLoading.set(false);
      this.rv!.clear();
      this.rv = null;
    }
  }
}
