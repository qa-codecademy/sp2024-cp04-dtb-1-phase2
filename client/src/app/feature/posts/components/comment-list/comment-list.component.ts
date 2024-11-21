import { Component, inject, input, output } from '@angular/core';
import { PostComment, PostCommentForm } from '../../models/post.model';
import { DatePipe } from '@angular/common';
import { AuthService } from '../../../../core/services/auth.service';
import { PostsService } from '../../../../core/services/posts.service';

@Component({
  selector: 'app-comment-list',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './comment-list.component.html',
  styleUrl: './comment-list.component.scss',
})
export class CommentListComponent {
  private postsService = inject(PostsService);
  comments = input.required<PostComment[]>();
  currentUser = inject(AuthService).currentUser;

  onCommentDelete(commentId: number) {
    this.postsService.deleteComment(commentId);
  }
}
