import React, { useState } from 'react';
import { pokerTripletsBlocks } from '../data/poker_triplets_theory';
import { Target, ScanSearch, Briefcase, AlertTriangle, ChevronRight, GalleryHorizontal, Network } from 'lucide-react';
import { pokerCardsDictionary } from '../data/db/poker_cards';
import EditorialText from './EditorialText';
import PokerSpread from './PokerSpread';

const iconMap = {
  Target,
  ScanSearch,
  Briefcase,
  AlertTriangle,
  Network
};

export default function PokerTripletsTheory() {
  const [activeTab, setActiveTab] = useState(pokerTripletsBlocks[0].id);

  const activeBlock = pokerTripletsBlocks.find(b => b.id === activeTab) || pokerTripletsBlocks[0];
  const ActiveIcon = iconMap[activeBlock.icon] || GalleryHorizontal;

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
        meaning: '' 
      };
    });
  };

  return (
    <div className="h-full flex flex-col md:flex-row bg-[#0a0000] text-white overflow-hidden fade-in border-t border-red-900/20">
      {/* Sidebar de Navegación del Módulo */}
      <div className="w-full md:w-80 flex-shrink-0 bg-black border-r border-red-900/30 flex flex-col h-full md:h-auto overflow-y-auto custom-scrollbar">
        <div className="p-6 border-b border-red-900/30 sticky top-0 bg-black/95 backdrop-blur z-10">
          <div className="flex items-center gap-3 mb-2">
            <GalleryHorizontal className="w-8 h-8 text-red-500" />
            <h2 className="text-2xl font-serif text-red-500 leading-tight">Módulo de<br/>3 Cartas</h2>
          </div>
          <p className="text-sm text-gray-400 mt-2">
            La Célula Narrativa: Dinámica lineal y resolución binaria de color.
          </p>
        </div>
        
        <nav className="p-4 flex flex-col gap-2">
          {pokerTripletsBlocks.map((block) => {
            const Icon = iconMap[block.icon] || GalleryHorizontal;
            const isActive = activeTab === block.id;
            return (
              <button
                key={block.id}
                onClick={() => setActiveTab(block.id)}
                className={`flex items-center gap-3 p-4 rounded-xl text-left transition-all duration-300 w-full group
                  ${isActive 
                    ? 'bg-red-500/10 border border-red-500 shadow-[0_0_15px_rgba(239,68,68,0.15)]' 
                    : 'bg-white/5 border border-transparent hover:bg-white/10 hover:border-red-500/30'}`}
              >
                <div className={`p-2 rounded-lg transition-colors ${isActive ? 'bg-red-500 text-black' : 'bg-red-950/30 text-gray-400 group-hover:text-red-400'}`}>
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
      <div className="flex-1 h-full overflow-y-auto custom-scrollbar bg-black/50">
        <div className="max-w-3xl mx-auto p-6 md:p-12 pb-32">
          
          <div className="mb-12 border-b border-red-900/30 pb-8 slide-up">
            <div className="p-4 rounded-2xl bg-red-500/10 w-max mb-6 border border-red-500/30 shadow-[0_0_20px_rgba(239,68,68,0.15)] flex items-center justify-center">
              <ActiveIcon className="w-8 h-8 text-red-500" />
            </div>
            
            <h1 className="text-4xl md:text-5xl font-serif text-white mb-6 leading-tight">
              {activeBlock.title}
            </h1>
            
            <EditorialText text={activeBlock.content} className="max-w-none text-gray-300 text-lg leading-relaxed mt-6" />
          </div>

          <div className="slide-up" style={{animationDelay: '0.1s'}}>
            <h3 className="text-2xl font-serif text-red-500 mb-8 flex items-center gap-3">
              <span className="w-8 h-px bg-red-500/50 inline-block"></span>
              {activeBlock.examplesTitle}
              <span className="flex-1 h-px bg-red-500/20 inline-block"></span>
            </h3>

            <div className="space-y-6">
              {activeBlock.examples.map((ej, idx) => (
                <div key={idx} className="bg-[#0f0000] border border-red-900/30 rounded-2xl p-6 md:p-8 hover:border-red-500/50 transition-colors group">
                  
                  <div className="flex flex-col gap-6 mb-8 border-b border-red-900/30 pb-6">
                    <div>
                      <div className="text-[11px] font-bold tracking-widest text-red-500/80 uppercase mb-2">Pregunta Foco</div>
                      <div className="text-xl font-serif text-white group-hover:text-red-400 transition-colors italic">"{ej.pregunta}"</div>
                    </div>
                    
                    {/* Visualización de la Tríada de Cartas */}
                    <div className="mb-6 w-full flex justify-center">
                      <PokerSpread 
                        layout="lineal3"
                        cards={mapToPokerCardProps(ej.cartas)}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-6">
                      <div>
                        <div className="text-xs uppercase tracking-widest text-red-500/60 mb-3 font-bold">Desglose Analítico</div>
                        <EditorialText text={ej.lectura} className="text-gray-300" />
                      </div>
                      
                      <div className="p-4 rounded-xl bg-white/5 border border-white/5">
                        <div className="text-xs uppercase tracking-widest text-gray-400 mb-3 font-bold flex items-center gap-2">
                          <Network className="w-3 h-3" /> Alteración / Contexto Secundario
                        </div>
                        <EditorialText text={ej.cambio_orden} className="text-sm text-gray-300/80 italic" />
                      </div>
                    </div>

                    <div className="space-y-6 flex flex-col justify-between">
                      <div>
                        <div className="text-xs uppercase tracking-widest flex items-center gap-2 text-blue-400 mb-3 font-bold">
                          <AlertTriangle className="w-3 h-3" /> Filtro: {ej.contexto}
                        </div>
                        <div className="p-5 rounded-xl bg-gradient-to-br from-red-500/20 to-transparent border-l-4 border-red-500 h-full">
                          <div className="text-xs uppercase tracking-widest text-red-400 mb-3 font-bold">Corolario Final</div>
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
      </div>
    </div>
  );
}
