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
export const dvas0004 = (state = {}, action) => {
    switch (action.type) {
        case 'TEST_ACTION':
            return {
                content: "Hi From TEST"
            };
        default:
            return state;
    }
};

export const reducers = combineReducers({
    dvas0004,
});

// store.js
export function configureStore(initialState = {}) {
    const store = createStore(
        reducers,
        initialState
    )
    return store;
};

export const store = configureStore();