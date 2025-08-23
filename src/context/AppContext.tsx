"use client";
import React, { createContext, useContext, useState, useEffect } from "react";

type AppContextType = {
  isAdmin: boolean;
  setIsAdmin: (val: boolean) => void;
  isAuthLoading: boolean;
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAdmin, setIsAdminState] = useState(false);
  const [isAuthLoading, setIsAuthLoading] = useState(true);

  // Check JWT cookie on mount
  useEffect(() => {
    async function validateToken() {
      if (typeof document !== "undefined") {
        setIsAuthLoading(true);
        try {
          const res = await fetch("/api/validate-token", {
            method: "POST",
            credentials: "include",
          });
          const result = await res.json();
          setIsAdminState(result.valid === true);
        } catch {
          setIsAdminState(false);
        }
        setIsAuthLoading(false);
      }
    }
    validateToken();
  }, []);

  // Set isAdmin only in React state
  const setIsAdmin = (val: boolean) => {
    setIsAdminState(val);
  };

  return (
    <AppContext.Provider value={{ isAdmin, setIsAdmin, isAuthLoading }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context)
    throw new Error("useAppContext must be used within AppProvider");
  return context;
};
