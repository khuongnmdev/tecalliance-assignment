import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { first, map, of, switchMap, tap } from 'rxjs';
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
    private readonly snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.userService.getUserList().subscribe();
  }

  protected fillTestEmail(){
    this.emailFormControl.setValue('Sincere@april.biz');
  }

  protected login() {
    if (!this.emailFormControl.value) {
      return;
    }

    of(this.emailFormControl.value).pipe(
      switchMap(email => this.userService.login(email)),
      tap(x => {
        if (x) {
          return this.router.navigateByUrl('home');
        }
        return this.snackBar.open('Email is not exist!');
      }),
      first(),
    ).subscribe()
  }
}
