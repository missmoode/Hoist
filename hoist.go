package main

//bonk

import (
  "github.com/spf13/viper"
  "fmt"
  "os"
)

func main() {
  // Configuration Defaults
  viper.SetDefault("database", map[string]string{"type": "postgres", "connectionString": "user=lunar password=password dbname=lunar host=localhost sslmode=disable"})
  viper.SetDefault("database.user", "hoist")
  viper.SetDefault("database.password", "password")
  viper.SetDefault("database.dbname", "hoist")
  viper.SetDefault("database.sslmode", "disable")
  viper.SetDefault("host", "localhost")

  //Make configuration if it doesn't exist and read it
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
}
