import { Input } from '@/shared/ui/Inputs/Input';
import s from './Card.module.scss';

export const CardForm = () => {
  return (
    <form className={s.form}>
      <Input name="value" placeholder="Значение" />
      <Input name="translate" placeholder="Определение" />
    </form>
  );
};
