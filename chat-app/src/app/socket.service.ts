import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { socketConfig } from './app.module';
export interface IMessage {
  sender: string;
  receiver: string;
  message: string;
}


@Injectable({
  providedIn: 'root'
})
export class SocketService extends Socket {


  constructor() {
    super(socketConfig);
  }

  connectSocket() {
    this.connect();
  }

  getMessage(userId: string) {
    return this.fromEvent<IMessage>(userId)
  }

  sendMessage(msg: IMessage) {
    this.emit("message", msg)
  }
}
