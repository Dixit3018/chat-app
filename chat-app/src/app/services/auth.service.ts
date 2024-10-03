import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ILoginDTO, ISignupDTO, IAuthRes, IUser } from '../models/user.model';
import { Observable } from 'rxjs';
import { ApiUrl } from '../apiUrls';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  constructor(private http: HttpClient) {}

  login(data: ILoginDTO): Observable<IAuthRes> {
    return this.http.post<IAuthRes>(ApiUrl.login, data);
  }

  signup(data: FormData): Observable<IAuthRes> {
    return this.http.post<IAuthRes>(ApiUrl.signup, data);
  }

  logout(): Observable<IAuthRes> {
    return this.http.post<IAuthRes>(ApiUrl.logout, {});
  }

  getUserByProfile(id: string): Observable<IUser> {
    return this.http.get<IUser>(`${ApiUrl.userProfile}/${id}`);
  }
}
