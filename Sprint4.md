## Work Completed in Sprint 4

## Frontend

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

### **Delete Book (TestDeleteBook)**
- Deletes a book using its bookId.
- Returns **200 OK** on successful deletion.
- Returns **404 Not Found** if the book does not exist.
  
### **Add Event (TestAddEvent)**
- Adds a new event to the system.
- Returns **201 Created** with event data.
- Returns **400 Bad Request** if data is invalid.

### **Get All Events (TestGetAllEvents)**
- Retrieves a list of all scheduled events.
- Returns **200 OK** with event list or **404 Not Found** if none exist.

### **Get Event by ID (TestGetEvent)**
- Fetches an event using eventId.
- Returns **200 OK** with event details or **404 Not Found**.

### **Update Event (TestUpdateEvent)**
- Updates existing event data.
- Returns **200 OK** with updated event.
- Returns **404 Not Found** if event does not exist.

### **Delete Event (TestDeleteEvent)**
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

#### **Delete User (`TestDeleteUser`)**
- Deletes a user using their UFID.
- Returns **`200 OK`** on success.
- Returns **`404 Not Found`** if the user doesn't exist.

