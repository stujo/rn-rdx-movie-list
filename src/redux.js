// @flow
declare var __DEV__: boolean;

import {
    applyMiddleware,
    combineReducers,
    createStore,
    compose,
} from 'redux';

import { composeWithDevTools } from 'redux-devtools-extension';
import thunkMiddleware from 'redux-thunk';
import authenticationService from './services/Authentication/reducers'

const devToolsOptions = {
    // This is the amount of items accessible in the redux dev tools
    maxAge: 20,

    // Enable serialize to date objects, error objects, etc in redux dev tools
    // Comes with a severe performance impact
    serialize: false,
};

const reducers = combineReducers({
    authenticationService,
});

const middleware = [thunkMiddleware];

const enhancers = [applyMiddleware(...middleware)];

const composeEnhancers = __DEV__
    ? composeWithDevTools(devToolsOptions)(...enhancers)
    : compose(...enhancers);

// store.js
function configureStore(initialState: Object = {}) {
    const store = createStore(
        reducers,
        initialState,
        composeEnhancers
    )
    return store;
};

const initialState = {}

export const store = configureStore(initialState);