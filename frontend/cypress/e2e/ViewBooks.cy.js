describe("View Books", () => {
    beforeEach(() => {
      cy.visit("/admin/view-books");
    });
  
    it("loads view books page", () => {
      cy.contains("Library Book Collection").should("be.visible");
    });
  
    it("displays books", () => {
      cy.get("img").should("have.length.greaterThan", 0);
    });
  });
  