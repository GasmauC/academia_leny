import React, { useState, useRef } from 'react';
import { theoryBlocks } from '../data/combinations_theory';
import EditorialText from './EditorialText';
import { Crown, ArrowRight, BookOpen, Filter, Zap, ChevronRight, BookHeart } from 'lucide-react';
import { cardsDictionary } from '../data/db/lenormand_cards';
import PageOutline from './PageOutline';

const iconMap = {
  Crown,
  ArrowRight,
  BookOpen,
  Filter,
  Zap
};

export default function CombinationsTheory() {
  const [activeTab, setActiveTab] = useState(theoryBlocks[0].id);
  const scrollContainerRef = useRef(null);

  const activeBlock = theoryBlocks.find(b => b.id === activeTab) || theoryBlocks[0];
  const ActiveIcon = iconMap[activeBlock.icon] || BookOpen;

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
            <BookHeart className="w-8 h-8 text-leny-accent" />
            <h2 className="text-2xl font-serif text-leny-accent leading-tight">La Gramática<br/>Lenormand</h2>
          </div>
          <p className="text-sm text-leny-dim mt-2">
            Clase Maestra: El arte y la ciencia de leer las cartas en pares.
          </p>
        </div>
        
        <nav className="p-4 flex flex-col gap-2">
          {theoryBlocks.map((block) => {
            const Icon = iconMap[block.icon] || BookOpen;
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
                  {block.title.split(':')[0]} {/* Solo la primera parte del título para el menú */}
                </span>
                {isActive && <ChevronRight className="w-4 h-4 text-leny-accent ml-auto" />}
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

            <div className="space-y-6">
              {activeBlock.examples.map((ej, idx) => (
                <div key={idx} className="bg-leny-dark border border-white/10 rounded-2xl p-6 md:p-8 hover:border-leny-accent/30 transition-colors group">
                  
                  <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-8 border-b border-white/5 pb-6">
                    <div className="flex-1">
                      <div className="text-[11px] font-bold tracking-widest text-leny-accent/80 uppercase mb-2">Pregunta Foco</div>
                      <div className="text-xl font-serif text-white group-hover:text-leny-accent transition-colors italic">"{ej.pregunta}"</div>
                    </div>
                    
                    <div className="bg-leny-darker flex-wrap rounded-xl p-6 md:py-8 border border-white/5 flex flex-col items-center justify-center md:flex-row gap-6 relative overflow-hidden shrink-0 mt-4 md:mt-0">
                      <div className="text-[10px] text-leny-dim uppercase tracking-widest text-center absolute w-full top-3">Combinación en Estudio</div>
                      
                      {ej.combinacion.split('+').map((carta, cIdx, arr) => {
                          const cleanName = carta.replace(/\(.*?\)/g, '').trim().toLowerCase();
                          const cardData = cardsDictionary.find(c => c.name.toLowerCase() === cleanName || c.name.toLowerCase().includes(cleanName) || cleanName.includes(c.name.toLowerCase())) || { emoji: '🎴', name: carta.replace(/\(.*?\)/g, '').trim() };
                          
                          return (
                            <React.Fragment key={cIdx}>
                              <div className="relative group/card cursor-default aspect-[3/4] w-28 md:w-32 flex items-center justify-center shrink-0 shadow-2xl transition-transform hover:-translate-y-2 mt-6 md:mt-4">
                                <div className="absolute -top-3 -left-3 w-6 h-6 rounded-full bg-leny-accent text-leny-dark flex items-center justify-center text-xs font-bold shadow-lg z-10 transition-transform group-hover/card:scale-110">
                                  {cIdx + 1}
                                </div>
                                <div className="w-full h-full bg-[#111620] border border-white/10 group-hover/card:border-leny-accent/60 rounded-xl flex flex-col items-center justify-center transition-all p-2 relative overflow-hidden ring-1 ring-white/5 group-hover/card:ring-leny-accent/30">
                                  <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent"></div>
                                  <span className="text-5xl drop-shadow-2xl mb-3 relative z-10 group-hover/card:scale-110 transition-transform">{cardData.emoji}</span>
                                  <span className="font-serif text-[13px] leading-tight text-white/90 relative z-10 tracking-wide font-medium text-center">
                                    {cardData.name}
                                  </span>
                                </div>
                              </div>
                              {cIdx < arr.length - 1 && (
                                <div className="hidden md:flex flex-col items-center justify-center text-white/30 font-light text-4xl mt-4">+</div>
                              )}
                            </React.Fragment>
                          );
                      })}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10">
                    <div className="space-y-6">
                      <div>
                        <div className="text-xs uppercase tracking-widest text-leny-accent/60 mb-3 font-bold">Lectura Razonada</div>
                        <EditorialText text={ej.lectura} className="text-leny-dim" />
                      </div>
                      
                      <div className="p-4 rounded-xl bg-white/5 border border-white/5">
                        <div className="text-xs uppercase tracking-widest text-leny-dim mb-3 font-bold flex items-center gap-2">
                          <ArrowRight className="w-3 h-3" /> Cambio de Orden
                        </div>
                        <EditorialText text={ej.cambio_orden} className="text-sm text-white/70 italic" />
                      </div>
                    </div>

                    <div className="space-y-6 flex flex-col justify-between">
                      <div>
                        <div className="text-xs uppercase tracking-widest flex items-center gap-2 text-blue-400 mb-3 font-bold">
                          <Filter className="w-3 h-3" /> Filtro: {ej.contexto}
                        </div>
                        <div className="p-5 rounded-xl bg-gradient-to-br from-leny-accent/20 to-transparent border-l-4 border-leny-accent">
                          <div className="text-xs uppercase tracking-widest text-leny-accent mb-3 font-bold">Conclusión Fundamental</div>
                          <EditorialText text={ej.conclusion} className="text-white font-medium" />
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
