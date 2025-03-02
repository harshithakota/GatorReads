package models

import (
	"time"
)

type Book struct {
	BookID       string    `gorm:"primaryKey;type:varchar(100)" json:"book_Id"`
	BookType     string    `gorm:"type:varchar(100)" json:"bookType"`
	BookFullName string    `gorm:"type:varchar(255)" json:"bookFullName"`
	BookCount    int       `gorm:"type:int" json:"bookCount"`
	IssueDate    time.Time `gorm:"type:date" json:"issueDate"`
	AuthorName   string    `gorm:"type:varchar(255)" json:"authorName"`
	ImageData    string    `gorm:"type:text" json:"imageData"` // Storing base64 encoded image data
}
