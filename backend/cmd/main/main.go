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
	r.DELETE("/deleteBook/:bookId", routes.DeleteBook)
	r.GET("/getBook/:bookId", routes.GetBook)

	r.POST("/issueBook", routes.IssueBook)
	r.POST("/returnBook", routes.ReturnBook)
	r.GET("/searchBook", routes.SearchBooksByName)

	r.GET("/getAllLoans", routes.AllLoans)
	r.GET("/getLoans/:ufId", routes.GetLoans)

	r.POST("/addEvent", routes.AddEvent)
	r.GET("/getEvent/:eventId", routes.GetEvent)
	r.GET("/getAllEvents", routes.GetAllEvents)
	r.DELETE("/deleteEvent/:eventId", routes.DeleteEvent)
	r.PUT("/updateEvent/:eventId", routes.UpdateEvent)
	// r.GET("/searchEvent", routes.SearchEventsByName)

	// r.GET("/getAllUsers", routes.GetAllUsers)
	// r.GET("/getUser/:ufid", routes.GetUser)
	// r.DELETE("/deleteUser/:ufid", routes.DeleteUser)
	// r.PUT("/updateUser/:ufid", routes.UpdateUser)

	r.Run(":8083")
}
