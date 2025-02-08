package main

import (
	"backend/database"
	"backend/routes"

	"github.com/gin-gonic/gin"
)

func main() {
	database.Connect()
	r := gin.Default()

	r.POST("/register", routes.Register)
	r.POST("/signin", routes.SignIn)

	r.Run(":8083") // Start the server
}
