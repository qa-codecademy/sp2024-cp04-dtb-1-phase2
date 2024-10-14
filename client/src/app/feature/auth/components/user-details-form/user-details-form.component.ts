import { Component, effect, input, output, signal } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ButtonComponent } from '../../../../shared/button/button.component';
import { CreateUserDetailsReq, User } from '../../models/auth.model';

@Component({
  selector: 'app-user-details-form',
  standalone: true,
  imports: [ReactiveFormsModule, ButtonComponent],
  templateUrl: './user-details-form.component.html',
  styleUrl: './user-details-form.component.scss',
})
export class UserDetailsFormComponent {
  userDetailsFrom = this.generateUserDetailsFrom();
  isSubbmited = signal<boolean>(false);
  editUserDetailsData = input<User>();
  subbmitOutput = output<CreateUserDetailsReq>();

  generateUserDetailsFrom() {
    return new FormGroup({
      phoneNumber: new FormControl('', [Validators.required]),
      age: new FormControl<number>(null, [Validators.required]),
      dateOfBirth: new FormControl('', [Validators.required]),
      gender: new FormControl('', [Validators.required]),
      city: new FormControl('', [Validators.required]),
      country: new FormControl('', [Validators.required]),
    });
  }

  constructor() {
    effect(() => {
      if (this.editUserDetailsData()) {
        const editData: CreateUserDetailsReq = {
          phoneNumber: this.editUserDetailsData().userDetails.phoneNumber,
          age: this.editUserDetailsData().userDetails.age,
          dateOfBirth: this.editUserDetailsData().userDetails.dateOfBirth,
          gender: this.editUserDetailsData().userDetails.gender,
          city: this.editUserDetailsData().userDetails.city,
          country: this.editUserDetailsData().userDetails.country,
        };
        this.populateForm(editData);
      }
    });
  }

  populateForm(user: CreateUserDetailsReq) {
    this.userDetailsFrom.setValue({
      phoneNumber: String(user.phoneNumber),
      age: user.age,
      dateOfBirth: user.dateOfBirth,
      gender: user.gender,
      city: user.city,
      country: user.country,
    });
  }

  onSubmitForm() {
    this.userDetailsFrom.markAllAsTouched();
    this.isSubbmited.set(true);

    if (this.userDetailsFrom.invalid) return;

    console.log(this.userDetailsFrom.value);

    const userDetailsData: CreateUserDetailsReq = {
      phoneNumber: Number(this.userDetailsFrom.controls.phoneNumber.value),
      age: this.userDetailsFrom.controls.age.value,
      dateOfBirth: this.userDetailsFrom.controls.dateOfBirth.value,
      gender: this.userDetailsFrom.controls.gender.value,
      city: this.userDetailsFrom.controls.city.value,
      country: this.userDetailsFrom.controls.country.value,
    };

    this.subbmitOutput.emit(userDetailsData);
  }
}
