describe("Login Page", () => {
    beforeEach(() => {
      cy.visit("/login"); // Visit the login page before each test
    });
  
    it("loads the login page", () => {
      cy.contains("Sign in to GatorReads").should("be.visible");
    });
  
    it("allows user to enter UFID and password", () => {
      cy.get("input[name='ufid']").type("7710"); // Enter UFID
      cy.get("input[name='password']").type("password123"); // Enter password
    });
  
    it("handles incorrect credentials properly", () => {
      cy.intercept("POST", "/signin").as("loginRequest"); // Capture API request
  
      cy.get("input[name='ufid']").type("wrongUFID");
      cy.get("input[name='password']").type("wrongPassword");
      cy.get("button").contains("Sign In").click();
  
      cy.wait("@loginRequest").its("response.statusCode").should("eq", 404); // Ensure API returns 401 for incorrect credentials
    });
  
    it("submits login and redirects to dashboard on success", () => {
      cy.intercept("POST", "/signin").as("loginRequest"); // Capture API request
  
      cy.get("input[name='ufid']").type("7710"); // Enter correct UFID
      cy.get("input[name='password']").type("7710"); // Enter correct password
      cy.get("button").contains("Sign In").click();
  
      cy.wait("@loginRequest").its("response.statusCode").should("eq", 200); // Ensure login API succeeds
  
      cy.url({ timeout: 10000 }).should("include", "/student-dashboard"); // Ensure redirect happens
    });
  });