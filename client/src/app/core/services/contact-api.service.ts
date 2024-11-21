import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ContactModel } from '../../feature/contact/models/contact.model';
import { BASE_URL } from '../conststants/core.conststants';

@Injectable({
  providedIn: 'root',
})
export class ContactApiService {
  private http = inject(HttpClient);
  constructor() {}

  postContact(createContactDto: ContactModel) {
    return this.http.post(`${BASE_URL}/contact`, createContactDto);
  }
}
