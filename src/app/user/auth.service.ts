import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { AuthUser, User } from './user';
import * as UserAction from '../actions/user.action';
import { State } from '../state/user.reducer';
import { catchError, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    currentUser: User | null;
    redirectUrl: string;

    constructor(
        private store: Store<State>,
        private http: HttpClient
    ) { }

    isLoggedIn(): boolean {
        return !!this.currentUser;
    }

    login(user: AuthUser): Observable<any> {

        return this.http.post('', { userName: user.userName, password: user.password }).pipe(
            tap(
                data => data = {
                    id: 2,
                    userName: user.userName,
                    isAdmin: false
                }),
            catchError(error => error));
        // Code here would log into a back end service
        // and return user information
        // This is just hard-coded here.
        // this.currentUser = {
        //     id: 2,
        //     userName,
        //     isAdmin: false
        // };

    }

    logout(): void {
        this.currentUser = null;
    }
}
