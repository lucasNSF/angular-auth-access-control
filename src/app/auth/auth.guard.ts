import { inject } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { LoadingBarService } from '../shared/services/loading-bar.service';

export const authGuard: CanActivateFn = async (
  next: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const auth = inject(Auth);
  const router = inject(Router);
  const loadingBar = inject(LoadingBarService);

  loadingBar.isLoading = true;

  try {
    await auth.authStateReady();

    if (!auth.currentUser) {
      return router.navigate(['auth', 'login'], { replaceUrl: true });
    }

    return true;
  } catch (err) {
    console.error(err);
    return router.navigate(['auth', 'login'], { replaceUrl: true });
  } finally {
    loadingBar.isLoading = false;
  }
};
