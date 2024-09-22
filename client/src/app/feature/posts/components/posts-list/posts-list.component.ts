import {
  Component,
  computed,
  inject,
  input,
  OnInit,
  signal,
} from '@angular/core';
import { PostsService } from '../../../../core/services/posts.service';
import { PostCardComponent } from '../post-card/post-card.component';
import { SearchPipe } from '../../../../core/pipes/search.pipe';
import { ButtonComponent } from '../../../../shared/button/button.component';

@Component({
  selector: 'app-posts-list',
  standalone: true,
  imports: [PostCardComponent, SearchPipe, ButtonComponent],
  templateUrl: './posts-list.component.html',
  styleUrl: './posts-list.component.scss',
})
export class PostsListComponent implements OnInit {
  private postsService = inject(PostsService);

  searchValue = input<string>();
  posts = this.postsService.posts;
  postsTotalCount = this.postsService.totalPostCount;
  maxPages = computed(() => Math.ceil(this.postsTotalCount() / 10));
  currentPage = signal(1);

  ngOnInit(): void {
    this.posts.set([]);
    this.postsService.getPosts();
  }

  onLoadMore() {
    this.currentPage.update((prev) => prev + 1);

    this.postsService.getPosts((this.currentPage() - 1) * 10 + 1, 10);
  }
}
