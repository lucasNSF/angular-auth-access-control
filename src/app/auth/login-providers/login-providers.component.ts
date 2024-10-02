import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { AnonymousLoginService } from '../login-services/anonymous-login.service';
import { LoginMethod } from '../login-services/login-method';
import { PhoneNumberLoginService } from '../login-services/phone-number-login.service';

@Component({
  selector: 'app-login-providers',
  templateUrl: './login-providers.component.html',
  styleUrl: './login-providers.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  preserveWhitespaces: false,
})
export class LoginProvidersComponent {
  loginMethods: ReadonlyArray<LoginMethod> = [
    inject(PhoneNumberLoginService),
    inject(AnonymousLoginService),
  ];
}
