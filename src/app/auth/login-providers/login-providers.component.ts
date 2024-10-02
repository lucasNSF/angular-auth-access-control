import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { AnonymousLoginService } from '../login-services/anonymous-login.service';
import { LoginMethod } from '../login-services/login-method';
import { PhoneNumberLoginService } from '../login-services/phone-number-login.service';
import { GoogleLoginService } from '../login-services/google-login.service';

@Component({
  selector: 'app-login-providers',
  templateUrl: './login-providers.component.html',
  styleUrl: './login-providers.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  preserveWhitespaces: false,
})
export class LoginProvidersComponent {
  loginMethods: ReadonlyArray<LoginMethod> = [
    inject(GoogleLoginService),
    inject(PhoneNumberLoginService),
    inject(AnonymousLoginService),
  ];
}
