import { useState } from 'react';
import './App.css';
import { AddedForm } from './components/AddedForm';
import { Game } from './components/Game';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';


const queryClient = new QueryClient();

function App() {
  const [start, setStart] = useState(false);

  const onChangeStart = (isStart: boolean) => {
    setStart(isStart);
  };

  return (
    <QueryClientProvider client={queryClient}>
      {!start && <AddedForm  />}
      <Game start={start} onChangeStart={onChangeStart} />
    </QueryClientProvider>
  );
}

export default App;
