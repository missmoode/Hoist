package main

import (
	"fmt"

	"github.com/spf13/viper"
)

func readConfig(filename string, defaults map[string]interface{}) (*viper.Viper, error) {
	v := viper.New()
	for key, value := range defaults {
		v.SetDefault(key, value)
	}
	v.SetConfigName(filename)
	v.AddConfigPath(".")
	v.AutomaticEnv()
	err := v.ReadInConfig()
	return v, err
}

func main() {
	v, err := readConfig("hoist", map[string]interface{}{
		"serverAddress":  "localhost:8080",
		"databaseString": "user=hoist password=password dbname=hoist host=localhost sslmode=disable",
	})
	if err != nil {
		panic(fmt.Errorf("Error when reading config %v", err))
	}

	routerSetup(v.GetString("serverAddress"))
	databaseOpen(v.GetString("databaseString"))

}
