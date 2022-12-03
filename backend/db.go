package main
import (
	"log"
	"os"
	"github.com/go-pg/pg/v9"
)

func Connect() *pg.DB {
	opts := &pg.Options{
		User: "baeldung",
		Password: "baeldung",
		Addr: "localhost:5432",
		Database: "postgres",
	}
	var db *pg.DB = pg.Connect(opts)
	if db == nil {
		log.Printf("Failed to connect")
		os.Exit(100)
	}
	log.Printf("Connected to db")
	CreateGroupTable(db)
	InitiateDB(db)
	return db
}
