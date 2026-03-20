package controllers

import (
	"net/http"
	"strings"

	"leave-system/config"
	"leave-system/models"
	"leave-system/utils"

	"github.com/gin-gonic/gin"
)

type CreateEmployeeInput struct {
	FullName string `json:"full_name"`
	Email    string `json:"email"`
	Password string `json:"password"`
}

func GetUsers(c *gin.Context) {
	var users []models.User

	if err := config.DB.Find(&users).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "failed to fetch users"})
		return
	}

	c.JSON(http.StatusOK, users)
}

func CreateEmployee(c *gin.Context) {
	var input CreateEmployeeInput

	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "invalid input"})
		return
	}

	email := strings.TrimSpace(input.Email)

	var existing models.User
	err := config.DB.Where("email = ?", email).First(&existing).Error
	if err == nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "email already exists"})
		return
	}

	hashedPassword, err := utils.HashPassword(input.Password)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "failed to hash password"})
		return
	}

	user := models.User{
		FullName:     input.FullName,
		Email:        email,
		PasswordHash: hashedPassword,
		Role:         "EMPLOYEE",
	}

	if err := config.DB.Create(&user).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "failed to create employee"})
		return
	}

	c.JSON(http.StatusCreated, gin.H{
		"message": "employee created successfully",
		"user":    user,
	})
}