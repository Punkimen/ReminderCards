import { create } from "zustand";

interface ICardStore {
  value: string | null,
  translate: string | null,
  clearState: () => void
  setState: ({value, translate}: {value?: string, translate?: string} ) => void
}

export const useCardStore = create<ICardStore>((set)=> ({
  value: null,
  translate: null,
  clearState: () => {
    set({ value: null, translate: null })
  },
  setState: ({value, translate}) => {
    set(state => ({
      ...state,
      value: value ? value : state.value,
      translate: translate  ? translate : state.translate
    }))
  }
}))




