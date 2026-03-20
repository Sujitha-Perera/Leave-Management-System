package models

import "time"

type User struct {
	ID           uint      `json:"id" gorm:"primaryKey"`
	FullName     string    `json:"full_name" gorm:"size:100;not null"`
	Email        string    `json:"email" gorm:"size:120;unique;not null"`
	PasswordHash string    `json:"-" gorm:"not null"`
	Role         string    `json:"role" gorm:"size:20;not null"`
	CreatedAt    time.Time `json:"created_at"`
	UpdatedAt    time.Time `json:"updated_at"`
}