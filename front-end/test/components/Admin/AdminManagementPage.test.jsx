import React from 'react';
import renderer from 'react-test-renderer';

import AdminManagementPage from '../../../src/components/Admin/AdminManagementPage';

describe('Admin Management Page', () => {
    test('should render', () => {
        const component = renderer.create(
            <AdminManagementPage/>
        )
        .toJSON();
        expect(component).toMatchSnapshot();
    });
})