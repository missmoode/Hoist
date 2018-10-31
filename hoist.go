package main

//bonk

import (
	"fmt"
	"strings"

	"github.com/gin-gonic/gin"
	"github.com/jinzhu/gorm"
)
import "./config"
import "./models"

func main() {
	config.Load()

	host := config.Viper.GetString("host")
	port := config.Viper.GetInt("port")
	databaseConfig := config.Viper.GetStringMapString("database")

	// Connect to database
	db, err := gorm.Open(databaseConfig["type"], databaseConfig["connectionString"])
	if err != nil {
		panic(fmt.Errorf("Couldn't open database connection: %s", err))
	}
	defer db.Close()

	db.AutoMigrate(models.Instance{})

	router := gin.Default()

	router.GET("/auth/:instance`", func(c *gin.Context) {
		address := strings.ToLower(c.Param("instance"))

		var instance models.Instance
		db.First(&instance, "address = ?", address)

		if instance.Address == "" {
			//response, err := http.Get(fmt.Sprintf(""))
		}
	})

	router.Run(fmt.Sprintf("%s:%d", host, port))
}

// TODO: SSL cert

/*GRRR going to have to build a workaround in the server code to try both HTTP and HTTPS because mastodon admins are too cheap to buy SSL certs
too late to get started on that now it'll take like two hours
*/
