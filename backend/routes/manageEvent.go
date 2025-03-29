package routes

import (
	"backend/database"
	"backend/models"
	"fmt"
	"net/http"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

func GetAllEvents(c *gin.Context) {
	var events []models.Event

	if err := database.DB.Find(&events).Error; err != nil {
		fmt.Println(err)
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Error retrieving events"})
		return
	}

	if len(events) == 0 {
		c.JSON(http.StatusNotFound, gin.H{"message": "No events found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"events": events})

}

// AddEvent creates a new event
func AddEvent(c *gin.Context) {
	var newEvent models.Event
	if err := c.ShouldBindJSON(&newEvent); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid event data", "details": err.Error()})
		return
	}

	if err := database.DB.Create(&newEvent).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Error adding event", "details": err.Error()})
		return
	}

	c.JSON(http.StatusCreated, gin.H{"message": "Event added successfully", "event": newEvent})
}

// GetEvent retrieves a single event by its ID
func GetEvent(c *gin.Context) {
	eventId := c.Param("eventId")
	if eventId == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Missing eventId parameter"})
		return
	}

	var event models.Event
	result := database.DB.First(&event, "event_id = ?", eventId)
	if result.Error != nil {
		if result.Error == gorm.ErrRecordNotFound {
			c.JSON(http.StatusNotFound, gin.H{"error": "Event not found"})
		} else {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Error retrieving event", "details": result.Error.Error()})
		}
		return
	}

	c.JSON(http.StatusOK, gin.H{"event": event})
}

// // UpdateEvent updates an existing event
// func UpdateEvent(c *gin.Context) {
// 	eventId := c.Param("eventId")
// 	if eventId == "" {
// 		c.JSON(http.StatusBadRequest, gin.H{"error": "Missing eventId parameter"})
// 		return
// 	}

// 	var inputEvent models.Event
// 	if err := c.ShouldBindJSON(&inputEvent); err != nil {
// 		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid event data", "details": err.Error()})
// 		return
// 	}

// 	// Fetch the existing event first to make sure it exists and to update it
// 	var existingEvent models.Event
// 	if err := database.DB.Where("event_id = ?", eventId).First(&existingEvent).Error; err != nil {
// 		if errors.Is(err, gorm.ErrRecordNotFound) {
// 			c.JSON(http.StatusNotFound, gin.H{"error": "Event not found"})
// 		} else {
// 			c.JSON(http.StatusInternalServerError, gin.H{"error": "Error retrieving event", "details": err.Error()})
// 		}
// 		return
// 	}

// 	// Update the existing event with the new data provided
// 	if err := database.DB.Model(&existingEvent).Updates(inputEvent).Error; err != nil {
// 		c.JSON(http.StatusInternalServerError, gin.H{"error": "Error updating event", "details": err.Error()})
// 		return
// 	}

// 	// Re-fetch the updated event to ensure the response includes the latest data
// 	if err := database.DB.Where("event_id = ?", eventId).First(&existingEvent).Error; err != nil {
// 		c.JSON(http.StatusInternalServerError, gin.H{"error": "Error retrieving updated event", "details": err.Error()})
// 		return
// 	}

// 	c.JSON(http.StatusOK, gin.H{"message": "Event updated successfully", "event": existingEvent})
// }

// // DeleteEvent deletes an event
// func DeleteEvent(c *gin.Context) {
// 	eventId := c.Param("eventId")
// 	if eventId == "" {
// 		c.JSON(http.StatusBadRequest, gin.H{"error": "Missing eventId parameter"})
// 		return
// 	}

// 	var event models.Event
// 	result := database.DB.First(&event, "event_id = ?", eventId)
// 	if result.Error != nil {
// 		if result.Error == gorm.ErrRecordNotFound {
// 			c.JSON(http.StatusNotFound, gin.H{"error": "Event not found"})
// 		} else {
// 			c.JSON(http.StatusInternalServerError, gin.H{"error": "Error retrieving event"})
// 		}
// 		return
// 	}

// 	if err := database.DB.Delete(&event).Error; err != nil {
// 		c.JSON(http.StatusInternalServerError, gin.H{"error": "Error deleting event", "details": err.Error()})
// 		return
// 	}

// 	c.JSON(http.StatusOK, gin.H{"message": "Event deleted successfully"})
// }
