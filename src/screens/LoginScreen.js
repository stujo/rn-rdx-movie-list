import React from 'react';
import { Component } from 'react'
import { connect } from 'react-redux';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { attemptLogin, attemptLogout } from '../services/Authentication/actions'


const fieldSize = { height: 30, width: 140 }

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    textField: { ...fieldSize, borderColor: 'grey', borderWidth: 1 },
    invalidTextField: { ...fieldSize, borderColor: 'red', borderWidth: 1 },
});

class LoginScreen extends Component {

    hasError = (field) => {
        return !!this.state[field].error
    }

    onUsernameUpdate = (value) => {
        let error = undefined;
        if (!value || value.length < 5) {
            error = "Too Short!"
        }
        this.setState({ username: { value, error } })
        return error === undefined;
    }

    onPasswordUpdate = (value) => {
        let error = undefined;
        if (!value || value.length < 5) {
            error = "Too Short!"
        }
        this.setState({ password: { value, error } })
        return error === undefined;
    }

    validateForm = () => {
        let valid = true
        valid = this.onUsernameUpdate(this.state.username.value) && valid
        valid = this.onPasswordUpdate(this.state.username.value) && valid
        return valid
    }

    validateFormAndSend = () => {
        if (this.validateForm()) {
            this.props.onAttemptLogin({
                username: this.state.username.value,
                password: this.state.password.value
            })
        }
    }

    fieldStyle = (field) => {
        if (this.hasError(field)) {
            return styles.invalidTextField
        } else {
            return styles.textField
        }
    }

    constructor(props) {
        super(props)
        this.state = {
            username: { value: 'demo123', error: undefined },
            password: { value: 'passwd', error: undefined },
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <Text>Login - {this.props.busy ? 'Busy' : 'OK!'}</Text>
                <TextInput
                    placeholder="Username..."
                    style={this.fieldStyle("username")}
                    onChangeText={this.onUsernameUpdate} value={this.state.username.value}
                />
                <TextInput
                    placeholder="Password..."
                    style={this.fieldStyle("password")}
                    secureTextEntry={true}
                    onChangeText={this.onPasswordUpdate} value={this.state.password.value}
                />
                <Button
                    title="Sign Up!"
                    onPress={this.validateFormAndSend} />
                <Text>{JSON.stringify(this.state)}</Text>
            </View>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        busy: state.authenticationService ? state.authenticationService.isFetching : false
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        onAttemptLogin: (creds) => dispatch(attemptLogin(creds)),
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LoginScreen);