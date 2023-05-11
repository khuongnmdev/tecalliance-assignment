import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { first, map, of, switchMap } from 'rxjs';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  public emailFormControl = new FormControl('', [Validators.required, Validators.email]);

  constructor(
    private readonly userService: UserService,
    private readonly router: Router,
  ) { }

  ngOnInit() {
  }

  protected login() {
    if (!this.emailFormControl.value) {
      return;
    }

    of(this.emailFormControl.value).pipe(
      map(email => this.userService.setUser(email)),
      switchMap(() => this.router.navigateByUrl('home')),
      first(),
    ).subscribe()
  }
}
