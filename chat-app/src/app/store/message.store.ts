import { inject } from '@angular/core';
import {
  signalStore,
  withState,
  withMethods,
  patchState,
} from '@ngrx/signals';
import { catchError, of, tap } from 'rxjs';
import { ChatService } from '../services/chat.service';
import { IMessage } from '../models/message.model';

interface MessageStateState {
  messages: IMessage[];
  isLoading: boolean;
  error: any;
}

const initialMessageState: MessageStateState = {
  messages: [],
  isLoading: false,
  error: null,
};

export const MessagesStore = signalStore(
  { providedIn: 'root' },
  withState(initialMessageState),
  withMethods(({ ...store }) => {
    const chatService = inject(ChatService);

    return {
      getUserMessages(id: string) {
        chatService
          .getUserMessagesFromID(id)
          .pipe(
            tap((res: { messages: IMessage[], status: number }) => {
              this.getUserMessagesSuccess(res.messages);
            }),
            catchError((error) => {
              this.getUserMessagesError({ error: error.error.message });
              return of(null);
            })
          )
          .subscribe();
        patchState(store, { isLoading: true, error: null });
      },
      getUserMessagesSuccess(messages: IMessage[]) {
        patchState(store, { isLoading: false, messages });
      },
      getUserMessagesError(error: any) {
        console.log(error);
        patchState(store, { isLoading: false, error });
      },
      addMessage(message: IMessage) {
        patchState(store, { messages: [...store.messages(), message] });
      },
    };
  })
);
