import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DividerModule } from 'primeng/divider';
import { FloatLabelModule } from 'primeng/floatlabel';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';

import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { AuthRoutingModule } from './auth-routing.module';
import { LoginProvidersComponent } from './login-providers/login-providers.component';
import { LoginComponent } from './login/login.component';
import { PhoneVerificationCodeComponent } from './phone-verification-code/phone-verification-code.component';
import { RegisterComponent } from './register/register.component';
import { InputMaskModule } from 'primeng/inputmask';
import { StepperModule } from 'primeng/stepper';
import { InputOtpModule } from 'primeng/inputotp';

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    LoginProvidersComponent,
    PhoneVerificationCodeComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AuthRoutingModule,
    FloatLabelModule,
    IconFieldModule,
    InputIconModule,
    PasswordModule,
    ButtonModule,
    DividerModule,
    InputTextModule,
    CardModule,
    DynamicDialogModule,
    InputMaskModule,
    StepperModule,
    InputOtpModule,
  ],
  exports: [],
})
export class AuthModule {}
