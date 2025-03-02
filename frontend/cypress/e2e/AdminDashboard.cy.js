describe("Admin Dashboard", () => {
    beforeEach(() => {
      cy.visit("/admin-dashboard");
    });
  
    it("loads admin dashboard", () => {
      cy.contains("Admin Dashboard").should("be.visible");
    });
  
    it("navigates to Add Book", () => {
      cy.get("button").contains("Add Book").click();
      cy.url().should("include", "/admin/add-book");
    });
  
    it("navigates to View Books", () => {
      cy.get("button").contains("View Books").click();
      cy.url().should("include", "/admin/view-books");
    });
  });
  