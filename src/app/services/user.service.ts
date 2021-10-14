import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import {exhaustMap, map, shareReplay, startWith, tap, throttleTime} from 'rxjs/operators';
import {RandomIntegerGenerator} from '../utils/random';

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
  name: 'banan',
  username: '-',
  email: ''
}

const randomIntegerGenerator = new RandomIntegerGenerator(3);

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private randomUserRequest = new Subject<void>();
  readonly selectedUserId$: Observable<number> = this.randomUserRequest.pipe(
    // update id at most once every second and replay value for all following subscribers
    throttleTime(5000),
    map(() =>randomIntegerGenerator.next()),
    shareReplay(1),
  );

  // stream of the current user depending on the selected id
  readonly user$: Observable<User> = this.selectedUserId$.pipe(
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

  loadRandomUser() {
    this.randomUserRequest.next();
  }
}


