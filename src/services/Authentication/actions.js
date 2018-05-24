import { AsyncStorage } from 'react'

// There are three possible states for our login
// process and we need actions for each of them
export const LOGIN_REQUEST = 'app.services.Authentication.LOGIN_REQUEST'
export const LOGIN_SUCCESS = 'app.services.Authentication.LOGIN_SUCCESS'
export const LOGIN_FAILURE = 'app.services.Authentication.LOGIN_FAILURE'

function requestLogin(creds) {
    return {
        type: LOGIN_REQUEST,
        isFetching: true,
        isAuthenticated: false,
        creds
    }
}

function receiveLogin(user) {
    return {
        type: LOGIN_SUCCESS,
        isFetching: false,
        isAuthenticated: true,
        id_token: user.id_token
    }
}

function loginError(message) {
    return {
        type: LOGIN_FAILURE,
        isFetching: false,
        isAuthenticated: false,
        message
    }
}


// Calls the API to get a token and
// dispatches actions along the way
export function attemptLogin(creds) {

    let config = {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `username=${creds.username}&password=${creds.password}`
    }

    return dispatch => {
        // We dispatch requestLogin to kickoff the call to the API
        dispatch(requestLogin(creds))

        return fetch('http://localhost:3001/sessions/create', config)
            .then(response =>
                response.json().then(user => ({ user, response }))
            ).then(({ user, response }) => {
                if (!response.ok) {
                    // If there was a problem, we want to
                    // dispatch the error condition
                    dispatch(loginError(user.message))
                    return Promise.reject(user)
                }
            }).then((user) => {
                return Promise.all([
                    AsyncStorage.setItem('id_token', user.id_token),
                    AsyncStorage.setItem('access_token', user.access_token),
                    Promise.resolve(user)
                ])
            }).then(([_a, _b, user]) => {
                dispatch(receiveLogin(user))
            }).catch((err) => {
                dispatch(loginError(err.message))
            })
    }
}

export const LOGOUT_REQUEST = 'app.services.Authentication.LOGOUT_REQUEST'
export const LOGOUT_SUCCESS = 'app.services.Authentication.LOGOUT_SUCCESS'
export const LOGOUT_FAILURE = 'app.services.Authentication.LOGOUT_FAILURE'

function requestLogout() {
    return {
        type: LOGOUT_REQUEST,
        isFetching: true,
        isAuthenticated: true
    }
}

function receiveLogout() {
    return {
        type: LOGOUT_SUCCESS,
        isFetching: false,
        isAuthenticated: false
    }
}

// Logs the user out
export function attemptLogout() {
    return dispatch => {
        dispatch(requestLogout())

        Promise.all([
            AsyncStorage.removeItem('id_token'),
            AsyncStorage.remoteItem('access_token'),
        ]).then(() => dispatch(receiveLogout()))
    }
}
