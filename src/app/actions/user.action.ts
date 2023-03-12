import { createAction, props } from '@ngrx/store';

import { User, AuthUser } from '../user/user';

export const maskUser = createAction('[User] Mask User');

export const login = createAction('[User] Login User',
    props<{ user: AuthUser }>()
);

export const loginSuccess = createAction('[User] Login Success',

    props<{ user: User }>()
);

export const loginFail = createAction('[User] Login Fail',

    props<{ error: string }>()
);
