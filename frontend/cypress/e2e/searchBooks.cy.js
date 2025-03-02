describe("Search Books Page", () => {
    beforeEach(() => {
      cy.visit("/search-books"); // Visit the search books page
    });
  
    it("loads the search page correctly", () => {
      cy.contains("Search & Loan Books").should("be.visible");
    });
  
    it("allows user to type in the search bar", () => {
      cy.get("input").type("Clean Code").should("have.value", "Clean Code");
    });
  
    // it("simulates loaning a book", () => {
    //   cy.intercept("POST", "/issueBook").as("loanRequest");
  
    //   cy.contains("Loan Book").first().click();
  
    //   cy.wait("@loanRequest").its("response.statusCode").should("eq", 200);
    //   cy.contains("Book successfully loaned").should("be.visible");
    // });
  });