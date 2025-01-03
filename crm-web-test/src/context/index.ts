import { createContext } from "react";

export type ContextType = {
  page: number;
  setPage: any; 
};

export const Context = createContext<ContextType | null>(null);