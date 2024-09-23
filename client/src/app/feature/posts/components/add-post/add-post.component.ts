import { Component, inject, signal } from '@angular/core';
import { PostFormComponent } from '../post-form/post-form.component';
import { RatingFormPanelComponent } from '../../../../shared/rating-form-panel/rating-form-panel.component';
import { ButtonComponent } from '../../../../shared/button/button.component';
import { CommentListComponent } from '../comment-list/comment-list.component';
import { CommentFormComponent } from '../comment-form/comment-form.component';
import { CreatePostReq, PostForm } from '../../models/post.model';
import { PostsService } from '../../../../core/services/posts.service';

@Component({
  selector: 'app-add-post',
  standalone: true,
  imports: [
    PostFormComponent,
    RatingFormPanelComponent,
    ButtonComponent,
    CommentFormComponent,
    CommentListComponent,
  ],
  templateUrl: './add-post.component.html',
  styleUrl: './add-post.component.scss',
})
export class AddPostComponent {
  private postsService = inject(PostsService);
  addPostData = signal<PostForm>(null);

  onFromData(formData: PostForm) {
    this.addPostData.set(formData);
  }

  onAddPost(postData: CreatePostReq) {
    this.postsService.createPost(postData);
  }
}
