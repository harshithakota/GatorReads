describe("Student Dashboard", () => {
    beforeEach(() => {
      cy.visit("/student-dashboard");
    });
  
    it("loads the dashboard with the welcome message", () => {
      cy.contains("Welcome").should("be.visible");
    });
  
    it("has quick action buttons", () => {
      cy.contains("Search Books").should("be.visible");
      cy.contains("My Loans").should("be.visible");
      cy.contains("Loan History").should("be.visible");
      cy.contains("Reservations").should("be.visible");
    });
  
    it("navigates to search books when clicking 'Search Books'", () => {
      cy.contains("Search Books").click();
      cy.url().should("include", "/search-books");
    });
  });