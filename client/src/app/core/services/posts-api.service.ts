import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BASE_URL } from '../conststants/core.conststants';
import {
  CreatePostReq,
  GetPostCommentsResponse,
  GetPostResponse,
  Post,
  PostRating,
  UpdatePostReq,
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

  fetchPostsByMonth(firstResult: number, maxResults: number, month: string) {
    return this.http.get<GetPostResponse>(`${BASE_URL}/posts?month=${month}`, {
      params: {
        firstResult,
        maxResults,
      },
    });
  }

  fetchPostsByDate(
    firstResult: number,
    maxResults: number,
    orderBy: 'ASC' | 'DESC'
  ) {
    return this.http.get<GetPostResponse>(
      `${BASE_URL}/posts?orderBy=${orderBy}`,
      {
        params: {
          firstResult,
          maxResults,
        },
      }
    );
  }

  fetchPostsByUser(userId: string) {
    return this.http.get<Post[]>(`${BASE_URL}/users/posts/${userId}`);
  }

  fetchPostById(postId: number) {
    return this.http.get<Post>(`${BASE_URL}/posts/${postId}`);
  }

  createPost(postData: CreatePostReq) {
    return this.http.post<Post>(`${BASE_URL}/posts`, postData);
  }

  patchPost(postId: number, postData: UpdatePostReq) {
    return this.http.patch(`${BASE_URL}/posts/${postId}`, postData);
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

  deleteComment(commentId: number) {
    return this.http.delete(`${BASE_URL}/comments/${commentId}`);
  }

  patchComment(commentId: number, commentText: string) {
    return this.http.patch(`${BASE_URL}/comments/${commentId}`, {
      text: commentText,
    });
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
