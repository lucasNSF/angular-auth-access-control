import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { FloatLabelModule } from 'primeng/floatlabel';
import { ReactiveFormsModule } from '@angular/forms';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import { InputTextModule } from 'primeng/inputtext';
import { CardModule } from 'primeng/card';
import { LoginProvidersComponent } from './login-providers/login-providers.component';

@NgModule({
  declarations: [LoginComponent, RegisterComponent, LoginProvidersComponent],
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
  ],
  exports: [],
})
export class AuthModule {}
