package controllers

import (
	"net/http"

	"leave-system/config"
	"leave-system/models"

	"github.com/gin-gonic/gin"
)

type CreateLeaveInput struct {
	StartDate string `json:"start_date"`
	EndDate   string `json:"end_date"`
	Reason    string `json:"reason"`
}

func CreateLeave(c *gin.Context) {
	var input CreateLeaveInput

	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "invalid input"})
		return
	}

	userIDValue, exists := c.Get("user_id")
	if !exists {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "user not found in token"})
		return
	}

	userID := userIDValue.(uint)

	leave := models.Leave{
		UserID:    userID,
		StartDate: input.StartDate,
		EndDate:   input.EndDate,
		Reason:    input.Reason,
		Status:    "PENDING",
	}

	if err := config.DB.Create(&leave).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "failed to create leave request"})
		return
	}

	c.JSON(http.StatusCreated, gin.H{
		"message": "leave request created successfully",
		"leave":   leave,
	})
}

func GetMyLeaves(c *gin.Context) {
	userIDValue, exists := c.Get("user_id")
	if !exists {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "user not found in token"})
		return
	}

	userID := userIDValue.(uint)

	var leaves []models.Leave
	if err := config.DB.Preload("User").Where("user_id = ?", userID).Find(&leaves).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "failed to fetch leave requests"})
		return
	}

	c.JSON(http.StatusOK, leaves)
}

func GetAllLeaves(c *gin.Context) {
	var leaves []models.Leave
	if err := config.DB.Preload("User").Find(&leaves).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "failed to fetch all leave requests"})
		return
	}

	c.JSON(http.StatusOK, leaves)
}

func ApproveLeave(c *gin.Context) {
	leaveID := c.Param("id")

	var leave models.Leave
	if err := config.DB.First(&leave, leaveID).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "leave request not found"})
		return
	}

	managerIDValue, _ := c.Get("user_id")
	managerID := managerIDValue.(uint)

	leave.Status = "APPROVED"
	leave.ReviewedBy = &managerID

	if err := config.DB.Save(&leave).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "failed to approve leave request"})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message": "leave approved successfully",
		"leave":   leave,
	})
}

func RejectLeave(c *gin.Context) {
	leaveID := c.Param("id")

	var leave models.Leave
	if err := config.DB.First(&leave, leaveID).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "leave request not found"})
		return
	}

	managerIDValue, _ := c.Get("user_id")
	managerID := managerIDValue.(uint)

	leave.Status = "REJECTED"
	leave.ReviewedBy = &managerID

	if err := config.DB.Save(&leave).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "failed to reject leave request"})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message": "leave rejected successfully",
		"leave":   leave,
	})
}