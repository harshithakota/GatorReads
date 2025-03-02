package routes

import (
	"backend/database"
	"backend/models"
	"bytes"
	"fmt"
	"io/ioutil"
	"net/http"

	"github.com/gin-gonic/gin"
)

// API to issue a book to a user
func IssueBook(c *gin.Context) {
	// Read and log the request body for debugging purposes
	bodyBytes, err := ioutil.ReadAll(c.Request.Body)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Can't read body"})
		return
	}
	bodyString := string(bodyBytes)
	fmt.Println("Received body:", bodyString)

	// Reset the request body so it can be bound to the struct
	c.Request.Body = ioutil.NopCloser(bytes.NewBuffer(bodyBytes))

	var request models.IssueBookRequest

	// Bind JSON input
	if err := c.ShouldBindJSON(&request); err != nil {
		fmt.Println("Binding error:", err)
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid input", "details": err.Error()})
		return
	}

	// Check if the user exists
	var user models.User
	if err := database.DB.Where("uf_id = ?", request.UFID).First(&user).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "User not found"})
		return
	}

	// Check if the book exists and is available
	var book models.Book
	if err := database.DB.Where("book_id = ?", request.BookID).First(&book).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Book not found"})
		return
	}
	if book.BookCount < request.BookCount {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Not enough books available"})
		return
	}

	// Attempt to find an existing book issue record for this user and book
	var bookIssue models.IssueBookRequest
	result := database.DB.Where("uf_id = ? AND book_id = ?", request.UFID, request.BookID).First(&bookIssue)

	if result.Error == nil {
		// Record exists, update it
		bookIssue.BookCount += request.BookCount
	} else {
		// No record exists, create a new one
		bookIssue = models.IssueBookRequest{
			UFID:      request.UFID,
			BookID:    request.BookID,
			IssueDate: request.IssueDate,
			BookCount: request.BookCount,
		}
	}

	// Save or update the book issue record
	if err := database.DB.Save(&bookIssue).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to update or create issue record"})
		return
	}

	// Deduct issued books from available count, update book record
	book.BookCount -= request.BookCount
	if err := database.DB.Save(&book).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to update book count"})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message": "Book issued successfully",
		"details": gin.H{
			"ufid":      request.UFID,
			"bookid":    request.BookID,
			"issueDate": request.IssueDate.Format("2006-01-02"),
			"bookCount": bookIssue.BookCount,
		},
	})
}
