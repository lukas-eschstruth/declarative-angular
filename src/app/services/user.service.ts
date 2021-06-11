import {HttpClient} from '@angular/common/http';
import {identifierName} from '@angular/compiler';
import {Injectable} from '@angular/core';
import {BehaviorSubject, combineLatest} from 'rxjs';
import {map, tap} from 'rxjs/operators';

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
  private userSubject = new BehaviorSubject<User>(DEFAULT_USER);
  private selectedUserIdSubject = new BehaviorSubject<number | null>(null);

  user$ = combineLatest([this.userSubject.asObservable()]).pipe(
    map(([user] =>))
  );

  constructor(private http: HttpClient) {
  }

  loadUser(id: number) {
    return this.http.get<User>(`https://jsonplaceholder.typicode.com/users/${id}`).pipe(
      tap(user => this.userSubject.next(user)),
      map(() => true)
    );
  }

  loadRandomUser() {
    const id = Math.ceil(Math.random() * 10);
    this.loadUser(id);
  }
}



import {HttpClient} from '@angular/common/http';
import {identifierName} from '@angular/compiler';
import {Injectable} from '@angular/core';
import {BehaviorSubject, combineLatest, Subject} from 'rxjs';
import {map, takeUntil, tap} from 'rxjs/operators';

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
  private userSubject = new BehaviorSubject<User>(DEFAULT_USER);
  private selectedUserIdSubject = new Subject<number>();
  private serviceDestroyedSubject = new Subject<number>();

  user$ = this.userSubject.asObservable();

  constructor(private http: HttpClient) {
    this.selectedUserIdSubject.pipe(takeUntil(this.serviceDestroyedSubject)).subscribe(newId => {
      
    })
  }

  ngOnDestroy() {
    this.serviceDestroyedSubject.next();
  }

  loadUser(id: number) {
    this.selectedUserIdSubject.next(id);
  }

  loadRandomUser() {
    const id = Math.ceil(Math.random() * 10);
    this.loadUser(id);
  }
}




