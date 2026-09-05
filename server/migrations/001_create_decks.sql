BEGIN;

CREATE TABLE decks (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    title TEXT NOT NULL,
    description TEXT NOT NULL DEFAULT ''
);

-- Карточка может входить в несколько колод, включая «Избранное».
-- Каскадное удаление очищает связи; удаление колоды сохраняет её карточки.
CREATE TABLE deck_cards (
    deck_id BIGINT NOT NULL REFERENCES decks(id) ON DELETE CASCADE,
    card_id BIGINT NOT NULL REFERENCES cards(id) ON DELETE CASCADE,
    PRIMARY KEY (deck_id, card_id)
);

-- Первичный ключ обеспечивает поиск по deck_id. Этот индекс нужен
-- для обратного поиска колод карточки и очистки связей при её удалении.
CREATE INDEX deck_cards_card_id_idx ON deck_cards(card_id);

COMMIT;
