import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { connect } from 'react-redux';

import {
  testAction,
} from './src/redux';

import { Provider } from 'react-redux';
import { store } from './src/redux';

class AppInner extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Open up App.js to start working on your app!</Text>
        <Text>Changes you make will automatically reload.</Text>
        <Text> {this.props.content}</Text>
      </View>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

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