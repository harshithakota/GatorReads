## Work Completed in Sprint 4

## Frontend

### Book and Event Editing Functionality (Admin)
- Introduced editable forms for both books and events, empowering admins to modify details with ease.
- The book edit form allows updates to title, author, and count, and includes validations before submission.
- The event edit form supports updates to event name, date, and time.
- These forms are integrated into modal dialogs to maintain seamless user interaction.

### Authentication & State Persistence
- Resolved issue where user greeting disappeared on reload by syncing dashboard with localStorage.
- Ensured that once a user logs in, their session remains intact until explicitly logged out.

### UI Enhancements

- Login & Register Pages were redesigned with elevated cards (`Paper`), spacing (`Box`), and visual feedback via `Snackbar`.
- Navbar Layout was corrected to align branding ("GATOR READS") to the left and authentication/navigation buttons to the right using `flexbox`.
- Responsive Design was applied throughout to support smooth usage on different devices.
- Consistent font sizes, margins, and color themes were applied to enhance overall readability and professionalism.


## Backend
### User Management APIs

- **Get All Users API**  
  Implemented an endpoint to retrieve all registered users in the system, returning user details in bulk for administrative visibility.

- **Get Specific User API**  
  Developed functionality to fetch user details using their unique `ufid`, with validation and appropriate error messaging for invalid IDs.

- **Add User API (Register)**  
  Previously implemented as part of authentication, this POST API allows creation of new users with fields like name, UFID, DOB, gender, email, and role.

- **Update User API**  
  Enabled the ability to modify existing user records via `ufid`. Ensures data is validated before updating fields like name, email, and user type.

- **Delete User API**  
  Created functionality to remove users from the database using their `ufid`, ensuring the record exists before deletion and returning clear success or error messages.
  
### Event Management Extension

- **Search Events by Name API**  
  Introduced a GET endpoint that allows users to search for events using a partial or full event title via a query parameter. The API performs a case-insensitive match and returns all matching events, or an appropriate message if no matches are found. This feature enhances discoverability and filtering of events based on user input.

### Technical Enhancements  

- **Error Handling & Validation**  
  Integrated consistent and descriptive error messages across all event-related APIs to enhance robustness and security.  

- **RESTful API Design**  
  Utilized the high-performance Gin framework to maintain clean, modular, and scalable RESTful APIs.  

- **GORM Integration with PostgreSQL**  
  Leveraged GORM ORM for efficient and structured query handling with the PostgreSQL database.  

- **Input Data Validation**  
  Implemented built-in validation methods to ensure incoming JSON payloads adhere to the expected schema before processing.  

- **Seamless Backend Integration**  
  Ensured APIs are fully integrated with the backend system, following scalable design patterns to facilitate future extensions.

## Cypress End-to-End (E2E) Tests

### Login Page (`login.cy.js`)
- Verify that the login page loads successfully.
- Ensure users can enter UFID and password.
- Test incorrect credentials handling (should show an error message).
- Test successful login and redirection based on user type (student → `/student-dashboard`, admin → `/admin-dashboard`).

### Register Page (`register.cy.js`)
- Check if the registration page loads.
- Ensure users can fill in all required fields.
- Validate that incorrect data shows errors.
- Verify successful registration and redirection to login.

### Student Dashboard (`studentDashboard.cy.js`)
- Confirm that the dashboard loads with user-specific data.
- Verify that navigation buttons (Search Books, My Loans, etc.) work.
- Check that current loans and due dates are displayed properly.

### Search Books (`searchBooks.cy.js`)
- Ensure that the book search page loads.
- Verify users can search books by title or author.
- Confirm books can be loaned successfully.

### View Books (`ViewBooks.cy.js`)
- Ensure the book list loads properly.
- Check that book details (title, author, availability) are displayed correctly.
- Verify filtering works as expected.

### Add Book (`addBook.cy.js`)
- Validate that the admin can access the "Add Book" page.
- Ensure book details can be entered.
- Check file upload for book cover images.
- Test successful book addition and redirection to View Books.

### Manage Loans (`manageLoans.cy.js`)
- Confirm that all active book loans are displayed.
- Validate the "Mark as Returned" functionality updates loan status.

### Admin Dashboard (`AdminDashboard.cy.js`)
- Ensure the admin dashboard loads with available actions.
- Test that navigation to Add Book, View Books, and Manage Loans works properly.

### Events Component Tests
- Verify the Events page loads and displays events correctly.
- Ensure all listed events show accurate details.

### Add Event Form Tests
- Confirm the Add Event page loads correctly.
- Validate the functionality of the form fields and submission process.

