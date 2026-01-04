import type { ICard } from "@/widgets/Cards/types/index.types";
import { create } from "zustand";

interface IGameStore {
  cards: ICard[];
  currentIndexCard: number;
  setCards: (cards: ICard[]) => void;
  setCurrentIndexCard: (value?: number) => void;
  getCurrentCard?: () => ICard | null;
  getCardById: (id: string) => ICard | null;
}

export const useGameStore = create<IGameStore>((set, get)=> ({
  cards: [],
  currentIndexCard: 0,
  setCards: (cards: ICard[]) => set({ cards }),
  setCurrentIndexCard: (value?: number) => set(state => ({ currentIndexCard: value ?? state.currentIndexCard + 1 })),
  getCurrentCard: () => {
    const { cards, currentIndexCard } = get();
    if (!cards || cards.length === 0) return null;
    return cards[currentIndexCard] ?? null;
  },
  getCardById: (id: string) => {
    const { cards } = get();
    return cards.find(card => card.id === id) ?? null;
  }
}))
