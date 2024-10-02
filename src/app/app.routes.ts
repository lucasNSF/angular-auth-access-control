import { Routes } from '@angular/router';

import { authGuard } from './auth/auth.guard';
import { loginDetectorGuard } from './auth/login-detector.guard';
import { HomeComponent } from './home/home.component';
import { NotFoundPageComponent } from './not-found-page/not-found-page.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'auth',
    pathMatch: 'full',
  },
  {
    path: 'auth',
    canActivateChild: [loginDetectorGuard],
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'home',
    canActivate: [authGuard],
    component: HomeComponent,
  },
  {
    path: '**',
    component: NotFoundPageComponent,
  },
];
