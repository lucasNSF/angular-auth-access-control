import { inject } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { CanActivateFn, Router } from '@angular/router';

import { LoadingBarService } from '../shared/services/loading-bar.service';
import {
  userExists,
  userHasEmailAndIsVerified,
  userIsLoggedWithoutEmailAndPasswordProvider,
} from '../shared/utils/auth.utils';

export const loginDetectorGuard: CanActivateFn = async () => {
  const auth = inject(Auth);
  const router = inject(Router);
  const loadingBar = inject(LoadingBarService);

  loadingBar.isLoading = true;

  try {
    await auth.authStateReady();

    if (
      userExists(auth) &&
      (userHasEmailAndIsVerified(auth) ||
        userIsLoggedWithoutEmailAndPasswordProvider(auth))
    ) {
      return router.navigate(['home'], {
        replaceUrl: true,
      });
    }

    return true;
  } catch (err) {
    console.error(err);
    return true;
  } finally {
    loadingBar.isLoading = false;
  }
};
