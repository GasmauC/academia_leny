import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Search, ChevronLeft, ChevronRight, Menu, BookOpen } from 'lucide-react';
import EditorialText from './EditorialText';
import cardsData from '../data/db/lenormand_cards_theory.json';

const DictionaryReader = ({ initialCardId, onClose }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCardId, setSelectedCardId] = useState(initialCardId || 1);
  const [isInnerSidebarOpen, setIsInnerSidebarOpen] = useState(true);
  const contentRef = useRef(null);

  useEffect(() => {
    if (initialCardId) {
      setSelectedCardId(initialCardId);
    }
  }, [initialCardId]);

  const filteredCards = useMemo(() => {
    if (!searchTerm) return cardsData;
    const lower = searchTerm.toLowerCase();
    return cardsData.filter(card => 
      card.nombre.toLowerCase().includes(lower) || 
      card.id.toString() === lower
    );
  }, [searchTerm]);

  const selectedCard = useMemo(() => {
    return cardsData.find(c => c.id === selectedCardId) || cardsData[0];
  }, [selectedCardId]);

  useEffect(() => {
    // Auto-scroll al seleccionar carta
    if (contentRef.current) {
      contentRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [selectedCardId]);

  const handleNextCard = () => {
    if (selectedCardId < 36) {
      setSelectedCardId(prev => prev + 1);
    }
  };

  const handlePrevCard = () => {
    if (selectedCardId > 1) {
      setSelectedCardId(prev => prev - 1);
    }
  };

  return (
    <div className="flex-1 flex flex-col h-full bg-leny-dark overflow-hidden w-full">
      {/* HEADER BÁSICO DEL READER */}
      <div className="sticky top-0 z-20 flex items-center justify-between py-3 px-6 md:px-8 bg-leny-dark border-b border-white/5 shadow-md">
        <div className="flex items-center gap-4">
          <button 
            onClick={onClose}
            className="flex items-center gap-2 p-2 text-gray-400 hover:text-white bg-white/5 hover:bg-white/10 rounded-lg transition-colors border border-white/5"
            title="Volver al Menú"
          >
            <ChevronLeft size={18} strokeWidth={1.5} />
            <span className="hidden sm:inline font-semibold text-sm">Volver al Menú</span>
          </button>
          
          <button 
            onClick={() => setIsInnerSidebarOpen(!isInnerSidebarOpen)}
            className="flex items-center gap-2 px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-leny-accent bg-leny-accent/10 hover:bg-leny-accent/20 rounded-md transition-colors"
            title="Alternar Lista de Cartas"
          >
            <BookOpen size={16} />
            <span className="hidden sm:inline">Índice de Cartas</span>
          </button>
          
          <div className="flex flex-col ml-2">
            <span className="text-[9px] text-leny-accent/60 uppercase tracking-[0.2em] font-bold mb-0.5">
              DICCIONARIO DE SIGNIFICADOS
            </span>
            <span className="text-sm font-sans text-gray-300 truncate max-w-[200px] md:max-w-md hidden sm:block opacity-70">
              Módulo de las 36 Cartas
            </span>
          </div>
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden relative">
        {/* INNER SIDEBAR (LISTA DE CARTAS) */}
        <div 
          className={`
            ${isInnerSidebarOpen ? 'w-full md:w-72 lg:w-80' : 'w-0'} 
            absolute md:relative z-10 flex-shrink-0 h-full bg-[#15171a] border-r border-white/5 shadow-2xl transition-all duration-300 flex flex-col
          `}
        >
          {isInnerSidebarOpen && (
            <>
              {/* Buscador */}
              <div className="p-4 border-b border-white/5 bg-[#121316]">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search size={16} className="text-gray-500" />
                  </div>
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Buscar carta..."
                    className="w-full bg-white/5 border border-white/10 text-white rounded-lg py-2 pl-10 pr-4 focus:outline-none focus:ring-1 focus:ring-leny-accent/50 focus:border-leny-accent/30 transition-all font-sans text-sm"
                  />
                </div>
              </div>

              {/* Lista Scrollable */}
              <div className="flex-1 overflow-y-auto custom-scrollbar p-3 space-y-1">
                {filteredCards.length > 0 ? (
                  filteredCards.map(card => {
                    const isActive = selectedCardId === card.id;
                    return (
                      <button
                        key={card.id}
                        onClick={() => {
                          setSelectedCardId(card.id);
                          if (window.innerWidth < 768) setIsInnerSidebarOpen(false); // Auto-cerrar en móvil
                        }}
                        className={`
                          w-full flex items-center justify-between p-3 rounded-xl transition-all duration-200 text-left group
                          ${isActive 
                            ? 'bg-gradient-to-r from-leny-accent/20 to-leny-accent/5 border border-leny-accent/30 shadow-md' 
                            : 'hover:bg-white/[0.03] border border-transparent hover:border-white/5'}
                        `}
                      >
                        <div className="flex items-center gap-3">
                          <span className={`
                            w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs shadow-inner
                            ${isActive ? 'bg-leny-accent text-leny-dark' : 'bg-black/30 text-gray-500 border border-white/10'}
                          `}>
                            {card.id}
                          </span>
                          <span className={`font-medium tracking-wide ${isActive ? 'text-white' : 'text-gray-400 group-hover:text-gray-200'}`}>
                            {card.nombre}
                          </span>
                        </div>
                      </button>
                    );
                  })
                ) : (
                  <div className="text-center py-8 text-gray-500 font-light text-sm">
                    No se encontraron cartas.
                  </div>
                )}
              </div>
            </>
          )}
        </div>

        {/* CONTENIDO PRINCIPAL DE LA CARTA */}
        <div 
          ref={contentRef}
          className="flex-1 overflow-y-auto custom-scrollbar bg-leny-dark relative w-full"
        >
          {/* Mobile Overlay para cerrar el sidebar */}
          {isInnerSidebarOpen && (
            <div 
              className="md:hidden absolute inset-0 bg-black/60 z-0 backdrop-blur-sm" 
              onClick={() => setIsInnerSidebarOpen(false)}
            />
          )}

          <div className="p-6 md:p-12 lg:p-20 max-w-[800px] mx-auto min-h-full flex flex-col relative z-0">
            {/* Cabecera de la Carta Activa */}
            <div className="mb-16 text-center border-b border-leny-accent/20 pb-8">
              <span className="inline-block px-4 py-1.5 rounded-full border border-leny-accent/30 text-leny-accent text-[11px] font-bold tracking-[0.2em] mb-6 uppercase shadow-[0_0_15px_rgba(205,174,104,0.1)]">
                Carta {selectedCard.id}
              </span>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif text-white font-medium">
                {selectedCard.nombre}
              </h2>
            </div>
            
            {selectedCard.contenido_completo.length === 0 ? (
                <div className="text-center text-gray-500 italic py-10">No hay contenido disponible para esta carta.</div>
            ) : (
                <div className="space-y-8 text-[#e5e7eb] text-lg md:text-xl font-light leading-[1.85] tracking-wide mb-20">
                {selectedCard.contenido_completo.map((paragraph, index) => {
                    const lowerText = paragraph.toLowerCase();
                    
                    // Subtítulos
                    if (paragraph.length < 70 && !paragraph.endsWith('.') && paragraph.toUpperCase() === paragraph) {
                    // Ignorar la propia cabecera extraída en el origen si todavía aparece
                    if (lowerText.startsWith("carta n")) return null;
                    
                    return <h3 key={index} className="text-[22px] md:text-2xl font-title text-leny-accent mt-16 mb-6 font-bold tracking-widest pb-2 border-b border-white/5">{paragraph}</h3>;
                    }

                    // Títulos en comillas (texto extraído del folleto original)
                    if (paragraph.startsWith('“') && paragraph.endsWith('”')) {
                        return (
                            <div key={index} className="my-8 p-6 bg-white/[0.03] border-l-2 border-leny-accent italic rounded-r-lg">
                                <EditorialText text={paragraph} className="text-white opacity-90" />
                            </div>
                        );
                    }

                    // Párrafos normales
                    return (
                        <div key={index} className="text-left mb-10">
                            <EditorialText text={paragraph} />
                        </div>
                    );
                })}
                </div>
            )}

            {/* CONTROLES DE NAVEGACIÓN ENTRE CARTAS Y MÓDULOS */}
            <div className="mt-16 pt-8 border-t border-white/10 flex flex-col gap-6">
              
              {/* Navegación Interna (Cartas) */}
              <div className="flex items-center justify-between bg-black/20 p-2 rounded-2xl border border-white/5">
                <button 
                  onClick={handlePrevCard}
                  disabled={selectedCardId === 1}
                  className={`flex items-center gap-2 px-4 py-3 rounded-xl font-semibold transition-all
                    ${selectedCardId === 1 ? 'opacity-30 cursor-not-allowed text-gray-500' : 'text-white hover:bg-white/10 hover:text-leny-accent'}`}
                >
                  <ChevronLeft size={18} />
                  <span className="hidden sm:inline">Carta Anterior</span>
                </button>
                <div className="text-gray-500 font-sans text-sm tracking-widest hidden sm:block">
                  {selectedCardId} / 36
                </div>
                <button 
                  onClick={handleNextCard}
                  disabled={selectedCardId === 36}
                  className={`flex items-center gap-2 px-4 py-3 rounded-xl font-semibold transition-all
                    ${selectedCardId === 36 ? 'opacity-30 cursor-not-allowed text-gray-500' : 'text-white hover:bg-white/10 hover:text-leny-accent'}`}
                >
                  <span className="hidden sm:inline">Siguiente Carta</span>
                  <ChevronRight size={18} />
                </button>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default DictionaryReader;
