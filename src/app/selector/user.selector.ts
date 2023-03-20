import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UserState } from '../state/user.reducer';

export const getUserFeatureState = createFeatureSelector<UserState>('users');

export const getUserMask = createSelector(
    getUserFeatureState,
    state => state.maskUser
);


export const getUser = createSelector(
    getUserFeatureState,
    state => state.currentUser
);

export const getError = createSelector(
    getUserFeatureState,
    state => state.loginError
);
