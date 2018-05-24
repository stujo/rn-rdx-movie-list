import {
    applyMiddleware,
    combineReducers,
    createStore,
} from 'redux';

// actions.js

export const testAction = () => ({
    type: 'TEST_ACTION',
});

// reducers.js
export const user = (state = {}, action) => {
    switch (action.type) {
        case 'CURRENT_USERNAME_INPUT':
            return { ...state, current_username_input: action.text };
        default:
            return state;
    }
};

export const reducers = combineReducers({
    user,
});

// store.js
export function configureStore(initialState = {}) {
    const store = createStore(
        reducers,
        initialState
    )
    return store;
};

export const store = configureStore({
    user: {}
});