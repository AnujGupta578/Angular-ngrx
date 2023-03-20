import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

import { getError, getUser, getUserMask } from '../selector/user.selector';
import { State } from '../state/user.reducer';
import { AuthService } from './auth.service';
import * as UserAction from '../actions/user.action';
import { Observable } from 'rxjs';
import { User } from './user';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  pageTitle = 'Log In';

  maskUserName$: Observable<boolean>;
  user$: Observable<User | null>;
  errorMessage$: Observable<string>;

  constructor(
    private authService: AuthService,
    private router: Router,
    private store: Store<State>
  ) { }

  ngOnInit(): void {

    this.user$ = this.store.select(getUser);
    this.errorMessage$ = this.store.select(getError);

    this.maskUserName$ = this.store.select(getUserMask);

  }

  cancel(): void {
    this.router.navigate(['welcome']);
  }

  checkChanged(): void {
    this.store.dispatch(UserAction.maskUser());
  }

  login(loginForm: NgForm): void {


    if (loginForm && loginForm.valid) {
      const userName = loginForm.form.value.userName;
      const password = loginForm.form.value.password;

      const user = {
        userName,
        password
      }

      this.store.dispatch(UserAction.login({ user }));

      if (this.authService.redirectUrl) {
        this.router.navigateByUrl(this.authService.redirectUrl);
      } else {
        this.router.navigate(['/products']);
      }
    }
  }
}
