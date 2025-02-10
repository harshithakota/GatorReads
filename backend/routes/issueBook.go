package routes

import (
	"backend/database"
	"backend/models"
	"fmt"
	"net/http"

	"github.com/gin-gonic/gin"
)

// API to issue a book to a user
func IssueBook(c *gin.Context) {
	var request models.IssueBookRequest

	// Bind JSON input
	if err := c.ShouldBindJSON(&request); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid input"})
		return
	}

	// Find the book in the database
	var book models.Book
	if err := database.DB.Where("bookid = ?", request.BookID).First(&book).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Book not found"})
		return
	}

	// Check if enough books are available
	if book.BookCount < request.BookCount {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Not enough books available"})
		return
	}

	// Deduct issued books from available count
	book.BookCount -= request.BookCount
	if err := database.DB.Save(&book).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to update book count"})
		return
	}

	// Create a new user-book record
	userBook := models.IssueBookRequest{
		UFID:      request.UFID,
		BookCount: request.BookCount,
		IssueDate: request.IssueDate,
	}

	// Save the user-book association
	if err := database.DB.Create(&userBook).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to issue book"})
		return
	}

	fmt.Println("Book issued successfully:", request.BookID, "to user:", request.UFID)
	c.JSON(http.StatusOK, gin.H{"message": "Book issued successfully", "ufid": request.UFID, "bookid": request.BookID})
}
