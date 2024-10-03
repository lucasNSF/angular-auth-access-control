import { inject } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
} from '@angular/router';

import { LoadingBarService } from '../shared/services/loading-bar.service';
import {
  userExists,
  userHasEmail,
  userHasEmailAndIsVerified,
} from '../shared/utils/auth.utils';

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

    if (
      !userExists(auth) ||
      (userHasEmail(auth) && !userHasEmailAndIsVerified(auth))
    ) {
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
