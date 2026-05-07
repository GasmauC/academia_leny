import React from 'react';
import { Library, ArrowRightLeft, Image, Network, Grip, Target, Sparkles, LayoutDashboard, Dumbbell } from 'lucide-react';

const StudySidebar = ({ currentView, onViewChange, isOpen, activeModule = 'lenormand' }) => {
  const isPoker = activeModule === 'poker';
  const textTitleColor = isPoker ? 'text-red-50' : 'text-purple-50';
  const textSubColor = isPoker ? 'text-red-400/60' : 'text-purple-400/60';
  const borderRightColor = isPoker ? 'border-red-500/10' : 'border-purple-500/10';
  const bgActive = isPoker ? 'bg-red-600/10' : 'bg-purple-600/10';
  const textActive = isPoker ? 'text-red-200' : 'text-purple-200';
  const shadowActive = isPoker ? 'shadow-[inset_3px_0_0_#ef4444]' : 'shadow-[inset_3px_0_0_#c084fc]';
  const borderActive = isPoker ? 'border-red-500/20' : 'border-purple-500/20';
  const iconActive = isPoker ? 'text-red-400' : 'text-purple-400';
  const iconHover = isPoker ? 'group-hover:text-red-400/50' : 'group-hover:text-purple-400/50';
  const textShadowActive = isPoker ? 'drop-shadow-[0_0_8px_rgba(239,68,68,0.4)]' : 'drop-shadow-[0_0_8px_rgba(168,85,247,0.4)]';
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
        ...(isPoker 
          ? [
              { id: 'pokerExamples', icon: Target, label: 'Aula Práctica (Casos)' },
              { id: 'pokerExercises', icon: Dumbbell, label: 'Gimnasio Práctico' }
            ] 
          : [
              { id: 'exercises', icon: Target, label: 'Campo de Ejercicios' }
            ]
        ),
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
    <div className={`fixed md:relative flex-shrink-0 w-72 md:w-[320px] h-full bg-[#07080c] border-r ${borderRightColor} flex flex-col transition-all duration-300 z-40 ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'} shadow-[10px_0_30px_rgba(0,0,0,0.5)]`}>
      <div className="flex flex-col h-full overflow-y-auto custom-scrollbar p-6">
        
        {/* Header decorativo de la Sidebar */}
        <div className="mb-10 px-2 mt-2">
            <h2 className={`text-[22px] font-serif ${textTitleColor} font-bold tracking-wide drop-shadow-md`}>Estación de Trabajo</h2>
            <p className={`text-[10px] ${textSubColor} uppercase tracking-widest mt-1.5 font-bold`}>Laboratorio {isPoker ? 'Póker' : 'Lenormand'}</p>
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
                          ? `${bgActive} ${textActive} ${shadowActive} border ${borderActive}` 
                          : 'text-white/50 hover:bg-white/5 hover:text-white/90'
                        }`}
                    >
                      <Icon size={18} className={`${isActive ? iconActive : `text-white/30 ${iconHover}`} transition-colors`} strokeWidth={isActive ? 2 : 1.5} />
                      <span className={`text-xs font-semibold tracking-wide uppercase ${isActive ? `${textShadowActive} text-[11px]` : 'text-[10px]'}`}>
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
        <div className={`mt-10 pt-6 border-t ${borderRightColor} px-2 pb-4`}>
          <div className="text-[9px] text-white/20 uppercase tracking-[0.2em] font-bold text-center">Entorno Pedagógico Activo</div>
        </div>

      </div>
    </div>
  );
};

export default StudySidebar;
