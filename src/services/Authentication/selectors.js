// @flow
import { createSelector } from 'reselect'
import type { State } from './reducers'

type RootState = {
    authenticationService: State
};

export function authenticationBusy(state: RootState): boolean {
    return state.authenticationService ? !!state.authenticationService.isFetching : false
}

export function authenticationAuthenticated(state: RootState): boolean {
    return state.authenticationService ? !!state.authenticationService.isAuthenticated : false
}
