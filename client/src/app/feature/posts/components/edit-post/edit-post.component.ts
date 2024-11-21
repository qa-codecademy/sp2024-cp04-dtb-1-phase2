import { Component, effect, inject, OnInit, signal } from '@angular/core';
import { PostFormComponent } from '../post-form/post-form.component';
import { ActivatedRoute, Router } from '@angular/router';
import { PostsService } from '../../../../core/services/posts.service';
import { AuthService } from '../../../../core/services/auth.service';
import {
  CreatePostReq,
  PostForm,
  UpdatePostReq,
} from '../../models/post.model';
import { RatingFormPanelComponent } from '../../../../shared/rating-form-panel/rating-form-panel.component';
import { CommentFormComponent } from '../comment-form/comment-form.component';

@Component({
  selector: 'app-edit-post',
  standalone: true,
  imports: [PostFormComponent, RatingFormPanelComponent, CommentFormComponent],
  templateUrl: './edit-post.component.html',
  styleUrl: './edit-post.component.scss',
})
export class EditPostComponent implements OnInit {
  private postsService = inject(PostsService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  currentUser = inject(AuthService).currentUser;
  selectedPost = this.postsService.selectedPost;
  previewEditData = signal(null);

  constructor() {
    effect(() => {
      if (!this.selectedPost()) return;

      if (this.selectedPost()?.user.id !== this.currentUser().id) {
        this.router.navigate(['']);
      }
    });
  }

  ngOnInit() {
    const id = this.route.snapshot.params.id;

    if (!this.selectedPost()) {
      this.postsService.getPostById(id);
    }
  }

  onEditPost(editPostData: UpdatePostReq) {
    console.log('id', this.selectedPost().id);
    this.postsService.editPost(this.selectedPost().id, editPostData);
  }

  onPreview(previewData: PostForm) {
    this.previewEditData.set(previewData);
  }
}
