package middleware

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

func EmployeeOnly() gin.HandlerFunc {
	return func(c *gin.Context) {
		role := c.GetString("role")
		if role != "EMPLOYEE" {
			c.JSON(http.StatusForbidden, gin.H{"error": "employee access only"})
			c.Abort()
			return
		}
		c.Next()
	}
}

func ManagerOnly() gin.HandlerFunc {
	return func(c *gin.Context) {
		role := c.GetString("role")
		if role != "MANAGER" {
			c.JSON(http.StatusForbidden, gin.H{"error": "manager access only"})
			c.Abort()
			return
		}
		c.Next()
	}
}