import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Image, X, ChevronLeft, ChevronRight, Eye, EyeOff, Sparkles, BookOpen, Shuffle } from 'lucide-react';
import { cardsDictionary as lenormandCardsDictionary } from '../data/db/lenormand_cards';
import { pokerCardsDictionary } from '../data/db/poker_cards';

export default function FlashcardsModule({ onNavigate, activeModule = 'lenormand' }) {
  const isPoker = activeModule === 'poker';
  const currentDict = isPoker ? pokerCardsDictionary : lenormandCardsDictionary;
  const accentText = isPoker ? 'text-red-500' : 'text-leny-accent';
  const accentBorder = isPoker ? 'border-red-500' : 'border-leny-accent';
  const accentBg = isPoker ? 'bg-red-500' : 'bg-leny-accent';
  const accentShadow = isPoker ? 'shadow-[0_0_20px_rgba(239,68,68,0.3)]' : 'shadow-[0_0_20px_rgba(201,162,39,0.3)]';

  // Array de 1 a 36/52 alineado a nuestras carpetas generadas
  const defaultOrder = useMemo(() => Array.from({ length: isPoker ? 52 : 36 }, (_, i) => i + 1), [isPoker]);
  
  const [order, setOrder] = useState([...defaultOrder]);
  const [selectedNum, setSelectedNum] = useState(null);

  // Al cambiar de módulo, resetear el orden
  useEffect(() => {
      setOrder([...defaultOrder]);
      setSelectedNum(null);
  }, [defaultOrder]);

  // Escuchar teclado para navegar modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!selectedNum) return;
      if (e.key === 'Escape') setSelectedNum(null);
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedNum, order]);

  // Manejo de Modal
  const openModal = (num) => {
    setSelectedNum(num);
    setIsRevealed(false);
  };
  const closeModal = () => setSelectedNum(null);

  const currentIndex = order.indexOf(selectedNum);

  const handleNext = useCallback(() => {
    if (currentIndex < order.length - 1) {
      setSelectedNum(order[currentIndex + 1]);
    }
  }, [currentIndex, order]);

  const handlePrev = useCallback(() => {
    if (currentIndex > 0) {
      setSelectedNum(order[currentIndex - 1]);
    }
  }, [currentIndex, order]);

  const handleShuffle = () => {
    const newOrder = [...defaultOrder].sort(() => Math.random() - 0.5);
    setOrder(newOrder);
    setSelectedNum(newOrder[0]); // Abre inmediatamente la primera carta random
  };

  const handleRestore = () => {
    setOrder([...defaultOrder]);
    setSelectedNum(null);
  };

  const currentCardData = currentDict.find(c => c.number === selectedNum);

  return (
    <div className="flex flex-col h-full bg-[#05070a] text-white">
      {/* HEADERS */}
      <div className="p-4 md:p-6 lg:p-8 flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-white/5 bg-black/20">
        <div>
          <h2 className={`font-serif text-2xl md:text-3xl ${accentText} flex items-center gap-2`}>
            <Image size={24} /> Tarjetas Rápidas
          </h2>
          <p className="text-white/40 text-sm mt-1">Memorización visual y nemotecnia</p>
        </div>

        <div className="flex flex-wrap sm:flex-nowrap items-center gap-3 w-full sm:w-auto">
           {order.join(',') !== defaultOrder.join(',') && (
             <button
               onClick={handleRestore}
               className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-white/60 hover:text-white text-sm transition-all border border-white/5"
             >
                Restaurar Orden
             </button>
           )}

           <button
             onClick={handleShuffle}
             className={`flex items-center justify-center gap-2 px-5 py-2 rounded-lg bg-gradient-to-r ${isPoker ? 'from-red-500 to-red-400' : 'from-leny-accent to-yellow-400'} text-black font-bold text-sm hover:scale-105 transition-transform ${accentShadow} whitespace-nowrap`}
           >
             <Shuffle size={16} /> Aleatorio
           </button>
        </div>
      </div>

      {/* GRID VIEW */}
      <div className="flex-1 overflow-y-auto p-4 md:p-8 custom-scrollbar">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 max-w-7xl mx-auto pb-20">
          {order.map(num => {
            const cardData = currentDict.find(c => c.number === num);
            return (
              <button
                key={num}
                onClick={() => openModal(num)}
                className={`group relative aspect-[1.6/1] w-full bg-[#11141c] rounded-xl overflow-hidden border border-white/10 shadow-lg hover:${accentBorder} hover:${accentShadow} hover:-translate-y-1 transition-all duration-300`}
              >
                {isPoker ? (
                    <div className={`w-full h-full flex flex-col items-center justify-center bg-gray-100 ${cardData?.color === 'rojo' ? 'text-red-600' : 'text-gray-900'} opacity-90 group-hover:opacity-100 transition-opacity`}>
                        <div className="text-6xl drop-shadow-sm">{cardData?.emoji}</div>
                        <div className="absolute top-2 right-2 text-2xl opacity-20">{cardData?.emoji}</div>
                        <div className="absolute bottom-2 left-2 text-2xl opacity-20 rotate-180">{cardData?.emoji}</div>
                    </div>
                ) : (
                    <img 
                      src={`/tarjetas-cartas/originals/${num}.png`} 
                      alt={`Carta ${num}`}
                      loading="lazy"
                      className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity"
                    />
                )}
                
                {/* Layer negro degradado */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-black/40 pointer-events-none"></div>

                <div className={`absolute top-2 left-2 w-6 h-6 rounded-full bg-black/60 border border-white/20 backdrop-blur-md flex items-center justify-center font-bold text-[10px] group-hover:${accentText} group-hover:border-${isPoker ? 'red-500' : 'leny-accent'}/50 transition-colors`}>
                  {num}
                </div>

                {cardData && (
                  <div className="absolute bottom-0 inset-x-0 p-2 text-center transform translate-y-1 group-hover:translate-y-0 transition-transform">
                    <span className="block font-serif text-[11px] md:text-sm text-white/90 truncate uppercase tracking-widest leading-none drop-shadow-md">
                      {cardData.name}
                    </span>
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* EXPANDED MODAL */}
      {selectedNum && (
        <div className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-sm flex flex-col animate-fade-in fade-in">
          
          {/* Header Modal */}
          <div className="flex items-center justify-between p-4 md:p-6 absolute top-0 inset-x-0 z-20">
             <div className="text-white/60 font-medium tracking-widest text-sm left-4 md:left-8 absolute hidden sm:block">
               {currentIndex + 1} / {order.length}
             </div>

             <button 
               onClick={closeModal}
               className="ml-auto p-2 rounded-full bg-white/10 hover:bg-red-500/80 text-white transition-colors"
             >
               <X size={20} />
             </button>
          </div>

          {/* Body Modal */}
          <div className="flex-1 flex items-center justify-center relative px-12 md:px-24 w-full h-full">
             
             {/* Prev Button */}
             <button 
               onClick={handlePrev}
               disabled={currentIndex === 0}
               className="absolute left-2 md:left-8 p-3 rounded-full bg-white/5 hover:bg-white/10 disabled:opacity-0 transition-all z-10"
             >
               <ChevronLeft size={32} />
             </button>
             
             {/* Content Area */}
             <div className="flex flex-col xl:flex-row items-center justify-center gap-6 xl:gap-12 w-full max-w-[95vw] h-full">
                
                {/* Image Col (Full res) */}
                <div className="relative shadow-2xl rounded-xl overflow-hidden ring-1 ring-white/20 w-fit max-h-[85vh]">
                   {isPoker ? (
                       <div className={`w-[60vh] max-w-full aspect-[2.5/3.5] bg-gray-100 flex flex-col items-center justify-center ${currentCardData?.color === 'rojo' ? 'text-red-600' : 'text-gray-900'} relative`}>
                           <div className="absolute top-6 left-6 text-5xl flex flex-col items-center">
                               <span>{currentCardData?.name.split(' ')[0]}</span>
                               <span>{currentCardData?.emoji}</span>
                           </div>
                           <div className="absolute bottom-6 right-6 text-5xl flex flex-col items-center rotate-180">
                               <span>{currentCardData?.name.split(' ')[0]}</span>
                               <span>{currentCardData?.emoji}</span>
                           </div>
                           <div className="text-[12rem] drop-shadow-xl">{currentCardData?.emoji}</div>
                       </div>
                   ) : (
                       <img 
                         src={`/tarjetas-cartas/originals/${selectedNum}.png`} 
                         alt="Carta expandida"
                         className="w-auto h-auto max-w-full max-h-[85vh] object-contain bg-black"
                       />
                   )}
                </div>

                {/* Text Col */}
                <div className="flex flex-col w-full max-w-md">
                   
                   {currentCardData ? (
                      <div className="animate-slide-up space-y-6">
                        
                        <div className="border-b border-white/10 pb-4">
                          <h3 className="font-serif text-4xl md:text-5xl text-white tracking-widest mb-2 flex items-center gap-4">
                            <span className={`${accentText} font-light drop-shadow-md`}>{currentCardData.number}.</span>
                            {currentCardData.name}
                          </h3>
                        </div>

                        <div className="space-y-4">
                          <div>
                            <span className={`text-[10px] uppercase font-bold tracking-[0.2em] ${accentText} mb-1 flex items-center gap-2`}>
                              <Sparkles size={12} /> Palabras Clave
                            </span>
                            <div className="flex flex-wrap gap-2 mt-2">
                              {currentCardData.keywords?.map((k, idx) => (
                                <span key={idx} className="px-2.5 py-1 rounded bg-[#1a212d] border border-white/10 text-xs text-white/80">
                                  {k}
                                </span>
                              ))}
                            </div>
                          </div>

                          <div>
                            <span className={`text-[10px] uppercase font-bold tracking-[0.2em] ${accentText} mb-1 flex items-center gap-2 mt-4`}>
                              <BookOpen size={12} /> Esencia de la carta
                            </span>
                            <p className={`text-sm text-white/70 leading-relaxed bg-white/5 p-4 rounded-lg border-l-2 ${accentBorder} mt-2`}>
                              {currentCardData.baseMeaning}
                            </p>
                          </div>
                        </div>

                        <button
                          onClick={() => {
                             closeModal();
                             if(onNavigate) onNavigate({ viewMode: 'cardProfile', activeCardId: currentCardData.id });
                          }}
                          className={`w-full flex items-center justify-center gap-2 mt-8 py-3 bg-white/5 hover:${accentBg} group rounded-lg transition-all border border-white/10 hover:${accentBorder}`}
                        >
                          <span className="font-bold text-sm text-white group-hover:text-black uppercase tracking-widest transition-colors">Ver Teoría Completa</span>
                          <ChevronRight size={16} className="text-white/40 group-hover:text-black transition-colors" />
                        </button>
                      </div>
                   ) : null}

                </div>
             </div>

             {/* Next Button */}
             <button 
               onClick={handleNext}
               disabled={currentIndex === order.length - 1}
               className="absolute right-2 md:right-8 p-3 rounded-full bg-white/5 hover:bg-white/10 disabled:opacity-0 transition-all z-10"
             >
               <ChevronRight size={32} />
             </button>

          </div>
        </div>
      )}

    </div>
  );
}
