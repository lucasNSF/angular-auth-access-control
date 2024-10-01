import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { LOGIN_METHODS } from '../login-methods.token';

@Component({
  selector: 'app-login-providers',
  templateUrl: './login-providers.component.html',
  styleUrl: './login-providers.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginProvidersComponent {
  loginMethods = inject(LOGIN_METHODS);
}
