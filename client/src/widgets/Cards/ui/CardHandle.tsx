import { apiHandler } from '../../../api/base.api';
import { useCustomMutation } from '../../../shared/hooks/useCustomMutation';
import type { ICard } from '../types/index.types';
import Unlike from '@assets/unlike.svg?react';
import Like from '@assets/like.svg?react';
import { Btn } from '@/shared/ui/Btns/Btn';
import s from './Card.module.scss';

export const CardsHandle = ({ card }: { card: ICard }) => {
  const changePriority = async (increment: 'low' | 'high') => {
    let newPriority: ICard['priority'] = 'MEDIUM';

    if (increment === 'low') {
      if (card.priority === 'HIGH') newPriority = 'MEDIUM';
      if (card.priority === 'MEDIUM') newPriority = 'LOW';
      if (card.priority === 'LOW') newPriority = 'LOW';
    }

    if (increment === 'high') {
      if (card.priority === 'HIGH') newPriority = 'HIGH';
      if (card.priority === 'MEDIUM') newPriority = 'HIGH';
      if (card.priority === 'LOW') newPriority = 'MEDIUM';
    }

    return apiHandler.patch(`cards/${card.id}`, {
      priority: newPriority,
    });
  };

  const changePriorityMutation = useCustomMutation<'low' | 'high', unknown>(
    (increment) => changePriority(increment as 'low' | 'high'),
    'cards',
  );

  return (
    <div className={s.cardHandle}>
      {card.priority !== 'LOW' && (
        <Btn
          variant="secondary"
          onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
            e.stopPropagation();
            changePriorityMutation.mutate('low');
          }}
        >
          <Unlike />
        </Btn>
      )}

      {card.priority !== 'HIGH' && (
        <Btn
          variant="secondary"
          onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
            e.stopPropagation();
            changePriorityMutation.mutate('high');
          }}
        >
          <Like />
        </Btn>
      )}
    </div>
  );
};
