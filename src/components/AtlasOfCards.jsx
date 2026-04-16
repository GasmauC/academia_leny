import React, { useState, useEffect, useRef } from 'react';
import { ChevronRight, ChevronLeft, AlertCircle, BookOpen, Layers, Target, RefreshCw, CheckCircle2, Search, ArrowLeft } from 'lucide-react';
import EditorialText from './EditorialText';
import { cardsDictionary } from '../data/db/lenormand_cards';
import { useStudyData } from '../hooks/useStudyData';
import PageOutline from './PageOutline';

const AtlasOfCards = ({ activeNode, onNavigatePrevious, onNavigateNext }) => {
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'detail'
  const [expandedCardId, setExpandedCardId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterPolarity, setFilterPolarity] = useState('Todas'); // 'Todas', 'Positiva', 'Negativa', 'Neutra'
  
  const { readNodes, markNodeAsRead } = useStudyData();
  const scrollContainerRef = useRef(null);

  // Volver arriba cuando cambia la vista o filtramos
  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [viewMode, expandedCardId]);

  const handleOpenCard = (id) => {
    markNodeAsRead(`card-${id}`);
    setExpandedCardId(id);
    setViewMode('detail');
  };

  const handleCloseCard = () => {
    setExpandedCardId(null);
    setViewMode('grid');
  };

  const activeCard = expandedCardId ? cardsDictionary.find(c => c.id === expandedCardId) : null;
  const currentCardSections = activeCard ? [
    { id: `vision-${activeCard.id}`, label: 'Visión General' },
    { id: `contextos-${activeCard.id}`, label: 'Contextos' },
    ...(activeCard.warnings ? [{ id: `alertas-${activeCard.id}`, label: 'Errores Comunes' }] : []),
    { id: `ejemplos-${activeCard.id}`, label: 'Combinaciones' },
    { id: `teoria-${activeCard.id}`, label: 'Estudio Íntegro' }
  ] : [];

  const filteredCards = cardsDictionary.filter(card => {
    const matchSearch = card.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                        card.baseMeaning.toLowerCase().includes(searchTerm.toLowerCase()) || 
                        card.number.toString().includes(searchTerm);
    const matchPolarity = filterPolarity === 'Todas' || card.polarity.toLowerCase() === filterPolarity.toLowerCase();
    
    return matchSearch && matchPolarity;
  });

  const progressCount = cardsDictionary.filter(c => readNodes.includes(`card-${c.id}`)).length;
  const progressPercent = Math.round((progressCount / 36) * 100);

  return (
    <div className="flex-1 flex flex-col h-full bg-leny-dark overflow-hidden fade-in">
      
      {/* HEADER PRINCIPAL */}
      <div className="sticky top-0 z-20 flex items-center justify-between p-4 bg-leny-dark/95 backdrop-blur-xl border-b border-white/5 shadow-2xl">
        <div className="flex items-center gap-3">
          <div className="flex flex-col">
            <span className="text-[10px] text-gray-500 uppercase tracking-widest font-semibold flex items-center gap-2">
              BIBLIOTECA DE CARTAS
              {progressCount > 0 && (
                 <span className="text-leny-accent bg-leny-accent/10 px-1.5 py-0.5 rounded-sm ml-2">
                    {progressPercent}% ESTUDIADO
                 </span>
              )}
            </span>
            <span className="text-sm font-title text-gray-300 truncate max-w-[200px] md:max-w-md hidden sm:block">
              {activeNode.title}
            </span>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar bg-leny-darker/50 relative flex justify-center" ref={scrollContainerRef}>
        
        {/* ===================== MODO GRID / ESTANTERÍA =====================  */}
        {viewMode === 'grid' && (
          <div className="flex-1 max-w-7xl p-6 md:p-12 pb-32 space-y-10 w-full animate-fade-in text-center mx-auto">
            
            {/* Cabecera del Grid */}
            <div className="max-w-3xl mx-auto mb-16 border-b border-leny-accent/10 pb-12">
              <BookOpen className="w-14 h-14 text-leny-accent mx-auto mb-6 opacity-90 drop-shadow-[0_0_15px_rgba(201,162,39,0.3)]" />
              <h1 className="text-4xl md:text-6xl font-serif text-white font-bold mb-4 drop-shadow-lg">{activeNode.title}</h1>
              <p className="text-leny-dim text-lg">Tu galería de estudio. Explora cada símbolo y expande las fichas clínicas para dominar la lectura completa.</p>
            </div>

            {/* Barra de Búsqueda y Filtros */}
            <div className="max-w-4xl mx-auto flex flex-col md:flex-row gap-4 items-center justify-between bg-black/40 p-4 md:p-6 rounded-2xl border border-white/5 shadow-xl mb-12">
              
               <div className="relative w-full md:w-1/2">
                 <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
                 <input 
                   type="text" 
                   className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white focus:outline-none focus:border-leny-accent/50 focus:ring-1 focus:ring-leny-accent/50 transition-all font-serif placeholder:font-sans"
                   placeholder="Buscar carta por número, nombre o tema..."
                   value={searchTerm}
                   onChange={e => setSearchTerm(e.target.value)}
                 />
               </div>

               <div className="flex gap-2 p-1 bg-white/5 rounded-xl border border-white/5 w-full md:w-auto overflow-x-auto custom-scrollbar">
                  {['Todas', 'Positiva', 'Negativa', 'Neutra'].map(pol => (
                    <button
                      key={pol}
                      onClick={() => setFilterPolarity(pol)}
                      className={`px-4 py-2 rounded-lg text-sm font-bold tracking-wide transition-colors whitespace-nowrap ${filterPolarity === pol ? 'bg-leny-accent text-leny-dark shadow-md' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
                    >
                      {pol}
                    </button>
                  ))}
               </div>

            </div>

            {/* Estantería (Grilla) de Cartas */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 md:gap-6">
              {filteredCards.length > 0 ? filteredCards.map(card => {
                const isRead = readNodes.includes(`card-${card.id}`);
                return (
                  <button 
                    key={card.id}
                    onClick={() => handleOpenCard(card.id)}
                    className={`relative group bg-gradient-to-br from-white/5 to-transparent hover:from-white/10 hover:to-white/5 border rounded-2xl flex flex-col items-center justify-center transition-all duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-[0_10px_30px_rgba(201,162,39,0.15)] overflow-hidden ${isRead ? 'border-leny-accent/40' : 'border-white/10 hover:border-leny-accent/70'}`}
                  >
                    {/* Badge de Leído */}
                    {isRead && (
                      <div className="absolute top-3 right-3 text-leny-accent z-10" title="Carta Estudiada">
                        <div className="bg-leny-darker rounded-full p-0.5">
                          <CheckCircle2 size={18} fill="rgba(201,162,39,0.2)" />
                        </div>
                      </div>
                    )}
                    
                    {/* Contenido Visual Carta */}
                    <div className="p-6 md:p-8 w-full flex flex-col items-center justify-center relative z-10">
                       <span className={`text-[10px] font-bold tracking-widest uppercase mb-4 ${isRead ? 'text-leny-accent/80' : 'text-leny-dim'}`}>
                         N.º {card.number}
                       </span>
                       <div className="text-5xl md:text-6xl mb-4 group-hover:scale-125 group-hover:drop-shadow-[0_0_15px_rgba(255,255,255,0.3)] transition-all duration-500 select-none">
                         {card.emoji}
                       </div>
                       <span className="text-[13px] md:text-sm font-serif text-white font-medium text-center leading-tight">
                         {card.name}
                       </span>
                    </div>

                    {/* Brillo de hover */}
                    <div className="absolute inset-0 bg-gradient-to-t from-leny-accent/0 via-transparent to-leny-accent/0 group-hover:from-leny-accent/10 transition-colors pointer-events-none"></div>
                  </button>
                );
              }) : (
                <div className="col-span-full py-20 text-center text-gray-500 font-serif text-xl border border-dashed border-white/10 rounded-2xl bg-black/20">
                  No se encontraron cartas en este filtro mágico.
                </div>
              )}
            </div>

            {/* Global Footer (Next/Prev Chapter) en Modo Grid */}
            {filteredCards.length > 0 && (
              <div className="border-t border-leny-accent/20 pt-8 mt-24 flex flex-col sm:flex-row items-center justify-between w-full max-w-4xl mx-auto gap-4">
                <button 
                  onClick={onNavigatePrevious}
                  className="group flex w-full sm:w-auto items-center justify-center gap-3 text-gray-400 hover:text-leny-accent px-6 py-3 bg-white/5 hover:bg-white/10 rounded-lg transition-all"
                >
                  <ChevronLeft size={20} className="group-hover:-translate-x-1 transition-transform" /> 
                  <span className="font-semibold tracking-wide">Capítulo Anterior</span>
                </button>
                <button 
                  onClick={onNavigateNext}
                  className="group flex w-full sm:w-auto items-center justify-center gap-3 text-leny-dark bg-leny-accent hover:bg-yellow-400 px-6 py-3 rounded-lg transition-all"
                >
                  <span className="font-semibold tracking-wide">Siguiente Capítulo</span> 
                  <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            )}
            
          </div>
        )}


        {/* ===================== MODO DETAIL / FICHA AMPLIADA =====================  */}
        {viewMode === 'detail' && activeCard && (
          <>
            <div className="flex-1 max-w-4xl p-4 md:p-8 pb-32 space-y-6 w-full animate-fade-in mx-auto">
              
              {/* Botón Volver */}
              <button onClick={handleCloseCard} className="group flex items-center gap-3 text-leny-dim hover:text-white transition-all bg-black/40 hover:bg-white/5 border border-white/5 hover:border-white/20 px-5 py-3 rounded-full mb-8 font-serif shadow-md w-max">
                 <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" /> 
                 <span className="hidden sm:inline pt-0.5">Volver al Catálogo Cartomántico</span>
                 <span className="sm:hidden pt-0.5">Catálogo</span>
              </button>

              <div className="border border-leny-accent/30 bg-leny-darker shadow-[0_15px_40px_rgba(0,0,0,0.6)] rounded-3xl overflow-hidden relative">
                 {/* Ficha Card Content */}
                 <div className="p-6 md:p-12 bg-gradient-to-b from-leny-accent/5 to-transparent relative">
                      
                      <div className="absolute top-0 right-0 p-8 flex items-center gap-2 opacity-50 select-none">
                         <div className="text-[10px] font-bold tracking-widest text-white uppercase">Carta N.º</div>
                         <div className="font-serif text-3xl text-leny-accent">{activeCard.number}</div>
                      </div>

                      <div className="absolute -top-10 -left-10 text-[12rem] opacity-[0.03] rotate-12 pointer-events-none select-none">
                        {activeCard.emoji}
                      </div>

                      <div className="flex flex-col items-center mb-12 relative z-10 pt-4">
                         <div className="w-24 h-24 bg-gradient-to-br from-leny-accent/20 to-transparent border border-leny-accent/30 rounded-2xl flex items-center justify-center text-5xl mb-6 shadow-inner drop-shadow-[0_0_15px_rgba(201,162,39,0.2)]">
                           {activeCard.emoji}
                         </div>
                         <h2 className="text-4xl md:text-6xl font-serif text-white capitalize drop-shadow-md">{activeCard.name}</h2>
                      </div>

                      {/* Significado General */}
                      <div id={`vision-${activeCard.id}`} className="mb-12 text-center max-w-2xl mx-auto relative z-10 scroll-mt-24">
                          <EditorialText text={`"${activeCard.baseMeaning}"`} className="text-2xl md:text-3xl text-white font-serif italic leading-relaxed text-leny-accent/90" />
                      </div>

                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12 relative z-10">
                          {/* Bloque: Núcleo y Función */}
                          <div className="space-y-6">
                              <div className="bg-black/30 p-8 rounded-2xl border border-white/5 hover:border-white/10 transition-colors shadow-inner">
                                  <h3 className="flex items-center gap-3 text-sm font-bold uppercase tracking-widest text-leny-accent mb-4"><Layers size={18}/> Núcleo Simbólico</h3>
                                  <EditorialText text={activeCard.symbolicCore} className="text-gray-300 leading-relaxed text-sm md:text-base" />
                              </div>

                              <div className="bg-black/30 p-8 rounded-2xl border border-white/5 shadow-inner">
                                  <h3 className="flex items-center gap-3 text-sm font-bold uppercase tracking-widest text-[#a855f7] mb-4"><RefreshCw size={18}/> Verbo / Acción (Función)</h3>
                                  <p className="text-2xl font-serif text-white">{activeCard.actionVerb}</p>
                              </div>
                              
                              <div className="bg-black/30 p-8 rounded-2xl border border-white/5 shadow-inner">
                                  <h3 className="flex items-center gap-3 text-sm font-bold uppercase tracking-widest text-leny-dim mb-4">Clasificación Base</h3>
                                  <div className="grid grid-cols-2 gap-4">
                                      <div className="bg-white/5 px-4 py-3 rounded-xl"><span className="text-gray-500 block text-[10px] font-bold tracking-widest uppercase mb-1">Polaridad</span> <span className="text-white font-serif text-lg">{activeCard.polarity}</span></div>
                                      <div className="bg-white/5 px-4 py-3 rounded-xl"><span className="text-gray-500 block text-[10px] font-bold tracking-widest uppercase mb-1">Velocidad</span> <span className="text-white font-serif text-lg">{activeCard.timing}</span></div>
                                  </div>
                              </div>
                          </div>

                          {/* Bloque: Contextos de Lectura */}
                          <div id={`contextos-${activeCard.id}`} className="space-y-6 scroll-mt-24">
                              <div className="bg-gradient-to-br from-[#ec4899]/10 to-transparent p-8 rounded-2xl border border-[#ec4899]/20 hover:border-[#ec4899]/40 transition-colors h-[31%] flex flex-col justify-center shadow-inner">
                                  <h3 className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#ec4899] mb-3">Contexto: Amor</h3>
                                  <EditorialText text={activeCard.readings.love} className="text-gray-200 leading-relaxed text-[15px]" />
                              </div>
                              
                              <div className="bg-gradient-to-br from-[#10b981]/10 to-transparent p-8 rounded-2xl border border-[#10b981]/20 hover:border-[#10b981]/40 transition-colors h-[31%] flex flex-col justify-center shadow-inner">
                                  <h3 className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#10b981] mb-3">Contexto: Trabajo & Dinero</h3>
                                  <EditorialText text={activeCard.readings.work} className="text-gray-200 leading-relaxed text-[15px]" />
                              </div>

                              <div className="bg-gradient-to-br from-[#3b82f6]/10 to-transparent p-8 rounded-2xl border border-[#3b82f6]/20 hover:border-[#3b82f6]/40 transition-colors h-[31%] flex flex-col justify-center shadow-inner">
                                  <h3 className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#3b82f6] mb-3">Contexto: Salud</h3>
                                  <EditorialText text={activeCard.readings.health} className="text-gray-200 leading-relaxed text-[15px]" />
                              </div>
                          </div>
                      </div>

                      {/* Alertas y Errores */}
                      {activeCard.warnings && (
                          <div id={`alertas-${activeCard.id}`} className="mb-12 bg-red-950/30 p-8 rounded-2xl border border-red-500/30 flex flex-col md:flex-row gap-6 items-start relative z-10 scroll-mt-24 shadow-inner">
                              <div className="bg-red-500/10 p-4 rounded-full md:mt-1 shrink-0">
                                <AlertCircle className="w-8 h-8 text-red-500" />
                              </div>
                              <div>
                                  <h3 className="text-[13px] font-bold uppercase tracking-widest text-red-500 mb-3">Errores Interpretativos Críticos y Excepciones</h3>
                                  <EditorialText text={activeCard.warnings} className="text-red-100/90 leading-relaxed text-lg font-serif italic" />
                              </div>
                          </div>
                      )}

                      {/* Combinaciones / Ejemplos */}
                      <div id={`ejemplos-${activeCard.id}`} className="relative z-10 mb-12 scroll-mt-24">
                          <h3 className="flex items-center gap-3 text-sm font-bold uppercase tracking-widest text-white mb-6 border-b border-white/10 pb-4"><Target size={20} className="text-leny-accent"/> Matrimonios / Parejas Básicas</h3>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              {activeCard.combinations.slice(0, 4).map((comb, i) => (
                                  <div key={i} className="bg-black/40 p-5 rounded-xl border border-white/5 hover:border-leny-accent/30 transition-colors group">
                                      <div className="font-bold text-leny-accent mb-2 tracking-wide group-hover:text-yellow-400">{comb.cards}</div>
                                      <EditorialText text={comb.meaning} className="text-[15px] text-gray-300" />
                                  </div>
                              ))}
                          </div>
                      </div>

                      {/* Texto Completo / Original */}
                      <div id={`teoria-${activeCard.id}`} className="relative z-10 mt-16 bg-[#0a0f18] p-8 md:p-14 rounded-3xl border border-white/5 scroll-mt-24 shadow-2xl">
                          <h3 className="flex items-center gap-4 text-3xl font-serif text-leny-accent mb-10 border-b border-leny-accent/20 pb-6 relative">
                              <BookOpen size={30} className="opacity-80" /> Profundización Académica Original
                          </h3>
                          <div className="space-y-6">
                              {activeCard.longExplanations.map((p, idx) => (
                                  <div key={idx} className={idx === 0 ? 'text-white italic font-serif text-[1.35rem] leading-[1.8] border-l-[6px] border-leny-accent pl-8 py-3 bg-gradient-to-r from-leny-accent/10 to-transparent rounded-r-2xl mb-10' : 'text-leny-dim leading-relaxed'}>
                                      <EditorialText text={p} />
                                  </div>
                              ))}
                          </div>
                      </div>

                      {/* Local Detail Footer (Next/Prev local card) */}
                      <div className="mt-16 flex justify-between gap-4 border-t border-white/5 pt-10 relative z-10">
                          {activeCard.id !== cardsDictionary[0].id ? (
                              <button 
                                onClick={(e) => { 
                                  const idx = cardsDictionary.findIndex(c => c.id === activeCard.id);
                                  handleOpenCard(cardsDictionary[idx - 1].id); 
                                }} 
                                className="px-5 py-3 bg-white/5 hover:bg-white/10 border border-white/5 text-gray-300 hover:text-white rounded-xl flex items-center gap-3 font-semibold transition-all">
                                  <ChevronLeft size={18} /> <span className="hidden sm:inline">Carta Anterior</span>
                              </button>
                          ) : <div/>}

                          {activeCard.id !== cardsDictionary[cardsDictionary.length - 1].id ? (
                              <button 
                                onClick={(e) => { 
                                  const idx = cardsDictionary.findIndex(c => c.id === activeCard.id);
                                  handleOpenCard(cardsDictionary[idx + 1].id); 
                                }} 
                                className="px-6 py-3 bg-gradient-to-r from-leny-accent to-yellow-500 hover:from-yellow-400 hover:to-yellow-300 text-black shadow-lg rounded-xl font-bold flex items-center gap-3 transition-all transform hover:-translate-y-0.5">
                                  Siguiente Carta <ChevronRight size={18} />
                              </button>
                          ) : <div/>}
                      </div>

                 </div>
              </div>
            </div>
            
            <PageOutline sections={currentCardSections} scrollContainerRef={scrollContainerRef} />
          </>
        )}
      </div>
    </div>
  );
};

export default AtlasOfCards;
