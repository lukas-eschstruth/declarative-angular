import {Component, Input} from '@angular/core';
import {Post} from 'src/app/services/posts.service';
import {User} from 'src/app/services/user.service';

@Component({
  selector: 'app-user-posts',
  templateUrl: './user-posts.component.html',
  styleUrls: ['./user-posts.component.scss']
})
export class UserPostsComponent {
  @Input() user!: User;
  @Input() posts!: Post[] | null;
}
