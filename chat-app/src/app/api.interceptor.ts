import { HttpInterceptorFn } from '@angular/common/http';
import { getAuthToken } from './utility';
import { catchError, of } from 'rxjs';
import { inject } from '@angular/core';
import { Router } from '@angular/router'
import { AuthStore } from './store/auth.store';
import { AlertService } from './services/alert.service';

export const apiInterceptor: HttpInterceptorFn = (req, next) => {
  const authToken = getAuthToken();
  const router = inject(Router);
  const authStore = inject(AuthStore);
  const alertService = inject(AlertService);

  const authReq = req.clone({
    setHeaders: {
      Authorization: `Bearer ${authToken}`,
    },
  });

  return next(authReq).pipe(
    catchError((err: any) => {
      if (err.error === 'Unauthorized' && err.status === 401) {
        alertService.openAlert({
          message: 'Session expired!',
          type: 'error',
        });
        authStore.logout();
        router.navigate(['/login']);
      }
      return of(err);
    })
  );
};
