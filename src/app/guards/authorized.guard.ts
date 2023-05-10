import { Injectable } from '@angular/core';
import { UserService } from '../services/user.service';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { Observable, switchMap, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthorizedGuard implements CanActivate {
  public constructor(
    private readonly userService: UserService,
    private readonly router: Router,
  ) { }

  /** Determine if /auth route can be activated. */
  public canActivate(): Observable<boolean | UrlTree> {
    return this.userService.currentUser$.pipe(
      map(currentUser => (currentUser ? true : this.router.parseUrl('auth'))),
    );
  }
}
