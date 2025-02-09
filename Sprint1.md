# GatorReads Library Management System - Sprint 1

## Objective
Our first sprint aims to establish foundational features of the GatorReads Library Management System to ensure secure access and begin developing core functionalities that will empower both administrators and students.

## User Stories

### 1. Secure User Authentication
**Objective:** Implement a secure login system for both students and administrators with role-based access control to different functionalities of the system. This ensures that only authorized users can access specific features and data.

**Details:**
- **Frontend:**
  - Design and develop the login forms for both students and administrators.
- **Backend:**
  - Develop the server-side logic to handle the authentication process.
  - Implement backend role checks to ensure that each API request or system interaction is permitted for the user's role.

**Assigned to:** Harshitha, Sweta, Adithi, Krishna  
**Priority:** High  
**Milestone**: Sprint 1  

### 2. Dashboard for Students
**Objective:** Create a user-friendly dashboard for students that includes functionalities such as searching for books, managing loans and reservations, and accessing study materials.

**Details:**
- **Frontend:**
  - Develop an intuitive and engaging interface for the student dashboard. This includes designing easy navigation menus, search bars, book lists, and areas for managing loans and reservations.
- **Backend:**
  - Build RESTful APIs to support the frontend functionalities. This includes APIs for searching books, checking book availability, managing loans and reservations, and accessing study materials.

**Assigned to:** Adithi, Sweta, Krishna, Harshitha    
**Priority:** High  
**Milestone**: Sprint 1, Sprint 2  

### 3. Collaborative Knowledge Sharing Platform
**Objective:** Develop a platform within GatorReads that allows students to upload, share, and access study materials, notes, and other educational content, fostering a collaborative learning environment.

**Details:**
- **Frontend:**
  - Design interfaces for uploading and accessing shared materials.
  - Implement search and categorization features to easily find and organize resources.
- **Backend:**
  - Create APIs for file upload, retrieval, and management.
  - Ensure secure storage and access controls to protect sensitive information and respect copyright.

**Assigned to:** Harshitha, Adithi  
**Priority:** Medium  
**Milestone**: Sprint 3  

### 4. Dashboard for Administrators
**Objective:** Develop a comprehensive dashboard for administrators to manage library inventory, user accounts, and generate reports. This dashboard should provide tools for adding, updating, and deleting book records and managing library member accounts.

**Details:**
- **Frontend:**
  - Create a clean and efficient layout for the dashboard that allows administrators to easily manage library inventory and user accounts.
- **Backend:**
  - Develop RESTful APIs for handling CRUD (Create, Read, Update, Delete) operations related to books and user accounts.

**Assigned to:** Krishna, Sweta    
**Priority:** High  
**Milestone**: Sprint 3, Sprint 4  

### 5. Dynamic Announcements and Events Management
**Objective:** Enable the library to communicate effectively with students and staff through a dynamic announcements and events management system.

**Details:**
- **Frontend:**
  - Develop an announcements dashboard where administrators can post and students can view current news and upcoming events.
  - Implement calendar integration for event tracking and reminders.  
- **Backend:**
  - Build APIs to manage announcements and events, including create, read, update, and delete functionalities.
  - Ensure real-time updates are pushed to users effectively.  

**Assigned to:** Adithi, Sweta, Krishna, Harshitha    
**Priority:** Medium    
- **Milestone**: Sprint 4  


## Frontend Issues for Sprint 1
- **Frontend Issue #1:** Design and Implement Authentication Pages
  - Develop user interfaces for login and registration pages.
  - Ensure the design is user-friendly and aligns with security requirements.

- **Frontend Issue #2:** Integrate Authentication Pages with Backend APIs
  - Connect the frontend authentication forms to the backend services.
  - Handle authentication processes like token management and error feedback.

- **Frontend Issue #3:** Develop the Homepage Post-Login
  - Create a welcoming and functional homepage for users after they log in.
  - Include navigation links to major areas like the Student Dashboard.

- **Frontend Issue #4:** Create the Student Dashboard Interface
  - Design and develop the student dashboard.

## Backend Issues for Sprint 1
- **Backend Issue #1:** Build User and Session Management APIs
  - Develop APIs for user registration, login, and session management.
  - Implement security measures and session handling logic.

- **Backend Issue #2:** Implement Logout Functionality
  - Create an API for securely handling user logout.
  - Ensure the complete termination of sessions and clearing of any session-related data.

- **Backend Issue #3:** Develop APIs for Managing User and Book Data
  - Design and implement APIs for CRUD operations on books and user profiles.
  - Ensure APIs are secure and performant.
 
We were able to meet the above planned issues (backend and frontend) for sprint 1.
