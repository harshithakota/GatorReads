describe("Manage Loans Page", () => {
    beforeEach(() => {
      cy.visit("/admin/manage-loans"); // ✅ Visit Manage Loans Page
    });
  
    it("loads the Manage Loans page", () => {
      cy.contains("Manage Book Loans").should("be.visible");
      cy.contains("View and manage all active loans").should("be.visible");
    });

  
  });
  