package routes

import (
	"backend/database"
	"backend/models"
	"bytes"
	"fmt"
	"io/ioutil"
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
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
	if err := database.DB.Where("ufid = ?", request.UFID).First(&user).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "User not found"})
		return
	}

	// Check if the book exists and is available
	var book models.Book
	if err := database.DB.Where("book_id = ?", request.BookID).First(&book).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Book not found"})
		return
	}
	if book.BookCount < 1 { // Check at least one book is available
		c.JSON(http.StatusBadRequest, gin.H{"error": "Not enough books available"})
		return
	}

	// Calculate the return date as 2 weeks from the issue date
	twoWeeksLater := request.IssueDate.Add(14 * 24 * time.Hour)

	// Create a new book issue record each time a book is issued
	bookIssue := models.IssueBookRequest{
		UFID:      request.UFID,
		BookID:    request.BookID,
		IssueDate: request.IssueDate,
		DueDate:   twoWeeksLater,
		Status:    "active", // Default status as active when issuing a new book
	}

	// Save the new book issue record
	if err := database.DB.Create(&bookIssue).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create issue record"})
		return
	}

	// Deduct one book from available count, update book record
	book.BookCount -= 1
	if err := database.DB.Save(&book).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to update book count"})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message": "Book issued successfully",
		"details": gin.H{
			"ufid":       request.UFID,
			"bookid":     request.BookID,
			"issueDate":  request.IssueDate.Format("2006-01-02"),
			"returnDate": twoWeeksLater.Format("2006-01-02"), // Format and include return date
			"status":     bookIssue.Status,
		},
	})
}

// API to return a book to a user
func ReturnBook(c *gin.Context) {
	var returnRequest models.IssueBookRequest

	if err := c.ShouldBindJSON(&returnRequest); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid input", "details": err.Error()})
		return
	}

	// Find the active book issue record
	var issue models.IssueBookRequest
	result := database.DB.Where("ufid = ? AND book_id = ? AND status = 'active'", returnRequest.UFID, returnRequest.BookID).First(&issue)
	if result.Error != nil {
		if result.Error == gorm.ErrRecordNotFound {
			c.JSON(http.StatusNotFound, gin.H{"error": "No active issue found for this book and user"})
			return
		}
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Error retrieving issue record", "details": result.Error.Error()})
		return
	}

	// Validate the return date (Optional: Check if the return date is after the issue date)

	if returnRequest.ReturnDate.Before(issue.IssueDate) {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Return date cannot be before the issue date"})
		return
	}

	// Update the status to 'returned' and set the returned date
	issue.Status = "returned"
	issue.ReturnDate = returnRequest.ReturnDate // Update the return date as provided in the request

	// Save the updated issue record
	if err := database.DB.Save(&issue).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to update issue record", "details": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message": "Book returned successfully",
		"details": gin.H{
			"ufid":       issue.UFID,
			"bookid":     issue.BookID,
			"issueDate":  issue.IssueDate.Format("2006-01-02"),
			"returnDate": issue.ReturnDate.Format("2006-01-02"),
			"status":     issue.Status,
		},
	})
}

// All Loans fetches all book issue records
func AllLoans(c *gin.Context) {
	var issues []models.IssueBookRequest
	if err := database.DB.Find(&issues).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to retrieve records", "details": err.Error()})
		return
	}

	if len(issues) == 0 {
		c.JSON(http.StatusNotFound, gin.H{"message": "No Loans found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"Loans": issues})
}
