import { Component, inject, signal } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RouterLink } from '@angular/router';
import { RegisterReq } from '../../models/auth.model';
import { AuthService } from '../../../../core/services/auth.service';
import { ButtonComponent } from '../../../../shared/button/button.component';
import isEmail from 'validator/lib/isEmail';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, ButtonComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  private authService = inject(AuthService);

  isSubmitted = signal(false);

  registerForm = this.generateRegisterForm();

  generateRegisterForm() {
    return new FormGroup(
      {
        firstName: new FormControl('', [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(20),
          this.nameValidator,
        ]),
        lastName: new FormControl('', [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(20),
          this.nameValidator,
        ]),
        username: new FormControl('', [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(20),
        ]),
        email: new FormControl('', [
          Validators.required,
          Validators.minLength(15),
          this.emailValidator,
        ]),
        password: new FormControl('', [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(30),
        ]),
        confirmPassword: new FormControl('', Validators.required),
      },
      this.confirmPasswordValidator
    );
  }

  nameValidator(control: FormControl): { [key: string]: boolean } | null {
    let firstNameRegex = '^[a-zA-Z]+$';

    if (!control.value.match(firstNameRegex)) {
      return { validName: true };
    }

    return null;
  }

  emailValidator(control: FormControl): { [key: string]: boolean } | null {
    console.log('email validator', isEmail(control.value));
    if (!isEmail(control.value)) {
      return { validEmail: true };
    }

    return null;
  }

  confirmPasswordValidator(form: AbstractControl): null {
    const passwordControl = form.get('password');
    const confirmPasswordControl = form.get('confirmPassword');

    if (passwordControl.value !== confirmPasswordControl.value) {
      confirmPasswordControl.setErrors({ passwordMismatch: true });
    } else {
      confirmPasswordControl.setErrors(null);
    }

    return null;
  }

  onFormSubmit() {
    this.registerForm.markAllAsTouched();
    this.isSubmitted.set(true);

    if (this.registerForm.invalid) return;

    console.log(this.registerForm.value);

    const registerRequest: RegisterReq = {
      firstName: this.registerForm.value.firstName,
      lastName: this.registerForm.value.lastName,
      username: this.registerForm.value.username,
      email: this.registerForm.value.email,
      password: this.registerForm.value.password,
    };

    this.authService.registerUser(registerRequest);
  }
}
