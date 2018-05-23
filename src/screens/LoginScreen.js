import React from 'react';
import { Component } from 'react'
import { connect } from 'react-redux';
import { StyleSheet, Text, TextInput, View } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});


class LoginScreen extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text>Login Screen</Text>
                <TextInput
                    style={{ height: 40, width: 100, borderColor: 'gray', borderWidth: 1 }}
                    onChangeText={(text) => console.log(text)}
                    value={`hello`}
                />
            </View>
        );
    }
}

const testAction = () => ({
    type: 'TEST_ACTION_LOGIN_SCREEN',
});

// AppContainer.js
const mapStateToProps = (state) => ({

});

const mapDispatchToProps = (dispatch) => {
    return {
        testAction: () => {
            dispatch(testAction())
        }
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LoginScreen);