import { Component, inject, input, OnInit, signal } from '@angular/core';
import { ButtonComponent } from '../../../../shared/button/button.component';
import { Post } from '../../models/post.model';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-post-card',
  standalone: true,
  imports: [ButtonComponent, CommonModule],
  templateUrl: './post-card.component.html',
  styleUrl: './post-card.component.scss',
})
export class PostCardComponent implements OnInit {
  private router = inject(Router);
  post = input.required<Post>();

  postRating = signal<number>(0);

  ngOnInit(): void {
    if (this.post().ratings.length > 0) {
      this.calucaltePostRating();
    }
  }

  calucaltePostRating() {
    const rating =
      this.post()
        .ratings.map((rating) => rating.rating)
        .reduce((a, b) => a + b) / this.post().ratings.length;

    this.postRating.set(rating);
  }

  onLoadMoreClick() {
    this.router.navigate([`post-details/${this.post().id}`]);
  }
}
