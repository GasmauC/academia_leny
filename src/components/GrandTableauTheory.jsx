import React, { useState, useRef } from 'react';
import { gtBlocks } from '../data/grandtableau_theory';
import EditorialText from './EditorialText';
import { LayoutGrid, Layers, Network, Maximize, Target, ChevronRight, GraduationCap } from 'lucide-react';
import { cardsDictionary } from '../data/db/lenormand_cards';
import PageOutline from './PageOutline';

const iconMap = {
  Grid: LayoutGrid,
  Layers,
  Network,
  Maximize,
  Target
};

export default function GrandTableauTheory() {
  const [activeTab, setActiveTab] = useState(gtBlocks[0].id);
  const scrollContainerRef = useRef(null);

  const activeBlock = gtBlocks.find(b => b.id === activeTab) || gtBlocks[0];
  const ActiveIcon = iconMap[activeBlock.icon] || LayoutGrid;

  const outlineSections = [
    { id: 'teoria', label: 'Marco Teórico' },
    { id: 'ejemplos', label: 'Casos Analizados' }
  ];

  return (
    <div className="h-full flex flex-col md:flex-row bg-leny-darker text-white overflow-hidden fade-in">
      {/* Sidebar de Navegación del Módulo Gran Cuadro */}
      <div className="w-full md:w-80 flex-shrink-0 bg-leny-dark border-r border-leny-accent/20 flex flex-col h-full md:h-auto overflow-y-auto custom-scrollbar">
        <div className="p-6 border-b border-leny-accent/10 sticky top-0 bg-leny-dark/95 backdrop-blur z-10">
          <div className="flex items-center gap-3 mb-2">
            <GraduationCap className="w-8 h-8 text-leny-accent" />
            <h2 className="text-2xl font-serif text-leny-accent leading-tight">Módulo<br/>Grand Tableau</h2>
          </div>
          <p className="text-sm text-leny-dim mt-2">
            La Joya de la Corona. 36 cartas desplegadas y su cartografía absoluta de destinos.
          </p>
        </div>
        
        <nav className="p-4 flex flex-col gap-2">
          {gtBlocks.map((block) => {
            const Icon = iconMap[block.icon] || LayoutGrid;
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

      {/* Área de Visualización Principal GT */}
      <div className="flex-1 h-full overflow-y-auto custom-scrollbar bg-leny-darker/50 pb-20 relative flex" ref={scrollContainerRef}>
        <div className="flex-1 max-w-7xl mx-auto p-4 md:p-10">
          
          <div className="mb-12 border-b border-white/10 pb-8 slide-up">
            <div className="p-4 rounded-2xl bg-leny-accent/10 w-max mb-6 border border-leny-accent/30 shadow-[0_0_20px_rgba(255,215,0,0.15)] flex items-center justify-center">
              <ActiveIcon className="w-8 h-8 text-leny-accent" />
            </div>
            
            <h1 id="teoria" className="text-3xl md:text-5xl font-serif text-white mb-6 leading-tight scroll-mt-8">
              {activeBlock.title}
            </h1>
            
            <EditorialText text={activeBlock.content} className="max-w-none text-leny-dim text-lg leading-relaxed mt-6" />
          </div>

          <div className="slide-up w-full" style={{animationDelay: '0.1s'}}>
            <h3 id="ejemplos" className="text-2xl font-serif text-leny-accent mb-8 flex items-center gap-3 scroll-mt-12">
              <span className="w-8 h-px bg-leny-accent/50 inline-block"></span>
              {activeBlock.examplesTitle}
              <span className="flex-1 h-px bg-leny-accent/10 inline-block"></span>
            </h3>

            <div className="space-y-16">
              {activeBlock.examples.map((ej, idx) => (
                <div key={idx} className="bg-leny-dark border border-white/10 rounded-2xl p-6 md:p-10 hover:border-leny-accent/30 transition-colors group flex flex-col gap-10">
                  
                  {/* Fila Top: Contexto y Tablero Masivo */}
                  <div className="flex flex-col xl:flex-row gap-10">
                    <div className="xl:w-1/3 flex flex-col justify-center">
                      <div className="text-[11px] font-bold tracking-widest text-leny-accent/80 uppercase mb-3">Expediente Vital</div>
                      <div className="text-2xl font-serif text-white group-hover:text-leny-accent transition-colors italic leading-snug">
                        "{ej.contexto}"
                      </div>
                      
                      {ej.ancla && (
                        <div className="mt-8 p-5 bg-leny-darker/80 border border-leny-accent/20 rounded-xl relative overflow-hidden">
                           <div className="absolute top-0 right-0 w-16 h-16 bg-leny-accent/5 rounded-full blur-xl -mr-8 -mt-8"></div>
                           <span className="font-bold text-leny-accent block mb-2 uppercase text-xs tracking-widest flex items-center gap-2">
                             <Target className="w-4 h-4" /> Ancla de Coordenadas:
                           </span>
                           <EditorialText text={ej.ancla} className="text-white text-sm" />
                        </div>
                      )}
                    </div>
                    
                    {/* Mesa Gigante (Gran Cuadro) 9x4 Grid */}
                    <div className="xl:w-2/3 flex-shrink-0 bg-black/40 rounded-2xl p-6 border border-white/5 shadow-2xl flex flex-col items-center justify-center">
                      <div className="text-[10px] text-leny-dim/60 mb-6 uppercase tracking-widest text-center w-full border-b border-white/5 pb-2">
                        Despliegue Panorámico (Cartografía 9x4)
                      </div>
                      
                      {/* Generando el Grid 9x4 */}
                      <div className="w-full">
                        <div className="grid grid-cols-9 gap-1.5 md:gap-2">
                          {ej.cartas && ej.cartas.map((carta, cIdx) => {
                            // Extraemos el número para simplificar la vista en móviles
                            const match = carta.match(/\((.*?)\)/);
                            const num = match ? match[1] : '';
                            const name = carta.replace(/\(.*?\)/g, '').trim();
                            const cleanName = name.toLowerCase();
                            const cardData = cardsDictionary.find(c => c.name.toLowerCase() === cleanName || c.name.toLowerCase().includes(cleanName) || cleanName.includes(c.name.toLowerCase())) || { emoji: '🎴', name: name };

                            return (
                              <div key={cIdx} className="relative group/gtcard aspect-[2.5/4] sm:aspect-[3/4] flex items-center justify-center overflow-hidden">
                                <div className="absolute inset-0 bg-[#111620] border border-white/10 rounded sm:rounded-md transition-all group-hover/gtcard:bg-white/10 group-hover/gtcard:border-leny-accent/50 group-hover/gtcard:z-20 group-hover/gtcard:scale-105 shadow-sm flex flex-col items-center justify-between p-1 sm:p-2 cursor-pointer">
                                  
                                  {/* Número de Casa subyacente (C1 a C36) */}
                                  <div className="w-full flex justify-between items-start opacity-40 group-hover/gtcard:opacity-100 transition-opacity z-10 absolute top-1 px-1 left-0">
                                    <span className="text-[8px] sm:text-[9px] text-blue-300 font-mono">C{cIdx + 1}</span>
                                    {num && <span className="text-[8px] sm:text-[10px] bg-leny-accent text-black font-bold px-1 rounded-sm shadow-sm">{num}</span>}
                                  </div>

                                  <div className="h-3 sm:h-4"></div> {/* spacer */}
                                  <span className="text-xl sm:text-2xl drop-shadow-md z-10 transition-transform group-hover:scale-110 mb-0.5">{cardData.emoji}</span>

                                  <span className="font-serif text-[7px] sm:text-[9px] md:text-[11px] leading-tight text-white/90 text-center font-medium drop-shadow-md z-10">
                                    {cardData.name}
                                  </span>
                                  
                                  {/* Invisible spacer for bottom alignment */}
                                  <div className="h-1"></div>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Fila Inferior: Análisis y Conclusión */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 bg-leny-darker/30 p-8 rounded-2xl border border-white/5">
                    <div className="space-y-8">
                      <div>
                        <div className="text-xs uppercase tracking-widest text-leny-accent/60 mb-3 font-bold flex items-center gap-2">
                          <Network className="w-4 h-4" /> Desglose Operativo y Extracción Científica
                        </div>
                        <EditorialText text={ej.lectura} className="text-white/80 text-[15px]" />
                      </div>
                      
                      <div className="p-5 rounded-xl bg-gradient-to-br from-leny-accent/20 via-leny-accent/5 to-transparent border-l-4 border-leny-accent">
                        <div className="text-xs uppercase tracking-widest text-leny-accent mb-3 font-bold">Diagnóstico Macro y Resolución Táctica</div>
                        <EditorialText text={ej.sintesis} className="text-white font-medium text-[15.5px]" />
                      </div>
                    </div>

                    <div className="flex flex-col justify-end">
                      <div className="p-6 rounded-xl border border-leny-accent/30 bg-leny-accent/5 relative overflow-hidden group/tip">
                        <div className="absolute top-0 right-0 w-24 h-24 bg-leny-accent/10 rounded-bl-full -mr-8 -mt-8 transition-transform group-hover/tip:scale-150"></div>
                        <div className="text-[11px] uppercase tracking-widest text-leny-accent mb-3 font-bold flex items-center gap-2 relative z-10">
                          <Maximize className="w-4 h-4" /> Principio del Sistema GT Empleado
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
        
        <PageOutline sections={outlineSections} scrollContainerRef={scrollContainerRef} />
      </div>
    </div>
  );
}
