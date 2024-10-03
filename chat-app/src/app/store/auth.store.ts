import { ILoginDTO, ISignupDTO, IAuthRes, IUser } from '../models/user.model';
import { catchError, map, of, tap } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { computed, inject } from '@angular/core';
import {
  signalStore,
  withState,
  withMethods,
  patchState,
  withComputed,
} from '@ngrx/signals';
import { AlertService } from '../services/alert.service';
import { Router } from '@angular/router';

interface AuthState {
  user: IAuthRes | null;
  isLoading: boolean;
  loggingOut: boolean;
  error: string | null;
}

const initialAuthState: AuthState = {
  user: null,
  isLoading: false,
  loggingOut: false,
  error: null,
};

export const AuthStore = signalStore(
  { providedIn: 'root' },
  withState(initialAuthState),
  withComputed(({ user }) => ({
    isLoggedIn: computed(() => !!user()),
  })),
  withMethods(({ ...store }) => {
    const authService = inject(AuthService);
    const alertService = inject(AlertService);
    const router = inject(Router);

    return {
      // Login
      login(payload: ILoginDTO) {
        patchState(store, { isLoading: true, error: null });

        authService
          .login(payload)
          .pipe(
            tap((user: IAuthRes) => {
              this.loginSuccess({ user });
            }),
            catchError((error) => {
              this.loginError({ error: error.error.message });
              return of(null);
            })
          )
          .subscribe();
      },
      loginSuccess({ user }: { user: IAuthRes }) {
        if (user) {
          localStorage.setItem('authToken', user.token);
          alertService.openAlert({
            message: 'User loggedin successfull',
            type: 'success',
          });
        }
        router.navigate(['/chat']);
        patchState(store, { isLoading: false, user });
      },
      loginError({ error }: { error: string }) {
        patchState(store, { isLoading: false, error });
        alertService.openAlert({ message: error, type: 'error' });
      },

      // Register
      signup(payload: FormData) {
        patchState(store, { isLoading: true, error: null });

        authService
          .signup(payload)
          .pipe(
            tap((user: IAuthRes) => {
              this.signupSuccess({ user });
            }),
            catchError((error) => {
              this.signupError({ error: error.error.message });
              return of(null);
            })
          )
          .subscribe();
      },
      signupSuccess({ user }: { user: IAuthRes }) {
        if (user) {
          localStorage.setItem('authToken', user.token);
          alertService.openAlert({
            message: 'User signup successfull',
            type: 'success',
          });
        }
        patchState(store, { isLoading: false, user });
      },
      signupError({ error }: { error: string }) {
        patchState(store, { isLoading: false, error });
        alertService.openAlert({ message: error, type: 'error' });
      },

      logout() {
        if (!store.user()?.token) {
          patchState(store, { isLoading: false, user: null})
          localStorage.removeItem('authToken');
          router.navigate(['/login']);
          return;
        }
        authService.logout().subscribe({
          next: () => {
            router.navigate(['/login']);
            localStorage.removeItem('authToken');
            patchState(store, { user: null });
          },
          error: (error) => {
            if (error.status === 0) {
              alertService.openAlert({
                message: 'Network error',
                type: 'error',
              });
            } else {
              alertService.openAlert({
                message: error.error.message,
                type: 'error',
              });
            }
          },
        });
      },

      getLoggedinUser(userID: string) {
        patchState(store, { isLoading: true });
        authService.getUserByProfile(userID).subscribe({
          next: (loggedinUser: IUser) => {
            this.getLoggedinUserSuccess(loggedinUser);
          },
          error: (error) => {
            this.getLoggedinUserError(error);
          },
        });
      },

      getLoggedinUserSuccess(loggedinUser: IUser) {
        patchState(store, {
          isLoading: false,
          user: {
            user: loggedinUser,
            token:
              store.user()?.token ?? localStorage.getItem('authToken') ?? '',
          },
        });
      },

      getLoggedinUserError({ error }: any) {
        if (error.status === 0) {
          alertService.openAlert({
            message: 'Network error',
            type: 'error',
          });
        } else {
          alertService.openAlert({
            message: error.error.message,
            type: 'error',
          });
        }

        patchState(store, {
          isLoading: false,
          error,
        });
      },
    };
  })
);
