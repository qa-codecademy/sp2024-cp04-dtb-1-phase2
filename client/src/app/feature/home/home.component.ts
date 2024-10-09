import { Component, model } from '@angular/core';
import { PostsListComponent } from '../posts/components/posts-list/posts-list.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonComponent } from '../../shared/button/button.component';
import { FilterPanelComponent } from '../../shared/filter-panel/filter-panel.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    PostsListComponent,
    CommonModule,
    FormsModule,
    ButtonComponent,
    FilterPanelComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  searchValue = model<string>('');
}
