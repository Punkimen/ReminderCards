package model

import (
	"context"
	"database/sql"
	"fmt"
	"time"
)

type Deck struct {
	ID          int64
	CreatedAt   time.Time
	Title       string
	Description string
}

type DeckRepository struct {
	db *sql.DB
}

func NewDeckRepository(db *sql.DB) *DeckRepository {
	return &DeckRepository{db: db}
}

// CreateDeck создаёт пустую колоду и возвращает сохранённые данные.
func (r *DeckRepository) CreateDeck(
	ctx context.Context,
	deck Deck,
) (Deck, error) {
	const query = `
                INSERT INTO decks (title, description)
                VALUES ($1, $2)
                RETURNING id, created_at, title, description
        `

	err := r.db.QueryRowContext(
		ctx,
		query,
		deck.Title,
		deck.Description,
	).Scan(
		&deck.ID,
		&deck.CreatedAt,
		&deck.Title,
		&deck.Description,
	)
	if err != nil {
		return Deck{}, fmt.Errorf("create deck: %w", err)
	}

	return deck, nil
}

// AddCardToDeck добавляет существующую карточку в существующую колоду.
func (r *DeckRepository) AddCardToDeck(
	ctx context.Context,
	deckID, cardID int64,
) error {
	const query = `
                INSERT INTO deck_cards (deck_id, card_id)
                VALUES ($1, $2)
        `

	_, err := r.db.ExecContext(ctx, query, deckID, cardID)
	if err != nil {
		return fmt.Errorf("add card to deck: %w", err)
	}

	return nil
}
