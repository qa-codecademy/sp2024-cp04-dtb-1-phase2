import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { PostsService } from '../../../../core/services/posts.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe, NgClass } from '@angular/common';
import { CommentFormComponent } from '../comment-form/comment-form.component';
import { CommentListComponent } from '../comment-list/comment-list.component';
import { ButtonComponent } from '../../../../shared/button/button.component';
import { AuthService } from '../../../../core/services/auth.service';
import { RatingFormPanelComponent } from '../../../../shared/rating-form-panel/rating-form-panel.component';
import { PostComment, PostCommentForm } from '../../models/post.model';

@Component({
  selector: 'app-post-details',
  standalone: true,
  imports: [
    DatePipe,
    CommentFormComponent,
    CommentListComponent,
    ButtonComponent,
    RatingFormPanelComponent,
    NgClass,
  ],
  templateUrl: './post-details.component.html',
  styleUrl: './post-details.component.scss',
})
export class PostDetailsComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private postsService = inject(PostsService);
  private authService = inject(AuthService);

  currentUser = this.authService.currentUser;
  post = this.postsService.selectedPost;
  rating = this.postsService.selectedRating;
  comments = this.postsService.comments;
  commentsTotalCount = this.postsService.commentsTotalCount;
  currentPage = signal(1);
  maxPages = computed(() => Math.ceil(this.commentsTotalCount() / 10));
  currentCommentData = signal<PostComment>(null);

  ngOnInit() {
    const postId = this.route.snapshot.params.id;

    this.postsService.getPostById(postId);
    this.postsService.findRatingByUserAndPost(this.currentUser().id, postId);
  }

  onAddComment(text: string) {
    this.currentPage.set(1);
    this.postsService.createPostComment(
      this.currentUser().id,
      this.post().id,
      text
    );
  }

  onPostNavigate(route: 'delete' | 'edit') {
    if (route === 'delete') {
      this.postsService.deletePost(this.post().id);
    }

    if (route === 'edit') {
      this.router.navigate([`edit-post/${this.post().id}`]);
    }
  }

  onLoadmore() {
    this.currentPage.update((prev) => prev + 1);

    this.postsService.getPostComments(
      this.post().id,
      (this.currentPage() - 1) * 10 + 1,
      10
    );
  }

  onChangeRating(rating: number) {
    this.postsService.createPostRating(
      this.currentUser().id,
      this.post().id,
      rating
    );
  }

  onCommentOutput(commentData: PostComment) {
    this.currentCommentData.set(commentData);
  }
}
