import React from 'react';
import renderer from 'react-test-renderer';
import { MemoryRouter } from 'react-router-dom';

import EventPage from '../../../src/components/OrgManagement/EventPage';

const props = {
    event: {
        name: "Resume panel",
        description: "Come get tips and ask questions about resumes and cover letters. Representatives from Advance Auto Parts and RepublicWireless will be there to answer questions and look over resumes, as well as Leslie Rand-Pickett from the CSC graduate career services",
        startTime: new Date(2018, 11, 24, 10, 33, 30, 0),
        endTime: new Date(2018, 11, 24, 10, 33, 30, 0),
        location: "Daniels Hall",
        tags: [
            "Technology",
            "Panel"
        ],
        rsvp: [
            "Anastasia",
            "This person",
            "next person"
        ],
        attended: []
    }
}

describe('Event Page', () => {
    test('should render', () => {
        const component = renderer.create(
            <MemoryRouter>
                <EventPage event={props.event}/>
            </MemoryRouter>
        )
        .toJSON();
        expect(component).toMatchSnapshot();
    });
})