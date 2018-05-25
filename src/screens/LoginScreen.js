// @flow

import React from 'react';
import { Component } from 'react'
import { connect } from 'react-redux';
import StyleConstants from '../StyleConstants';
import LoginForm from '../components/LoginForm';
import { StyleSheet, Text, View } from 'react-native';
import LogoutForm from '../components/LogoutForm';
import { authenticationAuthenticated } from '../services/Authentication/selectors'

const styles = StyleSheet.create({
    mainContainer: { ...StyleConstants.mainContainer },
    titleContainer: { ...StyleConstants.titleContainer },
    title: { ...StyleConstants.title },
});

type Props = {
    isLoggedIn: boolean
};

class LoginScreen extends Component<Props> {
    render() {
        const isLoggedIn = this.props.isLoggedIn;
        return (
            <View style={styles.mainContainer}>
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>Authentication</Text>
                </View>
                {isLoggedIn ? (<LogoutForm />) : (<LoginForm />)}
            </View>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isLoggedIn: authenticationAuthenticated(state)
    }
};

const mapDispatchToProps = (dispatch) => {
    return {}
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LoginScreen);