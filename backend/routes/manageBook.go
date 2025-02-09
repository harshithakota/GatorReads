package routes

import (
	"backend/database"
	"backend/models"
	"net/http"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

func GetAllBooks(c *gin.Context) {

	var books []models.Book
	if err := database.DB.Find(&books).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Error retrieving books"})
		return
	}

	if len(books) == 0 {
		c.JSON(http.StatusNotFound, gin.H{"message": "No books found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"books": books})
}

func GetBook(c *gin.Context) {
	bookId := c.Param("bookId")
	if bookId == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Missing bookId parameter"})
		return
	}

	var book models.Book
	result := database.DB.First(&book, "book_id = ?", bookId)
	if result.Error != nil {
		if result.Error == gorm.ErrRecordNotFound {
			c.JSON(http.StatusNotFound, gin.H{"error": "Book not found"})
		} else {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Error retrieving book", "details": result.Error.Error()})
		}
		return
	}

	c.JSON(http.StatusOK, gin.H{"book": book})
}

func AddBook(c *gin.Context) {
	var newBook models.Book
	if err := c.ShouldBindJSON(&newBook); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid book data", "details": err.Error()})
		return
	}

	if err := database.DB.Create(&newBook).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Error saving the book", "details": err.Error()})
		return
	}

	c.JSON(http.StatusCreated, gin.H{"message": "Book added successfully", "book": newBook})
}
