import { useState, type FC } from 'react';
import s from './Card.module.css';
import type { ICard } from '../types/Card.types';
export const Card: FC<Omit<ICard, 'id' | 'priority'>> = (props) => {
  const [flipped, setFlipped] = useState(false);

  const onCardClick = () => {
    setFlipped((prev) => !prev);
  };
  return (
    <div className={s.card} onClick={onCardClick}>
      <div className={`${s.card__inner} ${flipped && s.flipped}`}>
        <div className={s.front}>{props.value}</div>
        <div className={s.back}>{props.translate}</div>
      </div>
    </div>
  );
};
