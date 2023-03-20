import { createReducer, on } from '@ngrx/store';
import { AuthUser, User } from '../user/user';
import * as AppState from './app.state';

import * as UserAction from '../actions/user.action';

export interface State extends AppState.State {
    users: UserState;
}

export interface UserState {
    maskUser: boolean;
    currentUser: User;
    authUser: AuthUser;
    loginError: string;
}

const initalUserState: UserState = {
    maskUser: false,
    currentUser: null,
    authUser: null,
    loginError: null
};

export const userReducer = createReducer<UserState>(
    initalUserState,
    on(UserAction.maskUser, (state): UserState => {
        return {
            ...state,
            maskUser: !state.maskUser
        };
    }),

    on(UserAction.loginSuccess, (state, action): UserState => {
        return {
            ...state,
            currentUser: action.user
        };
    }),

    on(UserAction.loginFail, (state, action): UserState => {
        return {
            ...state,
            loginError: action.error
        };
    })
);


// export const makeAuthCall = (UserCred: AuthUser): AuthUser => {

//     return UserCred
// }
