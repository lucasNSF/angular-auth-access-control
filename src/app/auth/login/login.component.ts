import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { emailValidator } from '../../shared/validators/email-validator';
import { EmailAndPasswordLoginService } from '../login-services/email-and-password-login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
  private formBuilder = inject(FormBuilder);
  private emailAndPasswordLoginService = inject(EmailAndPasswordLoginService);
  formGroup = this.formBuilder.nonNullable.group({
    email: ['', [Validators.required, emailValidator]],
    password: ['', [Validators.required, Validators.minLength(8)]],
  });
  isLoading = signal(false);

  signIn() {
    if (!this.formGroup.valid) {
      throw new Error('Formulário inválido.');
    }

    this.isLoading.set(true);

    const { email, password } = this.formGroup.value;

    this.emailAndPasswordLoginService.signIn(
      email as string,
      password as string
    );

    this.isLoading.set(false);
  }
}