### Popular Books Component Tests
- Verify the Popular Books section displays correctly.
- Ensure images load and are clickable.

### Recent Added Books Component Tests
- Check the Recent Uploads section for correct rendering and image functionality.

### ImageSlider Component Tests
- Ensure the ImageSlider loads and transitions between images correctly.
- Test the display and accuracy of image captions.

### Book Form Editing (`bookform.cy.js`)
- Open the Edit Book form by clicking the first "Edit" button.
- Allow the admin to edit the values and submit the form.
- Confirm that a success message (`Book updated successfully`) is displayed after submission.
- Ensure that clicking "Cancel" closes the form without saving changes.

### Event Form Editing (`eventform.cy.js`)
- Open the Edit Event form by clicking the first "Edit" button.
- Check that the form fields are visible and pre-filled.
- Confirm that clicking "Cancel" closes the form without submitting any changes.


These tests cover critical functionalities of the application, ensuring robustness and reliability of the platform through systematic validation of user flows and backend integration.


## **Unit and Integration Tests for Backend API**
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

#### **Delete Book (TestDeleteBook)**
- Deletes a book using its bookId.
- Returns **200 OK** on successful deletion.
- Returns **404 Not Found** if the book does not exist.
  
#### **Add Event (TestAddEvent)**
- Adds a new event to the system.
- Returns **201 Created** with event data.
- Returns **400 Bad Request** if data is invalid.

#### **Get All Events (TestGetAllEvents)**
- Retrieves a list of all scheduled events.
- Returns **200 OK** with event list or **404 Not Found** if none exist.

#### **Get Event by ID (TestGetEvent)**
- Fetches an event using eventId.
- Returns **200 OK** with event details or **404 Not Found**.

#### **Update Event (TestUpdateEvent)**
- Updates existing event data.
- Returns **200 OK** with updated event.
- Returns **404 Not Found** if event does not exist.

#### **Delete Event (TestDeleteEvent)**
- Deletes an event by ID.
- Returns **200 OK** on success.
- Returns **404 Not Found** if event is not found.

#### **Search Events by Name (`TestSearchEventsByName`)**
- Searches for events by partial or full title.
- Returns **`200 OK`** with matching events.
- Returns **`404 Not Found`** if no matches are found.
- Returns **`400 Bad Request`** if name query is missing.

#### **Get All Users (`TestGetAllUsers`)**
- Retrieves all users from the system.
- Returns **`200 OK`** if users exist.
- Returns **`404 Not Found`** if no users are present.

#### **Get Specific User (`TestGetUser`)**
- Retrieves a user using their UFID.
- Returns **`200 OK`** with user data.
- Returns **`404 Not Found`** if UFID doesn't exist.

#### **Update User (`TestUpdateUser`)**
- Updates user profile data by UFID.
- Returns **`200 OK`** with updated user details.
- Returns **`404 Not Found`** if user is not found.
- Returns **`400 Bad Request`** for invalid update input.

# GatorReads API Documentation

The API Documentation for GatorReads provides a comprehensive guide on how to interact with the backend system through various RESTful endpoints. These APIs enable a wide range of functionalities, including user authentication (registration, sign-in, and sign-out), book management (adding, retrieving, issuing, returning, deleting), loan tracking, and event management.
In addition to core features, the system now includes extended support for user management (viewing, updating, and deleting users), as well as event search functionality using flexible query parameters. Each API endpoint is clearly documented with its method, request format, authentication requirements, expected responses, and error handling — empowering developers to efficiently build, integrate, and maintain robust applications on top of the GatorReads platform.

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

---

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

---

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

---

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

---

## **5. Get Book API**  

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

---

## **6. Get All Books API**  

### **Endpoint**  
The API for retrieving a list of all books is available at:  
GET http://localhost:8083/getAllBooks  

### **Content Type**  
application/json  

### **Authentication**  
Authentication may be required based on system access control.  

### **Response**  
If books are found, the API returns a list of books along with their details.

#### **Success Response (HTTP 200 OK)**  
- **Books (Array):** List of books available in the system, each containing:  
  - **bookId:** Unique identifier of the book.  
  - **bookType:** The category of the book (e.g., Fiction, Non-Fiction).  
  - **bookFullName:** The full title of the book.  
  - **bookCount:** Number of copies available.  
  - **issueDate:** The date when the book was issued (default "0001-01-01T00:00:00Z" if not issued).  
  - **authorName:** Name of the book’s author.  
  - **imageData:** Base64 encoded string representing the book's cover image (optional).  

