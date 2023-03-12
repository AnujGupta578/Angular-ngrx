import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

import { getUserMask } from '../selector/user.selector';
import { State } from '../state/user.reducer';
import { AuthService } from './auth.service';
import * as UserAction from '../actions/user.action';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  pageTitle = 'Log In';

  maskUserName: boolean;

  constructor(
    private authService: AuthService,
    private router: Router,
    private store: Store<State>
  ) { }

  ngOnInit(): void {

    // 1st option;

    // this.store.select('users').subscribe(users => {
    //   this.maskUserName = users.maskUser;
    // });

    // 2nd Option

    this.store.select(getUserMask).subscribe(maskUser => {
      this.maskUserName = maskUser;
    });


  }

  cancel(): void {
    this.router.navigate(['welcome']);
  }

  checkChanged(): void {
    this.store.dispatch(UserAction.maskUser());
    // this.maskUserName = !this.maskUserName;
  }

  login(loginForm: NgForm): void {


    if (loginForm && loginForm.valid) {
      const userName = loginForm.form.value.userName;
      const password = loginForm.form.value.password;
      // this.store.dispatch(UserAction.login({ user: { userName, password } }));
      this.authService.login(userName, password);

      if (this.authService.redirectUrl) {
        this.router.navigateByUrl(this.authService.redirectUrl);
      } else {
        this.router.navigate(['/products']);
      }
    }
  }
}
