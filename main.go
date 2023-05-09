package main

import (
	"fmt"
	"log"
	"net/http"
)

func main() {
	server := http.FileServer(http.Dir("./static"))

	http.Handle("/", server)
	http.HandleFunc("/form", formHandler)
	http.HandleFunc("/hello", helloHandler)

	fmt.Printf("Server started")

	if err := http.ListenAndServe(":8080", nil); err != nil {
		log.Fatal(err)
	}

}

func formHandler(w http.ResponseWriter, r *http.Request) {
	fmt.Println(r)
	if err := r.ParseForm(); err != nil {
		fmt.Fprintf(w, "ParseForm()")
	}
}

func helloHandler(w http.ResponseWriter, r *http.Request) {
	if r.URL.Path != "/hello" {
		http.Error(w, "404 not found", http.StatusNotFound)
		return
	}

	if r.Method != "GET" {
		http.Error(w, "Method not supported", http.StatusNotFound)
	}

	fmt.Fprintf(w, "Hello")
}
