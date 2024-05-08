/* eslint-disable react/prop-types */
import { createContext, useContext, useState } from 'react';

const HomeContext = createContext();

export const useHome = () => {
  return useContext(HomeContext);
};

export const HomeProvider = ({ children }) => {
    const [isHome, setIsHome] = useState(false);

  return (
    <HomeContext.Provider value={{ isHome, setIsHome }}>
      {children}
    </HomeContext.Provider>
  );
};