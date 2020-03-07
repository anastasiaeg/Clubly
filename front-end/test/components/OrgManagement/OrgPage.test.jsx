import React from 'react';
import renderer from 'react-test-renderer';
import { MemoryRouter } from 'react-router-dom';

import OrgPage from '../../../src/components/OrgManagement/OrgPage';

const props = {
    width: 1700,
    route: {
        match: {
            params: {
                club_name: "WiCS"
            }
        }
    }
}

describe('Org Page', () => {
    test('should render', () => {
        const component = renderer.create(
            <MemoryRouter>
                <OrgPage width={props.width} route={props.route}/>
            </MemoryRouter>
        )
        .toJSON();
        expect(component).toMatchSnapshot();
    });
})