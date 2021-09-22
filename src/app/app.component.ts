import {ChangeDetectionStrategy, Component} from '@angular/core';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';
import {Post, PostsService} from './services/posts.service';
import {User, UserService} from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  constructor(private userService: UserService, private postsService: PostsService) {
  }

  // a console.log as quick and dirty measure of how often change detection is run
  // set changeDetection to ChangeDetectionStrategy.Default to see the difference
  user$: Observable<User> = this.userService.user$.pipe(tap(() => console.log('get user$() called')));

  get loading$(): Observable<boolean> {
    return this.userService.loadingUser$;
  }

  get posts$(): Observable<Post[]> {
    return this.postsService.posts$;
  }

  onLoadUserClicked() {
    console.log('onLoadUserClicked');
    this.userService.loadRandomUser();
  }
}

