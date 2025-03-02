package main

import (
	"backend/database"
	"backend/routes"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func main() {
	database.Connect()
	r := gin.Default()

	// Add CORS middleware
	r.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"*"},
		AllowMethods:     []string{"GET", "POST", "PUT", "DELETE"},
		AllowHeaders:     []string{"Content-Type"},
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: true,
	}))

	r.POST("/register", routes.Register)
	r.POST("/signin", routes.SignIn)
	r.POST("/signout", routes.SignOut)

	r.GET("/getAllBooks", routes.GetAllBooks)
	r.POST("/addBook", routes.AddBook)
	r.GET("/getBook/:bookId", routes.GetBook)

	r.POST("/issueBook", routes.IssueBook)
	r.POST("/returnBook", routes.ReturnBook)

	r.GET("/getAllLoans", routes.AllLoans)
	r.GET("/getLoans/:ufId", routes.GetLoans)

	r.Run(":8083")
}
