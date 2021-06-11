import {HttpClient, HttpParams} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {switchMap} from 'rxjs/operators';
import {UserService} from './user.service';

export type Post = {
  userId: number,
  id: number,
  title: string,
  body: string
}

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  constructor(private userService: UserService, private http: HttpClient) { }

  posts$: Observable<Post[]> = this.userService.selectedUserId$.pipe(switchMap(id => {
    const params = new HttpParams().set('userId', id);
    return this.http.get<Post[]>('https://jsonplaceholder.typicode.com/posts/', {params})
  }))
}
