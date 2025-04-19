package routes

import (
	"backend/database"
	"backend/models"
	"bytes"
	"encoding/json"
	"fmt"
	"net/http"
	"net/http/httptest"
	"os"
	"testing"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/stretchr/testify/assert"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

func setupRouter() *gin.Engine {
	gin.SetMode(gin.TestMode)
	router := gin.Default()

	router.POST("/register", Register)
	router.POST("/signin", SignIn)
	router.POST("signout", SignOut)
	router.GET("/getAllBooks", GetAllBooks)
	router.POST("/addBook", AddBook)
	router.GET("/getBook/:bookId", GetBook)
	router.POST("/issueBook", IssueBook)
	router.POST("/returnBook", ReturnBook)
	router.GET("/getAllLoans", AllLoans)
	router.GET("/getLoans/:ufId", GetLoans)
	router.GET("/getAllEvents", GetAllEvents)
	router.POST("/addEvent", AddEvent)
	router.GET("/getEvent/:eventId", GetEvent)
	router.DELETE("/deleteEvent/:eventId", DeleteEvent)
	router.PUT("/updateEvent/:eventId", UpdateEvent)
	router.GET("/searchBook", SearchBooksByName)
	router.GET("/searchEvent", SearchEventsByName)
	router.GET("/getAllUsers", GetAllUsers)
	router.GET("/getUser/:ufid", GetUser)
	router.DELETE("/deleteUser/:ufid", DeleteUser)
	router.PUT("/updateUser/:ufid", UpdateUser)

	return router
}

func TestMain(m *testing.M) {
	// Set up database connection
	//dsn := "host=localhost user=your_user password=your_password dbname=gatorreads_test port=5432 sslmode=disable TimeZone=Asia/Shanghai"
	dsn := "host=localhost user=adithi password='adithi_anugu' dbname=gatorreads_test port=5432 sslmode=disable"

	// dsn := "host=localhost user=postgres password=4040 dbname=mydb port=5432 sslmode=disable"

	db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if err != nil {
		fmt.Println("Failed to connect to the database")
		panic(err)
	}
	database.DB = db

	// Optionally, auto-migrate your schemas here
	database.DB.AutoMigrate(&models.Book{}, &models.User{})

	// Run tests once and exit
	exitVal := m.Run()
	os.Exit(exitVal)
}

func TestRegister(t *testing.T) {
	router := setupRouter()

	reqBody := models.User{
		UserType:     "Student",
		UserFullName: "John12 Doe",
		UFID:         "00092231186",
		DOB:          "1995-03-15",
		Gender:       "Male",
		Email:        "johndo00092231186@example.com",
		Password:     "verysecurepassword",
		IsAdmin:      false,
	}

	body, _ := json.Marshal(reqBody)
	req, _ := http.NewRequest("POST", "/register", bytes.NewBuffer(body))
	req.Header.Set("Content-Type", "application/json")

	w := httptest.NewRecorder()
	router.ServeHTTP(w, req)

}

func TestSignIn(t *testing.T) {
	router := setupRouter()

	reqBody := map[string]string{
		"ufId":     "00092231186",
		"password": "verysecurepassword",
	}

	body, _ := json.Marshal(reqBody)
	req, _ := http.NewRequest("POST", "/signin", bytes.NewBuffer(body))
	req.Header.Set("Content-Type", "application/json")

	w := httptest.NewRecorder()
	router.ServeHTTP(w, req)

	assert.Equal(t, http.StatusOK, w.Code)
	var response map[string]interface{}
	err := json.Unmarshal(w.Body.Bytes(), &response)
	assert.Nil(t, err)
	assert.Equal(t, "Login successful", response["message"])
}

func TestSignOut(t *testing.T) {
	router := setupRouter()

	reqBody := map[string]string{
		"ufId": "00092231186",
	}

	body, _ := json.Marshal(reqBody)
	req, _ := http.NewRequest("POST", "/signout", bytes.NewBuffer(body))
	req.Header.Set("Content-Type", "application/json")

	w := httptest.NewRecorder()
	router.ServeHTTP(w, req)

	assert.Equal(t, http.StatusOK, w.Code)
	var response map[string]interface{}
	err := json.Unmarshal(w.Body.Bytes(), &response)
	assert.Nil(t, err)
	assert.Equal(t, "User logged out successfully", response["message"])
}

func TestAddBook(t *testing.T) {
	router := setupRouter()
	db := database.DB.Begin()
	defer db.Rollback()

	newBook := models.Book{
		BookID:       "G142386",
		BookType:     "Non-Fiction",
		BookFullName: "GG-142386 Testing book",
		BookCount:    5,
		AuthorName:   "XYZ",
		ImageData:    "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAAAAAAAD/2wBDAAgGBgcGBQgHBwcJ...",
	}

	body, _ := json.Marshal(newBook)
	req, _ := http.NewRequest("POST", "/addBook", bytes.NewBuffer(body))
	req.Header.Set("Content-Type", "application/json")

	w := httptest.NewRecorder()
	router.ServeHTTP(w, req)

	assert.Contains(t, []int{http.StatusCreated, http.StatusInternalServerError}, w.Code)
}

func TestGetBook(t *testing.T) {
	router := setupRouter()

	// Mock Book ID
	bookId := "G142386"

	req, _ := http.NewRequest("GET", "/getBook/"+bookId, nil)
	req.Header.Set("Content-Type", "application/json")

	w := httptest.NewRecorder()
	router.ServeHTTP(w, req)

	// Check if the response status code is either 200 (found) or 404 (not found)
	assert.Contains(t, []int{http.StatusOK, http.StatusNotFound}, w.Code, "Unexpected HTTP status code")

	// If book is found, validate the response
	if w.Code == http.StatusOK {
		var response map[string]interface{}
		err := json.Unmarshal(w.Body.Bytes(), &response)
		assert.Nil(t, err, "Error parsing JSON response")

		// Log response for debugging
		t.Logf("Response Body: %v", response)

		// Ensure the "book" key exists
		bookData, exists := response["book"].(map[string]interface{})
		assert.True(t, exists, "Response does not contain 'book' key or has incorrect format")

		// Ensure "bookId" exists inside "book" and validate it
		if exists {
			bookIdValue, idExists := bookData["bookId"].(string)
			assert.True(t, idExists, "Response does not contain 'bookId' key or is in incorrect format")
			assert.Equal(t, bookId, bookIdValue, "Mismatched book ID")
		}
	} else {
		t.Log("Book not found, received expected 404 status")
	}
}

func TestGetAllBooks(t *testing.T) {
	router := setupRouter()
	req, _ := http.NewRequest("GET", "/getAllBooks", nil)
	w := httptest.NewRecorder()
	router.ServeHTTP(w, req)

	assert.Contains(t, []int{http.StatusOK, http.StatusNotFound}, w.Code)
}

func TestIssueBook(t *testing.T) {
	router := setupRouter()
	reqBody := models.IssueBookRequest{
		UFID:      "00092231186",
		BookID:    "G142386",
		IssueDate: time.Date(2025, time.March, 10, 0, 0, 0, 0, time.UTC),
	}

	body, _ := json.Marshal(reqBody)
	req, _ := http.NewRequest("POST", "/issueBook", bytes.NewBuffer(body))
	req.Header.Set("Content-Type", "application/json")

	w := httptest.NewRecorder()
	router.ServeHTTP(w, req)

	assert.Equal(t, http.StatusOK, w.Code)
	var response map[string]interface{}
	err := json.Unmarshal(w.Body.Bytes(), &response)
	assert.Nil(t, err)
	assert.Equal(t, "Book issued successfully", response["message"])
}

func TestReturnBook(t *testing.T) {
	router := setupRouter()
	reqBody := models.IssueBookRequest{
		UFID:       "00092231186",
		BookID:     "G142386",
		ReturnDate: time.Date(2025, time.March, 15, 0, 0, 0, 0, time.UTC),
	}

	body, _ := json.Marshal(reqBody)
	req, _ := http.NewRequest("POST", "/returnBook", bytes.NewBuffer(body))
	req.Header.Set("Content-Type", "application/json")

	w := httptest.NewRecorder()
	router.ServeHTTP(w, req)

	assert.Equal(t, http.StatusOK, w.Code)
	var response map[string]interface{}
	err := json.Unmarshal(w.Body.Bytes(), &response)
	assert.Nil(t, err)
	assert.Equal(t, "Book returned successfully", response["message"])
}

func TestGetLoans(t *testing.T) {
	router := setupRouter()

	// Mock UFID
	ufid := "00092231186"

	req, _ := http.NewRequest("GET", "/getLoans/"+ufid, nil)
	req.Header.Set("Content-Type", "application/json")

	w := httptest.NewRecorder()
	router.ServeHTTP(w, req)

	// Expected response: 200 (if loans exist) or 404 (if no loans exist)
	assert.Contains(t, []int{http.StatusOK, http.StatusNotFound}, w.Code)

	if w.Code == http.StatusOK {
		var response map[string]interface{}
		err := json.Unmarshal(w.Body.Bytes(), &response)
		assert.Nil(t, err)

		// Validate that the UFID matches the expected one in at least one record
		loans := response["allotments"].([]interface{})
		if len(loans) > 0 {
			firstLoan := loans[0].(map[string]interface{})
			assert.Equal(t, ufid, firstLoan["ufid"])
		}
	}
}

func TestGetAllLoans(t *testing.T) {
	router := setupRouter()

	req, _ := http.NewRequest("GET", "/getAllLoans", nil)
	req.Header.Set("Content-Type", "application/json")

	w := httptest.NewRecorder()
	router.ServeHTTP(w, req)

	// Expected response: 200 (if loans exist) or 404 (if no loans exist)
	assert.Contains(t, []int{http.StatusOK, http.StatusNotFound}, w.Code)

	if w.Code == http.StatusOK {
		var response map[string]interface{}
		err := json.Unmarshal(w.Body.Bytes(), &response)
		assert.Nil(t, err)

		// Ensure at least one loan exists in the response
		loans, exists := response["Loans"].([]interface{})
		assert.True(t, exists, "Response should contain 'Loans' field")
		assert.Greater(t, len(loans), 0, "There should be at least one loan record")
	}
}

func TestGetAllEvents(t *testing.T) {
	router := setupRouter()

	req, _ := http.NewRequest("GET", "/getAllEvents", nil)
	w := httptest.NewRecorder()
	router.ServeHTTP(w, req)

	// Response can be 200 if events exist, or 404 if none
	assert.Contains(t, []int{http.StatusOK, http.StatusNotFound}, w.Code)

	if w.Code == http.StatusOK {
		var response map[string]interface{}
		err := json.Unmarshal(w.Body.Bytes(), &response)
		assert.Nil(t, err)

		// Check if "events" key exists and is a slice
		events, exists := response["events"].([]interface{})
		assert.True(t, exists || response["events"] != nil, "Expected 'events' key in response")

		if exists {
			assert.GreaterOrEqual(t, len(events), 1, "Expected at least one event in the list")
		}
	}
}

func TestAddEvent(t *testing.T) {
	router := setupRouter()

	// Use a unique event ID for each test to prevent duplicate key errors
	uniqueEventID := fmt.Sprintf("EVT%d", time.Now().UnixNano())

	// Updated event data with a unique identifier
	newEvent := models.Event{
		EventID:     uniqueEventID, // Unique event ID for each test run
		Title:       "GatorReads Tech Talk6",
		Description: "Created for Unit testing An engaging tech session hosted by GatorReads.",
		EventDate:   time.Date(2025, time.March, 15, 0, 0, 0, 0, time.UTC),
		EventTime:   "3:00 PM - 5:00 PM",
		Location:    "CSE Building, Room 101",
		Link:        "https://ufl.zoom.us/gatorreads",
	}

	body, err := json.Marshal(newEvent)
	if err != nil {
		t.Fatalf("Failed to marshal new event: %v", err)
	}

	req, err := http.NewRequest("POST", "/addEvent", bytes.NewBuffer(body))
	if err != nil {
		t.Fatalf("Failed to create request: %v", err)
	}
	req.Header.Set("Content-Type", "application/json")

	w := httptest.NewRecorder()
	router.ServeHTTP(w, req)

	// Check for the expected HTTP status code 201 Created
	if w.Code != http.StatusCreated {
		t.Errorf("Expected HTTP status 201 Created, got: %d", w.Code)
	}

}

func TestGetEvent(t *testing.T) {
	router := setupRouter()

	// First, insert a mock event into the database (optional but ensures test consistency)
	// mockEvent := models.Event{
	// 	EventID: "EVT2949",
	// }
	// _ = database.DB.Create(&mockEvent)

	// Make GET request to /getEvent/EVT999
	req, _ := http.NewRequest("GET", "/getEvent/EVT2949", nil)
	w := httptest.NewRecorder()
	router.ServeHTTP(w, req)

	// Check response status
	assert.Equal(t, http.StatusOK, w.Code)

	// Parse and validate JSON response
	var response map[string]interface{}
	err := json.Unmarshal(w.Body.Bytes(), &response)
	assert.Nil(t, err)

}

func TestDeleteEvent(t *testing.T) {
	router := setupRouter()

	// // Step 1: Create a mock event to delete
	// mockEvent := models.Event{
	// 	EventID: "EVT1744229743008604500",
	// }
	// _ = database.DB.Create(&mockEvent)

	// Step 2: Prepare DELETE request
	req, _ := http.NewRequest("DELETE", "/deleteEvent/EVT1744229910205163000", nil)
	w := httptest.NewRecorder()
	router.ServeHTTP(w, req)

	// Step 3: Assert response
	assert.Equal(t, http.StatusOK, w.Code)

	var response map[string]interface{}
	err := json.Unmarshal(w.Body.Bytes(), &response)
	assert.Nil(t, err)
	assert.Equal(t, "Event deleted successfully", response["message"])

}

func TestUpdateEvent(t *testing.T) {
	router := setupRouter()

	// Step 1: Insert a mock event to update
	// mockEvent := models.Event{
	// 	EventID: "EVT1743476075484020800",
	// 	// Title:       "Original Title",
	// 	// Description: "Original Description",
	// 	// EventDate:   time.Date(2025, time.March, 25, 0, 0, 0, 0, time.UTC),
	// 	// EventTime:   "2:00 PM - 4:00 PM",
	// 	// Location:    "Hall A",
	// 	// Link:        "https://original.link",
	// }
	// _ = database.DB.Create(&mockEvent)

	// Step 2: Prepare updated event data
	updatedEvent := models.Event{
		Title:       "Updated Title",
		Description: "Updated Description 6",
		EventDate:   time.Date(2025, time.March, 26, 0, 0, 0, 0, time.UTC),
		EventTime:   "3:00 PM - 5:00 PM",
		Location:    "Hall B",
		Link:        "https://updated.link",
	}

	body, _ := json.Marshal(updatedEvent)
	req, _ := http.NewRequest("PUT", "/updateEvent/EVT1743476075484020800", bytes.NewBuffer(body))
	req.Header.Set("Content-Type", "application/json")

	// Step 3: Perform the request
	w := httptest.NewRecorder()
	router.ServeHTTP(w, req)

	// Step 4: Validate response
	assert.Equal(t, http.StatusOK, w.Code)

	var response map[string]interface{}
	err := json.Unmarshal(w.Body.Bytes(), &response)
	assert.Nil(t, err)
	assert.Equal(t, "Event updated successfully", response["message"])

}

func TestSearchBooksByName(t *testing.T) {
	router := setupRouter()

	// Step 2: Make the GET request with the correct query param
	req, _ := http.NewRequest("GET", "/searchBook?name=GG-142", nil)
	w := httptest.NewRecorder()
	router.ServeHTTP(w, req)

	// Step 3: Validate the response
	assert.Equal(t, http.StatusOK, w.Code)

	var response map[string]interface{}
	err := json.Unmarshal(w.Body.Bytes(), &response)
	assert.Nil(t, err)

	books, ok := response["books"].([]interface{})
	assert.True(t, ok, "Expected 'books' to be a list")
	assert.GreaterOrEqual(t, len(books), 1, "Expected at least one matching book")
}

func TestSearchEventsByName(t *testing.T) {
	router := setupRouter()

	// Step 1: Create an event with a searchable name
	uniqueEventID := fmt.Sprintf("EVT-SEARCH-%d", time.Now().UnixNano())
	testEvent := models.Event{
		EventID:     uniqueEventID,
		Title:       "Tech Talk1 - Go & Gin",
		Description: "Search test event for GatorReads",
		EventDate:   time.Date(2025, time.June, 10, 0, 0, 0, 0, time.UTC),
		EventTime:   "4:00 PM - 6:00 PM",
		Location:    "CSE Hall 120",
		Link:        "https://ufl.zoom.us/test-event",
	}

	// Insert the event into the DB
	database.DB.Where("event_id = ?", uniqueEventID).Delete(&models.Event{})
	if err := database.DB.Create(&testEvent).Error; err != nil {
		t.Fatalf("Failed to insert test event: %v", err)
	}

	// Step 2: Search for "Talk1" (matches title)
	req, _ := http.NewRequest("GET", "/searchEvent?name=Tech", nil)
	w := httptest.NewRecorder()
	router.ServeHTTP(w, req)

	// Step 3: Assertions
	assert.Equal(t, http.StatusOK, w.Code)

	var response map[string]interface{}
	err := json.Unmarshal(w.Body.Bytes(), &response)
	assert.Nil(t, err)

	events, ok := response["events"].([]interface{})
	assert.True(t, ok, "Expected 'events' to be a list")
	assert.GreaterOrEqual(t, len(events), 1, "Expected at least one matching event")
}

// func TestGetAllUsers(t *testing.T) {
// 	router := setupRouter()

// 	req, _ := http.NewRequest("GET", "/getAllUsers", nil)
// 	w := httptest.NewRecorder()
// 	router.ServeHTTP(w, req)

// 	// Expect either 200 OK or 404 Not Found depending on DB state
// 	assert.Contains(t, []int{http.StatusOK, http.StatusNotFound}, w.Code)

// 	if w.Code == http.StatusOK {
// 		var response map[string]interface{}
// 		err := json.Unmarshal(w.Body.Bytes(), &response)
// 		assert.Nil(t, err)

// 		// Ensure "users" key exists and is an array
// 		users, exists := response["users"].([]interface{})
// 		assert.True(t, exists || response["users"] != nil, "Expected 'users' key in response")

// 		if exists {
// 			assert.GreaterOrEqual(t, len(users), 1, "Expected at least one user in the list")
// 		}
// 	} else {
// 		t.Log("No users found, received 404 as expected")
// 	}
// }

// func TestGetUser(t *testing.T) {
// 	router := setupRouter()

// 	// Prepare the GET request
// 	req, _ := http.NewRequest("GET", "/getUser/0009222", nil)
// 	w := httptest.NewRecorder()
// 	router.ServeHTTP(w, req)

// 	assert.Equal(t, http.StatusOK, w.Code)

// 	var response map[string]interface{}
// 	err := json.Unmarshal(w.Body.Bytes(), &response)
// 	assert.Nil(t, err)

// 	// Check if user field exists
// 	user := response["user"].(map[string]interface{})
// 	assert.Equal(t, "0009222", user["ufid"])

// }

// func TestDeleteUser(t *testing.T) {
// 	router := setupRouter()

// 	// Step 1: Ensure test user exists (clean if necessary)
// 	testUser := models.User{
// 		UFID:         "00092231186",
// 		UserType:     "Student",
// 		UserFullName: "John12 Doe",
// 		DOB:          "1995-03-15",
// 		Gender:       "Male",
// 		Email:        "johndo00092231186@example.com",
// 		Password:     "verysecurepassword",
// 		IsAdmin:      false,
// 	}

// 	// Delete any existing record to prevent PK conflict
// 	database.DB.Where("ufid = ?", testUser.UFID).Unscoped().Delete(&models.User{})

// 	// Insert the user
// 	err := database.DB.Create(&testUser).Error
// 	if err != nil {
// 		t.Fatalf("Failed to create test user: %v", err)
// 	}

// 	// Step 2: Perform DELETE request
// 	req, _ := http.NewRequest("DELETE", "/deleteUser/00092231186", nil)
// 	w := httptest.NewRecorder()
// 	router.ServeHTTP(w, req)

// 	// Step 3: Validate response
// 	assert.Equal(t, http.StatusOK, w.Code)

// 	var response map[string]interface{}
// 	err = json.Unmarshal(w.Body.Bytes(), &response)
// 	assert.Nil(t, err)
// 	assert.Equal(t, "User deleted successfully", response["message"])
// }

// func TestUpdateUser(t *testing.T) {
// 	router := setupRouter()

// 	// Step 1: Create a mock user
// 	mockUser := models.User{
// 		UserType:     "Student",
// 		UserFullName: "Original Name",
// 		UFID:         "UPD123",
// 		DOB:          "2000-01-01",
// 		Gender:       "Female",
// 		Email:        "original@example.com",
// 		Password:     "originalpass",
// 		IsAdmin:      false,
// 	}
// 	_ = database.DB.Create(&mockUser)

// 	// Step 2: Prepare updated data
// 	updatedData := models.User{
// 		UserType:     "Admin",
// 		UserFullName: "Updated Name",
// 		DOB:          "1995-06-15",
// 		Gender:       "Other",
// 		Email:        "updated@example.com",
// 		Password:     "updatedpass",
// 		IsAdmin:      true,
// 	}

// 	body, _ := json.Marshal(updatedData)
// 	req, _ := http.NewRequest("PUT", "/updateUser/UPD123", bytes.NewBuffer(body))
// 	req.Header.Set("Content-Type", "application/json")

// 	// Step 3: Perform request
// 	w := httptest.NewRecorder()
// 	router.ServeHTTP(w, req)

// 	// Step 4: Validate response
// 	assert.Equal(t, http.StatusOK, w.Code)

// 	var response map[string]interface{}
// 	err := json.Unmarshal(w.Body.Bytes(), &response)
// 	assert.Nil(t, err)
// 	assert.Equal(t, "User updated successfully", response["message"])

// 	// Optional: Validate updated fields
// 	updated := response["user"].(map[string]interface{})
// 	assert.Equal(t, "Updated Name", updated["userFullName"])
// 	assert.Equal(t, "Admin", updated["userType"])
// 	assert.Equal(t, "updated@example.com", updated["email"])
// 	assert.Equal(t, true, updated["isAdmin"])
// }
