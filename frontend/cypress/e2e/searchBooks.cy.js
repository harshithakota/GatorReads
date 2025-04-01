describe("Search Books Page", () => {
  beforeEach(() => {
    cy.visit("/search-books"); // Visit the search books page
  });

  it("loads the search page correctly", () => {
    cy.contains("Search & Loan Books").should("be.visible");
  });
});