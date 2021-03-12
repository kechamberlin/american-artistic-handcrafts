import { createContext } from 'react';

const LocalStateContext = createContext();
const LocalStateProvider = LocalStateContext.Provider;

function CartStateProvider({ children }) {
  // This is our own custom provider where we will store data (state) and functionality (updaters) and anyone can access it via consumer
  const cartOpen = true;

  return (
    <LocalStateProvider value={{ cartOpen }}>{children}</LocalStateProvider>
  );
}

// Make a custom hook for accessing the cart local state
export { CartStateProvider };
