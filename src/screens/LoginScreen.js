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
                    style={{ height: 40, width: 100, borderColor: 'gray', borderWidth: 1 }}
                    onChangeText={this.props.changeUsernameInput}
                />
            </View>
        );
    }
}

const mapStateToProps = (state) => ({
    username: state.user.username,
    password: state.user.password,
    current_username_input: state.user.current_username_input,
});

const mapDispatchToProps = (dispatch) => {
    return {
        changeUsernameInput: (text) => dispatch({ type: 'CURRENT_USERNAME_INPUT', text }),
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LoginScreen);