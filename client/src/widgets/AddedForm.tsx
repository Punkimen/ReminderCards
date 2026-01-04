import { useState } from 'react';
import { useBot } from '../shared/hooks/useBot';
import { useCustomMutation } from '../shared/hooks/useCustomMutation';
import { apiHandler } from '../api/base.api';

export const AddedForm = () => {
  const [value, setValue] = useState('');
  const [translate, setTranslate] = useState('');

  const tg = useBot();

  const addCard = async ({
    value,
    translate,
  }: {
    value: string;
    translate: string;
  }) => {
    return apiHandler.post('cards', { userId: USER_ID, value, translate });
  };

  const addCardMutation = useCustomMutation<
    { value: string; translate: string },
    unknown
  >(
    (param) => addCard({ value: param.value, translate: param.translate }),
    'cards',
  );

  const resetForm = () => {
    setValue('');
    setTranslate('');
  };

  return (
    <div>
      <div className="inputs">
        user: {tg.user?.first_name} {tg.user?.last_name} {tg.user?.id}
        <br />
        chat id: {tg.chat?.id}
        <br />
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Enter text in English"
        />
        <input
          type="text"
          value={translate}
          onChange={(e) => setTranslate(e.target.value)}
          placeholder="Переведите текст на русский"
        />
      </div>
      <button
        onClick={() => {
          resetForm();
          addCardMutation.mutate({ value, translate });
        }}
      >
        Add Card
      </button>
    </div>
  );
};
