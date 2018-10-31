package main

//bonk

import (
  "github.com/spf13/viper"
  "fmt"
  "os"
  "strings"
  "github.com/jinzhu/gorm"
  "github.com/gin-gonic/gin"
  "net/http"
)


// Mastodon instance certificate
type Instance struct {
  gorm.Model
  Address   string `gorm:"primary_key"`
  Secret    string
}


func main() {
  // Configuration Defaults
  viper.SetDefault("database", map[string]string{"type": "postgres", "connectionString": "user=lunar password=password dbname=lunar host=localhost sslmode=disable"})
  viper.SetDefault("database.user", "hoist")
  viper.SetDefault("database.password", "password")
  viper.SetDefault("database.dbname", "hoist")
  viper.SetDefault("database.sslmode", "disable")
  viper.SetDefault("url", "http://hoist.amy.zone")
  viper.SetDefault("host", "localhost")
  viper.SetDefault("port", 81)

  // Make configuration if it doesn't exist and read it
  viper.SetConfigName("config")
  cwd, err := os.Getwd()
  if err != nil {
    panic(fmt.Errorf("Couldn't get current working directory: %s\n", err.Error()))
  }
  viper.AddConfigPath(cwd)
  err = viper.ReadInConfig()
  if err != nil {
    panic(fmt.Errorf("Couldn't load config: %s \n", err))
  }

  host := viper.GetString("host")
  port := viper.getInt("port")
  siteURL := viper.GetString("url")
  databaseConfig := viper.GetStringMapString("database")

  // Connect to database
  db, err := gorm.Open(databaseConfig["type"], databaseConfig["connectionString"])
  if err != nil {
    panic(fmt.Errorf("Couldn't open database connection: %s \n", err))
  }
  defer db.Close()

  db.AutoMigrate(&Instance{})

  router := gin.Default()

  router.GET("/auth/:instance`", func (c *gin.Context) {
    address := strings.ToLower(c.Param("instance"))

    var instance Instance
    db.First(&instance, "address = ?", address)

    if db.Address == "" {
      response, err := http.Get(fmt.Sprintf(""))
    }
  })
}

// TODO: SSL cert

/*GRRR going to have to build a workaround in the server code to try both HTTP and HTTPS because mastodon admins are too cheap to buy SSL certs
too late to get started on that now it'll take like two hours
*/
