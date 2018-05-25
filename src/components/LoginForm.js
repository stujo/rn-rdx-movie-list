import React from 'react';
import { Component } from 'react'
import { connect } from 'react-redux';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { attemptLogin, attemptLogout } from '../services/Authentication/actions'
import LoaderModal from '../components/LoaderModal';
import StyleConstants from '../StyleConstants';


const fieldBasics = { ...StyleConstants.textInput, height: 30, width: 140 }

const styles = StyleSheet.create({
    formContainer: { ...StyleConstants.formContainer },
    inputContainer: { ...StyleConstants.inputContainer },
    textField: { ...fieldBasics },
    invalidTextField: { ...fieldBasics, ...StyleConstants.invalidInput },
    buttonsContainer: { ...StyleConstants.buttonsContainer },
    submitButton: { ...StyleConstants.submitButton },
});

class LoginForm extends Component {

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
        valid = this.onPasswordUpdate(this.state.password.value) && valid
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
            <View style={styles.formContainer}>
                <LoaderModal loading={this.props.busy} />
                <View style={styles.inputContainer}>
                    <TextInput
                        placeholder="Username..."
                        autoCapitalize='none'
                        autoCorrect={false}
                        style={this.fieldStyle("username")}
                        onChangeText={this.onUsernameUpdate} value={this.state.username.value}
                        onSubmitEditing={this.validateFormAndSend}
                    />
                </View>
                <View style={styles.inputContainer}>
                    <TextInput
                        placeholder="Password..."
                        style={this.fieldStyle("password")}
                        autoCapitalize='none'
                        autoCorrect={false}
                        secureTextEntry={true}
                        onSubmitEditing={this.validateFormAndSend}
                        onChangeText={this.onPasswordUpdate} value={this.state.password.value}
                    />
                </View>
                <View style={styles.buttonsContainer}>
                    <Button
                        style={styles.submitButton}
                        containerViewStyle={{ width: '100%', marginLeft: 0 }}
                        title="Login"
                        onPress={this.validateFormAndSend} />
                </View>
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
)(LoginForm);