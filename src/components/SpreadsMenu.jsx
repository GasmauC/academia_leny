import React from 'react';
import { Sun, Link2, Route, Waypoints, Scale, Grid3X3, Map, Layers } from 'lucide-react';

export default function SpreadsMenu({ onSelectMode }) {
  const spreads = [
    {
      id: 'dailyCard',
      icon: Sun,
      title: 'Energía del Día',
      subtitle: '1 Carta',
      desc: 'El foco inicial y la temperatura del panorama general.',
      color: 'text-yellow-400',
      bgHover: 'hover:border-yellow-500/50 hover:bg-yellow-500/5'
    },
    {
      id: 'combinations',
      icon: Link2,
      title: 'Pares',
      subtitle: '2 Cartas',
      desc: 'El vínculo cartesiano: estructura de dominantes y modificadoras.',
      color: 'text-blue-400',
      bgHover: 'hover:border-blue-500/50 hover:bg-blue-500/5'
    },
    {
      id: 'triplets',
      icon: Route,
      title: 'Tríadas',
      subtitle: '3 Cartas',
      desc: 'El flujo narrativo que otorga dinámica, pasado, presente y futuro.',
      color: 'text-green-400',
      bgHover: 'hover:border-green-500/50 hover:bg-green-500/5'
    },
    {
      id: 'quintets',
      icon: Waypoints,
      title: 'Quintetos',
      subtitle: '5 Cartas',
      desc: 'Progresión geométrica: el sendero extendido del consultante.',
      color: 'text-orange-400',
      bgHover: 'hover:border-orange-500/50 hover:bg-orange-500/5'
    },
    {
      id: 'trustMethod',
      icon: Scale,
      title: '¿Debo Confiar?',
      subtitle: 'Método de 5 Cartas',
      desc: 'El discernimiento analítico para medir lealtades y descubrir verdades.',
      color: 'text-red-400',
      bgHover: 'hover:border-red-500/50 hover:bg-red-500/5'
    },
    {
      id: 'grid3x3',
      icon: Grid3X3,
      title: 'Retrato 3x3',
      subtitle: '9 Cartas',
      desc: 'La matriz esencial: leyes de posición cruzada y análisis espacial.',
      color: 'text-purple-400',
      bgHover: 'hover:border-purple-500/50 hover:bg-purple-500/5'
    },
    {
      id: 'grandTableau',
      icon: Map,
      title: 'El Grand Tableau',
      subtitle: '36 Cartas',
      desc: 'El panorama cartomántico completo. La Mesa Real en toda su expansión.',
      color: 'text-leny-accent',
      bgHover: 'hover:border-leny-accent/50 hover:bg-leny-accent/5'
    }
  ];

  return (
    <div className="h-full overflow-y-auto p-6 md:p-12 lg:px-24 custom-scrollbar fade-in book-content">
      
      {/* Portada Interna (Hero) */}
      <div className="flex flex-col mb-16">
        <div className="bg-white/[0.02] border border-white/5 rounded-[2rem] p-8 md:p-12 lg:p-16 shadow-inner text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 p-16 opacity-5 pointer-events-none">
             <Layers size={200} strokeWidth={0.5} />
          </div>
          
          <div className="text-[10px] text-leny-accent uppercase tracking-[0.3em] font-bold mb-6 opacity-80 decoration-leny-accent/30 underline underline-offset-4">
             Métodos de Lectura Canónicos
          </div>
          <h1 className="text-3xl lg:text-5xl font-serif text-white mb-6 relative z-10 drop-shadow-md">Módulos de Tirada</h1>
          <p className="text-gray-400 mb-12 max-w-2xl mx-auto leading-relaxed text-lg relative z-10 font-light">
            Aquí dominaremos desde la sintaxis básica hasta la complejidad estructural del Grand Tableau. 
            El módulo consta de teoría, esquemas cartománticos cruzados y análisis de ejemplos 100% extraídos de la Biblia del Pequeño Leny.
          </p>
          
          <div className="relative z-10">
            <button 
              onClick={() => onSelectMode('dailyCard')}
              className="px-8 flex items-center gap-3 py-4 bg-white hover:bg-gray-100 text-black font-semibold rounded-full shadow-[0_4px_20px_rgba(255,255,255,0.15)] hover:shadow-[0_8px_30px_rgba(255,255,255,0.25)] transition-all hover:-translate-y-0.5 select-none mx-auto"
            >
              <Sun size={18} strokeWidth={2} />
              <span>Iniciar Primera Práctica (Energía del Día)</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto">
        {/* Índice Visual */}
        <div className="text-xs uppercase tracking-[0.3em] text-leny-accent/60 font-bold mb-8 text-center">Índice Metodológico</div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pb-20">
          {spreads.map((spread) => (
            <button
              key={spread.id}
              onClick={() => onSelectMode(spread.id)}
              className={`bg-white/5 border border-white/10 rounded-2xl p-8 flex flex-col items-center gap-4 transition-all duration-300 hover:scale-105 group ${spread.bgHover} text-left justify-start`}
            >
              <div className={`p-4 rounded-xl bg-white/5 group-hover:bg-white/10 transition-colors ${spread.color}`}>
                <spread.icon className="w-10 h-10" />
              </div>
              <div className="text-center w-full">
                <div className={`text-[11px] font-bold tracking-widest uppercase mb-2 ${spread.color}`}>
                  {spread.subtitle}
                </div>
                <h2 className="text-xl font-serif text-white mb-3 group-hover:text-white/90">
                  {spread.title}
                </h2>
                <p className="text-sm text-leny-dim line-clamp-3">
                  {spread.desc}
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
