import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IChatUserList, IUser } from '../models/user.model';
import { Observable } from 'rxjs';
import { ApiUrl } from '../apiUrls';

@Injectable({
  providedIn: 'root',
})
export class UsersService {

  constructor(private http: HttpClient) {}

  getUsers(): Observable<IChatUserList[]> {
    return this.http.get<IChatUserList[]>(ApiUrl.users);
  }

}
