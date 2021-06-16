import {ChangeDetectionStrategy, Component} from '@angular/core';
import {Observable, Subject} from 'rxjs';
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

  get user$(): Observable<User> {
    // a console.log as quick and dirty measure of how often change detection is run
    // set changeDetection to ChangeDetectionStrategy.Default to see the difference
    console.log('get user$() called');
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

  onRandomButtonClicked() {
    console.log('onRandomButtonClicked');

  }
}

