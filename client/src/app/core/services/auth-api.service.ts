import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import {
  CreateUserDetailsReq,
  RegisterReq,
  User,
  UserCredentails,
  UserDetails,
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

  getUserById(userId: string) {
    return this.http.get<User>(`${BASE_URL}/users/${userId}`);
  }

  changeSubscribe(userId: string, subscription: 'subscribe' | 'unsubscribe') {
    return this.http.get(
      `${BASE_URL}/users/subscription/${subscription}/${userId}`
    );
  }

  getUserDetilsByUser() {
    return this.http.get<UserDetails>(`${BASE_URL}/users/user-details`);
  }

  changeUserPassword(userId: string, newPassword: string) {
    return this.http.post(`${BASE_URL}/users/change-password/${userId}`, {
      newPassword,
    });
  }

  createUserDetails(userId: string, createUserReq: CreateUserDetailsReq) {
    return this.http.post(`${BASE_URL}/user-details/${userId}`, createUserReq);
  }

  updateUserDetails(
    userDetailsId: string,
    updateUserDetails: Partial<CreateUserDetailsReq>
  ) {
    return this.http.patch(
      `${BASE_URL}/user-details/${userDetailsId}`,
      updateUserDetails
    );
  }
}
