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
	UserID      int64
	Question    string `json:"question"`
	Answer      string `json:"answer"`
	Description string `json:"description"`
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

// UpdateCard Изменить карточку
type UpdateCardBody struct {
	Answer      *string
	Description *string
	Question    *string
}

func (r *CardRepository) UpdateCard(ctx context.Context, id int64, userID int64, body UpdateCardBody) (Card, error) {
	const query = `
		UPDATE cards
		SET
			answer = COALESCE($1, answer),
			question = COALESCE($2, question),
			description = COALESCE($3, description)
		WHERE id = $4 AND user_id = $5
		RETURNING id, created_at, answer, question, description
	`

	var card Card

	err := r.db.QueryRowContext(ctx, query, body.Answer, body.Question, body.Description, id, userID).Scan(
		&card.ID,
		&card.Answer,
		&card.Question,
		&card.Description,
		&card.UserID,
	)
	if err != nil {
		return Card{}, fmt.Errorf("Error to update card: %w", err)
	}
	return card, nil
}

// RemoveCard Удаляет карточку
func (r *CardRepository) RemoveCard(ctx context.Context, id int64, userID int64) error {
	const query = `DELETE FROM cards WHERE id = $1 AND user_id = $2;`

	_, err := r.db.ExecContext(ctx, query, id, userID)
	if err != nil {
		return fmt.Errorf("RemoveCard: %w", err)
	}

	return nil
}
