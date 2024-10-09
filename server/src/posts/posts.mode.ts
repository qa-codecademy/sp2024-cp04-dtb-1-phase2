import { PostsFilters } from './interfaces/posts-filters.interface';

export interface GetPostsQuery {
  firstResult: string;
  maxResults: string;
  filters?: PostsFilters;
}
