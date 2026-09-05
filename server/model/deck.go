package model

import "time"

type Deck struct {
	ID          int64
	CreatedAt   time.Time
	Title       string
	Description string
	// CardIDs предназначен для ID карточек, загружаемых из связей в deck_cards.
	// В таблице decks отдельного столбца с массивом ID нет.
	CardIDs []int64
}
