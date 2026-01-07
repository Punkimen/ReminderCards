import { Route, Routes } from 'react-router';
import { useBot } from '../shared/hooks/useBot';
import { Header } from '../widgets/Header/Header';
import { CardCreate, CardEdit } from '@/widgets/Cards/ui/Card';
import { MainBtn } from '@/widgets/Handlers/MainBtn';
import { CardsHandlers } from '@/widgets/Handlers/CardsHandlers/CardsHandlers';
import { Game } from '@/widgets/Game/Game';
import s from './Enter.module.scss';

export const Enter = () => {
  const bot = useBot();

  return (
    <div className={s.app}>
      <Header user={bot.user} />
      <div className={s.body}>
        <Routes>
          <Route path="/" element={<Game />} />
          <Route path="/create" element={<CardCreate />} />
          <Route path="/update/*" element={<CardEdit />} />
        </Routes>
        <CardsHandlers />
        <MainBtn />
      </div>
    </div>
  );
};
