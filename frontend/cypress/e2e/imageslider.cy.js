describe('ImageSlider Component', () => {
    beforeEach(() => {
        // Start the test by visiting the page where ImageSlider is rendered
        cy.visit('/image-slider'); // Update this to match the actual route in your app
    });

    it('should display the carousel with images', () => {
        // Check for the presence of the carousel and its content
        cy.get('.slider .carousel').should('exist');
        cy.get('.carousel-item').should('have.length', 3); // Checks there are exactly three slides
    });

    it('should automatically transition between slides', () => {
        // Checking the transition between the first and second slide
        cy.get('.carousel-item.active img')
            .should('have.attr', 'alt', 'First slide')
            .and('be.visible');
        
        // Wait longer than the first interval time to ensure slide has changed
        cy.wait(1500);

        cy.get('.carousel-item.active img')
            .should('have.attr', 'alt', 'Second slide')
            .and('be.visible');
    });

    it('should display correct captions for each slide', () => {
        // Check the caption of the first slide
        cy.get('.carousel-item.active').within(() => {
            cy.get('.carousel-caption h3').contains('First slide label');
            cy.get('.carousel-caption p').contains('Nulla vitae elit libero, a pharetra augue mollis interdum.');
        });

        // Transition to the next slide to check its caption
        cy.wait(1000); // Wait for the next slide due to the interval

        cy.get('.carousel-control-next').click(); // Move to the next slide

        cy.get('.carousel-item.active').within(() => {
            cy.get('.carousel-caption h3').contains('Second slide label');
            cy.get('.carousel-caption p').contains('Lorem ipsum dolor sit amet, consectetur adipiscing elit.');
        });
    });
});
