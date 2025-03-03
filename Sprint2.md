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



# GatorReads API Documentation

The API Documentation for GatorReads provides a comprehensive guide on how to interact with the GatorReads backend system via various endpoints. These APIs facilitate a range of functionalities, including user registration, sign-in and sign-out processes, book management (such as adding, fetching, and returning books), and handling loan records. Each API endpoint is described with its method, request parameters, authentication requirements, expected responses, and error handling, making it easy for developers to integrate and use these services in application development. This documentation serves as a crucial tool for understanding how to effectively communicate with the GatorReads system to manage users, books, and loan records within the platform.

---

## **1. User Registration API**

**Endpoint:** `POST http://localhost:8083/register`  
**Content Type:** `application/json`  
**Authentication:** Not required  

### **Request Parameters**
- **userType** (String, Required): Defines the type of user (e.g., "Student").
- **userFullName** (String, Required): The full name of the user.
- **ufid** (String, Required): A unique identifier for the user.
- **dob** (String, Required): The date of birth of the user in `YYYY-MM-DD` format.
- **gender** (String, Required): The gender of the user (e.g., "Male", "Female", "Other").
- **email** (String, Required): The email address of the user.
- **password** (String, Required): The user's password, which should follow security guidelines.
- **isAdmin** (Boolean, Required): A flag indicating whether the user has admin privileges (`true` for admin, `false` for a regular user).

### **Response**
#### **Success Response (HTTP 200 OK)**
```json
{
  "message": "User registered successfully"
}
```
### **Error Handling**  
If an error occurs, the API may return one of the following responses:

- **400 Bad Request:** This happens if required fields are missing or invalid.  
- **409 Conflict:** If a user with the provided email or UFID already exists.  
- **500 Internal Server Error:** If the server encounters an unexpected issue.  

This API allows users to create an account by submitting their personal details. The server processes the request and, if all details are valid, registers the user successfully.

## **2. User Sign-in API**  

### **Endpoint**  
The API for user login is available at:  
`POST http://localhost:8083/signin`  

### **Content Type**  
`application/json`  

### **Authentication**  
This endpoint does not require authentication, but users must provide valid credentials.  

### **Request Parameters**  
The request body must contain the following fields:

- **ufId** (String, Required): The unique user identifier used for login.  
- **password** (String, Required): The user's password.  

### **Example Request**  
A valid request should contain the UFID and password in JSON format.  

### **Response**  
Upon successful authentication, the API returns a JSON response containing a success message and user details.

#### **Success Response (HTTP 200 OK)**  
- **Message:** `"Login successful"`  
- **User Details:**  
  - **ID:** Unique user ID assigned by the system.  
  - **CreatedAt:** Timestamp of when the user was created.  
  - **UpdatedAt:** Timestamp of the last user update.  
  - **DeletedAt:** If the account is deleted, this field will have a timestamp; otherwise, it remains `null`.  
  - **userType:** Defines the role of the user (e.g., "Student").  
  - **userFullName:** The full name of the user.  
  - **ufid:** The unique identifier of the user.  
  - **dob:** The date of birth of the user in `YYYY-MM-DD` format.  
  - **gender:** The gender of the user.  
  - **email:** The email address of the user.  
  - **password:** A hashed version of the user's password for security.  
  - **isAdmin:** A boolean flag indicating if the user has admin privileges (`true` for admin, `false` for regular users).  

### **Error Handling**  
If the login fails, the API returns one of the following errors:

- **400 Bad Request:** If required fields are missing or invalid.  
- **401 Unauthorized:** If the UFID or password is incorrect.  
- **500 Internal Server Error:** If an unexpected server error occurs.  

This API allows users to log in by providing their UFID and password. If the credentials are valid, the server responds with a success message and the user's details.

## **3. User Sign-out API**  

### **Endpoint**  
The API for user logout is available at:  
`POST http://localhost:8083/signout`  

### **Content Type**  
`application/json`  

