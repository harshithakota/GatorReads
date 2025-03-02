  describe("Add Book Page", () => {
    beforeEach(() => {
      cy.visit("/admin/add-book");
    });
  
    it("submits the book form successfully", () => {
      cy.intercept("POST", "http://localhost:8083/addBook").as("addBookRequest");
  
      cy.get("input[name='bookFullName']").type("New Book Title");
      cy.get("input[name='authorName']").type("John Doe");
      cy.get("input[name='bookCount']").type("5");
  
      cy.get("label").contains("Book Type").parent().click();
      cy.contains("Fiction").click();
  
      cy.get("input[type='file']").selectFile("cypress/fixtures/sample.png", { force: true });
  
      cy.get("button").contains("Add Book").should("be.visible").click();
  
      cy.wait("@addBookRequest", { timeout: 10000 }).its("response.statusCode").should("eq", 201);
    });
  });
  
  