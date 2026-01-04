import { Btn } from '@/shared/ui/Btns/Btn';
import { useMemo } from 'react';
import Delete from '@assets/delete.svg?react';
import s from './CardsHandlers.module.scss';
import { apiHandler } from '@/api/base.api';
import { useCustomMutation } from '@/shared/hooks/useCustomMutation';
import { useGameStore } from '@/app/store/useGamseStore';

type ActionItem = {
  label: string;
  icon?: React.ReactNode;
  onClick: () => void;
};

export const CardsHandlers = () => {
  const { getCurrentCard, currentIndexCard, setCurrentIndexCard } =
    useGameStore();

  const deleteCard = (cardId: string | undefined) => {
    return apiHandler.delete(`cards/${cardId}`).then(() => {
      setCurrentIndexCard(currentIndexCard > 0 ? currentIndexCard - 1 : 0);
    });
  };

  const deleteCardMutation = useCustomMutation(deleteCard, 'cards');

  const items: ActionItem[] = useMemo(() => {
    return [
      {
        label: 'Удалить',
        onClick: () => {
          console.log('Delete action');
          deleteCardMutation.mutate(getCurrentCard?.()?.id);
        },
        icon: <Delete width={16} height={16} />,
      },
    ];
  }, []);

  return (
    <div className={s.wrap}>
      {items.map((item, index) => {
        return (
          <Btn
            key={index}
            onClick={item.onClick}
            className={s.btn}
            isReset
            size="small"
          >
            {item.icon && (
              <span style={{ marginRight: '4px' }}>{item.icon}</span>
            )}
            {item.label}
          </Btn>
        );
      })}
    </div>
  );
};
