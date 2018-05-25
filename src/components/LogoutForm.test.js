
import 'react-native';
import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import { LogoutForm } from '../../src/components/LogoutForm';

describe('components/LogoutForm', () => {
    let renderer;

    beforeEach(() => {
        renderer = new ShallowRenderer();
    });

    it('renders without errors', () => {

        const result = renderer.render(
            <LogoutForm />,
        );
        expect(result).toMatchSnapshot();
    });
});