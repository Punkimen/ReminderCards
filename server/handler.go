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

// CreateCard создает новую карту
func (h *Handler) CreateCard(w http.ResponseWriter, r *http.Request) {
	var body struct {
		Question    string
		Answer      string
		Description string
	}
	err := json.NewDecoder(r.Body).Decode(&body)
	if err != nil {
		http.Error(w, "JSON in inccorect", http.StatusBadRequest)
		return
	}

	if body.Answer == "" || body.Question == "" {
		http.Error(w, "answer and question is required", http.StatusBadRequest)
		return
	}

	card, err := h.cards.CreateCard(r.Context(), model.Card{Answer: body.Answer, Question: body.Question, Description: body.Description})
	if err != nil {
		http.Error(w, "card is not created", http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusCreated)

	if err := json.NewEncoder(w).Encode(card); err != nil {
		log.Printf("encode card: %v", err)
	}
}

// UpdateCard обновить карточку
func (h *Handler) UpdateCard(w http.ResponseWriter, r *http.Request) {
	var body struct {
		Question    string
		Answer      string
		Description string
	}

	err := json.NewDecoder(r.Body).Decode(&body)
	if err != nil {
		http.Error(w, "JSON is inccorect", http.StatusBadRequest)
	}

	newCard, err := h.cards.UpdateCard(r.Context())
}

// GetAllDecks получить все колоды
func (h *Handler) GetAllDecks(w http.ResponseWriter, r *http.Request) {
	decks, err := h.decks.GetAllDecks(r.Context())
	if err != nil {
		log.Printf("Failed to get decks: %v", err)
	}

	w.Header().Set("Content-Type", "application/json")

	if err := json.NewEncoder(w).Encode(decks); err != nil {
		log.Printf("encode decks: %v", err)
	}
}

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
