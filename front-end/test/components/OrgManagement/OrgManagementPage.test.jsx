import React from 'react';
import renderer from 'react-test-renderer';
import { MemoryRouter } from 'react-router-dom';

import OrgManagementPage from '../../../src/components/OrgManagement/OrgManagementPage';

describe('Org Management Page', () => {
    test('should render', () => {
        const component = renderer.create(
            <MemoryRouter>
                <OrgManagementPage/>
            </MemoryRouter>
        )
        .toJSON();
        expect(component).toMatchSnapshot();
    });
})