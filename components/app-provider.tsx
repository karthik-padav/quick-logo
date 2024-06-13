"use client";

import * as React from "react";
import { createContext, useContext, useState } from "react";

type Theme = {
  showLogin: boolean;
  toggleLogin: () => void;
};

const defaultValue: Theme = {
  showLogin: false,
  toggleLogin: () => {},
};

const ThemeContext = createContext<Theme>(defaultValue);

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [showLogin, setShowLogin] = useState(defaultValue.showLogin);

  const toggleLogin = () => {
    setShowLogin((prevShowLogin) => !prevShowLogin);
  };

  return (
    <ThemeContext.Provider value={{ showLogin, toggleLogin }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useAppProvider = () => useContext(ThemeContext);
