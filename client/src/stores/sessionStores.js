import React, { createContext, useContext } from 'react';
import useSessionStorage from './useSessionStorage';

const GlobalStateContext = createContext();

export const useGlobalState = () => useContext(GlobalStateContext);

export const GlobalStateProvider = ({ children }) => {
  const [bikeId, setBikeId] = useSessionStorage('bikeId', '');
  const [email, setEmail] = useSessionStorage('email', '');
  const [amount, setAmount] = useSessionStorage('amount', 0);

  const value = {
    bikeId,
    setBikeId,
    email,
    setEmail,
    amount,
    setAmount,
  };

  return (
    <GlobalStateContext.Provider value={value}>
      {children}
    </GlobalStateContext.Provider>
  );
};
