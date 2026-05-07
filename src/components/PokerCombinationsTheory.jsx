import React, { useState, useRef } from 'react';
import { pokerCombinationsTheoryBlocks } from '../data/db/poker_combinations_theory';
import EditorialText from './EditorialText';
import { Crown, ArrowRight, BookOpen, Filter, Zap, ChevronRight, BookHeart } from 'lucide-react';
import { pokerCardsDictionary } from '../data/db/poker_cards';
import PageOutline from './PageOutline';
import PokerSpread from './PokerSpread';

const iconMap = {
  Crown,
  ArrowRight,
  BookOpen,
  Filter,
  Zap
};

export default function PokerCombinationsTheory() {
  const [activeTab, setActiveTab] = useState(pokerCombinationsTheoryBlocks[0].id);
  const scrollContainerRef = useRef(null);

  const activeBlock = pokerCombinationsTheoryBlocks.find(b => b.id === activeTab) || pokerCombinationsTheoryBlocks[0];
  const ActiveIcon = iconMap[activeBlock.icon] || BookOpen;

  const mapToPokerCardProps = (cartasStrings) => {
    if (!cartasStrings) return [];
    return cartasStrings.map(carta => {
      const cleanName = carta.replace(/\(.*?\)/g, '').trim().toLowerCase();
      let cardData = pokerCardsDictionary.find(c => c.name.toLowerCase() === cleanName || c.name.toLowerCase().includes(cleanName) || cleanName.includes(c.name.toLowerCase()));
      
      if (!cardData) {
        cardData = { emoji: carta.includes('♠️') ? '♠️' : carta.includes('♥️') ? '♥️' : carta.includes('♦️') ? '♦️' : carta.includes('♣️') ? '♣️' : '🎴', name: carta.replace(/\(.*?\)/g, '').trim() };
      }

      let valueStr = cardData.name.split(' ')[0];
      if(valueStr === 'As') valueStr = 'A';
      if(valueStr === 'Jota') valueStr = 'J';
      if(valueStr === 'Reina') valueStr = 'Q';
      if(valueStr === 'Rey') valueStr = 'K';
      
      return {
        value: valueStr,
        suit: cardData.emoji,
        meaning: '',
        name: cardData.name
      };
    });
  };

  const outlineSections = [
    { id: 'teoria', label: 'Marco Teórico' },
    { id: 'ejemplos', label: 'Casos Analizados' }
  ];

  return (
    <div className="h-full flex flex-col md:flex-row bg-[#0a0000] text-white overflow-hidden fade-in border-t border-red-900/20">
      {/* Sidebar de Navegación del Módulo */}
      <div className="w-full md:w-80 flex-shrink-0 bg-[#0f0202] border-r border-red-500/20 flex flex-col h-full md:h-auto overflow-y-auto custom-scrollbar shadow-[5px_0_15px_rgba(0,0,0,0.5)]">
        <div className="p-6 border-b border-red-900/40 sticky top-0 bg-[#0f0202]/95 backdrop-blur z-10">
          <div className="flex items-center gap-3 mb-2">
            <BookHeart className="w-8 h-8 text-red-500 drop-shadow-[0_0_8px_rgba(239,68,68,0.5)]" />
            <h2 className="text-2xl font-serif text-red-500 leading-tight tracking-wide">Sintaxis<br/>de Póker</h2>
          </div>
          <p className="text-sm text-red-200/60 mt-2">
            La estructura lingüística de las cartas. Sustantivos, adjetivos y contexto.
          </p>
        </div>
        
        <nav className="p-4 flex flex-col gap-2">
          {pokerCombinationsTheoryBlocks.map((block) => {
            const Icon = iconMap[block.icon] || BookOpen;
            const isActive = activeTab === block.id;
            return (
              <button
                key={block.id}
                onClick={() => setActiveTab(block.id)}
                className={`flex items-center gap-3 p-4 rounded-xl text-left transition-all duration-300 w-full group
                  ${isActive 
                    ? 'bg-red-500/10 border border-red-500/50 shadow-[0_0_15px_rgba(239,68,68,0.15)]' 
                    : 'bg-white/5 border border-transparent hover:bg-white/10 hover:border-red-500/30'}`}
              >
                <div className={`p-2 rounded-lg transition-colors ${isActive ? 'bg-red-500 text-white shadow-[0_0_10px_rgba(239,68,68,0.4)]' : 'bg-black text-red-400/50 group-hover:text-red-400'}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <span className={`font-medium leading-snug ${isActive ? 'text-red-400' : 'text-gray-400 group-hover:text-white'}`}>
                  {block.title.split(':')[0]}
                </span>
                {isActive && <ChevronRight className="w-4 h-4 text-red-500 ml-auto" />}
              </button>
            )
          })}
        </nav>
      </div>

      {/* Área de Visualización Principal */}
      <div className="flex-1 h-full overflow-y-auto custom-scrollbar bg-gradient-to-br from-[#050000] to-black pb-20 relative flex" ref={scrollContainerRef}>
        <div className="flex-1 max-w-6xl mx-auto p-6 md:p-12">
          
          <div className="mb-16 border-b border-red-900/30 pb-12 slide-up">
            <div className="p-4 rounded-2xl bg-red-950/40 w-max mb-6 border border-red-500/30 shadow-[0_0_20px_rgba(239,68,68,0.15)] flex items-center justify-center">
              <ActiveIcon className="w-8 h-8 text-red-500" />
            </div>
            
            <h1 id="teoria" className="text-3xl md:text-5xl font-serif text-white mb-10 leading-tight md:text-center scroll-mt-8 drop-shadow-md">
              {activeBlock.title}
            </h1>
            
            <div className="text-justify mt-6 text-gray-300 text-lg leading-relaxed font-light">
              <EditorialText text={activeBlock.content} />
            </div>
          </div>

          <div className="slide-up w-full" style={{animationDelay: '0.1s'}}>
            <h3 id="ejemplos" className="text-2xl font-serif text-red-500 mb-8 flex items-center gap-3 scroll-mt-12">
              <span className="w-8 h-px bg-red-500/50 inline-block"></span>
              {activeBlock.examplesTitle}
              <span className="flex-1 h-px bg-red-500/20 inline-block"></span>
            </h3>

            <div className="space-y-6">
              {activeBlock.examples.map((ej, idx) => (
                <div key={idx} className="bg-[#0f0505] border border-red-900/30 rounded-2xl p-6 md:p-8 hover:border-red-500/50 transition-all duration-300 group shadow-lg">
                  
                  <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-8 border-b border-red-900/30 pb-6">
                    <div className="flex-1">
                      <div className="text-[11px] font-bold tracking-widest text-red-400/80 uppercase mb-2">Pregunta Foco</div>
                      <div className="text-xl font-serif text-white group-hover:text-red-200 transition-colors italic">"{ej.pregunta}"</div>
                    </div>
                    
                    <div className="bg-[#1a0808] rounded-xl p-6 md:py-8 border border-red-500/10 flex flex-col items-center justify-center relative overflow-hidden shrink-0 mt-4 md:mt-0 shadow-inner min-w-[300px]">
                      <div className="text-[10px] text-red-500/60 uppercase tracking-widest text-center absolute w-full top-3 font-bold z-20">Combinación en Estudio</div>
                      
                      <div className="mt-6 flex justify-center w-full">
                        <PokerSpread 
                          layout="lineal3"
                          cards={mapToPokerCardProps(ej.combinacion.split('+'))}
                          showOrderBadge={false}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10">
                    <div className="space-y-6">
                      <div>
                        <div className="text-xs uppercase tracking-widest text-red-400/80 mb-3 font-bold">Lectura Razonada</div>
                        <EditorialText text={ej.lectura} className="text-gray-300" />
                      </div>
                      
                      <div className="p-4 rounded-xl bg-red-950/20 border border-red-900/30">
                        <div className="text-xs uppercase tracking-widest text-gray-400 mb-3 font-bold flex items-center gap-2">
                          <ArrowRight className="w-3 h-3 text-red-500" /> Cambio de Orden
                        </div>
                        <EditorialText text={ej.cambio_orden} className="text-sm text-gray-300 italic" />
                      </div>
                    </div>

                    <div className="space-y-6 flex flex-col justify-between">
                      <div>
                        <div className="text-xs uppercase tracking-widest flex items-center gap-2 text-red-400 mb-3 font-bold">
                          <Filter className="w-3 h-3" /> Filtro: {ej.contexto}
                        </div>
                        <div className="p-5 rounded-xl bg-gradient-to-br from-red-900/20 to-black border-l-4 border-red-600 shadow-lg">
                          <div className="text-xs uppercase tracking-widest text-red-500 mb-3 font-bold">Conclusión Fundamental</div>
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
