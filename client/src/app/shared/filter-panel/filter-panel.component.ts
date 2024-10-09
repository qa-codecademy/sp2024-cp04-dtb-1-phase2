import { CommonModule } from '@angular/common';
import { Component, inject, model } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PostsService } from '../../core/services/posts.service';

@Component({
  selector: 'app-filter-panel',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './filter-panel.component.html',
  styleUrl: './filter-panel.component.scss',
})
export class FilterPanelComponent {
  private postsService = inject(PostsService);
  selectFilterValue = model<string>('');
  selectDateFilterValue = model<'ASC' | 'DESC'>(null);
  selectMonthFilterValue = model<string>('');

  onFilterClick() {
    if (this.selectFilterValue() === 'date') {
      this.postsService.getPostsByDate(1, 10, this.selectDateFilterValue());
    }

    if (this.selectFilterValue() === 'month') {
      this.postsService.getPostsByMonth(1, 10, this.selectMonthFilterValue());
    }
  }

  onResetClick() {
    this.postsService.posts.set([]);
    this.selectFilterValue.set('');
    this.selectDateFilterValue.set(null);
    this.selectMonthFilterValue.set('');
    this.postsService.getPosts();
  }
}
