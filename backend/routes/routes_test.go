package routes

import (
	"github.com/gin-gonic/gin"
)

func setupRouter() *gin.Engine {
	gin.SetMode(gin.TestMode)
	router := gin.Default()

	router.POST("/issueBook", IssueBook)
	router.POST("/returnBook", ReturnBook)
	router.GET("/getAllLoans", AllLoans)
	router.GET("/getLoans/:ufId", GetLoans)
	router.GET("/getAllBooks", GetAllBooks)
	router.GET("/getBook/:bookId", GetBook)
	router.POST("/addBook", AddBook)

	return router
}
