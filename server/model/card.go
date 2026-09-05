// Пакет model содержит модели и репозитории для PostgreSQL.
package model

import (
	"context"
	"database/sql"
	"fmt"
	"time"
)

type Card struct {
	ID          int64     `json:"id"`
	CreatedAt   time.Time `json:"createdAt"`
	Question    string    `json:"question"`
	Answer      string    `json:"answer"`
	Description string    `json:"description"`
}

type CardRepository struct {
	db *sql.DB
}

func NewCardRepository(db *sql.DB) *CardRepository {
	return &CardRepository{db: db}
}

// CreateCard сохраняет карточку и возвращает её с ID и временем создания,
// сформированными PostgreSQL.
func (r *CardRepository) CreateCard(ctx context.Context, card Card) (Card, error) {
	const query = `
		INSERT INTO cards (question, answer, description)
		VALUES ($1, $2, $3)
		RETURNING id, created_at, question, answer, description
	`

	err := r.db.QueryRowContext(
		ctx,
		query,
		card.Question,
		card.Answer,
		card.Description,
	).Scan(
		&card.ID,
		&card.CreatedAt,
		&card.Question,
		&card.Answer,
		&card.Description,
	)
	if err != nil {
		return Card{}, fmt.Errorf("create card: %w", err)
	}

	return card, nil
}

// GetAllCards возвращает все карточки, начиная с самых новых.
func (r *CardRepository) GetAllCards(ctx context.Context) ([]Card, error) {
	const query = `
		SELECT id, created_at, question, answer, description
		FROM cards
		ORDER BY created_at DESC, id DESC
	`

	rows, err := r.db.QueryContext(ctx, query)
	if err != nil {
		return nil, fmt.Errorf("get all cards: %w", err)
	}
	defer rows.Close()

	cards := make([]Card, 0)
	for rows.Next() {
		var card Card
		if err := rows.Scan(
			&card.ID,
			&card.CreatedAt,
			&card.Question,
			&card.Answer,
			&card.Description,
		); err != nil {
			return nil, fmt.Errorf("scan card: %w", err)
		}

		cards = append(cards, card)
	}

	if err := rows.Err(); err != nil {
		return nil, fmt.Errorf("iterate cards: %w", err)
	}

	return cards, nil
}
