package models

import "gorm.io/gorm"

type User struct {
	gorm.Model
	UserType     string `json:"userType"`
	UserFullName string `json:"userFullName"`
	AdmissionID  string `json:"admissionId,omitempty"`
	EmployeeID   string `json:"employeeId,omitempty"`
	Age          int    `json:"age"`
	DOB          string `json:"dob"`
	Gender       string `json:"gender"`
	Address      string `json:"address"`
	MobileNumber string `json:"mobileNumber"`
	Email        string `json:"email" gorm:"unique"`
	Password     string `json:"password"`
	IsAdmin      bool   `json:"isAdmin"`
}
