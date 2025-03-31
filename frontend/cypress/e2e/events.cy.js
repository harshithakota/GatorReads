describe('Events Component', () => {
    beforeEach(() => {
        // Mocking the API response to ensure the test will pass
        cy.intercept('GET', 'http://localhost:8083/getAllEvents', {
            statusCode: 200,
            body: {
                events: [
                    {
                        eventId: '1',
                        title: 'Sample Event',
                        EventDate: '2025-12-31',
                        eventTime: '10:00 AM',
                        location: 'Sample Location',
                        description: 'This is a sample event description.',
                        link: 'https://example.com'
                    }
                ]
            }
        }).as('fetchEvents');

        // Visit the page that renders the Events component
        cy.visit('/');
        cy.wait('@fetchEvents'); // Ensure the mock intercept is caught
    });

    it('successfully displays the events page title and at least one event', () => {
        // Checking for the presence of the page title
        cy.get('h4').contains('Upcoming Events').should('be.visible');

        // Checking that at least one event card is displayed
        cy.get('[data-cy=event-card]').should('have.length.at.least', 1);
    });
});