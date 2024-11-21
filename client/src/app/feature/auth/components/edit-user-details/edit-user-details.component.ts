import { Component, inject } from '@angular/core';
import { UserDetailsFormComponent } from '../user-details-form/user-details-form.component';
import { AuthService } from '../../../../core/services/auth.service';

import { CreateUserDetailsReq } from '../../models/auth.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-user-details',
  standalone: true,
  imports: [UserDetailsFormComponent],
  templateUrl: './edit-user-details.component.html',
  styleUrl: './edit-user-details.component.scss',
})
export class EditUserDetailsComponent {
  private authService = inject(AuthService);
  private router = inject(Router);

  currentUser = this.authService.currentUser;

  onEdituserDetails(editUserDetails: CreateUserDetailsReq) {
    this.authService.editUserDetails(
      this.currentUser().userDetails.id,
      editUserDetails
    );
    this.router.navigate(['user-details']);
  }
}
