package model

import (
	"time"
)

type Desc struct {
	ID          int64
	CreatedAt   time.Time
	Title       string
	Description string
	CardIDs     []int64
}
