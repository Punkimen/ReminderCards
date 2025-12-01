import { Btn } from '@/shared/ui/Btns/Btn';
import { useMemo } from 'react';
import Delete from '@assets/delete.svg?react';
import s from './CardsHandlers.module.scss';

type ActionItem = {
  label: string;
  icon?: React.ReactNode;
  onClick: () => void;
};

export const CardsHandlers = () => {
  const items: ActionItem[] = useMemo(() => {
    return [
      {
        label: 'Удалить',
        onClick: () => {
          console.log('Delete action');
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
