import { useState, type FC } from 'react';
import { CardForm } from './CardForm';
import { Btn } from '@/shared/ui/Btns/Btn';
import Pencil from '@/assets/edit.svg';
import type { ICard } from '../types/index.types';
import s from './Card.module.scss';
import { CardsHandle } from './CardHandle';

interface ICardProps {
  frontContent: React.ReactNode;
  backContent?: React.ReactNode;
  isCanEdit?: boolean;
  card?: ICard;
}

export const Card: FC<ICardProps> = (props) => {
  const [flipped, setFlipped] = useState(false);

  const onCardClick = () => {
    if (props.backContent) {
      setFlipped((prev) => !prev);
    }
  };

  return (
    <div className={s.card} onClick={onCardClick}>
      {props.isCanEdit ? (
        <Btn
          onClick={() => {
            console.log('work');
          }}
        >
          <Pencil />
        </Btn>
      ) : null}
      <div className={`${s.card__inner} ${flipped && s.flipped}`}>
        <div className={s.front}>
          {props.frontContent}{' '}
          {props.card ? <CardsHandle card={props.card} /> : null}
        </div>
        {props.backContent ? (
          <div className={s.back}>
            {props.backContent}{' '}
            {props.card ? <CardsHandle card={props.card} /> : null}
          </div>
        ) : null}
      </div>
    </div>
  );
};

interface ICardViewProps extends ICardProps {
  translate: string;
  value: string;
}

export const CardView = (props: ICardViewProps) => {
  return (
    <Card
      {...props}
      frontContent={<div className={s.value}>{props.value}</div>}
      backContent={<div className={s.translate}>{props.translate}</div>}
    />
  );
};

export const CardCreate = () => {
  return <Card frontContent={<CardForm />} />;
};

export const CardEdit = () => {
  return <Card frontContent={<CardForm />} />;
};
