import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { SocketIoConfig, SocketIoModule } from 'ngx-socket-io';
import { Subject, takeUntil } from 'rxjs';
import { SocketService } from './socket.service';
import { Router, RouterModule } from '@angular/router';
import { getAuthToken } from './utility';
import { AuthStore } from './store/auth.store';
import { jwtDecode } from 'jwt-decode';
import { AuthService } from './services/auth.service';

interface decodeData {
  id: string;
  iat: number;
  exp: number;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  router = inject(Router);
  authStore = inject(AuthStore);

  constructor() {}

  ngOnInit(): void {
    const authToken = getAuthToken();

    if (authToken) {
      const userID: decodeData = jwtDecode(authToken);
      this.authStore.getLoggedinUser(userID.id)
      this.router.navigate(['/chat']);
    }
    else {
      this.authStore.logout();
    }
    // const userId = "USERID HERE";
    // this.socketService.connectSocket();
    // this.socketService
    // .getMessage(userId)
    //   .pipe(takeUntil(this.destroy$))
    //   .subscribe((data: any) => {
    //     console.log(data);
    //   });
  }

  //   sendMessageToServer() {
  //   this.socketService.sendMessage({
  //     receiver: '66f3b3e821021327234dec05',
  //     sender: '66f3b3e821021327234dec05',
  //     message: 'Hello',
  //   });
  // }
}
