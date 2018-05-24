import React from 'react';
import { Component } from 'react'
import { connect } from 'react-redux';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { attemptLogin, attemptLogout } from '../services/Authentication/actions'
import LoaderModal from '../components/LoaderModal';
import StyleConstants from '../StyleConstants';


const fieldBasics = { ...StyleConstants.textInput, height: 30, width: 140 }

const styles = StyleSheet.create({
    mainContainer: { ...StyleConstants.mainContainer },
    titleContainer: { ...StyleConstants.titleContainer },
    title: { ...StyleConstants.title },
    inputContainer: { ...StyleConstants.inputContainer },
    textField: { ...fieldBasics },
    invalidTextField: { ...fieldBasics, ...StyleConstants.invalidInput },
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
            <View style={styles.mainContainer}>
                <LoaderModal loading={this.props.busy} />
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>Login</Text>
                </View>
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