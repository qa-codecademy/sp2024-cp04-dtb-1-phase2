import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ButtonComponent } from '../../shared/button/button.component';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [ReactiveFormsModule, ButtonComponent],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss',
})
export class ContactComponent {
  contactForm = this.generateContactForm();

  messageMaxLength = 250;

  generateContactForm() {
    return new FormGroup({
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      mobile: new FormControl('', Validators.required),
      message: new FormControl('', [
        Validators.required,
        Validators.maxLength(this.messageMaxLength),
      ]),
    });
  }

  onFormSubmit() {
    this.contactForm.markAllAsTouched();

    if (this.contactForm.invalid) return;

    console.log(this.contactForm.value);

    this.contactForm.reset();
  }
}
