import { AsyncStorage } from 'react-native'

// There are three possible states for our login
// process and we need actions for each of them
export const LOGIN_REQUEST = 'Authentication.LOGIN_REQUEST'
export const LOGIN_SUCCESS = 'Authentication.LOGIN_SUCCESS'
export const LOGIN_FAILURE = 'Authentication.LOGIN_FAILURE'

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

class FakeResponse {
    constructor(result, success = true) {
        this.result = result;
        this.success = success
    }

    get ok() {
        return !!this.success
    }

    json() {
        return Promise.resolve(this.result)
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

        // Delay so we can see it! DEMO ONLY
        return new Promise(
            resolve => setTimeout(() => resolve(), 1000)
        ).then(() => {
            console.log(creds)
            //return fetch('http://localhost:3001/sessions/create', config)
            // Fake responses based on username
            if (creds.username[0] == 'a') {
                throw { message: "Network Error: Username begins with 'a'" }
            } else if (creds.username[0] == 'b') {
                return Promise.resolve(new FakeResponse({
                    message: 'Server Error: Username starts with \'b\''
                }, false))
            } else {
                return Promise.resolve(new FakeResponse({
                    id_token: 'my_id_token_1234',
                    access_token: 'my_access_token_1234'
                }, true))
            }
        }).then(response =>
            response.json().then((payload) => {
                return { payload, response }
            })
        ).then(({ payload, response }) => {
            if (!response.ok) {
                // If there was a problem, we want to
                // dispatch the error condition
                throw payload;
            } else {
                return payload;
            }
        }).then((user) => {
            return Promise.all([
                AsyncStorage.setItem('id_token', user.id_token),
                AsyncStorage.setItem('access_token', user.access_token),
                Promise.resolve(user)
            ]).then(([_a, _b, user]) => (user))
        }).then((user) => {
            dispatch(receiveLogin(user))
        }).catch((err) => {
            console.log(err)
            dispatch(loginError(err.message))
        })
    }
}

export const LOGOUT_REQUEST = 'Authentication.LOGOUT_REQUEST'
export const LOGOUT_SUCCESS = 'Authentication.LOGOUT_SUCCESS'
export const LOGOUT_FAILURE = 'Authentication.LOGOUT_FAILURE'

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
