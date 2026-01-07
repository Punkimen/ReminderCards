import type { FC } from 'react';
import type { WebAppUser } from 'telegram-web-app';
import { User } from './ui/User';
import { Btn } from '../../shared/ui/Btns/Btn';
import { useLocation } from 'react-router';
import s from './Header.module.scss';

interface IProps {
  user: WebAppUser;
}

export const Header: FC<IProps> = ({ user }) => {
  const location = useLocation();

  const inMainPage = location.pathname === '/';

  return (
    <header className={s.header}>
      <User user={user} />
      <Btn
        as="Link"
        className={s.btn}
        to={inMainPage ? '/create' : '/'}
        size="medium"
      >
        {inMainPage ? '+ Создать' : 'Назад'}
      </Btn>
    </header>
  );
};
