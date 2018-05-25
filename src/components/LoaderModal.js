// @flow

import React, { Component } from 'react';
import {
    ActivityIndicator,
    Dimensions,
    Modal,
    StyleSheet,
    View,
} from 'react-native';

// https://medium.com/@kelleyannerose/react-native-activityindicator-for-a-quick-easy-loading-animation-593c06c044dc

type Props = {
    loading: boolean
};

export const LoaderModal = (props: Props) => {
    const {
        loading,
        ...attributes
    } = props;

    const { width, height } = Dimensions.get('window')
    const indicatorSize = Math.min.apply(undefined, [width, height]) / 2
    const sizing = { width: indicatorSize, height: indicatorSize }

    return (
        <Modal
            transparent={true}
            animationType={'none'}
            visible={loading}>
            <View style={styles.modalBackground}>
                <View style={[styles.activityIndicatorWrapper, sizing]} >
                    <ActivityIndicator
                        size="large"
                        color="#EE7777"
                        animating={loading} />
                </View>
            </View>
        </Modal >
    )
}

const styles = StyleSheet.create({
    modalBackground: {
        flex: 1,
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'space-around',
        backgroundColor: '#00000040'
    },
    activityIndicatorWrapper: {
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around'
    },
});

export default LoaderModal;