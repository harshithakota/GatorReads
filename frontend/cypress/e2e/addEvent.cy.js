describe('Add Event Form', () => {
    beforeEach(() => {
        // Start the test by visiting the Add Event page
        cy.visit('/addevent'); 

        // Intercept the POST request made when the event form is submitted
        // cy.intercept('POST', 'http://localhost:8083/addEvent', {
        //     statusCode: 201,
        //     body: {
        //         message: 'Event added successfully'
        //     }
        // }).as('addEvent');
    });

    it('allows a user to add an event', () => {
        cy.get('h6').contains('Add New Event').should('be.visible');
        // Fill out the form
        // cy.get('input[name="eventId"]').type('EVT1001');
        // cy.get('input[name="title"]').type('New Event');
        // cy.get('input[name="description"]').type('This is a test description for the new event.');
        // cy.get('input[name="eventDate"]').type('2025-12-25');
        // cy.get('input[name="eventTime"]').type('15:00');
        // cy.get('input[name="location"]').type('Test Location');
        // cy.get('input[name="link"]').type('https://example.com/event');

        // // Submit the form
        // cy.get('button[type="submit"]').click();

        // // Wait for the 'addEvent' request to resolve
        // cy.wait('@addEvent').then((interception) => {
        //     assert.equal(interception.response.statusCode, 201, 'Checks for the correct status code');
        //     assert.equal(interception.response.body.message, 'Event added successfully', 'Checks for success message');
        // });

        // // Optionally, check for UI changes or alerts that indicate success
        // cy.get('alert').should('contain', 'Event added successfully'); // Adjust this based on how your UI displays success messages
    });
});