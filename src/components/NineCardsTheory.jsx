import React, { useState, useRef } from 'react';
import { ninecardsBlocks } from '../data/ninecards_theory';
import EditorialText from './EditorialText';
import { Grid, Layers, Network, Maximize, Target, ChevronRight, Hash } from 'lucide-react';
import { cardsDictionary } from '../data/db/lenormand_cards';
import PageOutline from './PageOutline';
import PositionBreakdown from './PositionBreakdown';

const iconMap = {
  Grid,
  Layers,
  Network,
  Maximize,
  Target
};

export default function NineCardsTheory() {
  const [activeTab, setActiveTab] = useState(ninecardsBlocks[0].id);
  const scrollContainerRef = useRef(null);

  const activeBlock = ninecardsBlocks.find(b => b.id === activeTab) || ninecardsBlocks[0];
  const ActiveIcon = iconMap[activeBlock.icon] || Grid;

  const outlineSections = [
    { id: 'teoria', label: 'Marco Teórico' },
    { id: 'ejemplos', label: 'Casos Analizados' }
  ];

  return (
    <div className="h-full flex flex-col md:flex-row bg-leny-darker text-white overflow-hidden fade-in">
      {/* Sidebar de Navegación del Módulo */}
      <div className="w-full md:w-80 flex-shrink-0 bg-leny-dark border-r border-leny-accent/20 flex flex-col h-full md:h-auto overflow-y-auto custom-scrollbar">
        <div className="p-6 border-b border-leny-accent/10 sticky top-0 bg-leny-dark/95 backdrop-blur z-10">
          <div className="flex items-center gap-3 mb-2">
            <Hash className="w-8 h-8 text-leny-accent" />
            <h2 className="text-2xl font-serif text-leny-accent leading-tight">Módulo<br/>Retrato 3x3</h2>
          </div>
          <p className="text-sm text-leny-dim mt-2">
            Clase Maestra: Composición de 9 Cartas. Filas, Columnas y Espejos.
          </p>
        </div>
        
        <nav className="p-4 flex flex-col gap-2">
          {ninecardsBlocks.map((block) => {
            const Icon = iconMap[block.icon] || Grid;
            const isActive = activeTab === block.id;
            return (
              <button
                key={block.id}
                onClick={() => setActiveTab(block.id)}
                className={`flex items-center gap-3 p-4 rounded-xl text-left transition-all duration-300 w-full group
                  ${isActive 
                    ? 'bg-leny-accent/10 border border-leny-accent shadow-[0_0_15px_rgba(255,215,0,0.1)]' 
                    : 'bg-white/5 border border-transparent hover:bg-white/10 hover:border-white/20'}`}
              >
                <div className={`p-2 rounded-lg transition-colors ${isActive ? 'bg-leny-accent text-leny-dark' : 'bg-leny-darker text-leny-dim group-hover:text-leny-accent'}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <span className={`font-medium leading-snug ${isActive ? 'text-leny-accent' : 'text-leny-dim group-hover:text-white'}`}>
                  {block.title.split('.')[1] ? block.title.split('.')[1].trim() : block.title}
                </span>
                {isActive && <ChevronRight className="w-4 h-4 text-leny-accent ml-auto flex-shrink-0" />}
              </button>
            )
          })}
        </nav>
      </div>

      {/* Área de Visualización Principal */}
      <div className="flex-1 h-full overflow-y-auto custom-scrollbar bg-leny-darker/50 pb-20 relative flex" ref={scrollContainerRef}>
        <div className="flex-1 max-w-6xl mx-auto p-6 md:p-12">
          
          <div className="mb-16 border-b border-white/10 pb-12 slide-up">
            <div className="p-4 rounded-2xl bg-leny-accent/10 w-max mb-6 border border-leny-accent/30 shadow-[0_0_20px_rgba(255,215,0,0.15)] flex items-center justify-center">
              <ActiveIcon className="w-8 h-8 text-leny-accent" />
            </div>
            
            <h1 id="teoria" className="text-3xl md:text-5xl font-serif text-white mb-10 leading-tight md:text-center scroll-mt-8">
              {activeBlock.title}
            </h1>
            
            {/* Contenido Teórico Renderizado con Sistema Editorial */}
            <div className="text-justify mt-6">
              <EditorialText text={activeBlock.content} />
            </div>
          </div>

          <div className="slide-up w-full" style={{animationDelay: '0.1s'}}>

            <h3 id="ejemplos" className="text-2xl font-serif text-leny-accent mb-8 flex items-center gap-3 scroll-mt-12">
              <span className="w-8 h-px bg-leny-accent/50 inline-block"></span>
              {activeBlock.examplesTitle}
              <span className="flex-1 h-px bg-leny-accent/10 inline-block"></span>
            </h3>

            <div className="space-y-12">
              {activeBlock.examples.map((ej, idx) => (
                <div key={idx} className="bg-[#0c1017] border border-white/10 rounded-3xl overflow-hidden hover:border-leny-accent/30 transition-colors group shadow-xl">
                  
                  {/* Header Contexto */}
                  <div className="bg-leny-darker p-8 md:p-10 border-b border-white/10 text-center relative overflow-hidden">
                    <div className="absolute inset-0 opacity-10 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-leny-accent to-transparent mix-blend-overlay"></div>
                    <div className="relative z-10 max-w-3xl mx-auto">
                      <div className="text-[11px] font-bold tracking-widest text-leny-accent/80 uppercase mb-3 drop-shadow-md">Caso Práctico Analizado</div>
                      <div className="text-2xl md:text-3xl font-serif text-white group-hover:text-leny-accent transition-colors italic leading-snug drop-shadow-lg">
                        "{ej.contexto}"
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col xl:flex-row w-full">
                    
                    {/* Left Side: Visual Board & Positions */}
                    <div className="xl:w-[45%] p-6 md:p-10 border-b xl:border-b-0 xl:border-r border-white/10 bg-[#0f141d] flex flex-col items-center justify-between">
                      
                      {/* Mesa Virtual 3x3 */}
                      <div className="w-full max-w-[22rem] mx-auto relative mb-12">
                        <div className="text-[11px] text-leny-accent/80 uppercase tracking-widest text-center mb-6 font-bold flex items-center justify-center gap-2">
                          <Grid className="w-4 h-4" /> Despliegue 3x3
                        </div>
                        
                        <div className="grid grid-cols-3 gap-3 md:gap-4 w-full relative">
                          {ej.cartas && ej.cartas.map((carta, cIdx) => {
                            const isCenter = cIdx === 4;
                            const isCross = [1, 3, 5, 7].includes(cIdx);
                            const cleanName = carta.replace(/\(.*?\)/g, '').trim().toLowerCase();
                            const cardData = cardsDictionary.find(c => c.name.toLowerCase() === cleanName || c.name.toLowerCase().includes(cleanName) || cleanName.includes(c.name.toLowerCase())) || { emoji: '🎴', name: carta.replace(/\(.*?\)/g, '').trim() };
                            
                            return (
                              <div key={cIdx} className="relative group/card cursor-default aspect-[2.5/3.5] flex items-center justify-center transition-all duration-300 hover:-translate-y-2 hover:scale-105 hover:z-20">
                                {/* Position indicator */}
                                <div className={`absolute -top-2.5 -right-2.5 w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold shadow-[0_0_10px_rgba(0,0,0,0.5)] z-20 border transition-colors
                                  ${isCenter ? 'bg-leny-accent text-leny-dark border-leny-accent/50 scale-110' : 'bg-leny-darker border-white/20 text-white/70 group-hover/card:bg-white/10 group-hover/card:text-white'}`}>
                                  {cIdx + 1}
                                </div>
                                
                                {/* Card Body */}
                                <div className={`w-full h-full border rounded-xl flex flex-col items-center justify-between transition-all p-2 text-center relative overflow-hidden group-hover/card:border-leny-accent/50 group-hover/card:ring-1 group-hover/card:ring-leny-accent/30 shadow-xl
                                  ${isCenter ? 'border-leny-accent/50 bg-gradient-to-b from-[#1a1f2e] to-[#121620] ring-1 ring-leny-accent/20' : isCross ? 'border-white/10 bg-gradient-to-b from-[#161b26] to-[#0f141d]' : 'border-white/5 bg-gradient-to-b from-[#111620] to-[#0a0d14] opacity-95'}`}>
                                  
                                  {/* Top Row: Number */}
                                  <div className="w-full flex justify-between items-start">
                                    <span className={`font-serif text-[10px] md:text-xs font-bold bg-black/30 px-1.5 py-0.5 rounded ${isCenter ? 'text-leny-accent' : 'text-white/60'}`}>{cardData.number || '?'}</span>
                                    {isCenter && <span className="text-leny-accent/80 text-[10px]">✦</span>}
                                  </div>

                                  {/* Center Image/Emoji */}
                                  <span className={`text-4xl md:text-5xl drop-shadow-2xl relative z-10 transition-transform flex-1 flex items-center justify-center
                                    ${isCenter ? 'drop-shadow-[0_0_15px_rgba(255,215,0,0.3)] group-hover/card:scale-110' : 'group-hover/card:scale-110'}`}>
                                    {cardData.emoji}
                                  </span>

                                  {/* Bottom Row: Name */}
                                  <div className="w-full bg-black/40 rounded py-1 px-1 mt-auto border border-white/5 backdrop-blur-sm">
                                    <span className={`font-serif text-[8.5px] md:text-[9.5px] leading-[1.1] text-white/90 relative z-10 uppercase tracking-wider block px-1 
                                      ${isCenter ? 'font-bold text-leny-accent' : 'font-medium opacity-90'}`}>
                                      {cardData.name}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>

                      {/* Desglose de Posiciones Iniciales (Reutilizable) */}
                      <PositionBreakdown posicionesText={ej.posiciones} />

                    </div>

                    {/* Right Side: Textual Analysis */}
                    <div className="xl:w-[55%] p-6 md:p-10 bg-[#0c1017] flex flex-col">
                      
                      <div className="space-y-8 flex-1">
                        <div>
                          <div className="text-xs uppercase tracking-widest text-leny-accent/60 mb-4 font-bold flex items-center gap-2 border-b border-white/5 pb-2">
                            <Layers className="w-4 h-4" /> Líneas Directas (Filas y Columnas)
                          </div>
                          <EditorialText text={ej.filas_columnas} className="text-white/80 text-[15px] leading-relaxed" />
                        </div>

                        <div>
                          <div className="text-xs uppercase tracking-widest text-purple-400/60 mb-4 font-bold flex items-center gap-2 border-b border-white/5 pb-2">
                            <Network className="w-4 h-4" /> Espejos y Diagonales
                          </div>
                          <EditorialText text={ej.diagonales} className="text-white/70 text-[14px] italic leading-relaxed" />
                        </div>
                      </div>

                      <div className="mt-10 space-y-6">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                          <div className="p-6 rounded-2xl bg-gradient-to-br from-leny-accent/10 via-transparent to-transparent border border-leny-accent/20">
                            <div className="text-[11px] uppercase tracking-widest text-leny-accent mb-3 font-bold">Síntesis Definitiva</div>
                            <EditorialText text={ej.sintesis} className="text-white font-medium text-[15px] leading-snug" />
                          </div>
                          
                          <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                            <div className="text-[11px] uppercase tracking-widest text-blue-400 mb-3 font-bold">Justificación Cruda</div>
                            <EditorialText text={ej.justificacion} className="text-white/60 text-[13px] leading-relaxed" />
                          </div>
                        </div>

                        <div className="p-6 rounded-2xl border border-leny-accent/10 bg-leny-accent/5 backdrop-blur-sm relative overflow-hidden">
                          <div className="absolute -right-6 -bottom-6 w-24 h-24 bg-leny-accent/10 rounded-full blur-2xl"></div>
                          <div className="text-[11px] uppercase tracking-widest text-leny-accent mb-3 font-bold flex items-center gap-2 relative z-10">
                            <Target className="w-4 h-4" /> Doctrina del Triple Nivel
                          </div>
                          <EditorialText text={ej.enseñanza} className="text-[14px] text-white font-serif italic relative z-10" />
                        </div>
                      </div>

                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <PageOutline sections={outlineSections} scrollContainerRef={scrollContainerRef} />
      </div>
    </div>
  );
}
