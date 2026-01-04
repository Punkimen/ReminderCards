import { Input } from '@/shared/ui/Inputs/Input';
import { useCardStore } from '@/app/store/useCardStore';
import { useGameStore } from '@/app/store/useGamseStore';
import { useEffect } from 'react';
import { useCardId } from '@/shared/hooks/useCardId';
import s from './Card.module.scss';

export const CardForm = () => {
  const { translate, value, setState } = useCardStore();
  const { getCardById } = useGameStore();
  const cardId = useCardId();

  useEffect(() => {
    if (!cardId) return;
    const card = getCardById(cardId);
    if (!card) return;
    setState({ value: card.value, translate: card.translate });
  }, [cardId]);

  return (
    <form className={s.form}>
      <Input
        name="value"
        value={value || ''}
        onChange={(e) => {
          setState({ value: e.target.value });
        }}
        placeholder="Значение"
      />
      <Input
        name="translate"
        value={translate || ''}
        onChange={(e) => {
          setState({ translate: e.target.value });
        }}
        placeholder="Определение"
      />
    </form>
  );
};
