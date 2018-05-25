
import 'react-native';
import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import { LoginForm } from '../../src/components/LoginForm';

describe('components/LoginForm', () => {
    let renderer;

    beforeEach(() => {
        renderer = new ShallowRenderer();
    });

    it('renders without errors', () => {

        const result = renderer.render(
            <LoginForm />,
        );
        expect(result).toMatchSnapshot();
    });
});