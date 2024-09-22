import { Component } from '@angular/core';
import { PostFormComponent } from '../post-form/post-form.component';

@Component({
  selector: 'app-add-post',
  standalone: true,
  imports: [PostFormComponent],
  templateUrl: './add-post.component.html',
  styleUrl: './add-post.component.scss',
})
export class AddPostComponent {}
