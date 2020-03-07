import React from 'react';
import renderer from 'react-test-renderer';

import ProfilePage from '../../../src/components/Profile/ProfilePage';

describe('Profile Page', () => {
    test('should render', () => {
        const component = renderer.create(
            <ProfilePage/>
        )
        .toJSON();
        expect(component).toMatchSnapshot();
    });
})