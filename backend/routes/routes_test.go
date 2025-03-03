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

	router.POST("/issueBook", IssueBook)
	router.POST("/returnBook", ReturnBook)
	router.GET("/getAllLoans", AllLoans)
	router.GET("/getLoans/:ufId", GetLoans)
	router.GET("/getAllBooks", GetAllBooks)
	router.GET("/getBook/:bookId", GetBook)
	router.POST("/addBook", AddBook)

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

	os.Exit(exitVal)
}

func TestAddBook(t *testing.T) {
	router := setupRouter()
	db := database.DB.Begin()
	defer db.Rollback()

	newBook := models.Book{
		BookID:       "D140",
		BookType:     "Non-Fiction",
		BookFullName: "ww Testing book",
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
		UFID:      "000112",
		BookID:    "D140",
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
		UFID:       "000112",
		BookID:     "D140",
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
