import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private readonly _currentUser$ = new BehaviorSubject<string>('')

  public readonly currentUser$: Observable<string>;

  constructor() {
    this.currentUser$ = this._currentUser$.asObservable();
  }

  public setUser(email: string) {
    this._currentUser$.next(email);
  }

}
