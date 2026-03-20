package main

import (
	"os"
	"time"

	"leave-system/config"
	"leave-system/routes"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"


)

func main() {


	err := godotenv.Load()
	if err != nil {
		panic("failed to load .env file")
	}

	config.ConnectDB()

	r := gin.Default()

	// Enable CORS
	r.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"http://localhost:3000", "http://localhost:5173", "http://localhost:5174","http://localhost:8000", "http://localhost:8001"},
		AllowMethods:     []string{"GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"},
		AllowHeaders:     []string{"Content-Type", "Authorization"},
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: true,
		MaxAge:           12 * time.Hour,
	}))

	routes.SetupRoutes(r)

	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	err = r.Run(":" + port)
	if err != nil {
		panic("failed to start server")
	}
}