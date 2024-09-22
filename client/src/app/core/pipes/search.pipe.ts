import { Pipe, PipeTransform } from '@angular/core';
import { Post } from '../../feature/posts/models/post.model';

@Pipe({
  name: 'search',
  standalone: true,
})
export class SearchPipe implements PipeTransform {
  transform(value: Post[], searchValue: string): Post[] {
    if (!searchValue) return value;

    const filteredPosts = value.filter((post) =>
      post.title.toLowerCase().includes(searchValue.toLowerCase().trim())
    );

    return filteredPosts;
  }
}
