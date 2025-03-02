describe("Manage Loans Page", () => {
    beforeEach(() => {
      cy.visit("/admin/manage-loans"); // ✅ Visit Manage Loans Page
    });
  
    it("loads the Manage Loans page", () => {
      cy.contains("Manage Book Loans").should("be.visible");
      cy.contains("View and manage all active loans").should("be.visible");
    });
  
    it("displays the loan table with correct data", () => {
      cy.get("table").should("be.visible"); // ✅ Table exists
  
      // ✅ Verify a row exists for "John Doe"
      cy.contains("td", "John Doe").should("be.visible");
      cy.contains("td", "Introduction to Algorithms").should("be.visible");
  
      // ✅ Verify a row exists for "Alice Smith"
      cy.contains("td", "Alice Smith").should("be.visible");
      cy.contains("td", "Clean Code").should("be.visible");
  
      // ✅ Verify a row exists for "Bob Johnson"
      cy.contains("td", "Bob Johnson").should("be.visible");
      cy.contains("td", "The Pragmatic Programmer").should("be.visible");
    });
  
    // it("marks a book as returned", () => {
    //     cy.contains("Mark as Returned").first().click(); // ✅ Click first return button
      
    //     // ✅ Ensure button is removed after clicking
    //     cy.contains("Mark as Returned").should("not.exist");
      
    //     // ✅ Ensure the "Returned" status is visible
    //     cy.contains("td", "Returned").should("be.visible");
    //   });
      
  
  });
  