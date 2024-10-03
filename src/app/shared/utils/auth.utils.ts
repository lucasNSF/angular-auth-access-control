import { Auth } from '@angular/fire/auth';

function userHasEmailAndIsVerified(auth: Auth): boolean {
  if (!auth.currentUser) return false;
  return !!auth.currentUser.email && auth.currentUser.emailVerified;
}

function userHasEmail(auth: Auth): boolean {
  if (!auth.currentUser) return false;
  return !!auth.currentUser.email;
}

function userIsLoggedWithoutEmailAndPasswordProvider(auth: Auth): boolean {
  if (!auth.currentUser) return false;
  return auth.currentUser.email === null;
}

function userExists(auth: Auth): boolean {
  return auth.currentUser !== null;
}

export {
  userExists,
  userHasEmailAndIsVerified,
  userHasEmail,
  userIsLoggedWithoutEmailAndPasswordProvider,
};
