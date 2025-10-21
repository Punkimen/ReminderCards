import { useState, type FC } from 'react';
import { Card } from './Card';
import { CardsHandle } from './CardHandle';
import type { ICard } from '../types/Card.types';
import { useQuery } from '@tanstack/react-query';
import { apiHandler } from '../api/base.api';

const USER_ID = '170420530';

interface IGameProps {
  start: boolean;
  onChangeStart: (isStart: boolean) => void;
}

export const Game: FC<IGameProps> = ({ onChangeStart, start }) => {
  const query = useQuery<ICard[]>({
    queryKey: ['cards'],
    queryFn: async () => {
      const response = await apiHandler.get(`cards?userId=${USER_ID}`);
      return await response.json();
    },
  }); 
  const [currentIndexCard, setCurrentIndexCard] = useState<number | null>(null);

  const onStartClick = async () => {
    if (start || !query.data || query.data.length === 0) {
      return;
    }

    setCurrentIndexCard(0);
    onChangeStart(true);
  };

  const cards = query.data;

  console.log({ cards });

  const onNextClick = () => {
    if (currentIndexCard === null || !cards) return;
    if (currentIndexCard >= Object.keys(cards).length - 1) {
      setCurrentIndexCard(0);
      return;
    }

    setCurrentIndexCard((prev) => (prev !== null ? prev + 1 : 0));
  };

  const onEndClick = () => {
    onChangeStart(false);
    setCurrentIndexCard(null);
  };

  const currentCard =
    currentIndexCard !== null && cards?.length ? cards[currentIndexCard] : null;

  return (
    <div>
      {currentCard && (
        <Card value={currentCard.value} translate={currentCard.translate} />
      )}
      <button onClick={start ? onNextClick : onStartClick}>
        {start ? 'Следующая карта' : 'Начать игру'}
      </button>
      {currentCard && <CardsHandle card={currentCard} />}
      <button onClick={onEndClick}>Закончить</button>
    </div>
  );
};
