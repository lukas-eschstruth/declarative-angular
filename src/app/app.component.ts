import {Component} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {Post, PostsService} from './services/posts.service';
import {User, UserService} from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private userService: UserService, private postsService: PostsService) {
  }

  get user$(): Observable<User> {
    return this.userService.user$;
  }

  get loading$(): Observable<boolean> {
    return this.userService.loadingUser$;
  }

  get posts$(): Observable<Post[]> {
    return this.postsService.posts$;
  }

  onLoadUserClicked() {
    this.userService.loadRandomUser();
  }
}

