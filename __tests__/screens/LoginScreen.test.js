
import 'react-native';
import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import LoginScreen from 'src/screens/LoginScreen';

describe('screens/LoginScreen', () => {
    let renderer;

    beforeEach(() => {
        renderer = new ShallowRenderer();
    });

    it('renders without errors', () => {

        const result = renderer.render(
            <LoginScreen />,
        );
        expect(result).toMatchSnapshot();
    });
});