import React, { useState, useEffect } from 'react';
import { BookOpen, AlertTriangle, Sparkles, Layers, History, Hash, Network, ChevronLeft, ChevronRight, CheckCircle2, Target } from 'lucide-react';
import EditorialText from './EditorialText';
import pokerCardsTheory from '../data/db/poker_cards_theory.json';
import { pokerExercisesBank } from '../data/poker_exercises_bank';
import PokerCard from './PokerCard';

const PokerCardProfile = ({ card, onClose, onNext, onPrev }) => {
  const [activeTab, setActiveTab] = useState('base');

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight' && onNext) onNext();
      if (e.key === 'ArrowLeft' && onPrev) onPrev();
      if (e.key === 'Escape' && onClose) onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onNext, onPrev, onClose]);

  useEffect(() => {
    setActiveTab('base');
  }, [card]);

  if (!card) return null;

  const cardColor = card.color === 'rojo' ? 'text-red-500' : 'text-gray-300';
  const cardBorder = card.color === 'rojo' ? 'border-red-500' : 'border-gray-500';
  const cardBg = card.color === 'rojo' ? 'bg-red-500' : 'bg-gray-500';

  // Obtener teoría de la carta
  const theory = pokerCardsTheory.poker_cards_theory.find(c => 
    c.id === card.id || 
    c.nombre === card.name || 
    c.name === card.name
  ) || {};

  // Buscar ejercicios relacionados (donde aparezca esta carta)
  const cleanCardName = card.name.replace(/\(.*?\)/g, '').trim().toLowerCase();
  const relatedExercises = pokerExercisesBank.filter(ej => {
    return ej.cartas.some(c => {
      const cClean = c.replace(/\(.*?\)/g, '').trim().toLowerCase();
      return cClean === cleanCardName || cClean.includes(cleanCardName);
    });
  });

  return (
    <div className="flex flex-col h-full bg-[#0a0a0c] text-gray-200 overflow-hidden rounded-xl border border-red-500/20 shadow-2xl relative">
      {/* Encabezado */}
      <div className="relative overflow-hidden shrink-0 bg-gradient-to-b from-[#1a0f0f] to-[#0a0a0c] border-b border-red-500/20 p-6 flex items-center justify-between pt-12 min-h-[220px]">
        <div className="absolute top-0 right-0 w-64 h-64 bg-red-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4"></div>
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors z-30 bg-black/20 hover:bg-black/50 p-2 rounded-full"
        >
          ✕
        </button>
        
        {/* Navigation Arrows */}
        {onPrev && (
          <button onClick={onPrev} className="hidden md:flex p-3 rounded-full bg-black/40 hover:bg-red-500 hover:text-black text-red-500 transition-all z-20 group absolute left-6 border border-white/5 backdrop-blur-sm shadow-xl">
            <ChevronLeft className="w-8 h-8 group-hover:-translate-x-1 transition-transform" />
          </button>
        )}
        {onNext && (
          <button onClick={onNext} className="hidden md:flex p-3 rounded-full bg-black/40 hover:bg-red-500 hover:text-black text-red-500 transition-all z-20 group absolute right-6 top-[50%] -translate-y-[50%] border border-white/5 backdrop-blur-sm shadow-xl">
            <ChevronRight className="w-8 h-8 group-hover:translate-x-1 transition-transform" />
          </button>
        )}
        
        <div className="relative z-10 flex flex-col md:flex-row items-center md:items-start text-center md:text-left gap-6 mx-auto max-w-2xl px-12">
          <div className="shrink-0 relative z-10 shadow-[0_0_30px_rgba(0,0,0,0.5)] rounded-xl">
             <PokerCard 
               value={card.number} 
               suit={card.emoji}
               size="md"
             />
          </div>
          <div className="flex flex-col justify-center">
            <div className="flex items-center justify-center md:justify-start gap-3 mb-2">
              <span className={`px-2 py-0.5 rounded text-xs font-bold tracking-wider ${cardBg}/10 ${cardColor} border ${cardBorder}/20`}>
                {card.number}
              </span>
              <span className="text-xs text-gray-400 uppercase tracking-widest">{card.suit}</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-serif text-white mb-3 tracking-tight">{card.name}</h1>
            <p className="text-red-400/80 font-bold uppercase tracking-widest text-sm">{theory.funcion || 'Función en estudio'}</p>
          </div>
        </div>
      </div>

      {/* Pestañas */}
      <div className="flex px-2 border-b border-white/5 shrink-0 bg-black/50 overflow-x-auto custom-scrollbar">
        {[
          { id: 'base', label: '1. Significado', icon: Hash },
          { id: 'simbolismo', label: '2. Simbolismo e Historia', icon: Layers },
          { id: 'contexto', label: '3. Contexto de Uso', icon: BookOpen },
          { id: 'combinaciones', label: '4. Combinaciones', icon: Network }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-5 py-4 text-sm font-medium transition-all whitespace-nowrap border-b-2 outline-none ${
              activeTab === tab.id 
                ? 'border-red-500 text-red-500 bg-red-500/5' 
                : 'border-transparent text-gray-500 hover:text-white hover:bg-white/5'
            }`}
          >
            <tab.icon className={`w-4 h-4 ${activeTab === tab.id ? 'text-red-500' : 'opacity-50'}`} />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Contenido */}
      <div className="flex-1 overflow-y-auto p-6 md:p-8 custom-scrollbar relative">
        <div className="max-w-3xl mx-auto space-y-8 pb-12">
          
          {/* TAB 1: SIGNIFICADO */}
          {activeTab === 'base' && (
            <div className="space-y-8 animate-fade-in fade-in">
              <div className="bg-red-500/5 border border-red-500/20 rounded-xl p-6 md:p-8 relative overflow-hidden shadow-inner">
                <Sparkles className="absolute top-4 right-4 w-32 h-32 text-red-500/5 -rotate-12 pointer-events-none" />
                <h3 className="text-sm uppercase tracking-[0.2em] text-red-400/70 font-bold mb-3 relative z-10">Significado Base</h3>
                <div className="text-xl md:text-2xl text-white font-serif leading-relaxed relative z-10">
                  {theory.significado_base ? <EditorialText text={theory.significado_base} /> : <span className="opacity-50 italic">Pendiente de ingesta desde el PDF.</span>}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-5 rounded-xl bg-gradient-to-br from-[#141518] to-black border border-white/5 text-center">
                  <div className="text-gray-400 text-[10px] font-bold tracking-widest uppercase mb-2">Polaridad Energética</div>
                  <div className="text-white font-medium text-lg">{theory.polaridad || '-'}</div>
                </div>
                <div className="p-5 rounded-xl bg-gradient-to-br from-[#141518] to-black border border-white/5 text-center">
                  <div className="text-gray-400 text-[10px] font-bold tracking-widest uppercase mb-2">Palabras Clave (Función)</div>
                  <div className="text-white font-medium text-lg">{theory.funcion || '-'}</div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: SIMBOLISMO E HISTORIA */}
          {activeTab === 'simbolismo' && (
            <div className="space-y-8 animate-fade-in fade-in">
              <div>
                <h3 className="text-sm uppercase tracking-[0.2em] text-gray-500 font-bold mb-3 border-b border-white/5 pb-2 flex items-center gap-2">
                  <History className="w-4 h-4" /> Evolución Histórica
                </h3>
                <p className="text-lg text-gray-300 leading-relaxed font-light">
                  {theory.lectura_historica ? <EditorialText text={theory.lectura_historica} /> : <span className="opacity-50 italic">Pendiente de ingesta desde el PDF.</span>}
                </p>
              </div>

              <div>
                <h3 className="text-sm uppercase tracking-[0.2em] text-gray-500 font-bold mb-3 border-b border-white/5 pb-2 flex items-center gap-2">
                  <Layers className="w-4 h-4" /> Lectura Simbólica y Psicológica
                </h3>
                <p className="text-lg text-gray-300 leading-relaxed font-light">
                  {theory.lectura_simbolica ? <EditorialText text={theory.lectura_simbolica} /> : <span className="opacity-50 italic">Pendiente de ingesta desde el PDF.</span>}
                </p>
              </div>
            </div>
          )}

          {/* TAB 3: CONTEXTO */}
          {activeTab === 'contexto' && (
            <div className="space-y-6 animate-fade-in fade-in">
              <div className="mb-6">
                <h3 className="text-2xl font-serif text-white mb-2">Aplicación Práctica</h3>
                <p className="text-gray-400 text-sm">Cómo se manifiesta la carta en áreas cotidianas o contextos específicos de la vida del consultante.</p>
              </div>
              <div className="p-6 rounded-xl bg-white/5 border border-white/10 shadow-inner">
                 {theory.contexto_de_uso ? (
                   <EditorialText text={theory.contexto_de_uso} className="text-gray-200 text-lg leading-relaxed font-light" />
                 ) : (
                   <span className="opacity-50 italic text-gray-400">Pendiente de ingesta desde el PDF.</span>
                 )}
              </div>
            </div>
          )}

          {/* TAB 4: COMBINACIONES */}
          {activeTab === 'combinaciones' && (
            <div className="space-y-8 animate-fade-in fade-in">
              {theory.combinaciones_frecuentes && theory.combinaciones_frecuentes.length > 0 ? (
                <div>
                  <h3 className="text-xl font-serif text-white mb-4 border-b border-white/10 pb-2">Combinaciones Significativas</h3>
                  <div className="grid gap-3">
                    {theory.combinaciones_frecuentes.map((comb, idx) => (
                      <div key={idx} className="flex flex-col md:flex-row gap-4 p-4 rounded-lg bg-[#141518] border border-white/5 shadow-md">
                        <div className="text-gray-200 text-sm md:text-base leading-relaxed">
                          <EditorialText text={comb} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="text-center text-gray-500 py-10 italic border border-dashed border-white/10 rounded-xl">
                  Aún no hay combinaciones específicas registradas.
                </div>
              )}

              {theory.ejemplos && (
                <div>
                  <h3 className="text-xl font-serif text-white mb-4 border-b border-white/10 pb-2 mt-8">Tiradas de Ejemplo (Teoría)</h3>
                  <div className="space-y-4">
                    {Array.isArray(theory.ejemplos) ? (
                      theory.ejemplos.map((ej, idx) => (
                        <div key={idx} className="p-4 rounded-xl bg-white/5 border border-white/10 hover:border-red-500/30 transition-all">
                          <p className="text-gray-300 italic">"{ej}"</p>
                        </div>
                      ))
                    ) : (
                      <div className="p-4 rounded-xl bg-white/5 border border-white/10 hover:border-red-500/30 transition-all">
                        <p className="text-gray-300 italic">"{theory.ejemplos}"</p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Seccion Ejercicios Relacionados */}
              {relatedExercises.length > 0 && (
                <div className="mt-12">
                  <h3 className="text-xl font-serif text-white mb-4 border-b border-red-500/30 pb-2 flex items-center gap-2">
                    <Target className="w-5 h-5 text-red-500" /> Ejercicios Prácticos Relacionados
                  </h3>
                  <div className="grid gap-4">
                    {relatedExercises.map((ej) => (
                      <div key={ej.id} className="p-5 rounded-xl bg-gradient-to-br from-[#1a0f0f] to-black border border-red-500/20 shadow-md">
                        <div className="text-[10px] uppercase tracking-[0.2em] text-red-400 font-bold mb-1">{ej.level} • {ej.type}</div>
                        <h4 className="text-lg text-white font-serif italic mb-3">"{ej.contexto}"</h4>
                        <div className="flex flex-wrap gap-2 mb-4">
                          {ej.cartas.map((c, i) => (
                            <span key={i} className={`text-[10px] px-2 py-1 rounded bg-black border ${c.toLowerCase().includes(cleanCardName) ? 'border-red-500 text-red-400 font-bold shadow-[0_0_10px_rgba(239,68,68,0.3)]' : 'border-white/10 text-gray-500'}`}>
                              {c}
                            </span>
                          ))}
                        </div>
                        <p className="text-sm text-gray-300 leading-relaxed border-l-2 border-red-500/30 pl-3">
                          {ej.respuestaRapida}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default PokerCardProfile;
