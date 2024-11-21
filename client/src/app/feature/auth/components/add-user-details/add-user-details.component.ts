import { Component, inject } from '@angular/core';
import { UserDetailsFormComponent } from '../user-details-form/user-details-form.component';
import { AuthService } from '../../../../core/services/auth.service';
import { Router } from '@angular/router';
import { CreateUserDetailsReq } from '../../models/auth.model';

@Component({
  selector: 'app-add-user-details',
  standalone: true,
  imports: [UserDetailsFormComponent],
  templateUrl: './add-user-details.component.html',
  styleUrl: './add-user-details.component.scss',
})
export class AddUserDetailsComponent {
  private authService = inject(AuthService);
  private router = inject(Router);

  currentUser = this.authService.currentUser;

  onAddUserDetails(addUserDetails: CreateUserDetailsReq) {
    this.authService.createUserDetails(this.currentUser().id, addUserDetails);
    this.router.navigate(['user-details']);
  }
}
