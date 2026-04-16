import React, { useState } from 'react';
import { quintetsBlocks } from '../data/quintets_theory';
import { Target, Clock, AlignLeft, Network, Filter, ChevronRight, LayoutPanelTop } from 'lucide-react';
import { cardsDictionary } from '../data/db/lenormand_cards';
import EditorialText from './EditorialText';
import PositionBreakdown from './PositionBreakdown';

const iconMap = {
  Target,
  Clock,
  Network,
  AlignLeft,
  Filter
};

export default function QuintetsTheory() {
  const [activeTab, setActiveTab] = useState(quintetsBlocks[0].id);

  const activeBlock = quintetsBlocks.find(b => b.id === activeTab) || quintetsBlocks[0];
  const ActiveIcon = iconMap[activeBlock.icon] || LayoutPanelTop;

  return (
    <div className="h-full flex flex-col md:flex-row bg-leny-darker text-white overflow-hidden fade-in">
      {/* Sidebar de Navegación del Módulo */}
      <div className="w-full md:w-80 flex-shrink-0 bg-leny-dark border-r border-leny-accent/20 flex flex-col h-full md:h-auto overflow-y-auto custom-scrollbar">
        <div className="p-6 border-b border-leny-accent/10 sticky top-0 bg-leny-dark/95 backdrop-blur z-10">
          <div className="flex items-center gap-3 mb-2">
            <LayoutPanelTop className="w-8 h-8 text-leny-accent" />
            <h2 className="text-2xl font-serif text-leny-accent leading-tight">Módulo de<br/>Quintetos</h2>
          </div>
          <p className="text-sm text-leny-dim mt-2">
            Clase Dinámica: Explorando el poder narrativo de la tirada de 5 cartas.
          </p>
        </div>
        
        <nav className="p-4 flex flex-col gap-2">
          {quintetsBlocks.map((block) => {
            const Icon = iconMap[block.icon] || LayoutPanelTop;
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
      <div className="flex-1 h-full overflow-y-auto custom-scrollbar bg-leny-darker/50">
        <div className="max-w-5xl mx-auto p-6 md:p-12 pb-32">
          
          <div className="mb-12 border-b border-white/10 pb-8 slide-up">
            <div className="p-4 rounded-2xl bg-leny-accent/10 w-max mb-6 border border-leny-accent/30 shadow-[0_0_20px_rgba(255,215,0,0.15)] flex items-center justify-center">
              <ActiveIcon className="w-8 h-8 text-leny-accent" />
            </div>
            
            <h1 className="text-3xl md:text-5xl font-serif text-white mb-6 leading-tight">
              {activeBlock.title}
            </h1>
            
            <EditorialText text={activeBlock.content} className="max-w-none text-leny-dim text-lg leading-relaxed mt-6" />
          </div>

          <div className="slide-up" style={{animationDelay: '0.1s'}}>
            <h3 className="text-2xl font-serif text-leny-accent mb-8 flex items-center gap-3">
              <span className="w-8 h-px bg-leny-accent/50 inline-block"></span>
              {activeBlock.examplesTitle}
              <span className="flex-1 h-px bg-leny-accent/10 inline-block"></span>
            </h3>

            <div className="space-y-8">
              {activeBlock.examples.map((ej, idx) => (
                <div key={idx} className="bg-leny-dark border border-white/10 rounded-2xl p-6 md:p-8 hover:border-leny-accent/30 transition-colors group">
                  
                  <div className="flex flex-col gap-6 mb-8 border-b border-white/5 pb-6">
                    <div>
                      <div className="text-[11px] font-bold tracking-widest text-leny-accent/80 uppercase mb-2">Contexto de la Consulta</div>
                      <div className="text-xl font-serif text-white group-hover:text-leny-accent transition-colors italic">"{ej.contexto}"</div>
                    </div>
                    
                    {/* Visualización del Quinteto de Cartas */}
                    <div className="bg-leny-darker rounded-xl p-6 md:py-12 border border-white/5 flex flex-wrap md:flex-nowrap items-center justify-center gap-4 md:gap-3 w-full relative overflow-hidden">
                      {ej.cartas && ej.cartas.map((carta, cIdx) => {
                        const isCenter = cIdx === 2;
                        const cleanName = carta.replace(/\(.*?\)/g, '').trim().toLowerCase();
                        const cardData = cardsDictionary.find(c => c.name.toLowerCase() === cleanName || c.name.toLowerCase().includes(cleanName) || cleanName.includes(c.name.toLowerCase())) || { emoji: '🎴', name: carta.replace(/\(.*?\)/g, '').trim() };
                        
                        return (
                          <React.Fragment key={cIdx}>
                            <div className={`relative group/card cursor-default aspect-[3/4] ${isCenter ? 'w-36 md:w-40 scale-105 z-20 shadow-[0_0_40px_rgba(255,215,0,0.15)]' : 'w-28 md:w-32 z-10 opacity-90 hover:opacity-100'} flex items-center justify-center shrink-0 shadow-2xl transition-all hover:-translate-y-2`}>
                              {/* Posición indicadora (1 a 5) */}
                              <div className={`absolute -top-3 -left-3 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shadow-lg z-30 transition-transform group-hover/card:scale-110
                                ${isCenter ? 'bg-white text-leny-dark scale-110' : 'bg-leny-accent text-leny-dark'}`}>
                                {cIdx + 1}
                              </div>
                              <div className={`w-full h-full bg-[#111620] border group-hover/card:border-leny-accent/60 rounded-xl flex flex-col items-center justify-center transition-all p-2 relative overflow-hidden ring-1 group-hover/card:ring-leny-accent/30
                                ${isCenter ? 'border-leny-accent/50 ring-leny-accent/20 bg-[#161b26]' : 'border-white/10 ring-white/5'}`}>
                                <div className={`absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent ${isCenter ? 'from-leny-accent/10' : ''}`}></div>
                                <span className={`${isCenter ? 'text-6xl drop-shadow-[0_0_15px_rgba(255,215,0,0.3)]' : 'text-5xl drop-shadow-2xl'} mb-3 relative z-10 group-hover/card:scale-110 transition-transform`}>{cardData.emoji}</span>
                                <span className={`font-serif leading-tight text-white/90 relative z-10 tracking-wide text-center ${isCenter ? 'text-[14px] font-bold text-leny-accent/90' : 'text-[12px] font-medium'}`}>
                                  {cardData.name}
                                </span>
                              </div>
                            </div>
                            {cIdx < ej.cartas.length - 1 && (
                              <ChevronRight className="hidden md:block w-4 h-4 text-white/10 flex-shrink-0" />
                            )}
                          </React.Fragment>
                        );
                      })}
                    </div>

                    <div className="mt-6 w-full">
                      <PositionBreakdown posicionesText={ej.interpretacion} />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-6">
                      <div>
                        <div className="text-xs uppercase tracking-widest text-leny-accent/60 mb-3 font-bold flex items-center gap-2">
                          <Network className="w-3 h-3" /> Lectura Desglosada (Tramos / Espejos)
                        </div>
                        <EditorialText text={ej.tramos} className="text-leny-dim" />
                      </div>
                      
                      <div className="p-4 rounded-xl bg-white/5 border border-white/5">
                        <div className="text-xs uppercase tracking-widest text-leny-dim mb-3 font-bold flex items-center gap-2">
                          <Target className="w-3 h-3" /> Variación por Orden
                        </div>
                        <EditorialText text={ej.cambio_orden} className="text-sm text-white/70 italic" />
                      </div>
                    </div>

                    <div className="space-y-6 flex flex-col justify-between">
                      <div className="p-5 rounded-xl bg-gradient-to-br from-leny-accent/20 to-transparent border-l-4 border-leny-accent">
                        <div className="text-xs uppercase tracking-widest text-leny-accent mb-3 font-bold">Conclusión Ejecutiva</div>
                        <EditorialText text={ej.conclusion} className="text-white font-medium" />
                      </div>

                      <div className="p-4 rounded-xl border border-leny-accent/30 bg-leny-accent/5 relative overflow-hidden group/tip">
                        <div className="absolute top-0 right-0 w-16 h-16 bg-leny-accent/10 rounded-bl-full -mr-8 -mt-8 transition-transform group-hover/tip:scale-150"></div>
                        <div className="text-xs uppercase tracking-widest text-leny-accent mb-3 font-bold flex items-center gap-2 relative z-10">
                          <AlignLeft className="w-3 h-3" /> Enseñanza Técnica Clave
                        </div>
                        <EditorialText text={ej.enseñanza} className="text-sm text-leny-dim font-serif italic relative z-10" />
                      </div>
                    </div>
                  </div>

                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
