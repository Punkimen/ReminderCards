import { Link, Route, Routes } from 'react-router';
import { useBot } from '../shared/hooks/useBot';
import { Header } from '../widgets/Header/Header';
import s from './Enter.module.scss';
import { CardCreate, CardView } from '@/widgets/Cards/ui/Card';
import { MainBtn } from '@/widgets/Handlers/MainBtn';
import { CardsHandlers } from '@/features/CardsHandlers/CardsHandlers';

export const Enter = () => {
  const bot = useBot();

  return (
    <div className={s.app}>
      <Header user={bot.user} />
      <div className={s.body}>
        <Routes>
          <Route path="/" element={<CardView value="123" translate="123" />} />
          <Route path="/create" element={<CardCreate />} />
          <Route path="/update" element={<CardCreate />} />
        </Routes>
        <CardsHandlers />
        <MainBtn />
      </div>
    </div>
  );
};
