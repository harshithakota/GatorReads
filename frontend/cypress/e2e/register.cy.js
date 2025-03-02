describe("Register Page", () => {
    beforeEach(() => {
      cy.visit("/register");
    });
  
    it("loads the registration page", () => {
      cy.contains("Student Registration").should("be.visible");
    });
  
    it("fills the registration form", () => {
      cy.get("input[name='userFullName']").type("John Doe");
      cy.get("input[name='ufid']").type("99999999");
      cy.get("input[name='dob']").type("2000-01-01");
      cy.get("input[name='email']").type("john@example.com");
      cy.get("input[name='password']").type("password123");
    });
  
    it("submits form and redirects to login", () => {
      cy.get("input[name='userFullName']").type("John Doe");
      cy.get("input[name='ufid']").type("99999999");
      cy.get("input[name='dob']").type("2000-01-01");
      cy.get("input[name='email']").type("john@example.com");
      cy.get("input[name='password']").type("password123");
      cy.get("button").contains("Register").click();
    });
  });