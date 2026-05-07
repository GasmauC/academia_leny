import React, { useState } from 'react';
import { pokerCardsDictionary } from '../data/db/poker_cards';
import { Layers, ChevronRight, BookOpen } from 'lucide-react';

const suitsData = [
  { id: 'Corazones', name: 'Corazones', emoji: '♥', color: 'text-red-500', desc: 'Emociones, relaciones, clero, espiritualidad.' },
  { id: 'Tréboles', name: 'Tréboles', emoji: '♣', color: 'text-gray-300', desc: 'Trabajo, esfuerzo, campesinado, acciones prácticas.' },
  { id: 'Diamantes', name: 'Diamantes', emoji: '♦', color: 'text-red-500', desc: 'Dinero, energía material, burguesía, intelecto práctico.' },
  { id: 'Picas', name: 'Picas', emoji: '♠', color: 'text-gray-300', desc: 'Desafíos, advertencias, nobleza militar, conflictos.' },
  { id: 'Comodín', name: 'Comodines', emoji: '🃏', color: 'text-purple-500', desc: 'Fuerzas disruptivas, comodines del destino.' }
];

const PokerSuitsMenu = ({ onCardSelect }) => {
  const [activeSuit, setActiveSuit] = useState(null);

  const renderSuitView = () => {
    const suitCards = pokerCardsDictionary.filter(c => c.suit === activeSuit);
    const suitInfo = suitsData.find(s => s.id === activeSuit);

    return (
      <div className="w-full animate-fade-in fade-in pb-20">
        <button 
          onClick={() => setActiveSuit(null)}
          className="mb-6 text-sm text-red-400 hover:text-red-300 uppercase tracking-widest font-bold flex items-center gap-2"
        >
          ← Volver a Palos
        </button>

        <div className="bg-gradient-to-br from-[#1a1111] to-black border border-red-900/30 rounded-2xl p-8 mb-8 shadow-2xl relative overflow-hidden">
          <div className={`absolute top-0 right-0 p-8 opacity-5 text-9xl pointer-events-none ${suitInfo.color}`}>
            {suitInfo.emoji}
          </div>
          <div className="flex items-center gap-4 mb-4 relative z-10">
            <div className={`text-4xl ${suitInfo.color}`}>{suitInfo.emoji}</div>
            <h2 className="text-3xl font-serif text-white">{suitInfo.name}</h2>
          </div>
          <p className="text-red-200/80 text-lg relative z-10 font-light max-w-3xl">
            {suitInfo.desc} <br/><br/>
            <span className="text-sm italic opacity-60">La teoría completa del palo se cargará desde el libro base próximamente.</span>
          </p>
        </div>

        <div className="flex items-center gap-3 mb-6 justify-center">
            <div className="h-px bg-gradient-to-r from-transparent via-red-500/50 to-transparent flex-1"></div>
            <div className="text-xs uppercase tracking-[0.3em] text-red-300/80 font-bold px-4">Cartas de {suitInfo.name}</div>
            <div className="h-px bg-gradient-to-r from-transparent via-red-500/50 to-transparent flex-1"></div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {suitCards.map(card => (
            <button
              key={card.id}
              onClick={() => onCardSelect(card.id)}
              className="bg-black/40 border w-full border-white/5 rounded-2xl p-6 flex flex-col items-center gap-4 transition-all duration-300 hover:-translate-y-1 hover:border-red-500/50 hover:bg-red-900/10 group shadow-lg"
            >
              <div className={`text-5xl group-hover:scale-110 transition-transform duration-300 drop-shadow-lg pb-1 ${card.color === 'rojo' ? 'text-red-500' : 'text-gray-300'}`}>
                {card.emoji}
              </div>
              <div className="text-center w-full">
                <div className="text-[10px] text-red-400/80 font-bold tracking-[0.2em] uppercase mb-1">{card.number}</div>
                <div className="text-white/90 font-medium tracking-wide text-sm border-t border-white/10 pt-2">{card.name}</div>
              </div>
            </button>
          ))}
        </div>
      </div>
    );
  };

  if (activeSuit) {
    return renderSuitView();
  }

  return (
    <div className="w-full max-w-5xl mx-auto pb-20">
      <div className="flex flex-col mb-16">
        <div className="bg-red-950/20 border border-red-500/20 rounded-[2rem] p-8 md:p-12 shadow-inner text-center relative overflow-hidden backdrop-blur-xl">
          <div className="text-[10px] text-red-400 uppercase tracking-[0.3em] font-bold mb-6 flex justify-center items-center gap-2">
             <Layers size={14}/> Arquitectura del Mazo
          </div>
          <h1 className="text-3xl lg:text-5xl font-serif text-white mb-6 relative z-10">Laboratorio de Póker</h1>
          <p className="text-red-200/60 mb-10 max-w-2xl mx-auto leading-relaxed text-lg relative z-10 font-light">
            Navega el sistema a través de sus fundamentos. Selecciona un palo para estudiar su energía general o accede a las fichas pedagógicas individuales de cada naipe.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {suitsData.filter(s => s.id !== 'Comodín').map(suit => (
          <button
            key={suit.id}
            onClick={() => setActiveSuit(suit.id)}
            className="group relative overflow-hidden rounded-2xl bg-[#0a0a0c] border border-white/5 hover:border-red-500/50 p-8 text-left transition-all duration-500 hover:shadow-[0_0_30px_rgba(239,68,68,0.1)] hover:-translate-y-2"
          >
            <div className={`text-6xl mb-6 ${suit.color} drop-shadow-xl group-hover:scale-110 transition-transform duration-500`}>
              {suit.emoji}
            </div>
            <h3 className="text-2xl font-serif text-white mb-3">{suit.name}</h3>
            <p className="text-sm text-gray-400 font-light leading-relaxed mb-6 h-16">
              {suit.desc}
            </p>
            <div className="text-xs font-bold uppercase tracking-widest text-red-400/50 group-hover:text-red-400 flex items-center gap-2 transition-colors">
              Explorar Palo <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </div>
          </button>
        ))}
      </div>

      <div className="mt-6">
        {suitsData.filter(s => s.id === 'Comodín').map(suit => (
          <button
            key={suit.id}
            onClick={() => setActiveSuit(suit.id)}
            className="w-full group relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#0a0a0c] to-[#120512] border border-white/5 hover:border-purple-500/50 p-6 flex items-center justify-between transition-all duration-500 hover:shadow-[0_0_30px_rgba(168,85,247,0.1)]"
          >
            <div className="flex items-center gap-6">
              <div className={`text-4xl ${suit.color} drop-shadow-xl group-hover:rotate-12 transition-transform duration-500`}>
                {suit.emoji}
              </div>
              <div>
                <h3 className="text-xl font-serif text-white">{suit.name}</h3>
                <p className="text-sm text-gray-400 font-light mt-1">Los dos comodines del sistema</p>
              </div>
            </div>
            <ChevronRight className="text-purple-500/50 group-hover:text-purple-400 group-hover:translate-x-1 transition-transform" />
          </button>
        ))}
      </div>
    </div>
  );
};

export default PokerSuitsMenu;
