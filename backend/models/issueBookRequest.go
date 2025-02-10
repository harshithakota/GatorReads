package models

// Request body for issuing a book
type IssueBookRequest struct {
	UFID      string `json:"ufid" binding:"required"`      // User ID (must be provided)
	BookID    string `json:"bookid" binding:"required"`    // Book ID (must be provided)
	IssueDate string `json:"issueDate" binding:"required"` // Issue Date (must be provided)
	BookCount int    `json:"bookCount" binding:"required"` // Number of books issued
}
