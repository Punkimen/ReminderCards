package main

import (
	"database/sql"
	"encoding/json"
	"errors"
	"log"
	"net/http"
	"strconv"

	"remindercards/model"
)

type Handler struct {
	cards *model.CardRepository
	decks *model.DeckRepository
}

func NewHandler(
	cards *model.CardRepository,
	decks *model.DeckRepository,
) *Handler {
	return &Handler{
		cards: cards,
		decks: decks,
	}
}

// GetAllCards получить все карточки
func (h *Handler) GetAllCards(w http.ResponseWriter, r *http.Request) {
	cards, err := h.cards.GetAllCards(r.Context())
	if err != nil {
		log.Printf("get cards: %v", err)
		http.Error(w, "Не удалось получить карты", http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")

	if err := json.NewEncoder(w).Encode(cards); err != nil {
		log.Printf("encode cards: %v", err)
	}
}

func (h *Handler) GetAllDecks(w http.ResponseWriter, r *http.Request) {}

// GetDeckById получить колоду, со всем карточками внутри
func (h *Handler) GetDeckById(w http.ResponseWriter, r *http.Request) {
	id, err := strconv.ParseInt(r.PathValue("id"), 10, 64)
	if err != nil {
		log.Printf("get id from url: %v", err)
	}

	result, err := h.decks.GetDeckWithCardsById(r.Context(), id)
	if errors.Is(err, sql.ErrNoRows) {
		http.Error(w, "Deck is not found", http.StatusNotFound)
	}
	if err != nil {
		log.Printf("get deck by id: %v", err)
	}

	w.Header().Set("Content-Type", "application/json")
	if err := json.NewEncoder(w).Encode(result); err != nil {
		log.Printf("encode deck by id: %v", err)
	}
}
