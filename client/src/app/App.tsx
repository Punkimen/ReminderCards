import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Enter } from '@pages/Enter';
import { MemoryRouter } from 'react-router';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <MemoryRouter>
        <Enter />
      </MemoryRouter>
    </QueryClientProvider>
  );
}

export default App;
