import React from 'react';
import { Component } from 'react'
import { connect } from 'react-redux';
import { Button, StyleSheet, View } from 'react-native';
import { attemptLogout } from '../services/Authentication/actions'
import LoaderModal from '../components/LoaderModal';
import StyleConstants from '../StyleConstants';

const styles = StyleSheet.create({
    formContainer: { ...StyleConstants.formContainer },
    buttonsContainer: { ...StyleConstants.buttonsContainer },
    submitButton: { ...StyleConstants.submitButton },
});

class LogoutForm extends Component {

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
        busy: state.authenticationService ? state.authenticationService.isFetching : false
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        onAttemptLogout: (details) => dispatch(attemptLogout(details)),
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LogoutForm);