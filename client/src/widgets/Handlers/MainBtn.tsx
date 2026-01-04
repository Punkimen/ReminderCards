import { Btn } from '@/shared/ui/Btns/Btn';
import { useLocation } from 'react-router';
import { useGameStore } from '@/app/store/useGamseStore';
import { apiHandler } from '@/api/base.api';
import { useCustomMutation } from '@/shared/hooks/useCustomMutation';
import { useCardStore } from '@/app/store/useCardStore';
import s from './MainBtn.module.scss';
import type { ICard } from '../Cards/types/index.types';

const USER_ID = 170420530;
type TCreateCard = Omit<ICard, 'id'> & { userId: number };
export const MainBtn = () => {
  const location = useLocation();
  const isReadyButton =
    location.pathname === '/create' || location.pathname === '/update';

  const { setCurrentIndexCard, currentIndexCard, cards } = useGameStore();
  const { value, translate } = useCardStore();

  const onNextClick = () => {
    if (currentIndexCard === null || !cards) return;

    if (currentIndexCard >= cards.length - 1) {
      setCurrentIndexCard(0);
      return;
    }

    setCurrentIndexCard();
  };

  const addCard = async (body: TCreateCard) => {
    return apiHandler.post('cards', body);
  };

  const addCardMutation = useCustomMutation<TCreateCard, unknown>(
    (param) =>
      addCard({
        value: param.value,
        translate: param.translate,
        userId: param.userId,
        priority: 'MEDIUM',
      }),
    'cards',
  );

  return (
    <Btn
      className={s.btn}
      type={isReadyButton ? 'primary' : 'default'}
      onClick={
        isReadyButton
          ? () => {
              addCardMutation.mutate({
                value: value || '',
                translate: translate || '',
                userId: USER_ID,
                priority: 'MEDIUM',
              });
            }
          : onNextClick
      }
    >
      {isReadyButton ? 'Готово' : 'Следующая'}
    </Btn>
  );
};
