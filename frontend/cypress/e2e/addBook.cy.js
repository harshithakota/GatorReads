describe("Add Book Page", () => {
    beforeEach(() => {
      cy.visit("/admin/add-book"); // Visit the Add Book page
    });
  
    it("loads the Add Book form", () => {
      cy.contains("Admin - Add Books").should("be.visible");
    });
  
    it("fills in the book details", () => {
      cy.get("input[name='bookFullName']").type("New Book Title");
      cy.get("input[name='authorName']").type("John Doe");
      cy.get("input[name='bookCount']").type("5");
  
      // ✅ Open the dropdown by clicking the select field
      cy.get("label").contains("Book Type").parent().click();
  
      // ✅ Select a specific option
      cy.contains("Fiction").click();
    });
  
    it("uploads a cover image", () => {
      cy.get("input[type='file']").selectFile("cypress/fixtures/sample.png", { force: true });
      cy.get("img").should("be.visible");
    });
  
    it("submits the book form successfully", () => {
      cy.intercept("POST", "**/addBook").as("addBookRequest");
  
      cy.get("button").contains("Add Book").click();
  
      cy.wait("@addBookRequest").its("response.statusCode").should("eq", 201);
    //   cy.contains("Book added successfully").should("be.visible");
    });
  });
  