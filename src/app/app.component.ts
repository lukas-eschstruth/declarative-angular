import {Component} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {User, UserService} from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private userService: UserService) {
  }

  get user$(): Observable<User> {
    return this.userService.user$;
  }

  onLoadUserClicked() {
    this.userService.loadRandomUser();
  }
}

