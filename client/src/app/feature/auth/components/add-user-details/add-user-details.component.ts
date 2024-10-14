import { Component } from '@angular/core';
import { UserDetailsFormComponent } from '../user-details-form/user-details-form.component';

@Component({
  selector: 'app-add-user-details',
  standalone: true,
  imports: [UserDetailsFormComponent],
  templateUrl: './add-user-details.component.html',
  styleUrl: './add-user-details.component.scss',
})
export class AddUserDetailsComponent {}
