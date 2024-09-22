import { inject, Injectable, OnInit, signal } from '@angular/core';
import { PostsApiService } from './posts-api.service';
import {
  Post,
  PostComment,
  PostRating,
} from '../../feature/posts/models/post.model';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  private apiService = inject(PostsApiService);

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

  deletePost(postId: number) {
    this.apiService.deletePost(postId).subscribe({
      next: () => {
        console.log('post deleted');
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
      },
      error: (error) => console.log(error),
    });
  }

  createPostRating(userId: string, postId: number, rating: number) {
    this.apiService.postRating(userId, postId, rating).subscribe({
      next: () => {
        console.log('Rating added');
      },
      error: (error) => console.log(error),
    });
  }

  findRatingByUserAndPost(userId: string, postId: number) {
    this.apiService.getRatingByUserAndPost(userId, postId).subscribe({
      next: (value) => {
        console.log(value);
        this.selectedRating.set(value.rating);
      },
      error: (error) => console.log(error),
    });
  }
}
