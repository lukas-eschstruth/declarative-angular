import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import {exhaustMap, shareReplay, startWith, tap, throttleTime} from 'rxjs/operators';

export type User = {
  id: number,
  name: string,
  username: string,
  email: string,
  address?: {
    street: string,
    suite: string,
    city: string,
    zipcode: string,
    geo: {
      lat: number,
      lng: number
    }
  },
  phone?: string,
  website?: string,
  company?: {
    name: string,
    catchPhrase: string,
    bs: string
  }
}

const DEFAULT_USER: User = {
  id: 0,
  name: '-',
  username: '-',
  email: ''
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private selectedUserIdSubject = new Subject<number>();
  selectedUserId$ = this.selectedUserIdSubject.pipe(
    // update id at most once every 500ms
    throttleTime(500)
  );

  // stream of the current user depending on the selected id
  user$: Observable<User> = this.selectedUserId$.pipe(
    tap(() => this.loadingUserSubject.next(true)),
    // use exhaustMap to ignore new ids while there is an ongoing http call
    exhaustMap(id => this.http.get<User>(`https://jsonplaceholder.typicode.com/users/${id}`),
    ),
    startWith(DEFAULT_USER),
    // cache the last result so duplicate network calls are avoided
    shareReplay(1),
    tap(() => this.loadingUserSubject.next(false)),
  );

  private loadingUserSubject = new BehaviorSubject<boolean>(false);
  loadingUser$ = this.loadingUserSubject.asObservable();

  constructor(private http: HttpClient) {
  }

  loadUser(id: number) {
    this.selectedUserIdSubject.next(id);
  }

  loadRandomUser() {
    const id = Math.ceil(Math.random() * 10);
    this.loadUser(id);
  }
}


