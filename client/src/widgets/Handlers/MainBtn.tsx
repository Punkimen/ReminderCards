import { Btn } from '@/shared/ui/Btns/Btn';
import { useLocation, useNavigate } from 'react-router';
import { useGameStore } from '@/app/store/useGamseStore';
import { apiHandler } from '@/api/base.api';
import { useCustomMutation } from '@/shared/hooks/useCustomMutation';
import { useCardStore } from '@/app/store/useCardStore';
import type { ICard } from '../Cards/types/index.types';
import s from './MainBtn.module.scss';

const USER_ID = 170420530;
type TCreateCard = Omit<ICard, 'id'> & { userId: number };
export const MainBtn = () => {
  const location = useLocation();
  const isReadyButton =
    location.pathname === '/create' || location.pathname === '/update';

  const { setCurrentIndexCard, currentIndexCard, cards } = useGameStore();
  const { value, translate, clearState } = useCardStore();
  const navigator = useNavigate();

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
    () => {
      clearState();
      navigator('/');
    },
  );

  if (cards.length === 0 && !isReadyButton) {
    return (
      <Btn as="Link" to={'/create'} className={s.btn}>
        Создать
      </Btn>
    );
  }

  return (
    <Btn
      className={s.btn}
      variant={isReadyButton ? 'primary' : 'default'}
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
