import React, { useState } from 'react';
import { BookOpen, Layers, LayoutPanelTop, Hash, ChevronRight, Eye, AlertTriangle, Target, Network } from 'lucide-react';
import { pokerExamplesBank } from '../data/poker_examples_bank';
import { pokerCardsDictionary } from '../data/db/poker_cards';
import EditorialText from './EditorialText';
import PositionBreakdown from './PositionBreakdown';
import PokerSpread from './PokerSpread';

const allCategories = [
  { id: 'combinacion', name: 'Sintaxis y Combinaciones', icon: Network },
  { id: 'lineal3', name: 'Tiradas de 3 Cartas', icon: Layers },
  { id: 'cruz5', name: 'Tirada de 5 Cartas (Cruz)', icon: LayoutPanelTop },
  { id: 'matriz9', name: 'Matriz 3x3 (9 Cartas)', icon: Hash }
];

export default function PokerExamplesBank() {
  const [activeCategory, setActiveCategory] = useState('combinacion');
  const [activeExample, setActiveExample] = useState(null);

  const categoryExamples = pokerExamplesBank.filter(e => e.type === activeCategory);

  const getCardData = (cartaText) => {
    const cleanName = cartaText.replace(/\(.*?\)/g, '').trim().toLowerCase();
    let cardData = pokerCardsDictionary.find(c => c.name.toLowerCase() === cleanName || c.name.toLowerCase().includes(cleanName) || cleanName.includes(c.name.toLowerCase()));
    
    if (!cardData) {
        cardData = { 
            emoji: cartaText.includes('♠️') ? '♠️' : cartaText.includes('♥️') ? '♥️' : cartaText.includes('♦️') ? '♦️' : cartaText.includes('♣️') ? '♣️' : '🎴', 
            name: cartaText.replace(/\(.*?\)/g, '').trim(), 
            color: cartaText.includes('♥️') || cartaText.includes('♦️') ? 'rojo' : cartaText.includes('♠️') || cartaText.includes('♣️') ? 'negro' : '' 
        };
    }
    
    const meaningMatch = cartaText.match(/\((.*?)\)/);
    if (meaningMatch) {
      cardData = { ...cardData, meaning: meaningMatch[1] };
    }

    return cardData;
  };

  const mapToPokerCardProps = (cartasStrings) => {
    return cartasStrings.map(carta => {
      const data = getCardData(carta);
      let valueStr = data.name.split(' ')[0];
      if(valueStr === 'As') valueStr = 'A';
      if(valueStr === 'Jota') valueStr = 'J';
      if(valueStr === 'Reina') valueStr = 'Q';
      if(valueStr === 'Rey') valueStr = 'K';
      
      return {
        value: valueStr,
        suit: data.emoji,
        meaning: data.meaning,
        name: data.name
      };
    });
  };



  return (
    <div className="h-full flex flex-col md:flex-row bg-[#0a0000] text-white overflow-hidden fade-in border-t border-red-900/20">
      
      {/* Sidebar de Categorías */}
      <div className={`w-full md:w-80 flex-shrink-0 bg-black border-r border-red-900/30 flex flex-col h-full md:h-auto overflow-y-auto custom-scrollbar z-20 ${activeExample ? 'hidden md:flex' : 'flex'}`}>
        <div className="p-6 border-b border-red-900/30 sticky top-0 bg-black/95 backdrop-blur z-10">
          <div className="flex items-center gap-3 mb-2">
            <BookOpen className="w-8 h-8 text-red-500" />
            <h2 className="text-2xl font-serif text-red-500 leading-tight">Aula<br/>Práctica</h2>
          </div>
          <p className="text-sm text-gray-400 mt-2 mb-4">
            Biblioteca de casos reales y ejemplos completos de estudio.
          </p>
        </div>
        
        <nav className="p-4 flex flex-col gap-2">
          {allCategories.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
               <button
                 key={cat.id}
                 onClick={() => { setActiveCategory(cat.id); setActiveExample(null); }}
                 className={`flex items-center gap-3 p-4 rounded-xl text-left transition-all duration-300 w-full group
                   ${isActive 
                     ? 'bg-red-500/10 border border-red-500 shadow-[0_0_15px_rgba(239,68,68,0.15)]' 
                     : 'bg-white/5 border border-transparent hover:bg-white/10 hover:border-red-500/30'}`}
               >
                 <div className={`p-2 rounded-lg transition-colors ${isActive ? 'bg-red-500 text-black' : 'bg-red-950/30 text-gray-400 group-hover:text-red-400'}`}>
                   <cat.icon className="w-5 h-5" />
                 </div>
                 <div className="flex-1">
                    <span className={`block font-medium leading-snug ${isActive ? 'text-red-400' : 'text-gray-400 group-hover:text-white'}`}>
                      {cat.name}
                    </span>
                 </div>
               </button>
            )
          })}
        </nav>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 h-full overflow-y-auto custom-scrollbar bg-black/50">
        
        {!activeExample ? (
           /* Listado de Ejemplos */
           <div className="p-4 sm:p-6 md:p-12 pb-32 slide-up overflow-y-auto custom-scrollbar h-full book-content">
              <div className="flex flex-col mb-12">
                <div className="bg-white/[0.02] border border-red-900/20 rounded-3xl p-6 sm:p-8 md:p-12 shadow-inner text-center relative overflow-hidden">
                  <div className="text-[10px] text-red-500 uppercase tracking-[0.3em] font-bold mb-4 md:mb-6 opacity-80 decoration-red-500/30 underline underline-offset-4">
                     Expedientes Clínicos
                  </div>
                  <h1 className="text-2xl sm:text-3xl lg:text-5xl font-serif text-white mb-4 md:mb-6 relative z-10 drop-shadow-md">
                    {allCategories.find(c => c.id === activeCategory)?.name}
                  </h1>
                  <p className="text-gray-400 mb-8 max-w-2xl mx-auto leading-relaxed text-sm md:text-lg relative z-10 font-light">
                    Selecciona un caso de estudio extraído del Tratado Didáctico para analizar su desglose y sintaxis gramatical.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
                 {categoryExamples.map((ex, index) => (
                    <button 
                      key={ex.id}
                      onClick={() => setActiveExample(ex)}
                      className="p-6 rounded-2xl bg-[#0f0000] border border-red-900/30 hover:border-red-500/50 hover:-translate-y-1 shadow-lg overflow-hidden text-left flex flex-col transition-all group"
                    >
                      <div className="text-[10px] text-red-500/80 uppercase tracking-widest font-bold mb-2 flex items-center gap-2">
                        <Target className="w-3 h-3" /> Caso de Estudio {index + 1}
                      </div>
                      <h3 className="font-serif text-xl text-white mb-3 group-hover:text-red-400 transition-colors">
                        {ex.title}
                      </h3>
                      <p className="text-sm text-gray-400 line-clamp-3 italic mb-4">
                        "{ex.contexto}"
                      </p>
                      <div className="mt-auto text-[10px] uppercase tracking-widest text-red-500 font-bold flex items-center gap-1 group-hover:translate-x-1 transition-transform w-max">
                        Abrir Expediente <ChevronRight size={12} strokeWidth={3} />
                      </div>
                    </button>
                 ))}
              </div>
           </div>
        ) : (
           /* Vista de Ejemplo Activo */
           <div className="p-4 md:p-10 lg:p-16 pb-32 max-w-4xl mx-auto fade-in">
              <button 
                onClick={() => setActiveExample(null)}
                className="mb-6 md:mb-8 text-xs md:text-sm text-red-500/70 hover:text-red-400 flex items-center gap-2 transition-colors py-2"
              >
                ← Volver al listado de casos
              </button>

              <div className="bg-[#0c0505] border border-red-900/30 rounded-3xl p-6 md:p-10 lg:p-14 shadow-2xl relative overflow-hidden">
                 
                 {/* Cabecera Enunciado */}
                 <div className="mb-8 md:mb-10 relative z-10 flex flex-col md:flex-row md:items-start justify-between gap-4">
                    <div>
                      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 text-red-500 text-[10px] sm:text-xs font-bold tracking-widest uppercase mb-4 border border-red-500/20">
                         {activeExample.title}
                      </div>
                      <div className="text-xl sm:text-2xl md:text-3xl font-serif text-white mb-2 leading-relaxed font-light italic">
                         "{activeExample.contexto}"
                      </div>
                    </div>
                 </div>

                 <div className="w-full h-px bg-gradient-to-r from-transparent via-red-900/30 to-transparent mb-10"></div>

                 {/* Mesa de Cartas - INTEGRACIÓN GLOBAL */}
                 <div className="mb-14 relative z-10 w-full flex justify-center">
                    <PokerSpread 
                      layout={activeExample.type}
                      cards={mapToPokerCardProps(activeExample.cartas)} 
                      showOrderBadge={activeExample.type !== 'combinacion'}
                    />
                 </div>

                 {activeExample.posiciones && (
                    <div className="mb-10">
                      <PositionBreakdown posicionesText={activeExample.posiciones.map(p => `**${p.pos} (${p.nombre}):** ${p.carta}`).join('\n')} />
                    </div>
                 )}

                 {/* Desglose Analítico */}
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                    <div className="space-y-6">
                      <div>
                        <div className="text-xs uppercase tracking-widest text-red-500/60 mb-3 font-bold flex items-center gap-2">
                          <Eye className="w-3 h-3" /> Lectura Paso a Paso
                        </div>
                        <EditorialText text={activeExample.analisis} className="text-gray-300" />
                      </div>
                    </div>

                    <div className="space-y-6 flex flex-col justify-between">
                      <div className="p-5 rounded-xl bg-gradient-to-br from-red-500/20 to-transparent border-l-4 border-red-500 h-full">
                        <div className="text-xs uppercase tracking-widest text-red-400 mb-3 font-bold">Conclusión Ejecutiva</div>
                        <EditorialText text={activeExample.conclusion} className="text-white font-medium" />
                      </div>
                      
                      <div className="p-4 rounded-xl bg-black/40 border border-white/5 relative overflow-hidden group/tip">
                        <div className="text-xs uppercase tracking-widest text-orange-400/80 mb-3 font-bold flex items-center gap-2 relative z-10">
                          <AlertTriangle className="w-3 h-3" /> Alerta de Error Frecuente
                        </div>
                        <EditorialText text={activeExample.errorFrecuente} className="text-sm text-gray-400 italic relative z-10" />
                      </div>
                    </div>
                 </div>

              </div>
           </div>
        )}
      </div>
    </div>
  );
}
