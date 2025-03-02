## Sprint 2 Progress Report

### Work Completed in Sprint 2
During Sprint 2, we focused on enhancing both the frontend and backend functionalities of the GatorReads system. The key areas of progress included:

---

### **Frontend Development**
- Developed the **Admin Dashboard** with options to **add and manage books**.
- Created the **Search Books** feature, allowing users to **search and filter books** by title and author.
- Implemented the **Loan Books** functionality, enabling students to borrow books.
- Designed the **View Books** page to display all available books with **images and metadata**.
- Developed the **Manage Loans** page for administrators to track and update book loans.
- Improved **UI/UX design** with **Material-UI components** for a more intuitive user experience.
- Connected frontend components with **API endpoints** for **dynamic data retrieval and updates**.

---

### **Backend Development**
- Developed **API endpoints** for **retrieving all books**, allowing users to fetch a complete list of available books.
- Implemented an **API to fetch a specific book** based on its **unique book ID**.
- Created the **Issue Book API**, enabling students to **borrow books** while updating book availability in the database.
- Developed the **Return Book API**, allowing students to **return borrowed books** and updating loan records accordingly.
- Designed the **Get Issued Book API** to fetch details of a particular **issued book** for a specific user.
- Implemented the **Get All Issued Books API** for administrators to **track and manage all active and returned book loans**.
- Integrated **GORM ORM with PostgreSQL** for efficient database interactions and structured queries.
- Implemented **error handling and validation mechanisms** to ensure secure and robust API responses.
- Used **Gin framework** for building **high-performance and scalable RESTful APIs**.
- Connected the **backend APIs with the frontend components** to enable **dynamic book management and loan tracking**.

---

### **Cypress End-to-End (E2E) Tests for Frontend**
We implemented **Cypress tests** to verify the critical user flows in the application. The following test cases were covered:

#### **Login Page (`login.cy.js`)**
- Verify that the **login page** loads successfully.
- Ensure users can **enter UFID and password**.
- Test **incorrect credentials handling** (should show an error message).
- Test **successful login and redirection** based on user type (student → `/student-dashboard`, admin → `/admin-dashboard`).

#### **Register Page (`register.cy.js`)**
- Check if the **registration page** loads.
- Ensure users can **fill in all required fields**.
- Validate that **incorrect data** shows errors.
- Verify **successful registration** and **redirection to login**.

#### **Student Dashboard (`studentDashboard.cy.js`)**
- Confirm that the **dashboard loads with user-specific data**.
- Verify that **navigation buttons** (Search Books, My Loans, etc.) work.
- Check that **current loans and due dates** are displayed properly.

#### **Search Books (`searchBooks.cy.js`)**
- Ensure that the **book search page** loads.
- Verify users can **search books by title or author**.
- Confirm **books can be loaned successfully**.

#### **View Books (`ViewBooks.cy.js`)**
- Ensure the **book list loads properly**.
- Check that book details (**title, author, availability**) are displayed correctly.
- Verify **filtering works as expected**.

#### **Add Book (`addBook.cy.js`)**
- Validate that the **admin can access** the "Add Book" page.
- Ensure **book details** can be entered.
- Check **file upload** for book cover images.
- Test **successful book addition** and redirection to **View Books**.

#### **Manage Loans (`manageLoans.cy.js`)**
- Confirm that **all active book loans** are displayed.
- Validate the **"Mark as Returned"** functionality updates loan status.

#### **Admin Dashboard (`AdminDashboard.cy.js`)**
- Ensure the **admin dashboard loads** with available actions.
- Test that **navigation** to Add Book, View Books, and Manage Loans **works properly**.

---

### **Unit and Integration Tests for Backend API**
We implemented **Go test cases** using `httptest`, `gin-gonic`, and `testify/assert` to validate critical API functionalities in the backend. The following test cases were covered:

#### **Get All Books (`TestGetAllBooks`)**
- Ensures that **all available books** are retrieved successfully.  
- Verify that the endpoint responds with **`200 OK`** when books exist.
- Ensure that if no books are available, the response is **`404 Not Found`**.

#### **Get Specific Book (`TestGetBook`)**
- Fetches details of a book using its **`bookId`**.
- Ensure that a **valid `bookId`** returns **`200 OK`** with book details.
- Validate that an **invalid `bookId`** returns **`404 Not Found`**.

#### **Add New Book (`TestAddBook`)**
- Allows **admins** to **add books** to the library.  
- Ensure that a new book can be added with **all required details** (**`201 Created`**).
- Validate that adding a book with an **existing `bookId`** returns **`500 Internal Server Error`**.

#### **Issue a Book (`TestIssueBook`)**
- Enables **students to borrow books**.  
- Ensure that a book can be **successfully issued** (**`200 OK`**).
- Validate that **trying to issue a book that is out of stock** returns **`400 Bad Request`**.
- Verify that **issuing an already borrowed book** maintains the **correct loan record**.

#### **Return a Book (`TestReturnBook`)**
- Allows **students to return borrowed books**.  
- Ensure a **borrowed book is marked as returned** (**`200 OK`**).
- Validate that **returning a book that was never issued** returns **`404 Not Found`**.

#### **Get All Loans (`TestAllLoans`)**
- Retrieves a **list of all active and past loans**.  
- Ensure the API returns **`200 OK`** when loans exist.
- Verify **`404 Not Found`** if no loans exist.

#### **Get Loans by UFID (`TestGetLoans`)**
- Fetches **all issued books** for a specific user (`UFID`).  
- Ensure a **user with active loans receives a `200 OK`** response with loan details.
- Validate that a **user with no active loans gets a `404 Not Found`** response.
