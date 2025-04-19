package routes

import (
	"backend/database"
	"backend/models"
	"net/http"

	"github.com/gin-gonic/gin"
	// "gorm.io/gorm"
)

func GetAllUsers(c *gin.Context) {
	var users []models.User
	if err := database.DB.Find(&users).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Error retrieving users"})
		return
	}

	if len(users) == 0 {
		c.JSON(http.StatusNotFound, gin.H{"message": "No users found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"users": users})
}

// func GetUser(c *gin.Context) {
// 	ufid := c.Param("ufid")

// 	println("UFID is:", ufid)

// 	if ufid == "" {
// 		c.JSON(http.StatusBadRequest, gin.H{"error": "Missing UFID parameter"})
// 		return
// 	}

// 	var user models.User

// 	// Search user by UFID
// 	if err := database.DB.First(&user, "ufid = ?", ufid).Error; err != nil {
// 		c.JSON(http.StatusNotFound, gin.H{"error": "User not found"})
// 		return
// 	}

// 	c.JSON(http.StatusOK, gin.H{"user": user})
// }

// func DeleteUser(c *gin.Context) {
// 	ufid := c.Param("ufid")

// 	if ufid == "" {
// 		c.JSON(http.StatusBadRequest, gin.H{"error": "Missing UFID parameter"})
// 		return
// 	}

// 	var user models.User

// 	// Check if user exists
// 	if err := database.DB.First(&user, "ufid = ?", ufid).Error; err != nil {
// 		c.JSON(http.StatusNotFound, gin.H{"error": "User not found"})
// 		return
// 	}

// 	// Delete user
// 	if err := database.DB.Delete(&user).Error; err != nil {
// 		c.JSON(http.StatusInternalServerError, gin.H{"error": "Error deleting user"})
// 		return
// 	}

// 	c.JSON(http.StatusOK, gin.H{"message": "User deleted successfully"})
// }

// func UpdateUser(c *gin.Context) {
// 	ufid := c.Param("ufid")

// 	if ufid == "" {
// 		c.JSON(http.StatusBadRequest, gin.H{"error": "Missing UFID parameter"})
// 		return
// 	}

// 	var user models.User

// 	// Check if user exists
// 	if err := database.DB.First(&user, "ufid = ?", ufid).Error; err != nil {
// 		c.JSON(http.StatusNotFound, gin.H{"error": "User not found"})
// 		return
// 	}

// 	var updatedData models.User

// 	// Bind updated data from request body
// 	if err := c.ShouldBindJSON(&updatedData); err != nil {
// 		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid user data", "details": err.Error()})
// 		return
// 	}

// 	// Update fields
// 	user.UserType = updatedData.UserType
// 	user.UserFullName = updatedData.UserFullName
// 	user.DOB = updatedData.DOB
// 	user.Gender = updatedData.Gender
// 	user.Email = updatedData.Email
// 	user.Password = updatedData.Password
// 	user.IsAdmin = updatedData.IsAdmin

// 	// Save to DB
// 	if err := database.DB.Save(&user).Error; err != nil {
// 		c.JSON(http.StatusInternalServerError, gin.H{"error": "Error updating user"})
// 		return
// 	}

// 	c.JSON(http.StatusOK, gin.H{"message": "User updated successfully", "user": user})
// }