### **Example Response**  
The response contains multiple books with their details.

### **Error Handling**  
If an error occurs while fetching the books, the API may return:

- **404 Not Found:** If no books are available in the system.  
- **500 Internal Server Error:** If an unexpected server issue occurs.  

This API enables users to retrieve a list of all books along with their details, including title, author, availability, and cover image. If books exist in the system, they are returned in an array format.

---

## **7. Issue Book API**  

### **Endpoint**  
The API for issuing a book is available at:  
POST http://localhost:8083/issueBook  

### **Content Type**  
application/json  

### **Authentication**  
Authentication may be required based on system access control.  

### **Request Parameters**  
The request body must contain the following details:

- **ufid** (String, Required): The unique identifier of the user borrowing the book.  
- **bookid** (String, Required): The unique identifier of the book being issued.  
- **issueDate** (String, Required): The date when the book is being issued, in YYYY-MM-DDTHH:MM:SSZ format.  

### **Example Request**  
A valid request should include the UFID, book ID, and issue date in JSON format.  

### **Response**  
If the book is successfully issued, the API returns a confirmation message along with the issue details.

#### **Success Response (HTTP 200 OK)**  
- **Message:** "Book issued successfully"  
- **Issue Details:**  
  - **bookid:** The ID of the issued book.  
  - **issueDate:** The date the book was issued.  
  - **returnDate:** The expected return date (system-defined, typically 14 days after the issue date).  
  - **status:** The status of the issued book ("active" means the book is currently borrowed).  
  - **ufid:** The unique identifier of the user who borrowed the book.  

### **Error Handling**  
If the book cannot be issued, the API may return one of the following errors:

- **400 Bad Request:** If required fields are missing or invalid.  
- **404 Not Found:** If the specified book or user does not exist in the system.  
- **409 Conflict:** If the book is already issued and unavailable.  
- **500 Internal Server Error:** If an unexpected error occurs on the server.  

This API allows users to borrow books by providing their UFID and the book ID. If the request is successful, the system assigns an issue date and calculates a return date, returning the issue details to the user.

---

## **8. Return Book API**  

### **Endpoint**  
The API for returning a book is available at:  
POST http://localhost:8083/returnBook  

### **Content Type**  
application/json  

### **Authentication**  
Authentication may be required based on system access control.  

### **Request Parameters**  
The request body must contain the following details:

- **ufid** (String, Required): The unique identifier of the user returning the book.  
- **bookid** (String, Required): The unique identifier of the book being returned.  
- **returnDate** (String, Required): The date when the book is being returned, in YYYY-MM-DDTHH:MM:SSZ format.  

### **Example Request**  
A valid request should include the UFID, book ID, and return date in JSON format.  

### **Response**  
If the book is successfully returned, the API returns a confirmation message along with the return details.

#### **Success Response (HTTP 200 OK)**  
- **Message:** "Book returned successfully"  
- **Return Details:**  
  - **bookid:** The ID of the returned book.  
  - **issueDate:** The original issue date of the book.  
  - **returnDate:** The actual return date of the book.  
  - **status:** The status of the issued book ("returned" indicates the book has been successfully returned).  
  - **ufid:** The unique identifier of the user who returned the book.  

### **Error Handling**  
If the book cannot be returned, the API may return one of the following errors:

- **400 Bad Request:** If required fields are missing or invalid.  
- **404 Not Found:** If the specified book or user does not exist in the system.  
- **409 Conflict:** If the book was not issued to the user or was already returned.  
- **500 Internal Server Error:** If an unexpected error occurs on the server.  

This API allows users to return books they have borrowed by providing their UFID and book ID. If the return process is successful, the system updates the book status and confirms the action with return details.

---

## **9. Get User Loan History API**  

### **Endpoint**  
The API for retrieving a user's loan history is available at:  
GET http://localhost:8083/getLoans/{ufid}  

### **Content Type**  
application/json  

### **Authentication**  
Authentication may be required based on system access control.  

### **Path Parameter**  
- **ufid** (String, Required): The unique identifier of the user whose loan history is being requested.  

### **Example Request**  
To retrieve the loan history of the user with UFID 000113, send a GET request to:  
http://localhost:8083/getLoans/000113


### **Response**  
If loans are found, the API returns a list of books that the user has borrowed, including their status.

#### **Success Response (HTTP 200 OK)**  
- **Allotments (Array):** List of books issued to the user, each containing:  
  - **ufid:** The unique identifier of the user.  
  - **bookid:** The ID of the borrowed book.  
  - **issueDate:** The date when the book was issued.  
  - **status:** The status of the loan ("active" means the book is currently borrowed, "returned" means it has been returned).  
  - **dueDate:** The due date by which the book should be returned.  
  - **returnDate:** The actual return date (if the book has been returned, otherwise it remains as "0001-01-01T00:00:00Z").  

