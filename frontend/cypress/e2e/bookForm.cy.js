describe('Book Form', () => {
    beforeEach(() => {
      cy.visit('/admin/view-books'); // or route where BookForm can be tested
      cy.contains('Edit').first().click(); // Opens Edit Form Modal
    });
  
    it('renders form with pre-filled data', () => {
      cy.get('input[name="bookFullName"]').should('exist');
      cy.get('input[name="authorName"]').should('exist');
      cy.get('input[name="bookCount"]').should('exist');
    });
  
    it('allows updating book details and submits', () => {
      cy.get('input[name="bookFullName"]').clear().type('Cypress Testing Book');
      cy.get('input[name="authorName"]').clear().type('Cypress Author');
      cy.get('input[name="bookCount"]').clear().type('10');
  
      cy.contains('Save').click();
  
      cy.contains('Book updated successfully').should('be.visible');
    });
  
    it('closes the form on cancel', () => {
      cy.contains('Cancel').click();
      cy.get('input[name="bookFullName"]').should('not.exist');
    });
  });
  