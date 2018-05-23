import React from 'react';

import { connect } from 'react-redux';

import {
  testAction,
} from './src/redux';

import { Provider } from 'react-redux';
import { store } from './src/redux';

import LoginScreen from './src/screens/LoginScreen'

class AppInner extends React.Component {
  render() {
    return (
      <LoginScreen />
    );
  }
}

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <AppContainer />
      </Provider>
    );
  }
}

// AppContainer.js
const mapStateToProps = (state) => ({
  content: state.content || "Please Wait...",
});

const mapDispatchToProps = (dispatch) => {
  return {
    testAction: () => {
      dispatch(testAction())
    }
  }
};

const AppContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(AppInner);