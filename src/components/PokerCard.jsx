import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { usePokerInteraction } from '../context/PokerContext';
import pokerCardsTheory from '../data/db/poker_cards_theory.json';
import PokerSuitIcon from './PokerSuitIcon';

export default function PokerCard({ 
  value, 
  suit, 
  meaning,
  nameFallback,
  size = "md", // sm, md, lg, fluid
  className = "" 
}) {
  const { showMeanings, openCardProfile } = usePokerInteraction();
  const [isHovered, setIsHovered] = useState(false);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });
  const cardRef = useRef(null);

  // Detectar si el palo corresponde a un color rojo (usando suit o nameFallback)
  const isRedSuit = (s) => s === '♥' || s === '♦' || s === '♥️' || s === '♦️';
  const isRedName = (n) => {
    if (!n) return false;
    const l = n.toLowerCase();
    return l.includes('♥') || l.includes('♦') || l.includes('corazon') || l.includes('corazones') || l.includes('diamante') || l.includes('diamantes');
  };
  const isRed = isRedSuit(suit) || isRedName(nameFallback) || isRedName(meaning);
  
  // Asignación de colores basada en el palo
  const textColor = isRed ? 'text-red-500' : 'text-gray-100';
  const borderColor = isRed ? 'border-red-900/30' : 'border-white/10';
  const shadowGlow = isRed ? 'shadow-[0_4px_15px_rgba(239,68,68,0.15)]' : 'shadow-[0_4px_15px_rgba(255,255,255,0.05)]';

  // Se elimina la conversión getSuitSymbol porque ahora usamos SVG (PokerSuitIcon)
  const safeSuit = suit;

  // Sizing definitions
  const sizeClasses = {
    sm: "w-20 h-28 sm:w-24 sm:h-36 rounded-lg",
    md: "w-28 h-40 sm:w-32 sm:h-44 rounded-xl",
    lg: "w-64 h-96 sm:w-80 sm:h-[450px] rounded-[2rem]",
    fluid: "w-full h-full rounded-2xl aspect-[2.5/3.5]"
  };

  const textClasses = {
    sm: { cornerValue: "text-xs", cornerSuit: "w-2.5 h-2.5 mt-0.5", center: "w-8 h-8", padding: "p-1.5" },
    md: { cornerValue: "text-sm", cornerSuit: "w-3 h-3 mt-0.5", center: "w-10 h-10 sm:w-12 sm:h-12", padding: "p-2" },
    lg: { cornerValue: "text-2xl", cornerSuit: "w-6 h-6 mt-1", center: "w-32 h-32 sm:w-40 sm:h-40", padding: "p-6" },
    fluid: { cornerValue: "text-sm md:text-lg", cornerSuit: "w-3 h-3 md:w-5 md:h-5 mt-1", center: "w-10 h-10 md:w-16 md:h-16 lg:w-20 lg:h-20", padding: "p-3" },
  };

  const currentSize = sizeClasses[size] || sizeClasses.md;
  const currentText = textClasses[size] || textClasses.md;

  const handleMouseEnter = (e) => {
    setIsHovered(true);
  };

  const handleMouseMove = (e) => {
    if (isHovered) {
      // Offset the tooltip slightly from the cursor
      setTooltipPos({ x: e.clientX + 15, y: e.clientY + 15 });
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleClick = () => {
    // Determine card ID from name or build it to pass to profile.
    // In poker_cards_theory, we can match by name.
    const theory = pokerCardsTheory.poker_cards_theory.find(c => c.nombre === meaning || c.name === meaning);
    if (theory && openCardProfile) {
      openCardProfile(theory.id);
    }
  };

  const theoryData = isHovered ? pokerCardsTheory.poker_cards_theory.find(c => c.nombre === meaning || c.name === meaning) : null;

  return (
    <>
    <div 
      ref={cardRef}
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      className={`relative ${currentSize} bg-gradient-to-br from-[#1a1a24] to-[#0a0a0f] 
      border ${borderColor} ${shadowGlow}
      flex flex-col items-center justify-center 
      transition-all duration-300 hover:scale-[1.05] hover:-translate-y-2 hover:shadow-[0_0_30px_rgba(239,68,68,0.2)] cursor-pointer
      overflow-hidden select-none shrink-0 ${className}`}
    >
      {/* Reflejo/Brillo sutil para efecto de carta premium */}
      <div className="absolute top-0 inset-x-0 h-1/2 bg-gradient-to-b from-white/5 to-transparent pointer-events-none rounded-t-xl"></div>

      {/* Esquina superior izquierda */}
      <div className={`absolute top-2 left-2 flex flex-col items-center leading-none ${textColor} ${currentText.padding}`}>
        <span className={`font-bold tracking-tighter ${currentText.cornerValue}`}>{value}</span>
        <PokerSuitIcon suit={suit} nameFallback={nameFallback || meaning} className={currentText.cornerSuit} />
      </div>

      {/* Símbolo central */}
      <div className={`${textColor} drop-shadow-md opacity-90 transition-all duration-500 flex items-center justify-center`}>
        <PokerSuitIcon suit={suit} nameFallback={nameFallback || meaning} className={currentText.center} />
      </div>

      {/* Esquina inferior derecha (invertida) */}
      <div className={`absolute bottom-2 right-2 flex flex-col items-center leading-none ${textColor} ${currentText.padding} rotate-180`}>
        <span className={`font-bold tracking-tighter ${currentText.cornerValue}`}>{value}</span>
        <PokerSuitIcon suit={suit} nameFallback={nameFallback || meaning} className={currentText.cornerSuit} />
      </div>

      {/* Panel semántico (Significado opcional - Controlado por Toggle) */}
      {(showMeanings && meaning) && (
        <div className="absolute bottom-0 inset-x-0 bg-black/80 backdrop-blur-md p-2 border-t border-white/10 z-20">
          <p className="text-[9px] sm:text-[10px] text-center text-gray-300 uppercase tracking-widest font-semibold leading-tight line-clamp-2">
            {meaning}
          </p>
        </div>
      )}
    </div>

    {/* Tooltip Portal */}
    {isHovered && theoryData && createPortal(
      <div 
        className="fixed z-[9999] pointer-events-none fade-in"
        style={{ top: tooltipPos.y, left: tooltipPos.x }}
      >
        <div className="bg-[#111115]/95 backdrop-blur-xl border border-red-500/20 p-4 rounded-xl shadow-[0_10px_40px_rgba(0,0,0,0.8)] w-64">
          <div className="flex items-center gap-2 mb-2 border-b border-white/10 pb-2">
            <PokerSuitIcon suit={suit} nameFallback={nameFallback || meaning} className={`w-5 h-5 ${textColor}`} />
            <span className="font-serif font-bold text-white tracking-wide">{theoryData.nombre}</span>
          </div>
          <div className="space-y-2">
            <div>
              <span className="text-[9px] uppercase tracking-widest text-red-500/70 font-bold">Polaridad</span>
              <p className="text-sm text-gray-300">{theoryData.polaridad}</p>
            </div>
            <div>
              <span className="text-[9px] uppercase tracking-widest text-red-500/70 font-bold">Concepto</span>
              <p className="text-sm text-gray-300">{theoryData.funcion}</p>
            </div>
          </div>
        </div>
      </div>,
      document.body
    )}
    </>
  );
}
