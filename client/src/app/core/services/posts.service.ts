import { inject, Injectable, OnInit, signal } from '@angular/core';
import { PostsApiService } from './posts-api.service';
import {
  CreatePostReq,
  Post,
  PostComment,
  UpdatePostReq,
} from '../../feature/posts/models/post.model';
import { Router } from '@angular/router';
import { NotificationService } from './notification.service';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  private apiService = inject(PostsApiService);
  private router = inject(Router);
  private notificationsService = inject(NotificationService);

  posts = signal<Post[]>([]);

  totalPostCount = signal<number>(0);
  selectedPost = signal<Post>(null);
  selectedRating = signal<number>(0);
  commentsTotalCount = signal(0);
  comments = signal<PostComment[]>([]);

  getPosts(firstResult: number = 1, maxResults: number = 10) {
    return this.apiService.fetchAllPosts(firstResult, maxResults).subscribe({
      next: (response) => {
        this.posts.update((prev) => [...prev, ...response.posts]);
        this.totalPostCount.set(response.totalCount);
      },
      error: (err) => console.log(err),
    });
  }

  getPostsByDate(
    firstResult: number = 1,
    maxResults: number = 10,
    orderBy?: 'ASC' | 'DESC'
  ) {
    return this.apiService
      .fetchPostsByDate(firstResult, maxResults, orderBy)
      .subscribe({
        next: (response) => {
          this.posts.set([]);
          this.posts.update((prev) => [...prev, ...response.posts]);
          this.totalPostCount.set(response.totalCount);
        },
        error: (err) => console.log(err),
      });
  }

  getPostsByMonth(
    firstResult: number = 1,
    maxResults: number = 10,
    month: string
  ) {
    return this.apiService
      .fetchPostsByMonth(firstResult, maxResults, month)
      .subscribe({
        next: (response) => {
          this.posts.set([]);
          this.posts.update((prev) => [...prev, ...response.posts]);
          this.totalPostCount.set(response.totalCount);
        },
        error: (err) => console.log(err),
      });
  }

  getPostsByUser(userId: string) {
    return this.apiService.fetchPostsByUser(userId).subscribe({
      next: (response) => {
        this.posts.set([]);
        this.posts.update((prev) => [...prev, ...response]);
      },
      error: (err) => console.log(err),
    });
  }

  getPostById(postId: number) {
    this.apiService.fetchPostById(postId).subscribe({
      next: (res) => {
        this.selectedPost.set(res);
        this.selectedRating.set(0);
        this.comments.set([]);
        this.getPostComments(postId);
      },
      error: (error) => console.log(error),
    });
  }

  createPost(postData: CreatePostReq) {
    this.apiService.createPost(postData).subscribe({
      next: (value) => {
        this.notificationsService.showToast('Successfully created post!', true);
        this.router.navigate([`post-details/${value.id}`]);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  editPost(postId: number, postData: UpdatePostReq) {
    console.log(postData);
    this.apiService.patchPost(postId, postData).subscribe({
      next: () => {
        this.notificationsService.showToast('Successfully edited post!', true);
        this.router.navigate([`post-details/${this.selectedPost().id}`]);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  deletePost(postId: number) {
    this.apiService.deletePost(postId).subscribe({
      next: () => {
        this.notificationsService.showToast('Successfully deleted post!', true);
        this.posts.set([]);
        this.router.navigate([`/`]);
      },
      error: (error) => console.log(error),
    });
  }

  getPostComments(
    postId: number,
    firstResult: number = 1,
    maxResults: number = 10
  ) {
    this.apiService
      .fetchPostComments(postId, firstResult, maxResults)
      .subscribe({
        next: (value) => {
          this.comments.update((prev) => [...prev, ...value.comments]);
          this.commentsTotalCount.set(value.totalCount);
        },
        error: (error) => console.log(error),
      });
  }

  createPostComment(userId: string, postId: number, text: string) {
    this.apiService.postComment(userId, postId, text).subscribe({
      next: () => {
        this.comments.set([]);
        this.getPostComments(postId);
        this.notificationsService.showToast(
          'Successfully added a comment!',
          true
        );
      },
      error: (error) => console.log(error),
    });
  }

  deleteComment(commentId: number) {
    this.apiService.deleteComment(commentId).subscribe({
      next: () => {
        this.comments.set([]);
        this.getPostComments(this.selectedPost().id);
        this.notificationsService.showToast(
          'Successfully deleted a comment!',
          true
        );
      },
      error: (error) => console.log(error),
    });
  }

  editComment(commentId: number, commentText: string) {
    this.apiService.patchComment(commentId, commentText).subscribe({
      next: () => {
        this.comments.set([]);
        this.getPostComments(this.selectedPost().id);
      },
      error: (error) => console.log(error),
    });
  }

  createPostRating(userId: string, postId: number, rating: number) {
    this.apiService.postRating(userId, postId, rating).subscribe({
      next: () => {},
      error: (error) =>
        this.notificationsService.showToast(
          'You cannot add rating for your post',
          false
        ),
    });
  }

  findRatingByUserAndPost(userId: string, postId: number) {
    this.apiService.getRatingByUserAndPost(userId, postId).subscribe({
      next: (value) => {
        if (value !== null) {
          this.selectedRating.set(value.rating);
        }
      },
      error: (error) => console.log(error),
    });
  }
}