### **Example Response**  
A user with UFID 000113 has borrowed two books:  

- **Book ID: B138** is currently issued and due on **March 15, 2025**.  
- **Book ID: B140** was issued on **March 1, 2025, and returned on ****March 10, 2025**.  

### **Error Handling**  
If no loan records are found or an error occurs, the API may return:

- **404 Not Found:** If no loan history exists for the given ufid.  
- **500 Internal Server Error:** If an unexpected server issue occurs.  

This API allows users or administrators to check a user's loan history, including active and returned books. If records exist, they are returned in an array format with relevant loan details.

---

## **10. Get All Loan Records API**  

### **Endpoint**  
The API for retrieving all book loan records is available at:  
GET http://localhost:8083/getAllLoans  

### **Content Type**  
application/json  

### **Authentication**  
This endpoint may require authentication, particularly for administrators managing loan records.  

### **Response**  
If loan records are found, the API returns a list of all book loans, including issued and returned books.

#### **Success Response (HTTP 200 OK)**  
- **Loans (Array):** List of all loan records in the system, each containing:  
  - **ufid:** The unique identifier of the user.  
  - **bookid:** The ID of the borrowed book.  
  - **issueDate:** The date when the book was issued.  
  - **status:** The status of the loan ("active" means the book is currently borrowed, "returned" means it has been returned).  
  - **dueDate:** The due date by which the book should be returned.  
  - **returnDate:** The actual return date (if the book has been returned, otherwise it remains "0001-01-01T00:00:00Z").  

### **Example Response**  
A list of book loans, including:  

- **User 999995** borrowed multiple books, some of which were returned late.  
- **User 000113** has an active loan for **Book B138**.  
- **User 000114** has an active loan for **Book B140**.  
- **User 000113** has previously returned **Book B140** on **March 10, 2025**.  

### **Error Handling**  
If no loan records exist or an error occurs, the API may return:

- **404 Not Found:** If no loan records are available in the system.  
- **500 Internal Server Error:** If an unexpected server issue occurs.  

This API enables administrators to retrieve a full list of book loans, including active and returned books. It provides an overview of book transactions and helps track overdue books.

---

## **11. Delete Book API**

### **Endpoint**
`DELETE http://localhost:8083/deleteBook/{bookId}`

### **Content Type**
`application/json`

### **Authentication**
Authentication may be required (admin-only access in most systems).

### **Path Parameter**
- **bookId** (String, Required): The unique identifier of the book to be deleted.

### **Example Request**
To delete a book with ID `B140`, send a `DELETE` request to:
```
http://localhost:8083/deleteBook/B140
```

### **Response**
#### **Success Response (HTTP 200 OK)**
```json
{
  "message": "Book deleted successfully"
}
```

### **Error Handling**
- **400 Bad Request:** If `bookId` is missing or invalid.
- **404 Not Found:** If the specified book is not found.
- **500 Internal Server Error:** For unexpected server errors.

---

## **12. Get All Events API**

### **Endpoint**
`GET http://localhost:8083/getAllEvents`

### **Content Type**
`application/json`

### **Authentication**
Authentication may be required.

### **Response**
#### **Success Response (HTTP 200 OK)**
```json
{
  "events": [
    {
      "eventId": "EVT123",
      "title": "Tech Talk",
      "description": "Event description",
      "eventDate": "2025-03-15",
      "eventTime": "3:00 PM - 5:00 PM",
      "location": "CSE Building",
      "link": "https://zoom.us/..."
    }
  ]
}
```

### **Error Handling**
- **404 Not Found:** No events found.
- **500 Internal Server Error:** Error retrieving events.

---

## **13. Add Event API**

### **Endpoint**
`POST http://localhost:8083/addEvent`

### **Content Type**
`application/json`

### **Authentication**
Admin authentication may be required.

### **Request Body**
```json
{
  "eventId": "EVT123",
  "title": "Tech Talk",
  "description": "Event description",
  "eventDate": "2025-03-15T00:00:00Z",
  "eventTime": "3:00 PM - 5:00 PM",
  "location": "CSE Building",
  "link": "https://zoom.us/..."
}
```

### **Response**
#### **Success Response (HTTP 201 Created)**
```json
{
  "message": "Event added successfully",
  "event": { ... }
}
```

