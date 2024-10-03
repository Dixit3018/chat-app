import { inject } from '@angular/core';
import { IChatUserList, IUser } from '../models/user.model';
import {
  signalStore,
  withState,
  withMethods,
  patchState,
  withComputed,
} from '@ngrx/signals';
import { UsersService } from '../services/users.service';
import { catchError, of, tap } from 'rxjs';

interface UsersState {
  users: IChatUserList[];
  isLoading: boolean;
  error: any;
}

const initialUsersState: UsersState = {
  users: [],
  isLoading: false,
  error: null,
};

export const UsersStore = signalStore(
  { providedIn: 'root' },
  withState(initialUsersState),
  withMethods(({ ...store }) => {
    const usersService = inject(UsersService);

    return {
      getUsers() {
        usersService
          .getUsers()
          .pipe(
            tap((users: IChatUserList[]) => {
              this.getUsersSuccess(users);
            }),
            catchError((error) => {
              this.getUsersError({ error: error.error.message });
              return of(null);
            })
          )
          .subscribe();
        patchState(store, { isLoading: true, error: null });
      },
      getUsersSuccess(users: IChatUserList[]) {
        patchState(store, { isLoading: false, users });
      },
      getUsersError(error: any) {
        patchState(store, { isLoading: false, error });
      },
    };
  })
);
