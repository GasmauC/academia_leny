import React, { useState, useEffect } from 'react';
import { BookOpen, Heart, Briefcase, Stethoscope, AlertTriangle, ArrowRightLeft, Sparkles, Layers, History, UserCircle, Target, Play, ChevronLeft, ChevronRight, Hash, Network, Scale } from 'lucide-react';
import EditorialText from './EditorialText';
import cardsTheory from '../data/db/lenormand_cards_theory.json';
import { lenormandExercises } from '../data/db/lenormand_exercises';

const CardProfile = ({ card, onClose, onNext, onPrev, onNavigate }) => {
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

  // Al cambiar de carta, asegurarnos de que la pestaña quede donde estaba o volver a 'base'
  // El usuario pidió "el primero siempre es SIGNIFICADO BASE", así que no reseteo si ellos prefieren fluidez, pero lo dejaré libre o se reinicia.
  useEffect(() => {
    setActiveTab('base');
  }, [card]);

  if (!card) return null;

  // Extraer el texto original completo del JSON paralelo
  const cleanCardNameForTheory = card.name.replace(/\(.*?\)/g, '').trim().toLowerCase();
  const textArray = cardsTheory.find(c => {
    const cleanTheoryName = c.name.replace(/\(.*?\)/g, '').trim().toLowerCase();
    return cleanTheoryName === cleanCardNameForTheory || 
           cleanTheoryName.includes(cleanCardNameForTheory) || 
           cleanCardNameForTheory.includes(cleanTheoryName);
  })?.contenido_completo || [];

  // Calcular las misiones relacionadas dinámicamente
  const relatedExercises = lenormandExercises.filter(ex => 
    ex.cartas.some(c => {
      const cleanName = c.replace(/\(.*?\)/g, '').trim().toLowerCase();
      return cleanName === card.name.toLowerCase() || 
             cleanName.includes(card.name.toLowerCase()) || 
             card.name.toLowerCase().includes(cleanName);
    })
  );

  return (
    <div className="flex flex-col h-full bg-leny-dark/95 text-leny-text overflow-hidden rounded-xl border border-leny-accent/20 shadow-2xl relative">
      {/* Encabezado */}
      <div className="relative overflow-hidden shrink-0 bg-gradient-to-b from-leny-darker to-leny-dark border-b border-leny-accent/20 p-6 flex items-center justify-between pt-12 min-h-[220px]">
        <div className="absolute top-0 right-0 w-64 h-64 bg-leny-accent/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4"></div>
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-leny-dim hover:text-white transition-colors z-30 bg-black/20 hover:bg-black/50 p-2 rounded-full"
          title="Cerrar Diccionario (Esc)"
        >
          ✕
        </button>
        
        {/* Navigation Arrows */}
        {onPrev && (
          <button onClick={onPrev} className="hidden md:flex p-3 rounded-full bg-black/40 hover:bg-leny-accent hover:text-leny-dark text-leny-accent transition-all z-20 group absolute left-6 border border-white/5 backdrop-blur-sm shadow-xl" title="Carta Anterior (Flecha Izquierda)">
            <ChevronLeft className="w-8 h-8 group-hover:-translate-x-1 transition-transform" />
          </button>
        )}
        {onNext && (
          <button onClick={onNext} className="hidden md:flex p-3 rounded-full bg-black/40 hover:bg-leny-accent hover:text-leny-dark text-leny-accent transition-all z-20 group absolute right-6 top-[50%] -translate-y-[50%] border border-white/5 backdrop-blur-sm shadow-xl" title="Carta Siguiente (Flecha Derecha)">
            <ChevronRight className="w-8 h-8 group-hover:translate-x-1 transition-transform" />
          </button>
        )}
        
        <div className="relative z-10 flex flex-col md:flex-row items-center md:items-start text-center md:text-left gap-6 mx-auto max-w-2xl px-12">
          <div className="w-24 h-32 shrink-0 bg-gradient-to-br from-leny-accent/20 to-transparent border border-leny-accent/30 rounded-lg flex items-center justify-center text-5xl shadow-[0_0_20px_rgba(201,162,39,0.15)] bg-leny-darker">
            {card.emoji}
          </div>
          <div>
            <div className="flex items-center gap-3 mb-1">
              <span className="px-2 py-0.5 rounded text-xs font-bold tracking-wider bg-leny-accent/10 text-leny-accent border border-leny-accent/20">
                CARTA {card.number}
              </span>
              <span className="text-xs text-leny-dim uppercase tracking-widest">{card.suit}</span>
            </div>
            <h1 className="text-4xl font-serif text-white mb-3 tracking-tight">{card.name}</h1>
            <p className="text-leny-accent/80 font-bold uppercase tracking-widest text-sm mb-2">{card.mainTheme}</p>
          </div>
        </div>
      </div>

      {/* Navegación de Pestañas Jerárquicas */}
      <div className="flex px-2 border-b border-white/5 shrink-0 bg-leny-darker/50 overflow-x-auto custom-scrollbar">
        {[
          { id: 'base', label: '1. Significado Base', icon: Hash },
          { id: 'capas', label: '2. Capas', icon: Layers },
          { id: 'lectura', label: '3. Aplicación', icon: Target },
          { id: 'combinaciones', label: '4. Combinaciones', icon: Network },
          { id: 'original', label: '5. Texto Original', icon: BookOpen },
          { id: 'practicas', label: '6. Práctica', icon: Play }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-5 py-4 text-sm font-medium transition-all whitespace-nowrap border-b-2 outline-none ${
              activeTab === tab.id 
                ? 'border-leny-accent text-leny-accent bg-leny-accent/5' 
                : 'border-transparent text-leny-dim hover:text-white hover:bg-white/5'
            }`}
          >
            <tab.icon className={`w-4 h-4 ${activeTab === tab.id ? 'text-leny-accent' : 'opacity-50'}`} />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Contenido desplazable */}
      <div className="flex-1 overflow-y-auto p-6 md:p-8 custom-scrollbar relative">
        <div className="max-w-3xl mx-auto space-y-8 pb-12">
          
          {/* TAB 1: SIGNIFICADO BASE */}
          {activeTab === 'base' && (
            <div className="space-y-8 animate-fade-in fade-in">
              <div className="bg-leny-accent/5 border border-leny-accent/20 rounded-xl p-6 md:p-8 relative overflow-hidden shadow-inner">
                <Sparkles className="absolute top-4 right-4 w-32 h-32 text-leny-accent/5 -rotate-12 pointer-events-none" />
                <h3 className="text-sm uppercase tracking-[0.2em] text-leny-accent/70 font-bold mb-3 relative z-10">Esencia de la Carta</h3>
                <div className="text-xl md:text-2xl text-white font-serif leading-relaxed relative z-10">
                  <EditorialText text={card.symbolicCore} />
                </div>
              </div>

              <div>
                <h3 className="text-sm uppercase tracking-[0.2em] text-leny-dim font-bold mb-3 border-b border-white/5 pb-2">Significado General</h3>
                <p className="text-lg text-leny-text leading-relaxed">
                  <EditorialText text={card.baseMeaning} />
                </p>
              </div>

              <div>
                <h3 className="text-sm uppercase tracking-[0.2em] text-leny-dim font-bold mb-4 border-b border-white/5 pb-2">Palabras Clave Limpias</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="p-4 rounded-xl bg-gradient-to-br from-blue-900/10 to-transparent border border-blue-500/20 text-center">
                    <div className="text-blue-400 text-[10px] font-bold tracking-widest uppercase mb-2">Energía / Polaridad</div>
                    <div className="text-white font-medium">{card.polarity}</div>
                  </div>
                  <div className="p-4 rounded-xl bg-gradient-to-br from-green-900/10 to-transparent border border-green-500/20 text-center">
                    <div className="text-green-400 text-[10px] font-bold tracking-widest uppercase mb-2">Timing / Tiempo</div>
                    <div className="text-white font-medium">{card.timing}</div>
                  </div>
                  <div className="p-4 rounded-xl bg-gradient-to-br from-purple-900/10 to-transparent border border-purple-500/20 text-center">
                    <div className="text-purple-400 text-[10px] font-bold tracking-widest uppercase mb-2">Verbo de Acción</div>
                    <div className="text-white font-medium">{card.actionVerb}</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: CAPAS DE INTERPRETACIÓN */}
          {activeTab === 'capas' && (
            <div className="space-y-6 animate-fade-in fade-in">
              <div className="mb-6">
                <h3 className="text-2xl font-serif text-white mb-2">Análisis Dimensional</h3>
                <p className="text-leny-dim text-sm">Dependiendo de la pregunta del consultante, la energía de la carta debe leerse enfocada puramente en una de sus tres capas dimensionales:</p>
              </div>

              <div className="grid grid-cols-1 gap-5">
                <div className="bg-white/5 border border-white/10 rounded-xl p-6 flex flex-col md:flex-row gap-5 shadow-lg group hover:border-pink-500/30 transition-colors">
                  <div className="bg-pink-900/20 p-4 rounded-full h-16 w-16 shrink-0 flex items-center justify-center border border-pink-500/20 group-hover:bg-pink-500/10 transition-colors">
                    <UserCircle className="w-8 h-8 text-pink-400" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-pink-400 mb-2 uppercase tracking-wider text-sm">Si representa a una Persona</h4>
                    <p className="text-leny-text text-lg leading-relaxed font-light">
                      <EditorialText text={card.contextualLayers.persona} />
                    </p>
                  </div>
                </div>

                <div className="bg-white/5 border border-white/10 rounded-xl p-6 flex flex-col md:flex-row gap-5 shadow-lg group hover:border-blue-500/30 transition-colors">
                  <div className="bg-blue-900/20 p-4 rounded-full h-16 w-16 shrink-0 flex items-center justify-center border border-blue-500/20 group-hover:bg-blue-500/10 transition-colors">
                    <Layers className="w-8 h-8 text-blue-400" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-blue-400 mb-2 uppercase tracking-wider text-sm">Si representa un Tema</h4>
                    <p className="text-leny-text text-lg leading-relaxed font-light">
                      <EditorialText text={card.contextualLayers.tema} />
                    </p>
                  </div>
                </div>

                <div className="bg-white/5 border border-white/10 rounded-xl p-6 flex flex-col md:flex-row gap-5 shadow-lg group hover:border-green-500/30 transition-colors">
                  <div className="bg-green-900/20 p-4 rounded-full h-16 w-16 shrink-0 flex items-center justify-center border border-green-500/20 group-hover:bg-green-500/10 transition-colors">
                    <Play className="w-8 h-8 text-green-400 ml-1" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-green-400 mb-2 uppercase tracking-wider text-sm">Si representa una Acción</h4>
                    <p className="text-leny-text text-lg leading-relaxed font-light">
                      <EditorialText text={card.contextualLayers.accion} />
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: APLICACIÓN EN LECTURA */}
          {activeTab === 'lectura' && (
            <div className="space-y-6 animate-fade-in fade-in">
              <div className="mb-6">
                <h3 className="text-2xl font-serif text-white mb-2">Contexto Práctico</h3>
                <p className="text-leny-dim text-sm">Ejemplos de cómo se materializa esta carta en lectura por áreas específicas:</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-6 rounded-xl bg-gradient-to-br from-pink-900/10 to-transparent border border-pink-500/20 shadow-md">
                  <div className="flex items-center gap-3 mb-4">
                    <Heart className="text-pink-400 w-5 h-5" />
                    <h3 className="text-xl font-serif text-pink-200">Amor y Relaciones</h3>
                  </div>
                  <EditorialText text={card.readings.love} className="text-leny-text font-light leading-relaxed" />
                </div>

                <div className="p-6 rounded-xl bg-gradient-to-br from-emerald-900/10 to-transparent border border-emerald-500/20 shadow-md">
                  <div className="flex items-center gap-3 mb-4">
                    <Briefcase className="text-emerald-400 w-5 h-5" />
                    <h3 className="text-xl font-serif text-emerald-200">Trabajo y Negocios</h3>
                  </div>
                  <EditorialText text={card.readings.work} className="text-leny-text font-light leading-relaxed" />
                </div>

                <div className="p-6 rounded-xl bg-gradient-to-br from-amber-900/10 to-transparent border border-amber-500/20 shadow-md">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-amber-400 font-bold text-xl">$</span>
                    <h3 className="text-xl font-serif text-amber-200">Dinero y Finanzas</h3>
                  </div>
                  <EditorialText text={card.readings.money} className="text-leny-text font-light leading-relaxed" />
                </div>

                <div className="p-6 rounded-xl bg-gradient-to-br from-blue-900/10 to-transparent border border-blue-500/20 shadow-md">
                  <div className="flex items-center gap-3 mb-4">
                    <Stethoscope className="text-blue-400 w-5 h-5" />
                    <h3 className="text-xl font-serif text-blue-200">Salud y Cuerpo</h3>
                  </div>
                  <EditorialText text={card.readings.health} className="text-leny-text font-light leading-relaxed" />
                </div>
              </div>
              
              <div className="p-6 rounded-xl bg-white/5 border border-white/10 mt-2 shadow-inner">
                <h3 className="text-sm font-bold uppercase tracking-widest text-leny-dim mb-3 flex items-center gap-2">
                  <Target className="w-4 h-4" /> Síntesis General
                </h3>
                <EditorialText text={card.readings.general} className="text-white/90 text-lg leading-relaxed font-serif" />
              </div>
            </div>
          )}

          {/* TAB 4: COMBINACIONES */}
          {activeTab === 'combinaciones' && (
            <div className="space-y-8 animate-fade-in fade-in">
              
              {/* Lección Gramatical Obligatoria */}
              <div className="bg-gradient-to-br from-[#1a1711] to-[#121110] border-l-4 border-l-leny-accent border border-white/5 rounded-r-xl p-6 shadow-xl">
                <div className="flex items-center gap-3 mb-3">
                  <Scale className="text-leny-accent w-6 h-6" />
                  <h3 className="text-lg font-bold text-white uppercase tracking-wider">Regla de Sintaxis Lenormand</h3>
                </div>
                <div className="text-leny-text text-sm leading-relaxed mb-4">
                  Recuerda que en una lectura de par de cartas, las cartas se leen como Sustantivo + Adjetivo.
                </div>
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-3 bg-black/40 p-3 rounded-lg border border-white/5">
                    <span className="shrink-0 bg-white/10 text-white text-xs font-bold px-2 py-1 rounded">Carta 1</span>
                    <span className="text-sm text-leny-dim">Ejerce de <span className="text-white font-bold">SUJETO</span> o SUSTANTIVO. Define <strong>qué</strong> estamos leyendo.</span>
                  </div>
                  <div className="flex items-center gap-3 bg-black/40 p-3 rounded-lg border border-white/5">
                    <span className="shrink-0 bg-leny-accent/20 text-leny-accent border border-leny-accent/30 text-xs font-bold px-2 py-1 rounded">Carta 2</span>
                    <span className="text-sm text-leny-dim">Ejerce de <span className="text-white font-bold">ADJETIVO</span> o MODIFICADOR. Aclara <strong>cómo</strong> es eso que leemos.</span>
                  </div>
                </div>
              </div>

              {/* Advertencias */}
              {card.warnings && (
                <div className="bg-red-950/20 border-l-4 border-l-red-500 rounded-r-xl p-5 flex gap-4">
                  <AlertTriangle className="w-6 h-6 text-red-500 shrink-0 mt-0.5" />
                  <div>
                    <h3 className="text-sm font-bold text-red-400 mb-1 uppercase tracking-wider">Comportamiento Especial</h3>
                    <EditorialText text={card.warnings} className="text-red-200/80 text-sm leading-relaxed" />
                  </div>
                </div>
              )}

              {/* Dinámica entre cartas */}
              {(card.relations?.similarCards?.length > 0 || card.relations?.oppositeCards?.length > 0) && (
                <div>
                  <h3 className="text-xl font-serif text-white mb-4 border-b border-white/10 pb-2">Dinámica de Contrastes</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {card.relations.similarCards && card.relations.similarCards.length > 0 && (
                      <div className="bg-white/5 p-5 rounded-lg border border-white/5 shadow-inner">
                        <h4 className="text-xs font-bold text-leny-accent uppercase tracking-wider mb-3">Cartas Similares</h4>
                        <ul className="space-y-3">
                          {card.relations.similarCards.map((item, i) => (
                            <li key={i} className="text-sm text-leny-text flex items-start gap-2">
                              <span className="text-leny-accent mt-0.5 font-bold">≈</span>
                              <span><EditorialText text={item} /></span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    {card.relations.oppositeCards && card.relations.oppositeCards.length > 0 && (
                      <div className="bg-white/5 p-5 rounded-lg border border-white/5 shadow-inner">
                        <h4 className="text-xs font-bold text-red-400 uppercase tracking-wider mb-3">Fuerzas Opuestas</h4>
                        <ul className="space-y-3">
                          {card.relations.oppositeCards.map((item, i) => (
                            <li key={i} className="text-sm text-leny-text flex items-start gap-2">
                              <span className="text-red-400 mt-0.5 font-bold">≠</span>
                              <span><EditorialText text={item} /></span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Ejemplos de Combinaciones */}
              {card.combinations && card.combinations.length > 0 && (
                <div>
                  <h3 className="text-xl font-serif text-white mb-4 border-b border-white/10 pb-2">Combinaciones de Ejemplo</h3>
                  <div className="grid gap-3">
                    {card.combinations.map((comb, idx) => (
                      <div key={idx} className="flex flex-col md:flex-row gap-4 p-4 rounded-lg bg-[#141518] hover:bg-[#1a1b1f] transition-colors border border-white/5 shadow-md">
                        <div className="md:w-1/3 font-bold text-leny-accent shrink-0 flex items-center gap-2">
                          {comb.cards}
                        </div>
                        <div className="flex-1 text-leny-text text-sm md:text-base leading-relaxed">
                          <EditorialText text={comb.meaning} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 5: TEXTO ORIGINAL */}
          {activeTab === 'original' && (
            <div className="space-y-6 animate-fade-in fade-in pb-10">
              <div className="bg-leny-darker border border-white/5 p-6 md:p-8 rounded-xl shadow-2xl relative overflow-hidden">
                {/* Book design elements */}
                <div className="absolute top-0 right-0 p-8 opacity-5">
                   <BookOpen size={150} strokeWidth={0.5} />
                </div>
                
                <h3 className="text-xs md:text-sm uppercase tracking-[0.3em] font-bold text-leny-accent mb-6 flex items-center gap-2">
                  <History className="w-4 h-4" /> Texto Fuente Canónico
                </h3>

                {textArray.length > 0 ? (
                  <div className="space-y-6 text-[#cfd3dd] text-lg font-light leading-relaxed tracking-wide">
                    {textArray.map((paragraph, index) => {
                      const lowerText = paragraph.toLowerCase();
                      
                      // Omitir cabeceras repetitivas
                      if (lowerText.startsWith("carta n")) return null;
                      
                      // Convertir a H3 si es corto y en mayúsculas
                      if (paragraph.length < 70 && !paragraph.endsWith('.') && paragraph.toUpperCase() === paragraph) {
                        return <h3 key={index} className="text-2xl font-title text-leny-accent mt-12 mb-4 font-semibold">{paragraph}</h3>;
                      }

                      // Títulos en comillas
                      if (paragraph.startsWith('“') && paragraph.endsWith('”')) {
                          return (
                              <div key={index} className="my-8 p-6 bg-white/[0.03] border-l-2 border-leny-accent italic rounded-r-lg">
                                  <EditorialText text={paragraph} className="text-white opacity-90 font-serif" />
                              </div>
                          );
                      }

                      // Render normal
                      return (
                        <div key={index} className="text-justify mb-8 last:mb-0">
                          <EditorialText text={paragraph} />
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="text-center text-gray-500 py-10 italic">
                    Texto original del libro no encontrado para esta carta.
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 6: PRÁCTICA */}
          {activeTab === 'practicas' && (
            <div className="animate-fade-in fade-in pb-10">
               <div className="flex items-center gap-3 mb-6">
                  <Play className="w-6 h-6 text-leny-accent" />
                  <h3 className="text-xl md:text-2xl font-serif text-white">Misiones Prácticas Integradas</h3>
               </div>
               {relatedExercises.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                     {relatedExercises.map((ex, i) => (
                        <button 
                          key={i}
                          onClick={() => onNavigate && onNavigate({ viewMode: 'exercises', activeExerciseId: ex.id })}
                          className="bg-[#101217] hover:bg-[#1a212d] border border-white/5 hover:border-leny-accent/40 rounded-xl p-5 transition-all duration-300 text-left group flex flex-col h-full shadow-lg hover:shadow-[0_0_15px_rgba(201,162,39,0.15)] hover:-translate-y-1"
                        >
                           <div className="flex justify-between items-start mb-4 w-full">
                              <span className="text-[9px] font-bold uppercase tracking-widest text-leny-accent bg-leny-accent/10 px-2 py-1 rounded border border-leny-accent/20">
                                 Nivel {ex.nivel}
                              </span>
                              <span className="text-[9px] font-bold uppercase tracking-widest text-white/30 truncate ml-2">
                                 {ex.tipo === '3x3' ? 'PETIT 3x3' : ex.tipo === '5cartas' ? '5 CARTAS' : '3 CARTAS'}
                              </span>
                           </div>
                           <h4 className="text-sm font-serif text-white/90 mb-4 line-clamp-3 leading-relaxed group-hover:text-leny-accent transition-colors pb-2">
                              {ex.pregunta.replace(/(<([^>]+)>)/gi, "")}
                           </h4>
                           <div className="mt-auto pt-3 border-t border-white/5 flex items-center justify-between">
                              <span className="text-[10px] uppercase font-bold text-leny-dim group-hover:text-white transition-colors">
                                 A la Sala de Entrenamiento
                              </span>
                              <ChevronRight size={14} className="text-leny-dim group-hover:text-leny-accent group-hover:translate-x-1 transition-all" />
                           </div>
                        </button>
                     ))}
                  </div>
               ) : (
                  <div className="text-leny-dim text-sm italic py-6 bg-white/5 rounded-xl border border-white/5 text-center">
                     Aún no hay gimnasia registrada para focalizar esta carta específica en el motor actual.
                  </div>
               )}
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default CardProfile;
