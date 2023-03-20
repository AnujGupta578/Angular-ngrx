import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';

import * as UserAction from '../actions/user.action';
import { AuthService } from '../user/auth.service';


@Injectable()
export class UserEffect {
    constructor(
        private actions$: Actions,
        private authService: AuthService
    ) {

    }

    authorizeUser$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(UserAction.login),
            mergeMap(action => this.authService.login(action.user).pipe(
                map(user => UserAction.loginSuccess({ user })),
                catchError(error => of(UserAction.loginFail({ error })))
            ))
        );
    });
}
