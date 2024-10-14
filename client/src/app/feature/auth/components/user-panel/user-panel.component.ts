import { Component, inject, OnInit, signal } from '@angular/core';
import { AuthService } from '../../../../core/services/auth.service';
import { ButtonComponent } from '../../../../shared/button/button.component';
import { CommonModule } from '@angular/common';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-user-panel',
  standalone: true,
  imports: [ButtonComponent, CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './user-panel.component.html',
  styleUrl: './user-panel.component.scss',
})
export class UserPanelComponent implements OnInit {
  private authService = inject(AuthService);

  user = this.authService.currentUser;

  isAuthInfoShown = signal(false);
  isSubmitted = signal<boolean>(false);

  changePasswordForm = this.generateChangePasswordForm();

  generateChangePasswordForm() {
    return new FormGroup(
      {
        newPassword: new FormControl('', [
          Validators.required,
          Validators.max(30),
          Validators.min(8),
        ]),
        confirmNewPassword: new FormControl('', [Validators.required]),
      },
      this.confirmPasswordValidator
    );
  }

  ngOnInit(): void {
    this.authService.getUserDetailsByUser();
  }

  onUserInfoClick() {
    this.isAuthInfoShown.set(true);
  }

  onPersonalInfoClick() {
    this.isAuthInfoShown.set(false);
  }

  confirmPasswordValidator(form: AbstractControl): null {
    const passwordControl = form.get('newPassword');
    const confirmPasswordControl = form.get('confirmNewPassword');

    if (passwordControl.value !== confirmPasswordControl.value) {
      confirmPasswordControl.setErrors({ passwordMismatch: true });
    } else {
      confirmPasswordControl.setErrors(null);
    }

    return null;
  }

  onLogoutClick() {
    this.authService.logOutUserFromServer();
    this.authService.logOutUser();
  }

  onSubmitChangePassForm() {
    console.log('click');
    this.changePasswordForm.markAllAsTouched();
    this.isSubmitted.set(true);

    if (this.changePasswordForm.invalid) return;

    console.log(this.changePasswordForm.value);

    this.authService.updateUserPassword(
      this.user().id,
      this.changePasswordForm.value.newPassword
    );

    this.changePasswordForm.reset();
  }
}
