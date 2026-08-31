package main

import (
	"context"
	"database/sql"
	"fmt"
	"log"
	"net/http"
	"os"
	"time"

	_ "github.com/lib/pq"

	"remindercards/model"
)

func handler(w http.ResponseWriter, r *http.Request) {
	fmt.Print(r.RequestURI)
	fmt.Fprintf(w, "hi, i love %s", r.URL.Path[1:])
}

func viewHandler(w http.ResponseWriter, r *http.Request) {
	title := r.URL.Path[len("/view/"):]
	fmt.Fprintf(w, "<h1>%s</h1>", title)
}

const (
	host     = "localhost"
	port     = 5432
	user     = "cards_app_user"
	password = ""
	dbname   = "remindersd"
)

// func connectToDb() {
// 	psqlconn := fmt.Sprintf(
// 		"host=%s port=%d user=%s password=%s dbname=%s sslmode=disable",
// 		host,
// 		port,
// 		user,
// 		password,
// 		dbname,
// 	)
//
// 	db, err := sql.Open("postgres", psqlconn)
// 	CheckError(err)
//
// 	defer db.Close()
//
// 	err = db.Ping()
// 	CheckError(err)
//
// 	fmt.Println("connected")
// }

func connectToDB() (*sql.DB, error) {
	databaseURL := os.Getenv("DATABASE_URL")
	if databaseURL == "" {
		return nil, fmt.Errorf("DATABASE_URL is not set")
	}

	db, err := sql.Open("postgres", databaseURL)
	if err != nil {
		return nil, fmt.Errorf("open database: %w", err)
	}

	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	if err := db.PingContext(ctx); err != nil {
		db.Close()
		return nil, fmt.Errorf("ping database: %w", err)
	}

	return db, nil
}

func createCard(db *sql.DB) error {
	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	cardRepository := model.NewCardRepository(db)
	card, err := cardRepository.CreateCard(ctx, model.Card{
		Question:    "Test question",
		Answer:      "Test answer",
		Description: "Test description",
	})
	if err != nil {
		return fmt.Errorf("create test card: %w", err)
	}

	log.Printf("created test card with ID %d", card.ID)
	return nil
}

func getCards(db *sql.DB) ([]model.Card, error) {
	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	cardRepository := model.NewCardRepository(db)
	cards, err := cardRepository.GetAllCards(ctx)
	if err != nil {
		return nil, fmt.Errorf("get cards: %w", err)
	}

	return cards, nil
}

func main() {
	db, err := connectToDB()
	CheckError(err)
	err = db.Ping()
	CheckError(err)
	defer db.Close()

	CheckError(createCard(db))

	cards, err := getCards(db)
	CheckError(err)
	log.Printf("found %d cards", len(cards))
	for _, card := range cards {
		log.Printf(
			"card ID=%d, question=%q, answer=%q, description=%q",
			card.ID,
			card.Question,
			card.Answer,
			card.Description,
		)
	}

	http.HandleFunc("/", handler)
	http.HandleFunc("/view/", viewHandler)
	log.Fatal(http.ListenAndServe(":8080", nil))
}

func CheckError(err error) {
	if err != nil {
		panic(err)
	}
}
