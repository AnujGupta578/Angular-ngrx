import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { User } from './user';
import * as UserAction from '../actions/user.action';
import { State } from '../state/user.reducer';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    currentUser: User | null;
    redirectUrl: string;

    constructor(private store: Store<State>) { }

    isLoggedIn(): boolean {
        return !!this.currentUser;
    }

    login(userName: string, password: string): void {
        // Code here would log into a back end service
        // and return user information
        // This is just hard-coded here.
        this.currentUser = {
            id: 2,
            userName,
            isAdmin: false
        };

        this.store.dispatch(UserAction.loginSuccess({ user: this.currentUser }));
    }

    logout(): void {
        this.currentUser = null;
    }
}
