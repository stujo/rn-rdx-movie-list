// https://auth0.com/blog/secure-your-react-and-redux-app-with-jwt-authentication/

// import { AsyncStorage } from 'react'

//import { combineReducers } from 'redux'

import {
    LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT_SUCCESS, LOGOUT_REQUEST, LOGOUT_FAILURE
} from './actions'

// The auth reducer. The starting state sets authentication
// based on a token being in local storage. In a real app,
// we would also want a util to check if the token is expired.
export default authenticationService = (state = {
    isFetching: false,
    isAuthenticated: false
}, action) => {
    switch (action.type) {
        case LOGIN_REQUEST:
            return Object.assign({}, state, {
                isFetching: true,
                isAuthenticated: false,
                user: action.creds,
                idToken: undefined,
                accessToken: undefined
            })
        case LOGIN_SUCCESS:
            return Object.assign({}, state, {
                isFetching: false,
                isAuthenticated: true,
                errorMessage: undefined,
                idToken: action.id_token,
                accessToken: action.access_token
            })
        case LOGIN_FAILURE:
            return Object.assign({}, state, {
                isFetching: false,
                isAuthenticated: false,
                errorMessage: action.message,
                idToken: undefined,
                accessToken: undefined,
                user: undefined
            })
        case LOGOUT_REQUEST:
            return Object.assign({}, state, {
                isFetching: true,
            })
        case LOGOUT_SUCCESS:
            return Object.assign({}, state, {
                isFetching: false,
                isAuthenticated: false,
                idToken: undefined,
                accessToken: undefined,
                user: undefined
            })
        case LOGOUT_FAILURE:
            return Object.assign({}, state, {
                isFetching: false,
            })
        default:
            return state
    }
}
