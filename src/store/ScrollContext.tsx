import React, { createContext, useContext } from 'react';
import { useScroll, ScrollMotionValues } from 'motion/react';

const ScrollContext = createContext<ScrollMotionValues | null>(null);

export const ScrollProvider = ({ children }: { children: React.ReactNode }) => {
  const scrollValues = useScroll();
  return <ScrollContext.Provider value={scrollValues}>{children}</ScrollContext.Provider>;
};

export const useMasterScroll = () => {
  const context = useContext(ScrollContext);
  if (!context) throw new Error("useMasterScroll must be used within ScrollProvider");
  return context;
};
