package config

import "github.com/spf13/viper"
import "fmt"
import "os"

// Viper ... Expose viper
var Viper = viper.GetViper()

// Load ... Loads the database
func Load() {
	// Configuration Defaults
	viper.SetDefault("database", map[string]string{"type": "postgres", "connectionString": "user=lunar password=password dbname=lunar host=localhost sslmode=disable"})
	viper.SetDefault("database.user", "hoist")
	viper.SetDefault("database.password", "password")
	viper.SetDefault("database.dbname", "hoist")
	viper.SetDefault("database.sslmode", "disable")
	viper.SetDefault("url", "http://hoist.amy.zone")
	viper.SetDefault("host", "xwlocalhost")
	viper.SetDefault("port", 81)

	// Make configuration if it doesn't exist and read it
	viper.SetConfigName("config")
	cwd, err := os.Getwd()
	if err != nil {
		panic(fmt.Errorf("Couldn't get current working directory: %s", err.Error()))
	}
	viper.AddConfigPath(cwd)
	err = viper.ReadInConfig()
	if err != nil {
		err = viper.WriteConfigAs("config.yml")
		err = viper.ReadInConfig()
	}
}
