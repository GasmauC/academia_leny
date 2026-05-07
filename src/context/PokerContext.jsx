import React, { createContext, useContext, useState, useEffect } from 'react';

const PokerContext = createContext();

export const usePokerInteraction = () => {
  const context = useContext(PokerContext);
  if (!context) {
    throw new Error('usePokerInteraction debe usarse dentro de un PokerProvider');
  }
  return context;
};

export const PokerProvider = ({ children, onNavigate }) => {
  const [showMeanings, setShowMeanings] = useState(() => {
    const saved = localStorage.getItem('pokerShowMeanings');
    return saved !== null ? JSON.parse(saved) : false;
  });

  useEffect(() => {
    localStorage.setItem('pokerShowMeanings', JSON.stringify(showMeanings));
  }, [showMeanings]);

  const toggleMeanings = () => {
    setShowMeanings(prev => !prev);
  };

  const openCardProfile = (cardId) => {
    if (onNavigate) {
      onNavigate({ viewMode: 'cardProfile', activeCardId: cardId, activeModule: 'poker' });
    }
  };

  return (
    <PokerContext.Provider value={{ showMeanings, toggleMeanings, openCardProfile }}>
      {children}
    </PokerContext.Provider>
  );
};
