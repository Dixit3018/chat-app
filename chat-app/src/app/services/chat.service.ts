import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiUrl } from '../apiUrls';
import { IMessage } from '../socket.service';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(private http: HttpClient) { }

  getUserMessagesFromID(id: string) {
    return this.http.get<{ messages: IMessage[], status: number }>(`${ApiUrl.messages}/${id}`);

  }
}
