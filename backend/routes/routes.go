package routes

import (
	"leave-system/controllers"
	"leave-system/middleware"

	"github.com/gin-gonic/gin"
)

func SetupRoutes(r *gin.Engine) {
	// Public routes
	r.POST("/register", controllers.Register)
	r.POST("/login", controllers.Login)

	// Protected routes
	auth := r.Group("/")
	auth.Use(middleware.AuthMiddleware())

	// Employee routes
	auth.POST("/leave", middleware.EmployeeOnly(), controllers.CreateLeave)
	auth.GET("/leave/my", middleware.EmployeeOnly(), controllers.GetMyLeaves)

	// Manager routes
	auth.GET("/leave", middleware.ManagerOnly(), controllers.GetAllLeaves)
	auth.PUT("/leave/:id/approve", middleware.ManagerOnly(), controllers.ApproveLeave)
	auth.PUT("/leave/:id/reject", middleware.ManagerOnly(), controllers.RejectLeave)

	auth.GET("/users", middleware.ManagerOnly(), controllers.GetUsers)
	auth.POST("/users", middleware.ManagerOnly(), controllers.CreateEmployee)
}