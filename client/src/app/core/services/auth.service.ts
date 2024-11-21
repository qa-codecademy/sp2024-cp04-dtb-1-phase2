import { inject, Injectable, signal } from '@angular/core';
import {
  CreateUserDetailsReq,
  RegisterReq,
  User,
  UserCredentails,
  UserDetails,
} from '../../feature/auth/models/auth.model';
import { AuthApiService } from './auth-api.service';
import { Router } from '@angular/router';
import { tap } from 'rxjs';
import { NotificationService } from './notification.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private router = inject(Router);
  private apiService = inject(AuthApiService);
  private notificationsService = inject(NotificationService);

  currentUser = signal<User>(null);

  constructor() {
    this.getCurrentUserFromLocalStorage();
  }

  registerUser(request: RegisterReq) {
    this.apiService.registerUser(request).subscribe({
      next: () => {
        console.log('User registered');
        this.notificationsService.showToast(
          'Successfully registered, please log in with your new account!',
          true
        );
        this.router.navigate(['login']);
      },
      error: (err) => {
        this.notificationsService.showToast(err.error.message, false);
      },
    });
  }

  loginUser(userCredentials: UserCredentails) {
    this.apiService.loginUser(userCredentials).subscribe({
      next: (response) => {
        const token = response.headers.get('access-token');

        const refreshToken = response.headers.get('refresh-token');

        this.currentUser.set({ ...response.body, token, refreshToken });

        this.saveCurrentUserToLocalStorage(this.currentUser());

        this.router.navigate(['']);
      },
      error: (error) =>
        this.notificationsService.showToast(error.error.message, false),
    });
  }

  saveCurrentUserToLocalStorage(user: User) {
    localStorage.setItem('currentUser', JSON.stringify(user));
  }

  getCurrentUserFromLocalStorage() {
    const currentUserJSON = localStorage.getItem('currentUser');

    if (!currentUserJSON) return;

    this.currentUser.set(JSON.parse(currentUserJSON));
  }

  logOutUserFromServer() {
    this.apiService.logOutUser(this.currentUser().refreshToken).subscribe();
  }

  logOutUser() {
    this.currentUser.set(null);
    localStorage.clear();
    this.router.navigate(['login']);
  }

  refreshAccessToken(refreshToken: string) {
    return this.apiService.refreshAccessToken(refreshToken).pipe(
      tap((response) => {
        const token = response.headers.get('access-token');
        const refreshToken = response.headers.get('refresh-token');

        this.currentUser.update((prev) => ({
          ...prev,
          token,
          refreshToken,
        }));

        this.saveCurrentUserToLocalStorage(this.currentUser());
      })
    );
  }

  getUserById(userId: string) {
    this.apiService.getUserById(userId).subscribe({
      next: (value) => {
        this.currentUser.set(value);
        this.saveCurrentUserToLocalStorage({
          ...value,
          token: this.currentUser().token,
          refreshToken: this.currentUser().refreshToken,
        });
      },
      error: (error) => console.log(error),
    });
  }

  updateUserSubcription(
    userId: string,
    subscription: 'subscribe' | 'unsubscribe'
  ) {
    this.apiService.changeSubscribe(userId, subscription).subscribe({
      next: () => {
        subscription === 'subscribe'
          ? this.notificationsService.showToast(
              'You are now subscribed to our newslatter',
              true
            )
          : this.notificationsService.showToast(
              'You are now unsubscribed from our newsletter',
              false
            ),
          this.getUserById(this.currentUser().id);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  getUserDetailsByUser() {
    this.apiService.getUserDetilsByUser().subscribe({
      next: (value) => {
        this.currentUser.update((prev) => {
          return { ...prev, userDetails: value };
        });
        this.saveCurrentUserToLocalStorage({
          ...this.currentUser(),
          token: this.currentUser().token,
          refreshToken: this.currentUser().refreshToken,
        });
      },
      error: (error) => console.log(error),
    });
  }

  updateUserPassword(userId: string, newPassword: string) {
    this.apiService.changeUserPassword(userId, newPassword).subscribe({
      next: () => {
        this.notificationsService.showToast(
          'Password changed successfully',
          true
        );
      },
      error: (error) => console.log(error),
    });
  }

  createUserDetails(userId: string, createUserDetails: CreateUserDetailsReq) {
    this.apiService.createUserDetails(userId, createUserDetails).subscribe({
      next: () => {
        this.notificationsService.showToast(
          'User details created successfully',
          true
        );
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  editUserDetails(
    userDetailsId: string,
    editUserDetailsData: CreateUserDetailsReq
  ) {
    this.apiService
      .updateUserDetails(userDetailsId, editUserDetailsData)
      .subscribe({
        next: () => {
          this.notificationsService.showToast(
            'User details changed successfully',
            true
          );
        },
        error: (err) => {
          console.log(err);
        },
      });
  }
}
