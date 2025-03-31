## Work Completed in Sprint 3

## Frontend

### Add Events Functionality
Implemented a user-friendly interface for the Add Events form, allowing administrators to easily input necessary details for creating new events. This update includes fields for event titles, descriptions, dates, and times, all styled to align with the platform's aesthetic. Display the added events to students in homepage.

### API Integration
- **Event Management**: Connected the front end to the backend APIs for adding and retrieving events. This allows for real-time display of newly added events on the homepage, enhancing user interaction.
- **Book Deletion**: Implemented a feature for admins to delete books from the library's catalog. This function includes full integration with the backend to ensure that book records are accurately removed from the database.
- **Search Functionality**: Added a search bar on the book browsing page, enabling users to search for books by titles or authors. This feature improves user experience by allowing quick and efficient access to desired books.
- **Loan Management**: Integrated APIs for managing book loans. This functionality supports the viewing, updating, and tracking of all active and historical book loans.
- **Return Book Functionality**: Developed the feature to return books through the user interface, which automatically updates the loan status in the system. This API integration ensures that the book status is synced with the database for real-time availability updates.

### UI Enhancements
Conducted extensive user interface enhancements to improve visual appeal and user interaction. These improvements include:
- **Layout Adjustments**: Refined the overall layout to ensure a more streamlined and intuitive user experience.
- **Responsive Design**: Enhanced responsiveness across various devices, ensuring that the application is accessible and efficiently usable on desktops, tablets, and smartphones.
- **Accessibility Improvements**: Increased focus on accessibility, making sure that the application is navigable and usable for people with disabilities. This includes color adjustments for better contrast, keyboard navigability, and screen reader support.


## Backend
### Event Management APIs

- **Get All Events API**  
  Developed an endpoint to retrieve the complete list of all available events from the database.

- **Get Specific Event API**  
  Implemented functionality to fetch detailed information of a particular event using its unique `eventId`.

- **Add Event API**  
  Enabled creation of new events through a JSON-based POST request, with proper request body validation.

- **Update Event API**  
  Developed the logic to update existing event records, ensuring validation, and re-fetching updated data for accurate response delivery.

- **Delete Event API**  
  Added the ability to delete events using `eventId`, with appropriate error responses for missing or invalid IDs.

### Book Management Extension

- **Delete Book API**  
  Implemented an API to delete books by `bookId`, ensuring safe deletion with robust error handling.

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

These tests cover critical functionalities of the application, ensuring robustness and reliability of the platform through systematic validation of user flows and backend integration.
