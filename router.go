package main

import (
	"fmt"
	"log"
	"net/http"

	"github.com/julienschmidt/httprouter"
)

func index(w http.ResponseWriter, r *http.Request, _ httprouter.Params) {
	fmt.Fprint(w, "*notices ur api probe* owo what's this\n")
}

func hello(w http.ResponseWriter, r *http.Request, ps httprouter.Params) {
	// ps.ByName("instance")
}

func routerSetup(address string) {
	router := httprouter.New()
	router.GET("/", index)
	router.GET("/authenticate/:instance", hello)

	log.Fatal(http.ListenAndServe(address, router))
	fmt.Println("HTTP server started at %v\n", address)
}