### **Error Handling**
- **400 Bad Request:** Invalid request body.
- **500 Internal Server Error:** Event creation failed.

---

## *14. Get Event by ID API*

### *Endpoint*
GET http://localhost:8083/getEvent/{eventId}

### *Content Type*
application/json

### *Path Parameter*
- *eventId* (String, Required)

### *Response*
#### *Success Response (HTTP 200 OK)*
json
{
  "event": { ... }
}


### *Error Handling*
- *400 Bad Request:* Missing or malformed eventId.
- *404 Not Found:* Event not found.
- *500 Internal Server Error:* Database error.

---

## *15. Update Event API*

### *Endpoint*
PUT http://localhost:8083/updateEvent/{eventId}

### *Content Type*
application/json

### *Request Body*
- Same as Add Event, excluding eventId (as it's provided via path)

### *Response*
#### *Success Response (HTTP 200 OK)*
json
{
  "message": "Event updated successfully",
  "event": { ... }
}


### *Error Handling*
- *400 Bad Request:* Missing fields or bad input.
- *404 Not Found:* Event with eventId not found.
- *500 Internal Server Error:* Database error.

---

## *16. Delete Event API*

### *Endpoint*
DELETE http://localhost:8083/deleteEvent/{eventId}

### *Content Type*
application/json

### *Path Parameter*
- *eventId* (String, Required)

### *Response*
#### *Success Response (HTTP 200 OK)*
json
{
  "message": "Event deleted successfully"
}


### *Error Handling*
- *400 Bad Request:* Missing eventId.
- *404 Not Found:* No event exists for the given ID.
- *500 Internal Server Error:* Failed to delete event.
#### **Delete User (`TestDeleteUser`)**
- Deletes a user using their UFID.
- Returns **`200 OK`** on success.
- Returns **`404 Not Found`** if the user doesn't exist.

---

## *17. Search Events by Name API*

*Endpoint:* GET http://localhost:8083/searchEventsByName?name={eventName}  
*Content Type:* application/json  

### *Query Parameter*
- *name* (String, Required): Name or partial name of the event.

### *Response*
#### *Success Response (HTTP 200 OK)*
json
{
  "events": [
    {
      "eventId": "EVT123",
      "title": "Tech Talk"
    }
  ]
}


### *Error Handling*
- *400 Bad Request:* If the name parameter is missing.
- *404 Not Found:* If no events match the search.
- *500 Internal Server Error:* On query failure.

---

## *18. Get All Users API*

*Endpoint:* GET http://localhost:8083/getAllUsers  
*Content Type:* application/json  
*Authentication:* Admin access may be required  

### *Response*
#### *Success Response (HTTP 200 OK)*
json
{
  "users": [
    {
      "ufid": "000001",
      "userFullName": "John Doe",
      "email": "john@example.com"
    }
  ]
}


### *Error Handling*
- *404 Not Found:* If no users are found.
- *500 Internal Server Error:* On query failure.

---

## *19. Get Specific User API*

*Endpoint:* GET http://localhost:8083/getUser/{ufid}  
*Content Type:* application/json  

### *Path Parameter*
- *ufid* (String, Required): The user's unique ID.

### *Response*
#### *Success Response (HTTP 200 OK)*
json
{
  "user": {
    "ufid": "000001",
    "userFullName": "John Doe"
  }
}


### *Error Handling*
- *400 Bad Request:* If UFID is missing.
- *404 Not Found:* If the user is not found.

---

## *20. Delete User API*

*Endpoint:* DELETE http://localhost:8083/deleteUser/{ufid}  
*Content Type:* application/json  

### *Path Parameter*
- *ufid* (String, Required): Unique user ID.

### *Response*
#### *Success Response (HTTP 200 OK)*
json
{
  "message": "User deleted successfully"
}


### *Error Handling*
- *400 Bad Request:* Missing UFID.
- *404 Not Found:* If the user does not exist.
- *500 Internal Server Error:* If deletion fails.

---

## *21. Update User API*

*Endpoint:* PUT http://localhost:8083/updateUser/{ufid}  
*Content Type:* application/json  

### *Request Body*
- Fields to update in the user object: userFullName, email, gender, dob, isAdmin, etc.

### *Response*
#### *Success Response (HTTP 200 OK)*
json
{
  "message": "User updated successfully",
  "user": {
    "ufid": "000001",
    "userFullName": "Updated Name"
  }
}


### *Error Handling*
- *400 Bad Request:* If UFID is missing or JSON is malformed.
- *404 Not Found:* User not found.
- *500 Internal Server Error:* Update fails.

---

