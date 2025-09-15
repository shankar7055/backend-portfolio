"use client";

import React, { createContext, useContext, useState, ReactNode } from 'react';

interface DragHintContextType {
  showDragHint: boolean;
  setShowDragHint: (show: boolean) => void;
}

const DragHintContext = createContext<DragHintContextType | undefined>(undefined);

export function DragHintProvider({ children }: { children: ReactNode }) {
  const [showDragHint, setShowDragHint] = useState(true);

  return (
    <DragHintContext.Provider value={{ showDragHint, setShowDragHint }}>
      {children}
    </DragHintContext.Provider>
  );
}

export function useDragHint() {
  const context = useContext(DragHintContext);
  if (context === undefined) {
    throw new Error('useDragHint must be used within a DragHintProvider');
  }
  return context;
}