import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, map, of, switchMap, tap, throwError } from 'rxjs';
import { User } from '../models/user';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private readonly _currentUser$ = new BehaviorSubject<User | null>(null);

  public readonly currentUser$: Observable<User | null>;

  private readonly _userList$ = new BehaviorSubject<User[]>([]);

  public readonly userList$: Observable<User[]>;

  constructor(
    private readonly httpClient: HttpClient,
  ) {
    this.currentUser$ = this._currentUser$.asObservable();
    this.userList$ = this._userList$.asObservable();
  }

  public login(email: string): Observable<string | null> {
    return this.userList$.pipe(
      map(userList => {
        return userList.find(user => user.email === email);
      }),
      map(user => {
        if (user) {
          this._currentUser$.next(user);
          return email;
        }
        return null;
      })
    )
  }

  public logout() {
    this._currentUser$.next(null);
  }

  public getUserList() {
    return this.httpClient
      .get<User[]>('https://jsonplaceholder.typicode.com/users')
      .pipe(
        map(userList => {
          this._userList$.next(userList);
          return userList;
        }),
        tap(x => console.log('getUserList: ', x)),
      )
  }

}
