import { inject, Injectable } from '@angular/core';
import { ContactApiService } from './contact-api.service';
import { ContactModel } from '../../feature/contact/models/contact.model';
import { NotificationService } from './notification.service';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  private apiService = inject(ContactApiService);
  private notificationService = inject(NotificationService);
  constructor() {}

  createContact(createContactDto: ContactModel) {
    this.apiService.postContact(createContactDto).subscribe({
      next: () => {
        this.notificationService.showToast(
          'Message was successfully send. You will receive an answer via email!',
          true
        );
      },
      error: () => {
        this.notificationService.showToast(
          'Something went wrong, plase try again!',
          false
        );
      },
    });
  }
}
