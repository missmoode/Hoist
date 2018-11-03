package model

import "github.com/jinzhu/gorm"

// Instance ... A mastodon instance
type Instance struct {
	gorm.Model
	Address string `gorm:"primary_key"`
	Secret  string
}
