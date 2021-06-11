import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {BehaviorSubject, Subject} from 'rxjs';
import {defaultIfEmpty, shareReplay, startWith, switchMap, tap} from 'rxjs/operators';

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
  name: 'default',
  username: 'username',
  email: ''
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private selectedUserIdSubject = new Subject<number>();

  user$ = this.selectedUserIdSubject.asObservable().pipe(
    switchMap(id => this.http.get<User>(`https://jsonplaceholder.typicode.com/users/${id}`),
    ),
    startWith(DEFAULT_USER),
    shareReplay(1),
  );

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


