import React from 'react';
import { Library, ArrowRightLeft, Image, Network, Grip, Target, Sparkles, LayoutDashboard } from 'lucide-react';

const StudySidebar = ({ currentView, onViewChange, isOpen }) => {
  const categories = [
    {
      title: "Base de Datos",
      items: [
        { id: 'cover', icon: LayoutDashboard, label: 'Dashboard Principal' },
        { id: 'cardsMenu', icon: Library, label: 'Atlas de Cartas' },
      ]
    },
    {
      title: "Análisis Cruzado",
      items: [
        { id: 'compareDesk', icon: ArrowRightLeft, label: 'Mesa de Contrastes' },
        { id: 'relationalMap', icon: Network, label: 'Grafo Relacional (Mapa)' },
      ]
    },
    {
      title: "Entrenamiento Activo",
      items: [
        { id: 'flashcards', icon: Image, label: 'Memoria Visual (Flashcards)' },
        { id: 'spreadsMenu', icon: Grip, label: 'Módulos de Tiradas' },
        { id: 'exercises', icon: Target, label: 'Campo de Ejercicios' },
      ]
    },
    {
      title: "Asistencia Avanzada",
      items: [
        { id: 'tutor', icon: Sparkles, label: 'Oráculo IA' },
      ]
    }
  ];

  return (
    <div className={`fixed md:relative flex-shrink-0 w-72 md:w-[320px] h-full bg-[#07080c] border-r border-purple-500/10 flex flex-col transition-all duration-300 z-40 ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'} shadow-[10px_0_30px_rgba(0,0,0,0.5)]`}>
      <div className="flex flex-col h-full overflow-y-auto custom-scrollbar p-6">
        
        {/* Header decorativo de la Sidebar */}
        <div className="mb-10 px-2 mt-2">
            <h2 className="text-[22px] font-serif text-purple-50 font-bold tracking-wide drop-shadow-md">Estación de Trabajo</h2>
            <p className="text-[10px] text-purple-400/60 uppercase tracking-widest mt-1.5 font-bold">Laboratorio Lenormand</p>
        </div>

        {/* Categorías Funcionales */}
        <div className="space-y-10 flex-1">
          {categories.map((cat, idx) => (
            <div key={idx} className="flex flex-col">
              <h3 className="text-[10px] text-white/30 uppercase tracking-[0.25em] font-bold mb-4 px-4">{cat.title}</h3>
              <div className="space-y-1.5">
                {cat.items.map(item => {
                  const isActive = currentView === item.id || (item.id === 'spreadsMenu' && ['spreadsMenu', 'combinations', 'triplets', 'quintets', 'grid3x3', 'grandTableau', 'dailyCard', 'trustMethod'].includes(currentView)) || (item.id === 'cardsMenu' && ['cardProfile', 'dictionary'].includes(currentView));
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.id}
                      onClick={() => onViewChange(item.id)}
                      className={`w-full flex items-center gap-3.5 px-4 py-3.5 rounded-2xl transition-all duration-300 text-left group
                        ${isActive 
                          ? 'bg-purple-600/10 text-purple-200 shadow-[inset_3px_0_0_#c084fc] border border-purple-500/20' 
                          : 'text-white/50 hover:bg-white/5 hover:text-white/90'
                        }`}
                    >
                      <Icon size={18} className={`${isActive ? 'text-purple-400' : 'text-white/30 group-hover:text-purple-400/50'} transition-colors`} strokeWidth={isActive ? 2 : 1.5} />
                      <span className={`text-xs font-semibold tracking-wide uppercase ${isActive ? 'drop-shadow-[0_0_8px_rgba(168,85,247,0.4)] text-[11px]' : 'text-[10px]'}`}>
                        {item.label}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
        
        {/* Footer info de la sidebar */}
        <div className="mt-10 pt-6 border-t border-purple-500/10 px-2 pb-4">
          <div className="text-[9px] text-white/20 uppercase tracking-[0.2em] font-bold text-center">Entorno Pedagógico Activo</div>
        </div>

      </div>
    </div>
  );
};

export default StudySidebar;
