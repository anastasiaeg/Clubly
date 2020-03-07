import React from 'react';
import renderer from 'react-test-renderer';

import Loading from '../../../src/components/Common/Loading';

describe('Loading', () => {
    test('should render', () => {
        const component = renderer.create( <
                Loading / >
            )
            .toJSON();
        expect(component).toMatchSnapshot();
    });
})