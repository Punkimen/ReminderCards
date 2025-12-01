import { Btn } from '@/shared/ui/Btns/Btn';
import { useLocation } from 'react-router';
import s from './MainBtn.module.scss';
export const MainBtn = () => {
  const location = useLocation();
  const isReadyButton =
    location.pathname === '/create' || location.pathname === '/update';

  const onClick = () => {
    console.log('work', location);
  };

  return (
    <Btn
      className={s.btn}
      type={isReadyButton ? 'primary' : 'default'}
      onClick={onClick}
    >
      {isReadyButton ? 'Готово' : 'Следующая'}
    </Btn>
  );
};
