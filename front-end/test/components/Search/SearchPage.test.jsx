import React from 'react';
import renderer from 'react-test-renderer';

import SearchPage from '../../../src/components/Search/SearchPage';

describe('Search Page', () => {
    test('should render', () => {
        const component = renderer.create(
            <SearchPage/>
        )
        .toJSON();
        expect(component).toMatchSnapshot();
    });
})