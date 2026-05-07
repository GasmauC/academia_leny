import React from 'react';

export default function PokerSuitIcon({ suit, nameFallback = "", className = "" }) {
  // Función para determinar cuál es el palo basado en el string que llega
  const getSuitType = (s1, s2) => {
    const checkStr = (str) => {
      if (!str) return null;
      str = str.toLowerCase();
      if (str.includes('♥') || str.includes('corazon') || str.includes('corazones') || str.includes('heart')) return 'heart';
      if (str.includes('♦') || str.includes('diamante') || str.includes('diamantes') || str.includes('diamond')) return 'diamond';
      if (str.includes('♣') || str.includes('trebol') || str.includes('trébol') || str.includes('tréboles') || str.includes('club')) return 'club';
      if (str.includes('♠') || str.includes('pica') || str.includes('picas') || str.includes('spade')) return 'spade';
      return null;
    };
    return checkStr(s1) || checkStr(s2);
  };

  const suitType = getSuitType(suit, nameFallback);

  if (!suitType) return null;

  // Paths SVG consistentes, proporcionales y sin dependencias
  const paths = {
    heart: "M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z",
    diamond: "M12 2L4 12l8 10 8-10L12 2z",
    club: "M12 2c-1.7 0-3 1.3-3 3 0 1.2.7 2.3 1.8 2.8-.3 0-.5.1-.8.1-2.2 0-4 1.8-4 4s1.8 4 4 4c1 0 1.9-.4 2.5-1v4H10v1h4v-1h-1.5v-4c.6.6 1.5 1 2.5 1 2.2 0 4-1.8 4-4s-1.8-4-4-4c-.3 0-.5-.1-.8-.1 1.1-.5 1.8-1.6 1.8-2.8 0-1.7-1.3-3-3-3z",
    spade: "M12 2C8 6.5 4 11 4 15c0 2.2 1.8 4 4 4 1.5 0 2.8-.8 3.5-2v4h-2v1h7v-1h-2v-4c.7 1.2 2 2 3.5 2 2.2 0 4-1.8 4-4 0-4-4-8.5-8-13z"
  };

  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 24 24" 
      fill="currentColor" 
      className={className}
      aria-hidden="true"
    >
      <path d={paths[suitType]} />
    </svg>
  );
}
