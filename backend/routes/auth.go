package routes

import (
	"backend/database"
	"backend/models"
	"fmt"
	"net/http"

	"github.com/gin-gonic/gin"
	"golang.org/x/crypto/bcrypt"
)

func Register(c *gin.Context) {
	var user models.User
	if err := c.ShouldBindJSON(&user); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid input"})
		return
	}

	fmt.Println("Raw password before hashing:", user.Password)

	// Hash the password
	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(user.Password), bcrypt.DefaultCost)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Error hashing password"})
		return
	}
	user.Password = string(hashedPassword)

	fmt.Println("Hashed password being stored:", user.Password)
	fmt.Println("Registering user with UFID:", user.UFID) // Add this debug line

	// Save user to database
	if err := database.DB.Create(&user).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to register user"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "User registered successfully"})
}

func SignIn(c *gin.Context) {
	var input struct {
		UFID     string `json:"ufid"` // Changed from admissionId/employeeId to UFID
		Password string `json:"password"`
	}

	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid input"})
		return
	}

	var user models.User
	// Search by UFID instead of admissionId/employeeId
	if err := database.DB.Where("ufid = ?", input.UFID).First(&user).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "User not found"})
		return
	}

	// Check password
	if err := bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(input.Password)); err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Incorrect password"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Login successful", "user": user})
}

// The commented parts below are fixed with correct struct tag syntax if needed in future.
/*
func Register(c *gin.Context) {
    var user models.User
    if err := c.ShouldBindJSON(&user); err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid input"})
        return
    }

    fmt.Println("Raw password before hashing:", user.Password)

    // Hash the password
    hashedPassword, err := bcrypt.GenerateFromPassword([]byte(user.Password), bcrypt.DefaultCost)
    if err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": "Error hashing password"})
        return
    }
    user.Password = string(hashedPassword)

    fmt.Println("Hashed password being stored:", user.Password)

    // Save user to database
    if err := database.DB.Create(&user).Error; err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to register user"})
        return
    }

    c.JSON(http.StatusOK, gin.H{"message": "User registered successfully"})
}

func SignIn(c *gin.Context) {
    var input struct {
        UFID     string `json:"ufid"`
        Password string `json:"password"`
    }
    if err := c.ShouldBindJSON(&input); err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid input"})
        return
    }

    var user models.User
    if err := database.DB.Where("ufid = ?", input.UFID).First(&user).Error; err != nil {
        c.JSON(http.StatusNotFound, gin.H{"error": "User not found"})
        return
    }

    // Check password
    if err := bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(input.Password)); err != nil {
        c.JSON(http.StatusUnauthorized, gin.H{"error": "Incorrect password"})
        return
    }

    c.JSON(http.StatusOK, gin.H{"message": "Login successful", "user": user})
}
*/
func SignOut(c *gin.Context) {
	var input struct {
		UFID string `json:"ufid"` // Accept user ID in the request body
	}

	// Bind JSON first; it internally handles reading the body
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request body", "details": err.Error()})
		return
	}

	// Check if UFID is provided
	if input.UFID == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "UFID is required"})
		return
	}

	// Attempt to find the user in the database
	var user models.User
	if err := database.DB.First(&user, "ufid = ?", input.UFID).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "User not found"})
		return
	}

	fmt.Println("Logging out user ID:", input.UFID)

	// Here, invalidate the user's session or token if implemented
	// Assuming you manage session or token validity elsewhere in your middleware or auth system

	c.JSON(http.StatusOK, gin.H{"message": "User logged out successfully", "userId": input.UFID})
}
