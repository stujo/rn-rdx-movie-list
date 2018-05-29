import { attemptLogin } from './actions'
import {
    LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT_SUCCESS, LOGOUT_REQUEST, LOGOUT_FAILURE
} from './actions'


import configureMockStore from 'redux-mock-store'
import MockAsyncStorage from 'mock-async-storage';
import thunk from 'redux-thunk'

// https://medium.com/@ferrannp/unit-testing-with-jest-redux-async-actions-fetch-9054ca28cdcd

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const mockAsyncStorage = () => {
    const mockImpl = new MockAsyncStorage()
    jest.mock('AsyncStorage', () => mockImpl)
}

const releaseAsyncStorage = () => jest.unmock('AsyncStorage')

// const mockResponse = (status, statusText, response) => {
//     return new window.Response(response, {
//       status: status,
//       statusText: statusText,
//       headers: {
//         'Content-type': 'application/json'
//       }
//     });
//   };


describe('services/Authentication', () => {

    describe('attemptLogin', () => {
        it('Fails with username starting with a', () => {
            mockAsyncStorage();
            const store = mockStore({})
            const validCreds = { username: 'alice', password: 'minerva' }

            return store.dispatch(attemptLogin(validCreds))
                .then(() => {
                    const expectedActions = store.getActions();
                    expect(expectedActions.length).toBe(2);
                    expect(expectedActions[0].type).toBe(LOGIN_REQUEST);
                    expect(expectedActions[1].type).toBe(LOGIN_FAILURE);
                })
                .finally(() => {
                    releaseAsyncStorage()
                });
        });
        it('Fails with username starting with b', () => {
            mockAsyncStorage();
            const store = mockStore({})
            const validCreds = { username: 'bobby', password: 'minerva' }

            return store.dispatch(attemptLogin(validCreds))
                .then(() => {
                    const expectedActions = store.getActions();
                    expect(expectedActions.length).toBe(2);
                    expect(expectedActions[0].type).toBe(LOGIN_REQUEST);
                    expect(expectedActions[1].type).toBe(LOGIN_FAILURE);
                })
                .finally(() => {
                    releaseAsyncStorage()
                });
        });
        it('Succeeds with username starting with c', () => {
            mockAsyncStorage();
            const store = mockStore({})
            const validCreds = { username: 'curtis', password: 'minerva' }

            return store.dispatch(attemptLogin(validCreds))
                .then(() => {
                    const expectedActions = store.getActions();
                    expect(expectedActions.length).toBe(2);
                    expect(expectedActions[0].type).toBe(LOGIN_REQUEST);
                    expect(expectedActions[1].type).toBe(LOGIN_SUCCESS);
                })
                .finally(() => {
                    releaseAsyncStorage()
                });
        });
    });
});