package models

import "gorm.io/gorm"

// UserBook represents a user borrowing multiple books
type UserBook struct {
	gorm.Model
	UFID  string `json:"ufid" gorm:"column:ufid;not null;index"` // Foreign key reference to User
	Books []Book `json:"books" gorm:"many2many:user_books;"`     // Many-to-Many relationship with Books

}
