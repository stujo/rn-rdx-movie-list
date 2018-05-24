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
                <Text>Login Screen ({this.props.current_username_input})</Text>
                <TextInput
                    placeholder="Username..."
                    style={{ height: 40, width: 100, borderColor: 'gray', borderWidth: 1 }}
                    onChangeText={(text) => this.props.onUsernameUpdate(text)} value={this.props.username}
                />
                <TextInput
                    placeholder="Password..."
                    style={{ height: 40, width: 100, borderColor: 'gray', borderWidth: 1 }}
                    secureTextEntry={true}
                    onChangeText={(text) => this.props.onPasswordUpdate(text)} value={this.props.password}
                />
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
        onUsernameUpdate: (text) => dispatch({ type: 'loginScreen.USERNAME_UPDATE', text: text }),
        onPasswordUpdate: (text) => dispatch({ type: 'loginScreen.PASSWORD_UPDATE', yexy: text }),
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LoginScreen);