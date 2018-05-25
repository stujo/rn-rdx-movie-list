// @flow

import React from 'react';
import { Component } from 'react'
import { connect } from 'react-redux';
import { Button, StyleSheet, View } from 'react-native';
import { attemptLogout } from '../services/Authentication/actions'
import LoaderModal from '../components/LoaderModal';
import StyleConstants from '../StyleConstants';
import { authenticationBusy } from '../services/Authentication/selectors'

type Props = {
    busy: boolean,
    onAttemptLogout: Function
};

const styles = StyleSheet.create({
    formContainer: { ...StyleConstants.formContainer },
    buttonsContainer: { ...StyleConstants.buttonsContainer },
    submitButton: { ...StyleConstants.submitButton },
});

class LogoutForm extends Component<Props> {

    validateForm = () => {
        let valid = true
        return valid
    }

    validateFormAndSend = () => {
        if (this.validateForm()) {
            this.props.onAttemptLogout({})
        }
    }

    render() {
        return (
            <View style={styles.formContainer}>
                <LoaderModal loading={this.props.busy} />
                <View style={styles.buttonsContainer}>
                    <Button
                        style={styles.submitButton}
                        containerViewStyle={{ width: '100%', marginLeft: 0 }}
                        title="Logout"
                        onPress={this.validateFormAndSend} />
                </View>
            </View>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        busy: authenticationBusy(state)
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        onAttemptLogout: () => dispatch(attemptLogout()),
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LogoutForm);