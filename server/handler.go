package main

import (
	"encoding/json"
	"log"
	"net/http"

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

func (h *Handler) GetDeckById(w http.ResponseWriter, r *http.Request) {
}
