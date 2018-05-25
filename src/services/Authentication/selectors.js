import { createSelector } from 'reselect'

export function authenticationBusy(state) {
    return state.authenticationService ? !!state.authenticationService.isFetching : false
}

export function authenticationAuthenticated(state) {
    return state.authenticationService ? !!state.authenticationService.isAuthenticated : false
}
