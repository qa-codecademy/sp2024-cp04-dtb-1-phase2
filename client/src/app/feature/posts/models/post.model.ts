import { User } from '../../auth/models/auth.model';

export interface Post {
  id: number;
  title: string;
  text: string;
  image: string;
  date: string;
  tags: string[];
  ratings: PostRating[];
  comments: string[];
  user: User;
}

export interface PostForm {
  title: string;
  image: string;
  text: string;
  tags: string;
}

export interface CreatePostReq {
  userId: string;
  title: string;
  image: string;
  text: string;
  tags: string[];
}

export interface UpdatePostReq {
  userId: string;
  title: string;
  image: string;
  text: string;
  tags: string[];
}

export interface PostRating {
  id: number;
  user: User;
  post: Post;
  rating: number;
}

export interface GetPostResponse {
  posts: Post[];
  totalCount: number;
}

export interface PostComment {
  id: number;
  text: string;
  date: string;
  user: {
    id: string;
    username: string;
  };
}

export interface PostCommentForm {
  commentId: number;
  commentText: string;
}

export interface GetPostCommentsResponse {
  comments: PostComment[];
  totalCount: number;
}

export interface PostRequest {
  title: string;
  text: string;
  image: string;
  tags: string[];
  user: string;
}
