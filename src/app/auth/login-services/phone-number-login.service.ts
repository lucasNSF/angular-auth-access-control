import { inject, Injectable } from '@angular/core';
import { PrimeIcons } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { LoginMethod } from './login-method';
import { PhoneVerificationCodeComponent } from '../phone-verification-code/phone-verification-code.component';

@Injectable({ providedIn: 'root' })
export class PhoneNumberLoginService implements LoginMethod {
  readonly icon = PrimeIcons.PHONE;
  readonly id = 'sms';
  readonly label = 'Login com número de telefone';
  private dialogService = inject(DialogService);
  private dialogRef: DynamicDialogRef | null = null;

  async signIn(): Promise<void> {
    if (this.dialogRef) {
      this.dialogRef.destroy();
    }

    this.dialogService.open(PhoneVerificationCodeComponent, {
      closable: true,
      closeOnEscape: false,
      header: 'Entrar com número de telefone',
    });
  }
}
