import React from 'react';
import PokerCard from './PokerCard';
import { usePokerInteraction } from '../context/PokerContext';
import { Eye, EyeOff } from 'lucide-react';

export default function PokerSpread({ layout = 'lineal3', cards = [], showOrderBadge = true }) {
  const { showMeanings, toggleMeanings } = usePokerInteraction();
  
  // Garantizamos trabajar siempre con un array seguro
  const safeCards = Array.isArray(cards) ? cards : [];

  // Función interna para renderizar una carta con su badge de orden numérico
  const renderCard = (cardData, index) => {
    // Si no hay datos, renderizamos un placeholder elegante con borde punteado
    if (!cardData) {
      return (
        <div key={index} className="w-28 h-40 sm:w-32 sm:h-44 border-2 border-white/10 border-dashed rounded-xl flex items-center justify-center bg-white/[0.01]">
           <span className="text-white/20 text-xs font-bold opacity-50">vacio</span>
        </div>
      );
    }
    
    return (
      <div key={index} className="relative flex flex-col items-center group">
        {/* Etiqueta de orden posicional */}
        {showOrderBadge && (
          <div className="absolute -top-3 -left-3 sm:-top-4 sm:-left-4 w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-black border-2 border-[#1a1a24] text-white flex items-center justify-center text-[10px] sm:text-xs font-bold shadow-xl z-20 ring-1 ring-white/10">
            {index + 1}
          </div>
        )}
        
        {/* Contenedor principal de la carta visual */}
        <div className="relative z-10 transition-transform duration-300">
          <PokerCard 
            value={cardData.value} 
            suit={cardData.suit} 
            meaning={cardData.meaning} 
            nameFallback={cardData.name}
          />
        </div>
      </div>
    );
  };

  // Renderizado del botón Toggle de Significados
  const renderToggle = () => (
    <button 
      onClick={toggleMeanings}
      className="absolute top-4 right-4 z-30 flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/60 border border-white/10 hover:border-red-500/50 hover:bg-red-500/10 text-xs font-bold uppercase tracking-widest text-gray-400 hover:text-white transition-all shadow-lg"
    >
      {showMeanings ? <Eye className="w-4 h-4 text-red-400" /> : <EyeOff className="w-4 h-4" />}
      <span className="hidden sm:inline">{showMeanings ? 'Ocultar Significados' : 'Mostrar Significados'}</span>
    </button>
  );

  // ==========================================
  // LAYOUT 3: MATRIZ 3x3 (9 CARTAS)
  // ==========================================
  if (layout === 'matriz9') {
    return (
      <div className="w-full max-w-3xl mx-auto bg-black/40 p-6 sm:p-12 rounded-[2rem] border border-white/5 shadow-2xl relative overflow-hidden">
        {renderToggle()}
        {/* Grid perfecta de 3x3 */}
        <div className="grid grid-cols-3 gap-4 sm:gap-8 justify-items-center relative z-10">
          {Array.from({ length: 9 }).map((_, i) => renderCard(safeCards[i], i))}
        </div>
      </div>
    );
  }

  // ==========================================
  // LAYOUT 2: CRUZ (5 CARTAS)
  // ==========================================
  if (layout === 'cruz5') {
    return (
      <div className="w-full max-w-2xl mx-auto bg-black/20 p-6 sm:p-12 rounded-full border border-white/5 aspect-square flex items-center justify-center shadow-inner relative">
        {renderToggle()}
        {/* Layout de cruz posicional basado en grid 3x3 donde las esquinas quedan vacías */}
        <div className="grid grid-cols-3 grid-rows-3 gap-3 sm:gap-6 relative z-10">
          <div className="col-start-2 row-start-1 flex justify-center items-end">{renderCard(safeCards[1], 1)}</div>
          <div className="col-start-1 row-start-2 flex justify-end items-center">{renderCard(safeCards[3], 3)}</div>
          
          {/* El centro tiene mayor escala para destacar como núcleo */}
          <div className="col-start-2 row-start-2 flex justify-center items-center scale-110 z-20 relative">
            {renderCard(safeCards[0], 0)}
          </div>
          
          <div className="col-start-3 row-start-2 flex justify-start items-center">{renderCard(safeCards[4], 4)}</div>
          <div className="col-start-2 row-start-3 flex justify-center items-start">{renderCard(safeCards[2], 2)}</div>
        </div>
      </div>
    );
  }

  // ==========================================
  // LAYOUT 1: LINEAL (3 CARTAS O DEFECTO)
  // ==========================================
  return (
    <div className="w-full max-w-3xl mx-auto flex justify-center p-6 bg-black/10 rounded-2xl border border-transparent relative pt-14 sm:pt-6">
      {renderToggle()}
      <div className="flex flex-wrap justify-center gap-6 sm:gap-10 mt-2 sm:mt-8">
        {safeCards.length > 0 ? (
          safeCards.map((card, i) => renderCard(card, i))
        ) : (
          /* Placeholders si el array viene completamente vacío */
          Array.from({ length: 3 }).map((_, i) => renderCard(null, i))
        )}
      </div>
    </div>
  );
}
