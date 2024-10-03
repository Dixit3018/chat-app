import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SocketIoConfig, SocketIoModule } from 'ngx-socket-io';

export const socketConfig: SocketIoConfig = { url: 'http://localhost:3000', options: {autoConnect: false, transports: ["websocket"]} };


@NgModule({
  declarations: [],
  imports: [CommonModule, SocketIoModule.forRoot(socketConfig)],
  providers: [],
})
export class AppModule {}
