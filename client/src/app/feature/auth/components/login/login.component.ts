import { Component, inject, signal } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../../core/services/auth.service';
import { ButtonComponent } from '../../../../shared/button/button.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, ButtonComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  private authService = inject(AuthService);
  isSubmitted = signal(false);
  loginForm = this.generateLoginForm();

  generateLoginForm() {
    return new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required),
    });
  }

  onFormSubmit() {
    this.loginForm.markAllAsTouched();
    this.isSubmitted.set(true);

    if (this.loginForm.invalid) return;

    console.log(this.loginForm.value);

    this.authService.loginUser({
      email: this.loginForm.value.email,
      password: this.loginForm.value.password,
    });

    this.loginForm.reset();
  }
}
