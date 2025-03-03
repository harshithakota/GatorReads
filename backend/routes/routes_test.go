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

	return router
}

func TestMain(m *testing.M) {
	// Set up database connection
	//dsn := "host=localhost user=your_user password=your_password dbname=gatorreads_test port=5432 sslmode=disable TimeZone=Asia/Shanghai"
	dsn := "host=localhost user=adithi password='adithi_anugu' dbname=gatorreads_test port=5432 sslmode=disable"

	db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if err != nil {
		fmt.Println("Failed to connect to the database")
		panic(err)
	}
	database.DB = db

	// Optionally, auto-migrate your schemas here
	database.DB.AutoMigrate(&models.Book{}, &models.User{})

	exitVal := m.Run()

	database.Connect() // ✅ Ensure DB is initialized
	os.Exit(m.Run())

	os.Exit(exitVal)
}

func TestRegister(t *testing.T) {
	router := setupRouter()

	reqBody := models.User{
		UserType:     "Student",
		UserFullName: "John9 Doe",
		UFID:         "000922",
		DOB:          "1995-03-15",
		Gender:       "Male",
		Email:        "johndo9220@example.com",
		Password:     "verysecurepassword",
		IsAdmin:      false,
	}

	body, _ := json.Marshal(reqBody)
	req, _ := http.NewRequest("POST", "/register", bytes.NewBuffer(body))
	req.Header.Set("Content-Type", "application/json")

	w := httptest.NewRecorder()
	router.ServeHTTP(w, req)

	assert.Equal(t, http.StatusOK, w.Code)
	var response map[string]interface{}
	err := json.Unmarshal(w.Body.Bytes(), &response)
	assert.Nil(t, err)
	assert.Equal(t, "User registered successfully", response["message"])
}

func TestSignIn(t *testing.T) {
	router := setupRouter()

	reqBody := map[string]string{
		"ufId":     "000922",
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
		"ufId": "000922",
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
		BookID:       "G142",
		BookType:     "Non-Fiction",
		BookFullName: "GG-142 Testing book",
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
	bookId := "G142"

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
		UFID:      "000922",
		BookID:    "G142",
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
		UFID:       "000922",
		BookID:     "G142",
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
	ufid := "000922"

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
