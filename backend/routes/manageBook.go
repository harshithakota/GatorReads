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
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Book-Id is already in use!!!"})
		return
	}

	c.JSON(http.StatusCreated, gin.H{"message": "Book added successfully", "book": newBook})
}

func DeleteBook(c *gin.Context) {
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
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Error retrieving book"})
		}
		return
	}

	// If book is found, delete it
	if err := database.DB.Delete(&book).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Error deleting book", "details": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Book deleted successfully"})
}

// SearchBooksByName searches for books by BookFullName (case-insensitive)
func SearchBooksByName(c *gin.Context) {
	bookName := c.Query("name")
	if bookName == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Missing name query parameter"})
		return
	}

	var books []models.Book
	if err := database.DB.Where("LOWER(book_full_name) LIKE LOWER(?)", "%"+bookName+"%").Find(&books).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Error searching books", "details": err.Error()})
		return
	}

	if len(books) == 0 {
		c.JSON(http.StatusNotFound, gin.H{"message": "No books found with the given name"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"books": books})
}
