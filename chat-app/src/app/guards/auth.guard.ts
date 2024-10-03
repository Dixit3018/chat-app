import { CanActivateFn, Router } from '@angular/router';
import { getAuthToken } from '../utility';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const authToken = getAuthToken();
  const router = inject(Router);

  if (!authToken) {
    router.navigate(['/login']);
  }
  return true;
};
