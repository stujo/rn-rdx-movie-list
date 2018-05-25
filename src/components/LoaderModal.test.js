
import 'react-native';
import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import { LoaderModal } from '../../src/components/LoaderModal';

describe('components/LoaderModal', () => {
    let renderer;

    beforeEach(() => {
        renderer = new ShallowRenderer();
    });

    it('renders without errors', () => {

        const result = renderer.render(
            <LoaderModal />,
        );
        expect(result).toMatchSnapshot();
    });
});