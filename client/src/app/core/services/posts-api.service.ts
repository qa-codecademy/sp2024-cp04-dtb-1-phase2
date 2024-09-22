import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BASE_URL } from '../conststants/core.conststants';
import {
  GetPostCommentsResponse,
  GetPostResponse,
  Post,
  PostRating,
} from '../../feature/posts/models/post.model';

@Injectable({
  providedIn: 'root',
})
export class PostsApiService {
  private http = inject(HttpClient);
  constructor() {}

  fetchAllPosts(firstResult: number, maxResults: number) {
    return this.http.get<GetPostResponse>(`${BASE_URL}/posts`, {
      params: {
        firstResult,
        maxResults,
      },
    });
  }

  fetchPostById(postId: number) {
    return this.http.get<Post>(`${BASE_URL}/posts/${postId}`);
  }

  deletePost(postId: number) {
    return this.http.delete(`${BASE_URL}/posts/${postId}`);
  }

  fetchPostComments(postId: number, firstResult: number, maxResults: number) {
    return this.http.get<GetPostCommentsResponse>(
      `${BASE_URL}/comments/posts/${postId}`,
      {
        params: {
          firstResult,
          maxResults,
        },
      }
    );
  }

  postComment(userId: string, postId: number, text: string) {
    return this.http.post(`${BASE_URL}/comments`, { userId, postId, text });
  }

  postRating(userId: string, postId: number, rating: number) {
    return this.http.post(`${BASE_URL}/ratings/add-rating`, {
      userId,
      postId,
      rating,
    });
  }

  getRatingByUserAndPost(userId: string, postId: number) {
    return this.http.get<PostRating>(
      `${BASE_URL}/ratings/user/${userId}/post/${postId}`
    );
  }
}
