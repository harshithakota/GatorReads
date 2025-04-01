describe('Recent Added Books Component', () => {
    beforeEach(() => {
        // Start the test by visiting the page where RecentAddedBooks is rendered
        cy.visit('/'); // Update this to match the route in your app
    });

    it('should display the title "Recent Uploads"', () => {
        // Check for the presence of the "Recent Uploads" title
        cy.get('.recentbooks-title').contains('Recent Uploads').should('be.visible');
    });

    it('should display multiple book images', () => {
        // Check for the presence of multiple book images
        cy.get('.recent-book').should('have.length.at.least', 1);
        // Optionally, check that each image has a valid src and alt attribute
        cy.get('.recent-book').each(($el) => {
            expect($el).to.have.attr('src').and.not.be.empty;
            expect($el).to.have.attr('alt'); // Verify that alt attributes exist and could be empty or filled
        });
    });
});
