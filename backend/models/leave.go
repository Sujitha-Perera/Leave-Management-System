package models

import "time"

type Leave struct {
	ID         uint       `json:"id" gorm:"primaryKey"`
	UserID     uint       `json:"user_id" gorm:"not null"`
	User       User       `json:"user" gorm:"foreignKey:UserID"`
	StartDate  string     `json:"start_date" gorm:"not null"`
	EndDate    string     `json:"end_date" gorm:"not null"`
	Reason     string     `json:"reason" gorm:"type:text;not null"`
	Status     string     `json:"status" gorm:"size:20;default:PENDING"`
	ReviewedBy *uint      `json:"reviewed_by"`
	CreatedAt  time.Time  `json:"created_at"`
	UpdatedAt  time.Time  `json:"updated_at"`
}