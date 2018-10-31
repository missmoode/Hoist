package main

import (
	"fmt"

	"github.com/jinzhu/gorm"
	_ "github.com/jinzhu/gorm/dialects/postgres"
)

type instance struct {
	gorm.Model
	instance     string
	clientSecret string
}

func databaseOpen(connectionString string) {
	db, err := gorm.Open("postgres", connectionString)
	if err != nil {
		panic(fmt.Sprintf("failed to connect to database: %s", err))
	}
	defer db.Close()
	fmt.Println("Database connected")

	db.AutoMigrate(&instance{})
}
