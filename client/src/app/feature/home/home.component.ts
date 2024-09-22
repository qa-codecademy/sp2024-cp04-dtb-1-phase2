import { Component, model } from '@angular/core';
import { PostsListComponent } from '../posts/components/posts-list/posts-list.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [PostsListComponent, CommonModule, FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  searchValue = model<string>('');
}
