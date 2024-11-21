import { Component, inject, model } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { PostsService } from '../../core/services/posts.service';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-filter-panel',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './filter-panel.component.html',
  styleUrl: './filter-panel.component.scss',
})
export class FilterPanelComponent {
  private postsService = inject(PostsService);
  currentUser = inject(AuthService).currentUser;

  filterForm = this.generateFilterForm();

  generateFilterForm() {
    return new FormGroup({
      mainFilter: new FormControl(''),
      dateFilter: new FormControl<'ASC' | 'DESC'>(null),
      monthFilter: new FormControl<string>(''),
      myPostsFilter: new FormControl(''),
    });
  }

  onFilterClick() {
    if (this.filterForm.get('mainFilter').value === 'date') {
      this.postsService.getPostsByDate(
        1,
        10,
        this.filterForm.get('dateFilter').value
      );
    }

    if (this.filterForm.get('mainFilter').value === 'month') {
      this.postsService.getPostsByMonth(
        1,
        10,
        this.filterForm.get('monthFilter').value
      );
    }

    if (this.filterForm.get('mainFilter').value === 'myPosts') {
      this.postsService.getPostsByUser(this.currentUser().id);
    }
  }

  onResetClick() {
    this.postsService.posts.set([]);
    this.postsService.getPosts();
    this.filterForm.reset();
    this.filterForm.controls['mainFilter'].setValue('');
  }
}
