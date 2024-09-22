import { CommonModule } from '@angular/common';
import {
  Component,
  effect,
  input,
  output,
  signal,
  untracked,
} from '@angular/core';

@Component({
  selector: 'app-rating-form-panel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './rating-form-panel.component.html',
  styleUrl: './rating-form-panel.component.scss',
})
export class RatingFormPanelComponent {
  ratings = signal<[number, number][]>(this.generateRatings());

  startingValue = input<number>(0);

  currentValue = signal(this.startingValue());
  hoverValue = signal(this.startingValue());

  ratingOutput = output<number>();

  constructor() {
    effect(() => {
      const startingValue = this.startingValue();

      untracked(() => {
        this.currentValue.set(startingValue);
        this.hoverValue.set(startingValue);
      });
    });
  }

  ngOnInit() {
    if (this.startingValue()) this.currentValue.set(this.startingValue());

    this.generateRatings();
  }

  generateRatings() {
    const result: [number, number][] = [];

    for (let i = 1; i <= 5; i++) {
      result.push([i - 0.5, i]);
    }

    return result;
  }

  onMouseEnter(rating: number) {
    this.hoverValue.set(rating);
  }

  onMouseLeave() {
    this.hoverValue.set(this.currentValue());
  }

  onClick(rating: number) {
    this.currentValue.set(rating);
    this.ratingOutput.emit(this.currentValue());
  }
}
