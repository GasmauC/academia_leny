import React, { useState, useEffect, useRef } from 'react';
import { ChevronRight, ChevronLeft, BookOpen, Layers, Target, Search, ArrowLeft, ZoomIn, Target as TargetIcon, Network } from 'lucide-react';
import { pokerCardsDictionary } from '../data/db/poker_cards';
import PokerCard from './PokerCard';

const suitsData = [
  { id: 'Corazones', name: 'Corazones', emoji: '♥', color: 'text-red-500', bg: 'bg-red-500/10', border: 'border-red-500/30' },
  { id: 'Tréboles', name: 'Tréboles', emoji: '♣', color: 'text-gray-300', bg: 'bg-gray-500/10', border: 'border-gray-500/30' },
  { id: 'Diamantes', name: 'Diamantes', emoji: '♦', color: 'text-red-500', bg: 'bg-red-500/10', border: 'border-red-500/30' },
  { id: 'Picas', name: 'Picas', emoji: '♠', color: 'text-gray-300', bg: 'bg-gray-500/10', border: 'border-gray-500/30' }
];

const PokerVisualAtlas = ({ onNavigate }) => {
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'zoom'
  const [activeCardId, setActiveCardId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const scrollContainerRef = useRef(null);

  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [viewMode, activeCardId]);

  const handleOpenCard = (id) => {
    setActiveCardId(id);
    setViewMode('zoom');
  };

  const handleCloseCard = () => {
    setActiveCardId(null);
    setViewMode('grid');
  };

  const navigateCard = (direction) => {
    const currentIndex = pokerCardsDictionary.findIndex(c => c.id === activeCardId);
    let newIndex = currentIndex + direction;
    if (newIndex < 0) newIndex = pokerCardsDictionary.length - 1;
    if (newIndex >= pokerCardsDictionary.length) newIndex = 0;
    setActiveCardId(pokerCardsDictionary[newIndex].id);
  };

  const activeCard = activeCardId ? pokerCardsDictionary.find(c => c.id === activeCardId) : null;

  const filteredCards = pokerCardsDictionary.filter(card => {
    return card.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
           card.number.toString().toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <div className="flex-1 flex flex-col h-full bg-gradient-to-br from-[#0a0a0c] to-black overflow-hidden fade-in text-white">
      
      {/* HEADER PRINCIPAL */}
      <div className="sticky top-0 z-20 flex items-center justify-between p-6 bg-black/60 backdrop-blur-xl border-b border-red-900/20 shadow-2xl">
        <div className="flex items-center gap-4">
          <Layers className="w-8 h-8 text-red-500" />
          <div className="flex flex-col">
            <span className="text-[10px] text-red-400/80 uppercase tracking-widest font-bold">Laboratorio de Memorización</span>
            <span className="text-xl font-serif text-white hidden sm:block">Catálogo Visual del Mazo</span>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar relative flex justify-center" ref={scrollContainerRef}>
        
        {/* ===================== MODO GRID =====================  */}
        {viewMode === 'grid' && (
          <div className="flex-1 max-w-7xl p-6 md:p-12 pb-32 space-y-10 w-full animate-fade-in mx-auto">
            
            {/* Cabecera del Grid */}
            <div className="max-w-3xl mx-auto mb-16 text-center border-b border-white/5 pb-12">
              <h1 className="text-4xl md:text-6xl font-serif text-white font-bold mb-4 drop-shadow-lg">Atlas Visual de Póker</h1>
              <p className="text-gray-400 text-lg font-light leading-relaxed">
                Estudia las 52 herramientas operativas de forma gráfica. 
                Haz clic en cualquier naipe para ampliarlo visualmente y acceder a sus conexiones teóricas directas.
              </p>
            </div>

            {/* Barra de Búsqueda */}
            <div className="max-w-2xl mx-auto mb-16 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
              <input 
                type="text" 
                className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white focus:outline-none focus:border-red-500/50 focus:ring-1 focus:ring-red-500/50 transition-all font-sans placeholder:font-serif placeholder:italic"
                placeholder="Buscar naipe por número o nombre (ej. As de Corazones)..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Renderizado por Palos */}
            <div className="space-y-24">
              {suitsData.map(suit => {
                const suitCards = filteredCards.filter(c => c.suit === suit.id);
                if (suitCards.length === 0) return null;

                return (
                  <div key={suit.id} className="space-y-8 animate-fade-in">
                    <div className="flex items-center gap-4 border-b border-white/10 pb-4">
                       <div className={`text-4xl ${suit.color} drop-shadow-lg`}>{suit.emoji}</div>
                       <h2 className="text-3xl font-serif">{suit.name}</h2>
                       <div className="h-px bg-gradient-to-r from-white/20 to-transparent flex-1 ml-4"></div>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 md:gap-6">
                      {suitCards.map(card => {
                        const isRed = card.color === 'rojo';
                        return (
                          <button 
                            key={card.id}
                            onClick={() => handleOpenCard(card.id)}
                            className="relative group transition-all duration-300 transform hover:-translate-y-2 hover:scale-[1.02] shadow-lg hover:shadow-[0_15px_30px_rgba(0,0,0,0.5)] overflow-hidden aspect-[2.5/3.5] rounded-2xl w-full"
                          >
                            {/* Icono de Zoom Oculto */}
                            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center z-20 backdrop-blur-sm rounded-2xl">
                               <ZoomIn className="w-10 h-10 text-white drop-shadow-xl" />
                            </div>

                            <PokerCard 
                              value={card.number} 
                              suit={card.emoji} 
                              meaning={card.name}
                              size="fluid"
                            />
                          </button>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
              
              {filteredCards.length === 0 && (
                <div className="py-20 text-center text-gray-500 font-serif text-xl border border-dashed border-white/10 rounded-2xl bg-black/20">
                  Ningún naipe encontrado. Revisa tu búsqueda.
                </div>
              )}
            </div>

          </div>
        )}


        {/* ===================== MODO ZOOM (DETAIL VIEW) =====================  */}
        {viewMode === 'zoom' && activeCard && (
          <div className="flex-1 w-full max-w-6xl mx-auto p-4 md:p-8 flex flex-col items-center justify-center min-h-full animate-fade-in py-12">
            
            {/* Header / Botón Volver */}
            <div className="w-full flex justify-between items-center mb-10">
               <button onClick={handleCloseCard} className="group flex items-center gap-3 text-gray-400 hover:text-white transition-all bg-white/5 hover:bg-white/10 border border-white/5 px-6 py-3 rounded-full font-serif shadow-md text-sm">
                  <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> 
                  Cerrar Zoom Visual
               </button>
               <div className="text-[10px] uppercase tracking-widest text-gray-600 font-bold hidden sm:block">
                  Memorización Activa
               </div>
            </div>

            <div className="flex flex-col lg:flex-row items-center justify-center gap-16 lg:gap-24 w-full">
               
               {/* Controles Nav Izquierda */}
               <button onClick={() => navigateCard(-1)} className="hidden lg:flex p-5 rounded-full bg-white/5 hover:bg-red-600 hover:text-white text-gray-400 transition-all border border-white/10 hover:border-red-500 shadow-xl group">
                 <ChevronLeft className="w-8 h-8 group-hover:-translate-x-1 transition-transform" />
               </button>

               {/* CARTA MASIVA */}
               <div className="relative flex-shrink-0 z-10 group cursor-default">
                  <PokerCard 
                    value={activeCard.number} 
                    suit={activeCard.emoji}
                    size="lg"
                  />
               </div>

               {/* Panel de Enlaces (Derecha) */}
               <div className="flex flex-col gap-6 w-full max-w-sm">
                  <div className="mb-6 text-center lg:text-left">
                     <h2 className="text-4xl md:text-5xl font-serif text-white mb-2">{activeCard.name}</h2>
                     <p className="text-red-400/80 text-sm font-bold tracking-[0.2em] uppercase">{activeCard.suit}</p>
                  </div>

                  <div className="space-y-4">
                     <button 
                       onClick={() => onNavigate({ viewMode: 'cardProfile', activeCardId: activeCard.id })}
                       className="w-full group flex items-center justify-between p-5 bg-[#141418] hover:bg-white/10 border border-white/10 hover:border-white/30 rounded-2xl transition-all shadow-lg"
                     >
                       <div className="flex items-center gap-4">
                          <div className="p-3 bg-red-500/10 text-red-500 rounded-xl group-hover:bg-red-500 group-hover:text-white transition-colors"><BookOpen size={20} /></div>
                          <div className="text-left">
                             <div className="text-white font-bold font-serif text-lg">Ficha Teórica</div>
                             <div className="text-xs text-gray-500">Significados y contextos de lectura</div>
                          </div>
                       </div>
                       <ChevronRight className="text-gray-600 group-hover:text-white transition-colors" />
                     </button>

                     <button 
                       onClick={() => onNavigate({ viewMode: 'combinations' })}
                       className="w-full group flex items-center justify-between p-5 bg-[#141418] hover:bg-white/10 border border-white/10 hover:border-white/30 rounded-2xl transition-all shadow-lg"
                     >
                       <div className="flex items-center gap-4">
                          <div className="p-3 bg-purple-500/10 text-purple-500 rounded-xl group-hover:bg-purple-500 group-hover:text-white transition-colors"><Network size={20} /></div>
                          <div className="text-left">
                             <div className="text-white font-bold font-serif text-lg">Combinaciones</div>
                             <div className="text-xs text-gray-500">Pares fundamentales de póker</div>
                          </div>
                       </div>
                       <ChevronRight className="text-gray-600 group-hover:text-white transition-colors" />
                     </button>

                     <button 
                       onClick={() => onNavigate({ viewMode: 'pokerExercises' })}
                       className="w-full group flex items-center justify-between p-5 bg-[#141418] hover:bg-white/10 border border-white/10 hover:border-white/30 rounded-2xl transition-all shadow-lg"
                     >
                       <div className="flex items-center gap-4">
                          <div className="p-3 bg-cyan-500/10 text-cyan-500 rounded-xl group-hover:bg-cyan-500 group-hover:text-white transition-colors"><TargetIcon size={20} /></div>
                          <div className="text-left">
                             <div className="text-white font-bold font-serif text-lg">Práctica Clínica</div>
                             <div className="text-xs text-gray-500">Aplicación en lecturas reales</div>
                          </div>
                       </div>
                       <ChevronRight className="text-gray-600 group-hover:text-white transition-colors" />
                     </button>
                  </div>
               </div>
            </div>

            {/* Controles Nav Mobile */}
            <div className="flex lg:hidden justify-center gap-6 mt-12 w-full">
               <button onClick={() => navigateCard(-1)} className="p-5 rounded-full bg-white/5 hover:bg-red-600 text-gray-400 transition-all border border-white/10 flex-1 flex justify-center max-w-[120px]">
                 <ChevronLeft className="w-8 h-8" />
               </button>
               <button onClick={() => navigateCard(1)} className="p-5 rounded-full bg-white/5 hover:bg-red-600 text-gray-400 transition-all border border-white/10 flex-1 flex justify-center max-w-[120px]">
                 <ChevronRight className="w-8 h-8" />
               </button>
            </div>

          </div>
        )}
      </div>
    </div>
  );
};

export default PokerVisualAtlas;
