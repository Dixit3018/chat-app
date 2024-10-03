import {
  Component,
  computed,
  effect,
  ElementRef,
  inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import { UsersStore } from '../../store/user.store';
import { CommonModule } from '@angular/common';
import { MessagesStore } from '../../store/message.store';
import { Router } from '@angular/router';
import { AuthStore } from '../../store/auth.store';
import { IUser } from '../../models/user.model';
import { FormsModule } from '@angular/forms';
import { SocketService, IMessage } from '../../socket.service';
import { ChatScreenComponent } from './chat-screen/chat-screen.component';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [CommonModule, FormsModule,ChatScreenComponent],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss',
})
export class ChatComponent implements OnInit {

  @ViewChild('messageBox') messageBox!: ElementRef;
  content: string = '';

  userStore = inject(UsersStore);
  authStore = inject(AuthStore);
  messageStore = inject(MessagesStore);

  router = inject(Router);
  selectedUser: IUser | null = null;
  textareaHeight: string = '20px';
  authUserID = '';

  constructor(private socketService: SocketService) {
    effect(() => {
      this.authUserID = this.authStore.user()?.user?._id ?? '';
      if (this.authUserID) {
        this.socketService.getMessage(this.authUserID).subscribe((data: IMessage) => {
          if(this.selectedUser?._id === data.sender){
            this.messageStore.addMessage(data);
          }
        });
      }
    });
  }

  ngOnInit(): void {
    this.userStore.getUsers();
    this.socketService.connectSocket();
  }

  onSelectUser(user: IUser) {
    if (this.selectedUser === user) {
      return;
    }
    this.selectedUser = user;
    this.messageStore.getUserMessages(user._id);
  }

  onLogout() {
    this.authStore.logout();
  }

}
