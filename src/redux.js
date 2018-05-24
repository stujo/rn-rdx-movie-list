import {
    applyMiddleware,
    combineReducers,
    createStore,
} from 'redux';

import { composeWithDevTools } from 'redux-devtools-extension';

import thunkMiddleware from 'redux-thunk';

// actions.js

export const testAction = () => ({
    type: 'TEST_ACTION',
});

// reducers.js
const user = (state = {}, action) => {
    switch (action.type) {
        case 'CURRENT_USERNAME_INPUT':
            return { ...state, current_username_input: action.text };
        default:
            return state;
    }
};

const loginScreen = (state = {}, action) => {
    switch (action.type) {
        case 'loginScreen.USERNAME_UPDATE':
            return { ...state, username: action.text };
        case 'loginScreen.PASSWORD_UPDATE':
            return { ...state, password: action.text };
        default:
            return state;
    }
};


declare var __DEV__: boolean;

const devToolsOptions = {
    // This is the amount of items accessible in the redux dev tools
    maxAge: 20,

    // Enable serialize to date objects, error objects, etc in redux dev tools
    // Comes with a severe performance impact
    serialize: false,
};

export const reducers = combineReducers({
    user,
    loginScreen,
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

export const store = configureStore({
    user: {
        username: 'anon1234'
    }
});