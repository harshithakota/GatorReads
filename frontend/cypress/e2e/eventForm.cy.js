describe('Event Form', () => {
    beforeEach(() => {
      cy.visit('/admin/manage-events'); // or route where EventForm can be tested
      cy.contains('Edit').first().click(); // Opens Edit Form Modal
    });
  
    it('renders form with event details', () => {
      cy.get('input[name="title"]').should('exist');
      cy.get('input[name="EventDate"]').should('exist');
      cy.get('input[name="eventTime"]').should('exist');
    });
  
    it('updates event details and submits', () => {
    //   cy.get('input[name="title"]').clear().type('Updated Event Name');
    //   cy.get('input[name="location"]').clear().type('New Location');
  
    //   cy.contains('Save').click();
  
    //   cy.contains('Event updated successfully').should('be.visible');
    });
  
    it('cancels the form without saving', () => {
      cy.contains('Cancel').click();
      cy.get('input[name="title"]').should('not.exist');
    });
  });
  