describe('Popular Books Component', () => {
    beforeEach(() => {
        // Visit the page that renders the PopularBooks component
        cy.visit('/'); // Adjust this URL to match the actual route in your app
    });

    it('should display the title "Popular Books"', () => {
        // Check for the presence of the "Popular Books" title
        cy.get('.popularbooks-title').contains('Popular Books').should('be.visible');
    });

    it('should display multiple book images', () => {
        // Check for the presence of multiple book images
        cy.get('.popular-book').should('have.length.at.least', 1);
        // Optionally, you could check for each image to have a valid src attribute
        cy.get('.popular-book').each(($el) => {
            expect($el).to.have.attr('src').and.not.be.empty;
            expect($el).to.have.attr('alt'); // Verify that alt attribute exists
        });
    });

    it('ensures all images load correctly', () => {
        // Check if all images are loaded correctly by ensuring the naturalWidth attribute is greater than 0
        cy.get('.popular-book').each(($img) => {
            // Only perform this check on images that have completed loading
            cy.wrap($img).should('be.visible').and(($img) => {
                expect($img[0].naturalWidth).to.be.greaterThan(0);
            });
        });
    });
});
