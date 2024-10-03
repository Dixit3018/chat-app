import {
  Component,
  ElementRef,
  inject,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { IUser } from '../../../models/user.model';
import { MessagesStore } from '../../../store/message.store';
import { CommonModule } from '@angular/common';
import { AuthStore } from '../../../store/auth.store';
import { FormsModule } from '@angular/forms';
import { IMessage, SocketService } from '../../../socket.service';

@Component({
  selector: 'app-chat-screen',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './chat-screen.component.html',
  styleUrl: './chat-screen.component.scss',
})
export class ChatScreenComponent implements OnChanges {
  @ViewChild('chatContainer') chatContainer!: ElementRef;

  @Input() selectedUser: IUser | null = null;
  messageStore = inject(MessagesStore);
  authStore = inject(AuthStore);
  socketService = inject(SocketService);

  content: string = '';
  textareaHeight: string = '20px';

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['selectedUser']) {
      this.scrollToBottom();
    }
  }

  scrollToBottom(): void {
    if (this.chatContainer) {
      setTimeout(() => {
        this.chatContainer.nativeElement.scrollTop =
          this.chatContainer.nativeElement.scrollHeight;
      }, 50);
    }
  }

  onSendMessaageByTextBox(event: KeyboardEvent) {
    if (event.ctrlKey && event.key === 'Enter') {
      event.preventDefault();
      console.log(this.textareaHeight);

      if (parseInt(this.textareaHeight) < 150) {
        this.textareaHeight = parseInt(this.textareaHeight) + 40 + 'px';
      }
      this.content += '\n';
    } else if (event.key === 'Backspace') {
      event.preventDefault();
      if (this.textareaHeight !== '20px') {
        this.textareaHeight = parseInt(this.textareaHeight) - 40 + 'px';
      }
    } else if (event.key === 'Enter') {
      this.onSendMessaage();
    }
  }

  onSendMessaage() {
    this.scrollToBottom();
    const senderID = this.authStore.user()?.user._id;
    if (senderID && this.selectedUser) {
      const messageData: IMessage = {
        sender: senderID,
        receiver: this.selectedUser._id,
        message: this.content.trim(),
      };
      this.socketService.sendMessage(messageData);
      this.messageStore.addMessage(messageData);
      this.content = '';
      this.textareaHeight = '20px';
    }
  }
}
