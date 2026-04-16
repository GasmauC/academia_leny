import React, { useState, useEffect } from 'react';
import { Dumbbell, Target, Layers, LayoutPanelTop, Hash, CheckCircle2, ArrowRight, BrainCircuit, ChevronRight, Eye, BookOpen, Lock, PlayCircle, Star, PenTool, MessageSquare, AlertTriangle, Bot, X } from 'lucide-react';
import EditorialText from './EditorialText';
import { lenormandExercises } from '../data/db/lenormand_exercises';
import { cardsDictionary } from '../data/db/lenormand_cards';

import { evaluateUserInterpretation, hasValidKey } from '../services/aiOrchestrator';

const allCategories = [
  { id: '3cartas', name: 'Tirada de 3 Cartas', icon: Layers },
  { id: '5cartas', name: 'Tirada de 5 Cartas', icon: LayoutPanelTop },
  { id: '3x3', name: 'Petit Tableau (3x3)', icon: Hash }
];

export default function ExerciseBank({ initialExercise, clearInitial, onNavigate }) {
  const [activeCategory, setActiveCategory] = useState('3cartas');
  const [activeExercise, setActiveExercise] = useState(null);
  const [completedExercises, setCompletedExercises] = useState([]);
  
  // 0: Start, 1: Respuesta Rapida shown, 2: Analisis shown
  const [revealMode, setRevealMode] = useState(0);

  // States para Tutor AI
  const [userInterpretation, setUserInterpretation] = useState('');
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [evaluationResult, setEvaluationResult] = useState(null);
  const [showInterpretInput, setShowInterpretInput] = useState(false);
  const [hasApiKey, setHasApiKey] = useState(false);

  // Cargar progreso y capturar initialExercise
  useEffect(() => {
    setHasApiKey(hasValidKey());
    const saved = localStorage.getItem('leny_exercise_progress');
    if (saved) {
      setCompletedExercises(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    if (initialExercise) {
      const ex = lenormandExercises.find(e => e.id === initialExercise);
      if (ex) {
        setActiveCategory(ex.tipo);
        handleSelectExercise(ex);
        if (clearInitial) clearInitial();
      }
    }
  }, [initialExercise, clearInitial]);

  // Guardar progreso
  const markAsCompleted = (id) => {
    if (!completedExercises.includes(id)) {
      const newProgress = [...completedExercises, id];
      setCompletedExercises(newProgress);
      localStorage.setItem('leny_exercise_progress', JSON.stringify(newProgress));
    }
  };

  const handleSelectExercise = (exercise) => {
    setActiveExercise(exercise);
    setRevealMode(0);
    setUserInterpretation('');
    setEvaluationResult(null);
    setShowInterpretInput(false);
    setIsEvaluating(false);
  };

  const handleEvaluate = async () => {
    if (!userInterpretation.trim()) return;
    setIsEvaluating(true);
    try {
      const result = await evaluateUserInterpretation(activeExercise, userInterpretation);
      setEvaluationResult(result);
    } catch (error) {
      alert("Error del Profesor Leny: " + error.message);
    } finally {
      setIsEvaluating(false);
    }
  };

  const currentCategoryObj = allCategories.find(c => c.id === activeCategory);
  
  const categoryExercises = lenormandExercises.filter(e => e.tipo === activeCategory);
  const totalInCategory = categoryExercises.length;
  const completedInCategory = categoryExercises.filter(ex => completedExercises.includes(ex.id)).length;
  const progressPercent = totalInCategory === 0 ? 0 : Math.round((completedInCategory / totalInCategory) * 100);

  // Render visual de las cartas según el módulo
  const renderCards = (exercise) => {
    // Si es 3x3 (9 cartas)
    if (exercise.tipo === '3x3') {
      return (
        <div className="w-full max-w-[280px] sm:max-w-sm mx-auto bg-leny-darker rounded-xl p-4 border border-white/10 shadow-2xl">
          <div className="text-[10px] text-leny-dim/60 mb-4 uppercase tracking-widest text-center w-full pb-2">Petit Tableau 3x3</div>
          <div className="grid grid-cols-3 gap-2">
            {exercise.cartas.map((rawName, i) => {
              const match = rawName.match(/\((.*?)\)/);
              const customNumber = match ? match[1] : '';
              const name = rawName.replace(/\(.*?\)/g, '').trim();
              const cleanName = name.toLowerCase();
              const cardData = cardsDictionary.find(c => c.name.toLowerCase() === cleanName || c.name.toLowerCase().includes(cleanName) || cleanName.includes(c.name.toLowerCase())) || { emoji: '🎴', name: name };

              return (
               <div key={i} className="aspect-[3/4] bg-[#111620] border border-white/10 rounded flex flex-col items-center justify-center p-1 sm:p-2 text-center relative overflow-hidden group">
                 <div className="absolute top-1 left-1 text-[8px] font-bold text-white/30 group-hover:text-leny-accent z-10 transition-colors">{customNumber || i+1}</div>
                 <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent"></div>
                 <span className="text-2xl sm:text-3xl drop-shadow-lg mb-1 relative z-10">{cardData.emoji}</span>
                 <span className="font-serif text-[8px] sm:text-[10px] leading-tight text-white/90 relative z-10">{cardData.name}</span>
                 
                 {/* Flyout Button */}
                 <button 
                    onClick={() => onNavigate && onNavigate({ viewMode: 'cardProfile', activeCardId: cardData.id })}
                    className="absolute inset-x-0 bottom-0 py-1 bg-leny-accent text-leny-dark font-bold text-[8px] sm:text-[9px] uppercase tracking-widest translate-y-full group-hover:translate-y-0 transition-transform z-20 hover:bg-yellow-400 opacity-90 backdrop-blur"
                 >
                   Ver Teoría
                 </button>
              </div>
            )})}
          </div>
        </div>
      )
    }

    // Para 3 o 5 cartas (Lineales)
    return (
      <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 md:gap-6 bg-leny-darker rounded-xl p-4 md:p-10 border border-white/10 shadow-xl overflow-hidden relative">
        <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none"></div>
        {exercise.cartas.map((rawName, i) => {
          const match = rawName.match(/\((.*?)\)/);
          const customNumber = match ? match[1] : '';
          const name = rawName.replace(/\(.*?\)/g, '').trim();
          const cleanName = name.toLowerCase();
          const cardData = cardsDictionary.find(c => c.name.toLowerCase() === cleanName || c.name.toLowerCase().includes(cleanName) || cleanName.includes(c.name.toLowerCase())) || { emoji: '🎴', name: name };

          return (
          <div key={i} className="relative group/card cursor-default aspect-[3/4] min-w-[70px] w-20 sm:w-24 md:w-32 flex-shrink-0 flex items-center justify-center shadow-2xl transition-transform hover:-translate-y-2 z-10">
            <div className="absolute -top-2 -left-2 w-5 h-5 md:w-6 md:h-6 rounded-full bg-leny-accent text-leny-dark flex items-center justify-center text-[10px] md:text-xs font-bold shadow-lg z-20 group-hover/card:scale-110 transition-transform">
              {customNumber || i + 1}
            </div>
            <div className="w-full h-full bg-[#111620] border border-white/10 rounded-xl flex flex-col items-center justify-center transition-all p-1 md:p-2 relative overflow-hidden ring-1 ring-white/5 group-hover/card:border-leny-accent/60 group-hover/card:ring-leny-accent/30">
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent"></div>
              <span className="text-3xl sm:text-4xl md:text-5xl drop-shadow-2xl mb-1 md:mb-3 relative z-10 group-hover/card:scale-110 transition-transform">{cardData.emoji}</span>
              <span className="font-serif text-[9px] sm:text-[10px] md:text-sm leading-tight text-white/90 text-center font-medium tracking-wide relative z-10 mb-2">
                {cardData.name}
              </span>
              {/* Overlay Button */}
              <button 
                  onClick={() => onNavigate && onNavigate({ viewMode: 'cardProfile', activeCardId: cardData.id })}
                  className="absolute bottom-0 inset-x-0 w-full py-1.5 md:py-2 bg-gradient-to-t from-leny-accent via-leny-accent to-leny-accent/90 text-leny-dark font-bold text-[8px] md:text-[10px] tracking-widest uppercase translate-y-full group-hover/card:translate-y-0 transition-transform z-20 flex flex-col items-center justify-center border-t border-yellow-200/50 hover:bg-yellow-400 group/btn"
              >
                 <BookOpen size={10} className="mb-0.5 opacity-70 group-hover/btn:opacity-100" />
                 Escanear
              </button>
            </div>
            {i < exercise.cartas.length - 1 && (
               <ChevronRight className="absolute -right-[15px] sm:-right-[20px] md:-right-[30px] top-1/2 -translate-y-1/2 hidden md:block w-4 h-4 md:w-6 md:h-6 text-white/20 z-10" />
            )}
          </div>
        )})}
      </div>
    );
  };

  return (
    <div className="h-full flex flex-col md:flex-row bg-leny-darker text-white overflow-hidden fade-in relative">
      
      {/* Sidebar de Categorías */}
      <div className={`w-full md:w-80 flex-shrink-0 bg-leny-dark border-r border-leny-accent/20 flex flex-col h-full md:h-auto overflow-y-auto custom-scrollbar z-20 ${activeExercise ? 'hidden md:flex' : 'flex'}`}>
        <div className="p-6 border-b border-leny-accent/10 sticky top-0 bg-leny-dark/95 backdrop-blur z-10">
          <div className="flex items-center gap-3 mb-2">
            <Dumbbell className="w-8 h-8 text-leny-accent" />
            <h2 className="text-2xl font-serif text-leny-accent leading-tight">Gimnasio<br/>Interactivo</h2>
          </div>
          <p className="text-sm text-leny-dim mt-2 mb-4">
            Resuelve misiones clínicas. Gana maestría oracular real basada empíricamente.
          </p>
          
          {/* Progress Bar Goblal de la categoría activa */}
          <div className="w-full bg-black/50 rounded-full h-3 border border-white/10 overflow-hidden relative">
            <div className="bg-leny-accent h-full transition-all duration-500 ease-out" style={{ width: `${progressPercent}%` }}></div>
            <div className="absolute inset-0 flex items-center justify-center text-[9px] font-bold text-white mix-blend-difference">
               {completedInCategory} / {totalInCategory} COMPLETO
            </div>
          </div>
        </div>
        
        <nav className="p-4 flex flex-col gap-2">
          {allCategories.map((cat) => {
            const isActive = activeCategory === cat.id;
            const catExs = lenormandExercises.filter(e => e.tipo === cat.id);
            const catCompleted = catExs.filter(ex => completedExercises.includes(ex.id)).length;
            return (
              <button
                key={cat.id}
                onClick={() => { setActiveCategory(cat.id); setActiveExercise(null); }}
                className={`flex items-center gap-3 p-4 rounded-xl text-left transition-all duration-300 w-full group
                  ${isActive 
                    ? 'bg-leny-accent/10 border border-leny-accent shadow-[0_0_15px_rgba(255,215,0,0.1)]' 
                    : 'bg-white/5 border border-transparent hover:bg-white/10 hover:border-white/20'}`}
              >
                <div className={`p-2 rounded-lg transition-colors ${isActive ? 'bg-leny-accent text-leny-dark' : 'bg-leny-darker text-leny-dim group-hover:text-leny-accent'}`}>
                  <cat.icon className="w-5 h-5" />
                </div>
                <div className="flex-1">
                   <span className={`block font-medium leading-snug ${isActive ? 'text-leny-accent' : 'text-leny-dim group-hover:text-white'}`}>
                     {cat.name}
                   </span>
                   <span className="text-[10px] text-white/40 block">{catCompleted}/{catExs.length} Completados</span>
                </div>
              </button>
            )
          })}
        </nav>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 h-full overflow-y-auto custom-scrollbar bg-leny-darker/50">
        
        {!activeExercise ? (
           /* Listado de Misiones (Grid Menu con Portada) */
           <div className="p-4 sm:p-6 md:p-12 lg:px-24 pb-32 slide-up overflow-y-auto custom-scrollbar h-full book-content">
             
              {/* Portada Interna (Hero) */}
              <div className="flex flex-col mb-12">
                <div className="bg-white/[0.02] border border-white/5 rounded-3xl p-6 sm:p-8 md:p-12 shadow-inner text-center relative overflow-hidden">
                  <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay" style={{backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'1\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")'}}></div>
                  <div className="absolute top-0 right-0 p-8 sm:p-16 opacity-5 pointer-events-none">
                     <Dumbbell size={150} strokeWidth={0.5} />
                  </div>
                  
                  <div className="text-[10px] text-leny-accent uppercase tracking-[0.3em] font-bold mb-4 md:mb-6 opacity-80 decoration-leny-accent/30 underline underline-offset-4">
                     Módulo de Entrenamiento
                  </div>
                  <h1 className="text-2xl sm:text-3xl lg:text-5xl font-serif text-white mb-4 md:mb-6 relative z-10 drop-shadow-md">{currentCategoryObj.name}</h1>
                  <p className="text-gray-400 mb-8 max-w-2xl mx-auto leading-relaxed text-sm md:text-lg relative z-10 font-light">
                    Observa las cartas, deduce la narrativa oracular basada en las leyes de Lopes Mazza y el sistema Alemán. 
                    Luego, evalúa tu respuesta comparándola con el solucionario oficial.
                  </p>
                  
                  <div className="relative z-10">
                    <button 
                      onClick={() => handleSelectExercise(categoryExercises.find(e => !completedExercises.includes(e.id)) || categoryExercises[0])}
                      className="px-6 md:px-8 flex items-center gap-3 py-3 md:py-4 bg-white hover:bg-gray-100 text-black font-semibold rounded-full shadow-[0_4px_20px_rgba(255,255,255,0.15)] hover:shadow-[0_8px_30px_rgba(255,255,255,0.25)] transition-all hover:-translate-y-0.5 select-none mx-auto text-sm md:text-base"
                    >
                      <Target size={18} strokeWidth={2} />
                      <span>{completedInCategory === totalInCategory ? "Repasar Misiones" : "Continuar Entrenamiento"}</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Índice Visual */}
              <div className="text-xs uppercase tracking-[0.3em] text-leny-accent/60 font-bold mb-8 text-center border-b border-white/5 pb-4">
                 Índice de Prácticas ({completedInCategory}/{totalInCategory})
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                 {categoryExercises.map((ex, index) => {
                    const isDone = completedExercises.includes(ex.id);
                    
                    // Determine states for linear progression
                    const firstPendingIndex = categoryExercises.findIndex(e => !completedExercises.includes(e.id));
                    const pendingIndex = firstPendingIndex === -1 ? categoryExercises.length : firstPendingIndex;
                    
                    const isActive = index === pendingIndex;
                    const isBlocked = index > pendingIndex;

                    const levelRoman = ['I', 'II', 'III', 'IV', 'V'][ex.nivel - 1] || 'I';

                    // Mapeo Iconos de Tirada
                    let SpreadIcon = Layers;
                    if (ex.tipo === '5cartas') SpreadIcon = LayoutPanelTop;
                    if (ex.tipo === '3x3') SpreadIcon = Hash;

                    return (
                       <button 
                         key={ex.id}
                         disabled={isBlocked}
                         onClick={() => handleSelectExercise(ex)}
                         className={`p-5 rounded-2xl border text-left flex flex-col transition-all duration-500 group relative h-[240px] shadow-lg overflow-hidden
                           ${isDone 
                             ? 'bg-[#1a212d]/60 border-green-500/20 hover:border-green-500/40 opacity-80 hover:opacity-100 hover:-translate-y-1' 
                             : isActive 
                               ? 'bg-gradient-to-b from-[#1c2438] to-[#121826] border-leny-accent shadow-[0_0_20px_rgba(255,215,0,0.15)] hover:shadow-[0_0_30px_rgba(255,215,0,0.25)] hover:-translate-y-1' 
                               : 'bg-black/40 border-white/5 opacity-50 cursor-not-allowed grayscale-[50%]'}`}
                       >
                         {/* Card Glow Background (Active State) */}
                         {isActive && (
                           <div className="absolute inset-0 bg-gradient-to-br from-leny-accent/10 via-transparent to-transparent opacity-50 pointer-events-none"></div>
                         )}

                         {/* Header: Badge Nivel & Estado */}
                         <div className="flex items-center justify-between w-full mb-auto relative z-10">
                            <div className={`px-2 py-1 rounded text-[9px] font-bold tracking-widest uppercase flex items-center gap-1.5 border
                              ${isDone ? 'bg-green-900/40 text-green-400 border-green-500/30' : 
                                isActive ? 'bg-leny-accent/20 text-leny-accent border-leny-accent/30' : 
                                'bg-white/5 text-white/40 border-white/10'}`}>
                               <span>NIVEL {levelRoman}</span>
                            </div>

                            <div className="flex shrink-0">
                               {isDone ? <CheckCircle2 className="w-5 h-5 text-green-500" /> : 
                                isActive ? <PlayCircle className="w-5 h-5 text-leny-accent animate-pulse shadow-[0_0_15px_rgba(255,215,0,0.5)] rounded-full" /> : 
                                <Lock className="w-4 h-4 text-white/30" />}
                            </div>
                         </div>

                         {/* Central Icon */}
                         <div className={`absolute -right-4 top-1/2 -translate-y-1/2 transition-transform duration-700 
                            ${isActive ? 'opacity-20 scale-[4] rotate-12 group-hover:scale-[4.5] group-hover:rotate-6 text-leny-accent' 
                                      : 'opacity-5 scale-[3] text-white'}`}>
                            <SpreadIcon strokeWidth={1} />
                         </div>

                         {/* Body: Título y Subtítulo */}
                         <div className="relative z-10 w-full mt-6 mb-2">
                             <div className={`text-[10px] uppercase tracking-[0.2em] font-bold mb-2 flex items-center gap-2
                                ${isActive ? 'text-leny-accent/80' : 'text-leny-dim'}`}>
                                Misión {index + 1}
                                <span className={`w-1 h-1 rounded-full ${isActive ? 'bg-leny-accent' : 'bg-white/20'}`}></span>
                                <span className="opacity-70">{ex.contexto}</span>
                             </div>

                             <h3 className={`font-serif text-lg leading-tight line-clamp-2 pr-4
                                ${isDone ? 'text-white/70' : isActive ? 'text-white font-medium' : 'text-white/40'}`}>
                                {ex.pregunta.replace(/(<([^>]+)>)/gi, "")}
                             </h3>
                         </div>

                         {/* Footer: Progress indicator */}
                         <div className="w-full mt-auto relative z-10 pt-4 border-t border-white/5 flex items-center justify-between">
                            <div className="flex flex-col">
                               <span className="text-[8px] uppercase tracking-widest text-white/40 mb-1">MÉTRICA</span>
                               <span className={`text-xs font-medium tracking-wider font-mono
                                 ${isDone ? 'text-green-400' : isActive ? 'text-leny-accent' : 'text-white/30'}`}>
                                 {index + 1} / {totalInCategory}
                               </span>
                            </div>

                            {isActive && (
                               <div className="text-[10px] uppercase tracking-widest font-bold text-leny-accent group-hover:translate-x-1 transition-transform flex items-center gap-1">
                                  Iniciar <ChevronRight size={12} strokeWidth={3} />
                               </div>
                            )}
                         </div>

                       </button>
                    )
                 })}
              </div>
           </div>
        ) : (
           /* Vista de Flashcard Activa */
           <div className="p-4 md:p-10 lg:p-16 pb-32 max-w-4xl mx-auto fade-in">
              <button 
                onClick={() => setActiveExercise(null)}
                className="mb-6 md:mb-8 text-xs md:text-sm text-leny-dim hover:text-white flex items-center gap-2 transition-colors py-2"
              >
                ← Volver al listado de Misiones
              </button>

              <div className="bg-leny-dark border border-white/10 rounded-3xl p-6 md:p-10 lg:p-14 shadow-2xl relative overflow-hidden">
                 
                 {/* Cabecera Enunciado */}
                 <div className="mb-8 md:mb-10 relative z-10 flex flex-col md:flex-row md:items-start justify-between gap-4">
                    <div>
                      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-leny-accent/10 text-leny-accent text-[10px] sm:text-xs font-bold tracking-widest uppercase mb-4 border border-leny-accent/20">
                         Misión Nivel {activeExercise.nivel} <span className="opacity-50">|</span> {activeExercise.contexto}
                      </div>
                      <div className="text-xl sm:text-2xl md:text-3xl font-serif text-white mb-2 leading-relaxed font-light">
                         <EditorialText text={activeExercise.pregunta} />
                      </div>
                    </div>
                 </div>

                 <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mb-10"></div>

                 {/* Mesa de Cartas */}
                 <div className="mb-14 relative z-10">
                    {renderCards(activeExercise)}
                 </div>

                 {/* Zona de Interacción (Flashcard Flash) */}
                 <div className="mt-12 flex flex-col items-center max-w-2xl mx-auto relative z-10">
                    
                    {revealMode === 0 && !showInterpretInput && !evaluationResult && (
                       <div className="flex flex-col items-center gap-4 animate-in fade-in slide-in-from-bottom-4 w-full">
                          <p className="text-sm md:text-base text-gray-400 italic text-center mb-4">
                             Observa detenidamente la tirada. Deduce la respuesta en tu mente o permite que el Profesor Leny evalúe tu lectura escrita.
                          </p>
                          <div className="flex flex-col sm:flex-row gap-3 w-full justify-center">
                            <button 
                               onClick={() => setShowInterpretInput(true)}
                               className="w-full sm:w-auto px-6 py-4 rounded-xl border transition-all flex items-center justify-center gap-3 text-sm font-medium bg-blue-900/20 border-blue-500/50 text-blue-300 hover:bg-blue-900/40 hover:border-blue-400 hover:-translate-y-0.5 shadow-[0_0_15px_rgba(59,130,246,0.15)]"
                               title="Recibir feedback estricto y personalizado de la IA"
                            >
                               <PenTool size={18} /> 
                               Escribir mi interpretación (AI)
                            </button>
                            <button 
                               onClick={() => setRevealMode(1)}
                               className="w-full sm:w-auto px-6 py-4 bg-leny-accent hover:bg-yellow-400 text-leny-dark font-bold rounded-xl shadow-[0_0_20px_rgba(255,215,0,0.2)] hover:shadow-[0_0_30px_rgba(255,215,0,0.4)] transition-all hover:-translate-y-0.5 flex items-center justify-center gap-3 text-sm"
                            >
                               <Eye size={18} />
                               Ver Solucionario Directo
                            </button>
                          </div>
                       </div>
                    )}

                    {showInterpretInput && !evaluationResult && (
                       <div className="w-full animate-in fade-in slide-in-from-bottom-4">
                         <div className="bg-black/50 border border-blue-500/30 rounded-2xl p-6 shadow-inner relative">
                           <div className="absolute top-0 right-0 -mt-3 -mr-3 flex items-center justify-center w-8 h-8 rounded-full bg-blue-500 text-white shadow-lg">
                             <Bot size={16} />
                           </div>
                           <h4 className="text-sm font-bold uppercase tracking-widest text-blue-400 mb-3 block flex items-center gap-2">
                             Mesa de Examinación AI
                           </h4>
                           <textarea
                             value={userInterpretation}
                             onChange={(e) => setUserInterpretation(e.target.value)}
                             disabled={isEvaluating}
                             placeholder="Escribe tu interpretación estructurada aquí. Identifica cual es el Sustantivo y cuál el Adjetivo, qué dice el contexto..."
                             className="w-full h-32 bg-[#121826] border border-blue-500/30 rounded-xl p-4 text-white placeholder:text-white/30 focus:border-blue-400 focus:ring-1 focus:ring-blue-400 transition-all outline-none resize-none mb-4 disabled:opacity-50"
                           />
                           <div className="flex flex-col sm:flex-row gap-3 justify-end mt-2">
                             <button 
                               disabled={isEvaluating}
                               onClick={() => setShowInterpretInput(false)}
                               className="px-4 py-2 hover:bg-white/10 text-leny-dim rounded-lg transition-colors flex items-center justify-center gap-2 text-sm"
                             >
                               <X size={16} /> Cancelar
                             </button>
                             <button
                               disabled={!userInterpretation.trim() || isEvaluating}
                               onClick={handleEvaluate}
                               className="px-6 py-2 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-lg shadow-lg shadow-blue-900/50 transition-all flex items-center justify-center gap-2 text-sm disabled:opacity-50 disabled:shadow-none"
                             >
                               {isEvaluating ? (
                                 <><span className="w-4 h-4 rounded-full border-2 border-white/20 border-t-white animate-spin"></span> Evaluando lectura...</>
                               ) : (
                                 <><MessageSquare size={16} /> Evaluar Interpretación</>
                               )}
                             </button>
                           </div>
                         </div>
                       </div>
                    )}

                    {evaluationResult && (
                       <div className="w-full animate-in fade-in slide-in-from-bottom-8">
                         <div className={`border p-6 md:p-8 rounded-2xl shadow-2xl relative mb-6
                           ${evaluationResult.puntuacion >= 80 ? 'bg-green-950/20 border-green-500/50' : 
                             evaluationResult.puntuacion >= 50 ? 'bg-yellow-900/10 border-yellow-500/50' : 
                             'bg-red-950/20 border-red-500/50'}`}>
                           
                           <div className="absolute top-0 right-0 -mt-6 -mr-4 flex flex-col items-center">
                             <div className={`w-16 h-16 rounded-full flex items-center justify-center text-2xl font-black border-4 shadow-xl
                               ${evaluationResult.puntuacion >= 80 ? 'bg-green-500 border-green-900 text-black' : 
                                 evaluationResult.puntuacion >= 50 ? 'bg-yellow-400 border-yellow-900 text-black' : 
                                 'bg-red-500 border-red-900 text-white'}`}>
                               {evaluationResult.puntuacion}
                             </div>
                             <span className="text-[10px] uppercase font-bold tracking-widest mt-2 bg-black/50 px-2 py-0.5 rounded text-white/70">NIVEL {evaluationResult.nivel}</span>
                           </div>

                           <h3 className="text-xl font-serif mb-4 flex items-center gap-2">
                             <Bot className="text-blue-400" /> Boletín de Corrección
                           </h3>
                           
                           <p className="text-white/80 leading-relaxed mb-6 bg-black/40 p-4 rounded-xl border border-white/5 italic">
                             "{evaluationResult.feedback_general}"
                           </p>

                           <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                             {evaluationResult.aciertos?.length > 0 && (
                               <div className="bg-green-900/20 border border-green-500/30 rounded-xl p-4">
                                 <h4 className="text-[10px] font-bold uppercase tracking-widest text-green-400 mb-2 flex items-center gap-1.5"><CheckCircle2 size={14}/> Aciertos</h4>
                                 <ul className="text-sm text-green-100/80 space-y-2 list-disc pl-4">
                                   {evaluationResult.aciertos.map((a, i) => <li key={i}>{a}</li>)}
                                 </ul>
                               </div>
                             )}
                             {evaluationResult.errores?.length > 0 && (
                               <div className="bg-red-900/20 border border-red-500/30 rounded-xl p-4">
                                 <h4 className="text-[10px] font-bold uppercase tracking-widest text-red-400 mb-2 flex items-center gap-1.5"><AlertTriangle size={14}/> Fallos y Excesos</h4>
                                 <ul className="text-sm text-red-100/80 space-y-2 list-disc pl-4">
                                   {evaluationResult.errores.map((e, i) => <li key={i}>{e}</li>)}
                                 </ul>
                               </div>
                             )}
                           </div>

                           <div className="bg-blue-900/20 border-l-4 border-blue-500 p-4 rounded-r-xl mb-4 text-blue-100/90 text-sm">
                             <h4 className="text-[10px] font-bold uppercase tracking-widest text-blue-400 mb-2">Lectura Oficial Exigida:</h4>
                             <p className="italic">{evaluationResult.comparacion_con_respuesta_correcta}</p>
                           </div>

                           {evaluationResult.sugerencias?.length > 0 && (
                             <div className="text-xs text-white/50 border-t border-white/10 pt-4 mt-4">
                               <span className="font-bold text-white/70">Consejo Tutor:</span> {evaluationResult.sugerencias.join(" ")}
                             </div>
                           )}
                         </div>

                         <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-6">
                           <button 
                             onClick={() => {
                               setEvaluationResult(null);
                               setShowInterpretInput(true);
                             }}
                             className="w-full sm:w-auto px-6 py-3 border border-white/20 hover:bg-white/10 text-white rounded-xl transition-colors text-sm"
                           >
                             Reintentar Interpretación
                           </button>

                           <button 
                             onClick={() => {
                               markAsCompleted(activeExercise.id);
                               // Ir al siguiente ejercicio disponible
                               const currentIndex = categoryExercises.findIndex(e => e.id === activeExercise.id);
                               const nextExercise = categoryExercises[currentIndex + 1];
                               if (nextExercise) {
                                 handleSelectExercise(nextExercise);
                               } else {
                                 setActiveExercise(null);
                               }
                             }}
                             className="w-full sm:w-auto px-8 py-3 bg-leny-accent text-black font-bold rounded-xl hover:bg-yellow-400 shadow-[0_0_20px_rgba(255,215,0,0.3)] transition-all flex items-center justify-center gap-2"
                           >
                              {evaluationResult.puntuacion >= 50 ? "Aceptar y Continuar Misión" : "Forzar Avance de Misión"} <ArrowRight size={18} />
                           </button>
                         </div>
                       </div>
                    )}

                    {revealMode >= 1 && (
                       <div className="w-full animate-in fade-in slide-in-from-bottom-4">
                          <div className="bg-leny-darker border-l-4 border-leny-accent p-6 rounded-r-xl rounded-l-sm shadow-inner mb-6 relative">
                             <div className="absolute top-0 right-0 -mt-3 -mr-3 w-8 h-8 rounded-full bg-leny-accent text-leny-dark flex items-center justify-center font-bold text-xs shadow-lg">1</div>
                             <h4 className="text-[10px] font-bold uppercase tracking-widest text-leny-accent/70 mb-3 block">Respuesta de Alto Nivel:</h4>
                             <p className="text-lg md:text-xl font-serif text-white/90 leading-relaxed font-light">
                                <EditorialText text={activeExercise.respuesta_rapida} />
                             </p>
                          </div>

                          {revealMode === 1 && (
                             <button 
                                onClick={() => {
                                   setRevealMode(2);
                                   markAsCompleted(activeExercise.id);
                                }}
                                className="w-full px-6 py-4 bg-white/5 hover:bg-white/10 border border-white/20 text-white font-medium rounded-xl transition-colors flex items-center justify-center gap-3 mt-4 text-sm md:text-base group"
                             >
                                <BookOpen size={18} className="text-leny-dim group-hover:text-leny-accent transition-colors" />
                                Leer Análisis Técnico y Desglose
                             </button>
                          )}
                       </div>
                    )}

                    {revealMode === 2 && (
                       <div className="w-full animate-in fade-in slide-in-from-bottom-8">
                          <div className="bg-black/40 border border-white/10 p-6 md:p-8 rounded-xl shadow-2xl relative mb-8">
                             <div className="absolute top-0 right-0 -mt-3 -mr-3 w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold text-xs shadow-lg">2</div>
                             <h4 className="text-[10px] font-bold uppercase tracking-widest text-blue-400 mb-4 flex items-center gap-2">
                               <BrainCircuit size={14} /> Análisis de la Escuela Alemana
                             </h4>
                             <p className="text-sm md:text-base text-gray-300 leading-relaxed mb-6 font-light">
                                <EditorialText text={activeExercise.respuesta_desarrollada} />
                             </p>
                             
                             <div className="bg-blue-900/10 border-l-2 border-blue-500/50 p-4 rounded-r-lg mt-4 text-sm text-blue-200 uppercase tracking-wide font-medium font-serif leading-relaxed">
                                <strong>Código Técnico: </strong> <br/>
                                <span className="opacity-90 leading-tight mt-1 inline-block normal-case"><EditorialText text={activeExercise.razonamiento_tecnico} /></span>
                             </div>
                          </div>

                          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-6 mt-8 pt-8 border-t border-white/10">
                             <div className="flex items-center gap-3 text-green-400 bg-green-400/10 px-4 py-2 rounded-full border border-green-500/20 w-fit self-center sm:self-start">
                                <CheckCircle2 size={18} />
                                <span className="text-xs font-bold uppercase tracking-widest">Misión Registrada</span>
                             </div>

                             <button 
                               onClick={() => {
                                 // Ir al siguiente ejercicio disponible
                                 const currentIndex = categoryExercises.findIndex(e => e.id === activeExercise.id);
                                 const nextExercise = categoryExercises[currentIndex + 1];
                                 if (nextExercise) {
                                   handleSelectExercise(nextExercise);
                                 } else {
                                   setActiveExercise(null);
                                 }
                               }}
                               className="w-full sm:w-auto px-6 py-3 bg-white text-black font-medium rounded-xl hover:bg-gray-200 transition-colors flex items-center justify-center gap-2 text-sm"
                             >
                                Siguiente Misión <ArrowRight size={16} />
                             </button>
                          </div>
                       </div>
                    )}
                 </div>

              </div>
           </div>
        )}
      </div>
    </div>
  );
}
