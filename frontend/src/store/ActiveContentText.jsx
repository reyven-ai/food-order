import { createContext, useContext, useState } from "react";

const ActiveContentContext = createContext();

export function ActiveContentProvider({ children }) {
  const [activeContentIndex, setActiveContentIndex] = useState(0);
  const orderTypes = ["Dine In", "To Go", "Delivery"];

  return (
    <ActiveContentContext.Provider
      value={{ activeContentIndex, setActiveContentIndex, orderTypes }}
    >
      {children}
    </ActiveContentContext.Provider>
  );
}

export function useActiveContent() {
  return useContext(ActiveContentContext);
}
