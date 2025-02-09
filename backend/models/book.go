package models

import "gorm.io/gorm"

type Book struct {
	gorm.Model
	BookType     string `json:"bookType"`
	BookFullName string `json:"bookFullName"`
	BookID       string `json:"bookid"`
	BookCount    int    `json:"bookCount"`
}
