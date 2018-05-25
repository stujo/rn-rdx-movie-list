// @flow

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
        id_token: user.id_token,
        access_token: user.access_token,
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
    result: Object;
    success: boolean;

    constructor(result: Object, success: boolean = true) {
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


function delayPromise(n: number, response: any): Promise<any> {
    return new Promise(
        resolve => setTimeout(() => resolve(response), n)
    )
}

type Credentials = {
    username: string,
    password: string,
};

type User = {
    id_token: string,
    access_token: string,
}

function fakeLoginAPI(creds: Credentials): Promise<FakeResponse> {
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
}

function extractJson(response: FakeResponse): Promise<{ payload: User, response: FakeResponse }> {
    return response.json()
        .then((payload) => {
            return { payload, response }
        })
}

type extractPayloadParams = {
    payload: User,
    response: FakeResponse
};

function extractPayloadIfOk({ payload, response }: extractPayloadParams): User {
    if (!response.ok) {
        // If there was a problem, we want to
        // dispatch the error condition
        throw payload;
    } else {
        return payload;
    }
}

function storeTokens(user: Object): Promise<Object> {
    return Promise.all([
        AsyncStorage.setItem('id_token', user.id_token),
        AsyncStorage.setItem('access_token', user.access_token),
        Promise.resolve(user)
    ]).then(([_a, _b, user]) => (user))
}

function dispatchReceiveLogin(dispatch: Function, user: User): void {
    dispatch(receiveLogin(user))
}

function dispatchLoginError(dispatch: Function, err: Object): void {
    console.log("Login Error", err)
    dispatch(loginError(err.message))
}

// Calls the (Fake) API to get a token and
// dispatches actions along the way
export function attemptLogin(creds: Credentials): Function {
    return (dispatch: Function) => {
        dispatch(requestLogin(creds))
        // Delay so we can see it! DEMO ONLY
        delayPromise(2000, creds)
            .then(fakeLoginAPI)
            .then(extractJson)
            .then(extractPayloadIfOk)
            .then(storeTokens)
            .then((user) => dispatchReceiveLogin(dispatch, user))
            .catch((err) => dispatchLoginError(dispatch, err))
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

function logoutError(message) {
    return {
        type: LOGOUT_FAILURE,
        isFetching: false,
        message
    }
}

// Logs the user out
export function attemptLogout() {
    return (dispatch: Function) => {
        dispatch(requestLogout())
        Promise.all([
            delayPromise(2000),
            AsyncStorage.removeItem('id_token'),
            AsyncStorage.removeItem('access_token'),
        ]).then(() =>
            dispatch(receiveLogout())
        ).catch((err) => {
            console.log(err)
            dispatch(logoutError(err.message))
        })
    }
}
