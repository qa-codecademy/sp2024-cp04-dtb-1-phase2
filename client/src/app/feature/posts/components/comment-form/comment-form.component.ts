import { Component, output, signal } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ButtonComponent } from '../../../../shared/button/button.component';

@Component({
  selector: 'app-comment-form',
  standalone: true,
  imports: [ReactiveFormsModule, ButtonComponent],
  templateUrl: './comment-form.component.html',
  styleUrl: './comment-form.component.scss',
})
export class CommentFormComponent {
  maxLength = 150;
  isSubbmited = signal<boolean>(false);

  commentOutput = output<string>();

  commentForm = new FormGroup({
    text: new FormControl('', [
      Validators.required,
      Validators.maxLength(this.maxLength),
    ]),
  });

  onFormSubmit() {
    this.commentForm.markAllAsTouched();

    this.isSubbmited.set(true);

    if (this.commentForm.invalid) return;

    this.commentOutput.emit(this.commentForm.controls.text.value);

    this.commentForm.reset({
      text: '',
    });
  }
}
