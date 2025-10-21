import { apiHandler } from '../api/base.api';
import type { ICard } from '../types/Card.types';
import { useCustomMutation } from '../hooks/useCustomMutation';

export const CardsHandle = ({ card }: { card: ICard }) => {
  
  const deleteCard = async () => {
    return apiHandler.delete(`cards/${card.id}`);
  };

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

  const deleteMutation = useCustomMutation<void, unknown>(() => deleteCard(), 'cards');
  const changePriorityMutation = useCustomMutation<'low' | 'high', unknown>(
    (increment) => changePriority(increment as 'low' | 'high'),
    'cards',
  );

  return (
    <div>
      {card.priority !== 'LOW' && (
        <button
          onClick={() => {
            changePriorityMutation.mutate('low');
          }}
        >
          Показывать реже
        </button>
      )}
      <button
        onClick={() => {
          deleteMutation.mutate();
        }}
      >
        Удалить карту
      </button>
      {card.priority !== 'HIGH' && (
        <button
          onClick={() => {
            changePriorityMutation.mutate('high');
          }}
        >
          Показывать чаще
        </button>
      )}
    </div>
  );
};
