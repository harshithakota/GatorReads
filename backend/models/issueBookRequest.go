package models

import (
	"time"
)

// IssueBookRequest struct defines the request format for issuing books.
type IssueBookRequest struct {
	UFID      string    `gorm:"primaryKey;column:uf_id"`                                // User ID (must be provided)
	BookID    string    `gorm:"primaryKey;column:book_id"`                              // Book ID (must be provided)
	IssueDate time.Time `json:"issueDate" binding:"required" gorm:"type:date;not null"` // Issue Date (must be provided, stored as date only)
	BookCount int       `json:"bookCount" binding:"required"`                           // Number of books issued
}
