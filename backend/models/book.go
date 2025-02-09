package models

import (
	"time" // Import time for handling datetime fields
)

type Book struct {
	BookID       string    `gorm:"primaryKey;type:varchar(100)" json:"bookId"` // Explicitly setting as primary key
	BookType     string    `gorm:"type:varchar(100)" json:"bookType"`          // Specifying field types
	BookFullName string    `gorm:"type:varchar(255)" json:"bookFullName"`      // Maintaining consistent field type
	BookCount    int       `gorm:"type:int" json:"bookCount"`                  // Integer field for counts
	IssueDate    time.Time `gorm:"type:date" json:"issueDate"`                 // Using time.Time type for date

}
