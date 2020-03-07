import React from 'react';
import renderer from 'react-test-renderer';

import CalendarPage from '../../../src/components/Calendar/CalendarPage';

describe('Calendar Page', () => {
    test('should render', () => {
        const component = renderer.create(
            <CalendarPage/>
        )
        .toJSON();
        expect(component).toMatchSnapshot();
    });
})