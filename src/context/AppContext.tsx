"use client"
import React, { createContext, useContext, useState } from "react";

type AppContextType = {
  isAdmin: boolean;
  setIsAdmin: (val: boolean) => void;
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAdmin, setIsAdminState] = useState(() => {
    if (typeof window !== "undefined") {
      return sessionStorage.getItem("isAdmin") === "true";
    }
    return false;
  });

  // Sync isAdmin to sessionStorage
  const setIsAdmin = (val: boolean) => {
    setIsAdminState(val);
    if (typeof window !== "undefined") {
      if (val) {
        sessionStorage.setItem("isAdmin", "true");
      } else {
        sessionStorage.removeItem("isAdmin");
      }
    }
  };

  return (
    <AppContext.Provider value={{ isAdmin, setIsAdmin }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error("useAppContext must be used within AppProvider");
  return context;
};