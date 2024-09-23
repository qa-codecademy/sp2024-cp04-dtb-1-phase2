import { Component, inject, input } from '@angular/core';
import { PostComment } from '../../models/post.model';
import { DatePipe } from '@angular/common';
import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'app-comment-list',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './comment-list.component.html',
  styleUrl: './comment-list.component.scss',
})
export class CommentListComponent {
  comments = input.required<PostComment[]>();
  currentUser = inject(AuthService).currentUser;
}
