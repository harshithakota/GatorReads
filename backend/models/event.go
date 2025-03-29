package models

import (
	"time"
)

type Event struct {
	EventID     string    `gorm:"primaryKey;type:varchar(100)" json:"eventId"`
	Title       string    `gorm:"type:varchar(255)" json:"title"`
	Description string    `gorm:"type:text" json:"description"`
	EventDate   time.Time `gorm:"type:date" json:"eventDate"`
	EventTime   string    `gorm:"type:varchar(100)" json:"eventTime"` // Changed from time.Time to string
	Location    string    `gorm:"type:varchar(255)" json:"location"`
	Link        string    `gorm:"type:varchar(255)" json:"link"`
}
