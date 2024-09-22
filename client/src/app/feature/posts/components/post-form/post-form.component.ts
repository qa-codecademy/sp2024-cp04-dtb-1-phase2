import { Component, signal } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ButtonComponent } from '../../../../shared/button/button.component';

@Component({
  selector: 'app-post-form',
  standalone: true,
  imports: [ButtonComponent, ReactiveFormsModule],
  templateUrl: './post-form.component.html',
  styleUrl: './post-form.component.scss',
})
export class PostFormComponent {
  postForm = this.generatePostFrom();
  isSubbmited = signal<boolean>(false);

  generatePostFrom() {
    return new FormGroup({
      title: new FormControl('', [
        Validators.required,
        Validators.maxLength(200),
      ]),
      image: new FormControl('', [Validators.required]),
      text: new FormControl('', [Validators.required]),
      tags: new FormControl('', [Validators.required]),
    });
  }

  onFormSubbmit() {
    this.postForm.markAllAsTouched();
    this.isSubbmited.set(true);

    if (this.postForm.invalid) return;

    console.log(this.postForm.value);
  }
}