### **Authentication**  
No authentication token is required, but the request must contain a valid UFID.  

### **Request Parameters**  
The request body must contain the following field:

- **ufId** (String, Required): The unique identifier of the user who is logging out.  

### **Example Request**  
A valid request should include the user's UFID in JSON format.  

### **Response**  
Upon successful logout, the API returns a confirmation message and the UFID of the logged-out user.

#### **Success Response (HTTP 200 OK)**  
- **Message:** `"User logged out successfully"`  
- **UserId:** The UFID of the user who logged out.  

### **Error Handling**  
If the logout fails, the API returns one of the following errors:

- **400 Bad Request:** If the UFID is missing or invalid.  
- **404 Not Found:** If the user with the provided UFID is not found.  
- **500 Internal Server Error:** If an unexpected error occurs on the server.  

This API enables users to log out by submitting their UFID. Upon successful logout, the system confirms the action with a success message.

## **4. Add Book API**  

### **Endpoint**  
The API for adding a book is available at:  
`POST http://localhost:8083/addBook`  

### **Content Type**  
`application/json`  

### **Authentication**  
Depending on system design, this endpoint may require authentication or admin privileges to add books.  

### **Request Parameters**  
The request body must include the following details:

- **bookId** (String, Required): A unique identifier for the book.  
- **bookType** (String, Required): The category of the book (e.g., Fiction, Non-Fiction, Science, etc.).  
- **bookFullName** (String, Required): The full title of the book.  
- **bookCount** (Integer, Required): The number of copies available.  
- **authorName** (String, Required): The name of the book’s author.  
- **imageData** (String, Optional): Base64 encoded string representing the book's cover image.  

### **Example Request**  
A valid request should contain the book details in JSON format.  

### **Response**  
Upon successful addition, the API returns a success message along with the book details.

#### **Success Response (HTTP 200 OK)**  
- **Message:** `"Book added successfully"`  
- **Book Details:**  
  - **bookId:** Unique identifier for the book.  
  - **bookType:** The category of the book.  
  - **bookFullName:** The full title of the book.  
  - **bookCount:** Number of copies available.  
  - **authorName:** Name of the book's author.  
  - **imageData:** Base64 string of the book cover image.  

### **Error Handling**  
If the book addition fails, the API returns one of the following errors:

- **400 Bad Request:** If required fields are missing or invalid.  
- **409 Conflict:** If a book with the same `bookId` already exists.  
- **500 Internal Server Error:** If an unexpected server error occurs.  

This API allows users to add books to the system by providing book details. If the book is added successfully, the system confirms the action and returns the book’s information.

## **Get Book API**  

### **Endpoint**  
The API for retrieving a book's details is available at:  
`GET http://localhost:8083/getBook/{bookId}`  

### **Content Type**  
`application/json`  

### **Authentication**  
Authentication may be required based on system access control.  

### **Path Parameter**  
- **bookId** (String, Required): The unique identifier of the book to retrieve.  

### **Example Request**  
To retrieve details of a book with ID `B140`, send a `GET` request to:  
http://localhost:8083/getBook/B140


### **Response**  
If the book is found, the API returns its details.

#### **Success Response (HTTP 200 OK)**  
- **Book Details:**  
  - **bookId:** Unique identifier of the book.  
  - **bookType:** The category of the book (e.g., Fiction, Non-Fiction).  
  - **bookFullName:** The full title of the book.  
  - **bookCount:** Number of copies available.  
  - **issueDate:** The date when the book was issued (default `"0001-01-01T00:00:00Z"` if not issued).  
  - **authorName:** Name of the book’s author.  
  - **imageData:** Base64 encoded string representing the book's cover image.  

### **Error Handling**  
If the book is not found or an error occurs, the API may return:

- **404 Not Found:** If no book exists with the given `bookId`.  
- **500 Internal Server Error:** If an unexpected server issue occurs.  

This API allows users to retrieve book details by providing a book ID. If the book is found, the system returns relevant details including its title, author, availability, and cover image.

