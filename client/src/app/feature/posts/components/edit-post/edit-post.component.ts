import { Component } from '@angular/core';
import { PostFormComponent } from '../post-form/post-form.component';

@Component({
  selector: 'app-edit-post',
  standalone: true,
  imports: [PostFormComponent],
  templateUrl: './edit-post.component.html',
  styleUrl: './edit-post.component.scss',
})
export class EditPostComponent {}
