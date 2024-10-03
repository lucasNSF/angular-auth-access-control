import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { DialogService } from 'primeng/dynamicdialog';

import { LoadingBarService } from '../../shared/services/loading-bar.service';
import { emailValidator } from '../../shared/validators/email-validator';
import { ConfirmEmailComponent } from '../confirm-email/confirm-email.component';
import {
  EmailAndPasswordFormData,
  EmailAndPasswordLoginService,
} from '../login-services/email-and-password-login.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  preserveWhitespaces: false,
})
export class RegisterComponent {
  private formBuilder = inject(FormBuilder);
  formGroup = this.formBuilder.group({
    name: ['', [Validators.required]],
    lastName: ['', [Validators.required]],
    email: ['', [Validators.required, emailValidator]],
    password: ['', [Validators.required, Validators.minLength(8)]],
  });
  private dialogService = inject(DialogService);
  private loadingBar = inject(LoadingBarService);
  private emailAndPasswordLoginService = inject(EmailAndPasswordLoginService);

  async signUp() {
    this.loadingBar.isLoading = true;

    try {
      if (!this.formGroup.valid) {
        throw new Error('Formulário inválido.');
      }

      const formValue = this.formGroup.value as EmailAndPasswordFormData;

      await this.emailAndPasswordLoginService.signUp(formValue);

      this.dialogService.open(ConfirmEmailComponent, {
        data: formValue.email,
        closable: false,
        closeOnEscape: false,
        dismissableMask: false,
        showHeader: false,
      });
    } catch (err) {
      console.error(err);
    } finally {
      this.loadingBar.isLoading = false;
    }
  }
}
