import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ButtonComponent } from '../../shared/button/button.component';
import { ContactService } from '../../core/services/contact.service';
import { ContactModel } from './models/contact.model';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [ReactiveFormsModule, ButtonComponent],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss',
})
export class ContactComponent {
  private contactService = inject(ContactService);
  contactForm = this.generateContactForm();

  messageMaxLength = 250;
  messageMinLength = 50;

  generateContactForm() {
    return new FormGroup({
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      mobile: new FormControl('', Validators.required),
      message: new FormControl('', [
        Validators.required,
        Validators.minLength(this.messageMinLength),
        Validators.maxLength(this.messageMaxLength),
      ]),
    });
  }

  onFormSubmit() {
    this.contactForm.markAllAsTouched();

    if (this.contactForm.invalid) return;

    console.log(this.contactForm.value);

    const contactReq: ContactModel = {
      firstName: this.contactForm.controls.firstName.value,
      lastName: this.contactForm.controls.lastName.value,
      email: this.contactForm.controls.email.value,
      phoneNumber: this.contactForm.controls.mobile.value,
      message: this.contactForm.controls.message.value,
    };

    this.contactService.createContact(contactReq);
  }
}
