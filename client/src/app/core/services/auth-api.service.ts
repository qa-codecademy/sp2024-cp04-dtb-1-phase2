import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import {
  RegisterReq,
  User,
  UserCredentails,
} from '../../feature/auth/models/auth.model';
import { BASE_URL } from '../conststants/core.conststants';

@Injectable({
  providedIn: 'root',
})
export class AuthApiService {
  private http = inject(HttpClient);

  registerUser(request: RegisterReq) {
    return this.http.post(`${BASE_URL}/auth/register`, request);
  }

  loginUser(userCredentials: UserCredentails) {
    return this.http.post<User>(`${BASE_URL}/auth/login`, userCredentials, {
      observe: 'response',
    });
  }

  logOutUser(refreshToken: string) {
    return this.http.get(`${BASE_URL}/auth/logout`, {
      headers: {
        'refresh-token': refreshToken,
      },
    });
  }

  refreshAccessToken(refreshToken: string) {
    return this.http.get(`${BASE_URL}/auth/refresh-token`, {
      headers: {
        'refresh-token': refreshToken,
      },
      observe: 'response',
    });
  }
}
