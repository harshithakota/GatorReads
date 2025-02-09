package models

import "gorm.io/gorm"

type User struct {
	gorm.Model
	UserType     string json:"userType"
	UserFullName string json:"userFullName"
	UFID         string json:"ufid" gorm:"column:ufid" // Changed to uppercase

	DOB    string json:"dob"
	Gender string json:"gender"

	Email    string json:"email" gorm:"unique"
	Password string json:"password"
	IsAdmin  bool   json:"isAdmin"
}