import { apiHandler } from '../../../api/base.api';
import { useCustomMutation } from '../../../shared/hooks/useCustomMutation';
import type { ICard } from '../types/index.types';
import Unlike from '@assets/unlike.svg?react';
import Like from '@assets/like.svg?react';
import s from './Card.module.scss';
import { Btn } from '@/shared/ui/Btns/Btn';

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
          onClick={() => {
            changePriorityMutation.mutate('low');
          }}
        >
           <Unlike /> 
        </Btn> 
      )}
 
      {card.priority !== 'HIGH' && (
        <Btn
          onClick={() => {
            changePriorityMutation.mutate('high');
          }}
        >
          <Like />
        </Btn>
      )}
    </div>
  );
};
