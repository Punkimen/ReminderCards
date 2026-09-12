package model

import (
	"context"
	"database/sql"
	"fmt"
	"time"
)

type Deck struct {
	ID          int64
	UserID      int64
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

// GetDeckWithCardsById возвращает колоду с картами
type DeckWithCards struct {
	Deck  Deck
	Cards []Card
}

func (r *DeckRepository) GetDeckWithCardsById(
	ctx context.Context,
	deckID int64,
) (DeckWithCards, error) {
	result := DeckWithCards{
		Cards: make([]Card, 0),
	}

	const deckQuery = `
		SELECT id, created_at, title, description
		FROM decks
		WHERE id = $1
	`

	err := r.db.QueryRowContext(ctx, deckQuery, deckID).Scan(
		&result.Deck.ID,
		&result.Deck.CreatedAt,
		&result.Deck.Title,
		&result.Deck.Description,
	)
	if err != nil {
		return DeckWithCards{}, fmt.Errorf("get deck: %w", err)
	}

	const cardsQuery = `
		SELECT c.id, c.created_at, c.question, c.answer, c.description
		FROM deck_cards AS dc
		JOIN cards AS c ON c.id = dc.card_id
		WHERE dc.decj_id = $1
		ORDER BY c.created_at DESC, c.id DESC
	`
	rows, err := r.db.QueryContext(ctx, cardsQuery, deckID)
	if err != nil {
		return DeckWithCards{}, fmt.Errorf("get cards of deck: $w", err)
	}
	defer rows.Close()

	for rows.Next() {
		var card Card

		if err := rows.Scan(
			&card.ID,
			&card.CreatedAt,
			&card.Question,
			&card.Answer,
			&card.Description,
		); err != nil {
			return DeckWithCards{}, fmt.Errorf("scan cards of deck: $w", err)
		}

		result.Cards = append(result.Cards, card)
	}

	if err := rows.Err(); err != nil {
		return DeckWithCards{}, fmt.Errorf("iterate deck cards: %w", err)
	}

	return result, nil
}
