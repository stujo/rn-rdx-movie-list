import {
    applyMiddleware,
    combineReducers,
    createStore,
} from 'redux';

import { composeWithDevTools } from 'redux-devtools-extension';

import thunkMiddleware from 'redux-thunk';

const loginScreen = (state = {}, action) => {
    switch (action.type) {
        // case 'loginScreen.USERNAME_UPDATE':
        //     return { ...state, username: action.text };
        // case 'loginScreen.USERNAME_UPDATE':
        //     return { ...state, username: action.text };
        case 'loginScreen.ATTEMPT_LOGIN':

            // { type: 'loginScreen.ATTEMPT_LOGIN', payload: { details: details, callback_prefix: 'loginScreen.ATTEMPT_LOGIN_' } }


            return { ...state, pending_operation: action.callback_prefix };
        default:
            return state;
    }
};

import authenticationService from './services/Authentication/reducers'

declare var __DEV__: boolean;

const devToolsOptions = {
    // This is the amount of items accessible in the redux dev tools
    maxAge: 20,

    // Enable serialize to date objects, error objects, etc in redux dev tools
    // Comes with a severe performance impact
    serialize: false,
};

export const reducers = combineReducers({
    loginScreen,
    authenticationService,
});

const middleware = [thunkMiddleware];

const enhancers = [applyMiddleware(...middleware)];

const composeEnhancers = __DEV__
    ? composeWithDevTools(devToolsOptions)(...enhancers)
    : compose(...enhancers);

// store.js
export function configureStore(initialState = {}) {
    const store = createStore(
        reducers,
        initialState,
        composeEnhancers
    )
    return store;
};

export const store = configureStore({});