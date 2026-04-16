import React, { useState } from 'react';
import { ChevronDown, Hash } from 'lucide-react';
import { cardsDictionary } from '../data/db/lenormand_cards';

export default function PositionBreakdown({ posicionesText }) {
  const [expandedId, setExpandedId] = useState(null);

  if (!posicionesText) return null;

  // Parsea strings como "1:Ratones (pérdidas pasadas), 2:Nubes (pensamientos grises)"
  // Splittea inteligentemente por comas o puntos que estén seguidos de número y dos puntos o paréntesis
  const chunks = posicionesText.split(/[,.]\s*(?=\d+\s*[:(])/g);

  const parsedPositions = chunks.map((chunk, idx) => {
    let match = chunk.match(/(\d+)\s*[:]\s*([^(]+)(?:\((.*)\))?/);
    let number, name, role;

    if (match) {
      number = match[1].trim();
      name = match[2].trim();
      role = match[3] ? match[3].trim() : '';
    } else {
      // Intenta 1 (Nombre): Rol
      match = chunk.match(/(\d+)\s*\(([^)]+)\)\s*[:]\s*(.*)/);
      if (match) {
        number = match[1].trim();
        name = match[2].trim();
        role = match[3] ? match[3].trim() : '';
      }
    }

    if (!number || !name) return { raw: chunk, originalIndex: idx };
    
    // Buscar la carta en el diccionario
    const cleanName = name.toLowerCase();
    const cardData = cardsDictionary.find(c => 
      c.name.toLowerCase() === cleanName || 
      c.name.toLowerCase().includes(cleanName) || 
      cleanName.includes(c.name.toLowerCase())
    ) || { emoji: '🎴', baseMeaning: '' };

    return {
      number,
      name,
      role,
      emoji: cardData.emoji,
      details: cardData.baseMeaning,
      originalIndex: idx
    };
  });

  return (
    <div className="w-full mt-auto bg-black/30 p-6 rounded-2xl border border-white/5 shadow-inner">
      <div className="text-[11px] uppercase tracking-widest text-leny-accent mb-6 font-bold flex items-center gap-2 border-b border-white/5 pb-3">
        <Hash className="w-4 h-4" /> Desglose de Posiciones
      </div>
      
      <div className="flex flex-col gap-3">
        {parsedPositions.map((pos) => {
          if (pos.raw) {
            return <div key={pos.originalIndex} className="text-white/60 text-sm px-4 py-2 italic bg-white/5 rounded-xl border border-white/5">{pos.raw}</div>;
          }

          const isExpanded = expandedId === pos.number;

          return (
            <div 
              key={pos.number}
              className={`flex flex-col bg-[#111620] border transition-all duration-300 rounded-xl overflow-hidden cursor-pointer
                ${isExpanded ? 'border-leny-accent/40 bg-[#161b26] ring-1 ring-leny-accent/10 shadow-lg' : 'border-white/5 hover:border-white/20 hover:bg-[#141a24] shadow-sm'}`}
              onClick={() => setExpandedId(isExpanded ? null : pos.number)}
            >
              {/* Header de la tarjeta */}
              <div className="flex items-stretch min-h-[3rem]">
                {/* Número Grande */}
                <div className={`w-12 flex-shrink-0 flex items-center justify-center font-bold text-lg border-r transition-colors duration-300
                  ${isExpanded ? 'bg-leny-accent text-leny-dark border-leny-accent/20' : 'bg-black/60 text-leny-accent/70 border-white/5'}`}>
                  {pos.number}
                </div>
                
                {/* Contenido Principal Acortado */}
                <div className="flex-1 px-4 py-3 flex items-center gap-4">
                  <span className="text-2xl drop-shadow-md">{pos.emoji}</span>
                  
                  <div className="flex flex-col flex-1 min-w-0 justify-center">
                    <span className={`font-serif leading-none truncate mb-1.5 transition-colors ${isExpanded ? 'text-leny-accent font-bold text-sm' : 'text-white/90 text-[13px] font-medium'}`}>
                      {pos.name}
                    </span>
                    <span className="text-white/50 text-[10px] sm:text-[11px] uppercase tracking-wide truncate">
                      {pos.role || 'VER DETALLES'}
                    </span>
                  </div>

                  <ChevronDown className={`w-4 h-4 text-white/30 transition-transform duration-300 flex-shrink-0 ${isExpanded ? 'rotate-180 text-leny-accent' : ''}`} />
                </div>
              </div>
              
              {/* Detalles expandibles */}
              <div className={`grid transition-all duration-300 ease-in-out ${isExpanded ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
                <div className="overflow-hidden">
                  <div className="p-5 pt-3 pb-5 text-[13px] border-t border-white/5 ml-12 space-y-4 bg-gradient-to-b from-[#0a0d14]/20 to-[#0a0d14]/60">
                    
                    {pos.role && (
                      <div>
                        <div className="text-leny-accent/60 text-[9px] uppercase font-bold tracking-widest mb-1.5 flex items-center gap-1.5">
                          <Hash className="w-3 h-3" /> Función en Posición
                        </div>
                        <div className="text-white/90 leading-relaxed italic border-l-2 border-leny-accent/40 pl-3">
                          "{pos.role}"
                        </div>
                      </div>
                    )}

                    {pos.details && (
                      <div>
                        <div className="text-white/40 text-[9px] uppercase font-bold tracking-widest mb-1.5 flex items-center gap-1.5">
                          <span>✧</span> Arcano Base Absoluto
                        </div>
                        <div className="text-white/50 leading-relaxed pl-3 border-l-2 border-white/10 text-[12px]">
                          {pos.details}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

            </div>
          );
        })}
      </div>
    </div>
  );
}
