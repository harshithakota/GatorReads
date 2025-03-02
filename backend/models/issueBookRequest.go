package models

import (
	"time"
)

// IssueBookRequest struct defines the request format for issuing books.
type IssueBookRequest struct {
	UFID       string    `gorm:"primaryKey;column:uf_id" json:"ufid"`                                                                              // User ID (must be provided)
	BookID     string    `gorm:"primaryKey;column:book_id" json:"bookid"`                                                                          // Book ID (must be provided)
	IssueDate  time.Time `json:"issueDate" gorm:"type:date;not null;column:issue_date"`                                                            // Issue Date (must be provided, stored as date only)
	Status     string    `json:"status" gorm:"type:varchar(255);column:status;default:'active';check:status IN ('active', 'overdue', 'returned')"` // Status of the issue
	DueDate    time.Time `json:"dueDate" gorm:"type:date;column:due_date"`
	ReturnDate time.Time `json:"returnDate" gorm:"type:date;column:return_date"`
}
