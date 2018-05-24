import React from 'react';
import { Component } from 'react'
import { connect } from 'react-redux';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';

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
        return this.state.errors[field] !== undefined
    }

    addError = (field, message) => {
        let errors = Object.assign({}, this.state.errors)
        errors[field] = message
        this.setState({
            errors: errors
        })
    }

    clearError = (field) => {
        let errors = Object.assign({}, this.state.errors)
        delete errors[field]
        this.setState({
            errors: errors
        })
    }

    onUsernameUpdate = (value) => {
        this.setState({ username: value })
        if (!this.state.username || this.state.username.length < 5) {
            this.addError("username", "Too Short!")
            return;
        }
        this.clearError("username")
        return;
    }

    onPasswordUpdate = (value) => {
        this.setState({ password: value })
        if (!this.state.password || this.state.password.length < 5) {
            this.addError("password", "Too Short!")
            return;
        }
        this.clearError("password")
        return;
    }

    validateForm = () => {
        if (!this.validateUsername()) {
            return false;
        }

        if (!this.validatePassword()) {
            return false;
        }

        return true;
    }

    validateFormAndSend = () => {
        if (this.validateForm()) {
            this.props.onAttemptLogin()
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
            username: '',
            password: '',
            errors: {}
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <Text>Login</Text>
                <TextInput
                    placeholder="Username..."
                    style={this.fieldStyle("username")}
                    onChangeText={this.onUsernameUpdate} value={this.state.username}
                />
                <TextInput
                    placeholder="Password..."
                    style={this.fieldStyle("password")}
                    secureTextEntry={true}
                    onChangeText={this.onPasswordUpdate} value={this.state.password}
                />
                <Button
                    title="Sign Up!"
                    onPress={this.validateFormAndSend} />
            </View>
        );
    }
}

const mapStateToProps = (state) => {
    console.log(state)
    return {
        username: state.loginScreen ? state.loginScreen.username : '',
        password: state.loginScreen ? state.loginScreen.password : '',
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        onAttemptLogin: (details) => dispatch({ type: 'loginScreen.ATTEMPT_LOGIN', payload: { details: details, callback_prefix: 'loginScreen.ATTEMPT_LOGIN' } }),
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LoginScreen);