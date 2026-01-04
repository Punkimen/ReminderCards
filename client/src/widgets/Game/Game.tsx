import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { apiHandler } from '@/api/base.api';
import type { ICard } from '../Cards/types/index.types';
import { useGameStore } from '@/app/store/useGamseStore';
import { CardView } from '../Cards/ui/Card';

const USER_ID = '170420530';

export const Game = () => {
  const query = useQuery<ICard[]>({
    queryKey: ['cards'],
    queryFn: async () => {
      const response = await apiHandler.get(`cards?userId=${USER_ID}`);
      return await response.json();
    },
  });
  const { cards, setCards, currentIndexCard } = useGameStore();

  useEffect(() => {
    if (!query.data) return;

    setCards(query.data);
  }, [query.data]);

  const currentCard =
    currentIndexCard !== null && cards?.length ? cards[currentIndexCard] : null;

  return (
    <div>
      {currentCard && (
        <CardView
          value={currentCard.value}
          translate={currentCard.translate}
          card={currentCard}
        />
      )}
    </div>
  );
};
