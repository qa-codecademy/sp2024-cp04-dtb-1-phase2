import {
  Component,
  effect,
  inject,
  input,
  output,
  signal,
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ButtonComponent } from '../../../../shared/button/button.component';
import { CreatePostReq, Post, PostForm } from '../../models/post.model';
import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'app-post-form',
  standalone: true,
  imports: [ButtonComponent, ReactiveFormsModule],
  templateUrl: './post-form.component.html',
  styleUrl: './post-form.component.scss',
})
export class PostFormComponent {
  currentUser = inject(AuthService).currentUser;
  editPostData = input<Post>();
  postForm = this.generatePostFrom();
  isSubbmited = signal<boolean>(false);
  isPreviewed = signal<boolean>(false);
  previewDataOutput = output<PostForm>();
  subbmitOutput = output<CreatePostReq>();

  constructor() {
    effect(() => {
      if (this.editPostData()) {
        const editData: PostForm = {
          title: this.editPostData().title,
          text: this.editPostData().text,
          image: this.editPostData().image,
          tags: this.editPostData().tags.join(','),
        };
        this.populateForm(editData);
      }
    });
  }

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

  populateForm(post: PostForm) {
    this.postForm.setValue({
      title: post.title,
      image: post.image,
      text: post.text,
      tags: post.tags,
    });
  }

  onPreviewClick() {
    this.postForm.markAllAsTouched();
    this.isSubbmited.set(true);

    console.log(this.postForm.value);

    if (this.postForm.invalid) return;

    this.isPreviewed.set(true);

    this.previewDataOutput.emit(this.postForm.value as PostForm);
  }

  onFormSubbmit() {
    this.postForm.markAllAsTouched();

    console.log(this.postForm.value);

    if (this.postForm.invalid) return;

    const createPostData = {
      userId: this.currentUser().id,
      title: this.postForm.get('title').value,
      image: this.postForm.get('image').value,
      text: this.postForm.get('text').value,
      tags: this.postForm.get('tags').value.split(','),
    };

    console.log(createPostData);

    this.subbmitOutput.emit(createPostData);
  }

  // urlValidator(control: FormControl): { [key: string]: boolean } | null {
  //   console.log(control.value.toLowerCase().includes('.jpeg'));
  //   if (
  //     !control.value.startsWith('http') ||
  //     !(
  //       control.value.toLowerCase().includes('jpg') ||
  //       control.value.toLowerCase().includes('png') ||
  //       control.value.toLowerCase().includes('webp') ||
  //       control.value.toLowerCase().includes('jpeg')
  //     )
  //   ) {
  //     return { validUrl: true };
  //   }
  //   return null;
  // }

  onFileSelected(event: any): void {
    console.log('on image file change');
    console.log(event);
    const file = event.target.files[0];
    if (file) {
      this.convertFileToBase64(file);
    }
  }

  private convertFileToBase64(file: File): void {
    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.postForm.controls['image'].setValue(e.target.result);
    };
    reader.readAsDataURL(file);
  }
}
