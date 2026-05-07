import React, { useState, useEffect } from 'react';
import { 
  Dumbbell, BrainCircuit, Layers, LayoutPanelTop, Hash, 
  ChevronRight, BookOpen, PlayCircle, Star, PenTool, 
  CheckCircle2, Eye, MessageSquare, AlertTriangle, X, Bot
} from 'lucide-react';
import EditorialText from './EditorialText';
import { pokerExercisesBank } from '../data/poker_exercises_bank';
import { pokerCardsDictionary } from '../data/db/poker_cards';
import { evaluateUserInterpretation, hasValidKey } from '../services/aiOrchestrator';
import PokerSpread from './PokerSpread';

const allCategories = [
  { id: 'lineal3', name: 'Tirada de 3 Cartas', icon: Layers, desc: 'Lectura de tren cronológico y binarismo cromático.' },
  { id: 'cruz5', name: 'Tirada de 5 Cartas (Cruz)', icon: LayoutPanelTop, desc: 'Análisis de ejes verticales y horizontales.' },
  { id: 'matriz9', name: 'Matriz 3x3 (9 Cartas)', icon: Hash, desc: 'Sintaxis avanzada y evaluación perimetral.' }
];

export default function PokerExerciseBank({ onNavigate }) {
  const [activeCategory, setActiveCategory] = useState('lineal3');
  const [activeExercise, setActiveExercise] = useState(null);
  const [completedExercises, setCompletedExercises] = useState([]);
  
  // 0: Writing, 1: Quick Response, 2: Full Analysis
  const [revealMode, setRevealMode] = useState(0);
  const [userInterpretation, setUserInterpretation] = useState('');
  
  // AI Evaluation
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [evaluationResult, setEvaluationResult] = useState(null);
  const [hasApiKey, setHasApiKey] = useState(false);

  useEffect(() => {
    setHasApiKey(hasValidKey());
    const saved = localStorage.getItem('poker_exercise_progress');
    if (saved) {
      setCompletedExercises(JSON.parse(saved));
    }
  }, []);

  const markAsCompleted = (id) => {
    if (!completedExercises.includes(id)) {
      const newProgress = [...completedExercises, id];
      setCompletedExercises(newProgress);
      localStorage.setItem('poker_exercise_progress', JSON.stringify(newProgress));
    }
  };

  const handleSelectExercise = (exercise) => {
    setActiveExercise(exercise);
    setRevealMode(0);
    setUserInterpretation('');
    setEvaluationResult(null);
    setIsEvaluating(false);
  };

  const handleEvaluate = async () => {
    if (!userInterpretation.trim()) return;
    setIsEvaluating(true);
    try {
      // Reutilizamos el orquestador AI
      const result = await evaluateUserInterpretation(activeExercise, userInterpretation);
      setEvaluationResult(result);
      markAsCompleted(activeExercise.id);
    } catch (error) {
      console.error("Error AI:", error);
    } finally {
      setIsEvaluating(false);
    }
  };

  const categoryExercises = pokerExercisesBank.filter(e => e.type === activeCategory);
  const completedInCategory = categoryExercises.filter(ex => completedExercises.includes(ex.id)).length;
  const progressPercent = categoryExercises.length === 0 ? 0 : Math.round((completedInCategory / categoryExercises.length) * 100);

  const getCardData = (name) => {
    return pokerCardsDictionary.find(c => c.name === name) || { emoji: '🎴', name, color: 'negro', number: '?' };
  };

  const mapToPokerCardProps = (cartasStrings) => {
    return cartasStrings.map(carta => {
      // Find the card data
      const data = getCardData(carta);
      // Extract value
      let valueStr = data.name.split(' ')[0];
      if(valueStr === 'As') valueStr = 'A';
      if(valueStr === 'Jota') valueStr = 'J';
      if(valueStr === 'Reina') valueStr = 'Q';
      if(valueStr === 'Rey') valueStr = 'K';
      
      return {
        value: valueStr,
        suit: data.emoji,
        meaning: '', // Exercises don't have explicit meanings in the array yet
        name: data.name
      };
    });
  };

  return (
    <div className="h-full flex flex-col md:flex-row bg-[#0a0a0c] text-white overflow-hidden fade-in">
      
      {/* SIDEBAR DE EJERCICIOS */}
      <div className={`w-full md:w-80 flex-shrink-0 bg-[#0f0f12] border-r border-red-900/20 flex flex-col h-full overflow-y-auto custom-scrollbar z-20 ${activeExercise ? 'hidden md:flex' : 'flex'}`}>
        <div className="p-6 border-b border-red-900/20 bg-black/40 backdrop-blur sticky top-0 z-10">
          <div className="flex items-center gap-3 mb-2">
            <Dumbbell className="w-8 h-8 text-red-500" />
            <h2 className="text-2xl font-serif text-white leading-tight">Laboratorio<br/><span className="text-red-500">Operativo</span></h2>
          </div>
          <p className="text-sm text-gray-400 mt-2 mb-6 font-light">
            Entrenamiento activo de sintaxis y binarismo cromático.
          </p>
          
          {/* Progress Bar */}
          <div className="w-full bg-black/50 rounded-full h-3 border border-white/5 overflow-hidden relative mb-2">
            <div className="bg-red-600 h-full transition-all duration-700 ease-out" style={{ width: `${progressPercent}%` }}></div>
            <div className="absolute inset-0 flex items-center justify-center text-[9px] font-bold text-white uppercase tracking-tighter">
               {completedInCategory} / {categoryExercises.length} DESBLOQUEADO
            </div>
          </div>
        </div>
        
        <div className="p-4 flex flex-col gap-6">
          {/* Selector de Categorías */}
          <div className="space-y-2">
            {allCategories.map(cat => (
              <button
                key={cat.id}
                onClick={() => { setActiveCategory(cat.id); setActiveExercise(null); }}
                className={`w-full p-4 rounded-xl text-left transition-all duration-300 group relative overflow-hidden ${activeCategory === cat.id ? 'bg-red-600/10 border border-red-600/40 shadow-[0_0_20px_rgba(220,38,38,0.1)]' : 'bg-white/5 border border-transparent hover:bg-white/10'}`}
              >
                <div className="flex items-center gap-3 relative z-10">
                  <div className={`p-2 rounded-lg ${activeCategory === cat.id ? 'bg-red-600 text-white' : 'bg-white/10 text-gray-400 group-hover:text-white'}`}>
                    <cat.icon size={18} />
                  </div>
                  <div>
                    <div className={`text-xs font-bold uppercase tracking-widest ${activeCategory === cat.id ? 'text-white' : 'text-gray-400'}`}>{cat.name}</div>
                    <div className="text-[10px] text-gray-500 mt-0.5 leading-tight">{cat.desc}</div>
                  </div>
                </div>
              </button>
            ))}
          </div>

          {/* Lista de Ejercicios */}
          <div className="space-y-3">
            <div className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.2em] px-2 mb-1">Misiones Disponibles</div>
            {categoryExercises.map(ex => (
              <button
                key={ex.id}
                onClick={() => handleSelectExercise(ex)}
                className={`w-full p-4 rounded-xl text-left border transition-all duration-300 flex items-center justify-between group ${activeExercise?.id === ex.id ? 'bg-white text-black border-white' : 'bg-[#1a1a1e] border-white/5 hover:border-white/20'}`}
              >
                <div className="flex flex-col gap-1 overflow-hidden">
                  <div className="flex items-center gap-2">
                     <span className={`text-[8px] px-1.5 py-0.5 rounded font-bold uppercase ${ex.level === 'Básico' ? 'bg-green-900/50 text-green-400' : ex.level === 'Intermedio' ? 'bg-blue-900/50 text-blue-400' : 'bg-purple-900/50 text-purple-400'}`}>
                        {ex.level}
                     </span>
                     {completedExercises.includes(ex.id) && <CheckCircle2 size={12} className="text-green-500" />}
                  </div>
                  <div className={`text-sm font-medium truncate ${activeExercise?.id === ex.id ? 'text-black' : 'text-gray-200'}`}>{ex.title}</div>
                </div>
                <ChevronRight size={16} className={`flex-shrink-0 transition-transform ${activeExercise?.id === ex.id ? 'text-black' : 'text-gray-600 group-hover:translate-x-1'}`} />
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ÁREA DE TRABAJO */}
      <div className="flex-1 flex flex-col h-full relative overflow-hidden bg-gradient-to-b from-[#0a0a0c] to-black">
        {activeExercise ? (
          <div className="flex-1 overflow-y-auto custom-scrollbar p-6 md:p-12">
            {/* Header Ejercicio */}
            <div className="max-w-4xl mx-auto mb-12">
              <button 
                onClick={() => setActiveExercise(null)}
                className="md:hidden flex items-center gap-2 text-gray-500 hover:text-white mb-6 text-xs uppercase tracking-widest font-bold"
              >
                <ChevronRight className="rotate-180" size={14} /> Volver al Menú
              </button>
              
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-white/10">
                <div>
                   <div className="text-xs text-red-500 font-bold uppercase tracking-[0.3em] mb-2">{activeCategory === 'lineal3' ? 'Tríada Lineal' : activeCategory === 'cruz5' ? 'Tirada en Cruz' : 'Petit Tableau'}</div>
                   <h1 className="text-3xl md:text-5xl font-serif text-white font-medium">{activeExercise.title}</h1>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex flex-col items-end">
                    <span className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">Dificultad</span>
                    <span className={`text-sm font-bold ${activeExercise.level === 'Básico' ? 'text-green-400' : activeExercise.level === 'Intermedio' ? 'text-blue-400' : 'text-purple-400'}`}>{activeExercise.level}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Contenido Principal */}
            <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 mb-20">
              
              {/* Columna Cartas y Pregunta */}
              <div className="lg:col-span-7 space-y-10">
                <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-6 md:p-8 shadow-inner">
                   <div className="flex items-center gap-3 mb-6">
                      <div className="p-2 bg-red-600/20 text-red-500 rounded-lg">
                        <MessageSquare size={20} />
                      </div>
                      <h3 className="text-lg font-serif text-white">Pregunta del Consultante</h3>
                   </div>
                   <p className="text-xl md:text-2xl text-gray-200 leading-relaxed italic font-light">
                     "{activeExercise.contexto}"
                   </p>
                </div>

                {/* Renderizado de Cartas según Tipo */}
                <div className="flex flex-col items-center w-full">
                  <PokerSpread 
                    layout={activeExercise.type} 
                    cards={mapToPokerCardProps(activeExercise.cartas)} 
                  />
                </div>
              </div>

              {/* Columna Resolución */}
              <div className="lg:col-span-5 space-y-6">
                 <div className="flex flex-col h-full bg-[#0f0f12] border border-white/10 rounded-2xl p-6 shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none">
                       <BrainCircuit size={120} className="text-red-500" />
                    </div>

                    <div className="flex items-center gap-3 mb-6 relative z-10">
                       <PenTool size={18} className="text-red-500" />
                       <h3 className="text-sm font-bold uppercase tracking-widest text-white">Tu Interpretación</h3>
                    </div>

                    <textarea 
                      value={userInterpretation}
                      onChange={(e) => setUserInterpretation(e.target.value)}
                      disabled={revealMode > 0 || isEvaluating}
                      placeholder="Escribe aquí tu análisis detallado basándote en la teoría..."
                      className="flex-1 w-full bg-black/40 border border-white/10 rounded-xl p-4 text-gray-200 font-sans leading-relaxed focus:border-red-500/50 outline-none transition-all resize-none min-h-[200px] mb-6 relative z-10 disabled:opacity-70"
                    />

                    <div className="space-y-3 relative z-10">
                      {!evaluationResult && !isEvaluating && (
                        <button 
                          onClick={handleEvaluate}
                          disabled={!userInterpretation.trim() || !hasApiKey}
                          className={`w-full py-4 rounded-xl flex items-center justify-center gap-3 font-bold uppercase tracking-widest transition-all ${userInterpretation.trim() && hasApiKey ? 'bg-red-600 hover:bg-red-500 shadow-[0_4px_15px_rgba(220,38,38,0.3)]' : 'bg-white/5 text-gray-500 cursor-not-allowed'}`}
                        >
                           <Bot size={18} />
                           {hasApiKey ? 'Evaluar con el Profesor' : 'Inicia Sesión con API Key'}
                        </button>
                      )}

                      {isEvaluating && (
                        <div className="w-full py-4 bg-white/5 rounded-xl flex items-center justify-center gap-3 text-red-500 font-bold uppercase tracking-widest">
                           <div className="w-4 h-4 border-2 border-red-500 border-t-transparent rounded-full animate-spin"></div>
                           Procesando Análisis...
                        </div>
                      )}

                      {evaluationResult && (
                        <div className={`p-4 rounded-xl border mb-4 animate-fade-in ${evaluationResult.puntuacion > 70 ? 'bg-green-900/10 border-green-500/30' : 'bg-red-900/10 border-red-500/30'}`}>
                           <div className="flex items-center justify-between mb-2">
                              <span className="text-xs font-bold uppercase tracking-widest text-white/60">Nota del Profesor</span>
                              <span className={`text-xl font-title ${evaluationResult.puntuacion > 70 ? 'text-green-400' : 'text-red-400'}`}>{evaluationResult.puntuacion}%</span>
                           </div>
                           <p className="text-sm text-gray-300 italic">"{evaluationResult.comentario}"</p>
                        </div>
                      )}

                      <div className="grid grid-cols-2 gap-3">
                        <button 
                          onClick={() => setRevealMode(1)}
                          disabled={revealMode >= 1}
                          className={`py-3 rounded-xl flex items-center justify-center gap-2 text-[10px] font-bold uppercase tracking-widest transition-all ${revealMode >= 1 ? 'bg-white text-black' : 'bg-white/10 hover:bg-white/20'}`}
                        >
                           <CheckCircle2 size={14} /> Respuesta Rápida
                        </button>
                        <button 
                          onClick={() => { setRevealMode(2); markAsCompleted(activeExercise.id); }}
                          disabled={revealMode >= 2}
                          className={`py-3 rounded-xl flex items-center justify-center gap-2 text-[10px] font-bold uppercase tracking-widest transition-all ${revealMode >= 2 ? 'bg-red-600 text-white' : 'bg-white/10 hover:bg-white/20'}`}
                        >
                           <Eye size={14} /> Análisis Maestro
                        </button>
                      </div>
                    </div>
                 </div>
              </div>
            </div>

            {/* Revelación de Soluciones */}
            <div className="max-w-4xl mx-auto space-y-12 pb-32">
               {revealMode >= 1 && (
                 <div className="bg-white/[0.02] border-l-4 border-white/40 p-8 rounded-r-2xl animate-slide-up">
                    <h4 className="text-xs font-bold text-gray-500 uppercase tracking-[0.3em] mb-4">La Síntesis Oracular (Respuesta Rápida)</h4>
                    <p className="text-2xl md:text-3xl font-serif text-white leading-relaxed">{activeExercise.respuestaRapida}</p>
                 </div>
               )}

               {revealMode >= 2 && (
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-fade-in">
                    <div className="bg-red-900/10 border border-red-500/20 p-8 rounded-2xl relative overflow-hidden">
                       <div className="absolute top-0 right-0 p-6 opacity-5 pointer-events-none">
                          <BookOpen size={80} className="text-red-500" />
                       </div>
                       <h4 className="text-xs font-bold text-red-500 uppercase tracking-[0.3em] mb-6 flex items-center gap-2">
                          <BrainCircuit size={14} /> El Análisis del Maestro
                       </h4>
                       <div className="space-y-4 text-gray-200 leading-relaxed text-lg">
                          {activeExercise.respuestaDesarrollada.split('\n').map((p, i) => (
                             <p key={i}>{p}</p>
                          ))}
                       </div>
                    </div>

                    <div className="bg-white/5 border border-white/10 p-8 rounded-2xl">
                       <h4 className="text-xs font-bold text-gray-500 uppercase tracking-[0.3em] mb-6 flex items-center gap-2">
                          <Star size={14} className="text-yellow-500" /> Razonamiento Técnico
                       </h4>
                       <div className="p-5 bg-black/40 rounded-xl border border-white/5 italic text-gray-400 leading-relaxed">
                          {activeExercise.razonamientoTecnico}
                       </div>
                       
                       <div className="mt-10 flex flex-col items-center gap-4 text-center">
                          <div className="p-4 bg-green-500/20 text-green-400 rounded-full">
                             <CheckCircle2 size={32} />
                          </div>
                          <h5 className="text-lg font-bold text-white">Misión Cumplida</h5>
                          <p className="text-sm text-gray-500">Compara tu análisis con el del maestro para pulir tu técnica.</p>
                       </div>
                    </div>
                 </div>
               )}
            </div>
          </div>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center p-12 text-center">
            <div className="w-24 h-24 bg-red-600/10 border border-red-600/20 rounded-full flex items-center justify-center mb-8 animate-pulse">
               <PlayCircle className="text-red-500 w-12 h-12" />
            </div>
            <h2 className="text-4xl font-serif text-white mb-4">Gimnasio de Cartomancia</h2>
            <p className="text-gray-500 max-w-md leading-relaxed text-lg font-light">
              Selecciona una misión operativa en la barra lateral para comenzar tu entrenamiento. Aprende a leer la baraja inglesa con rigor y precisión clínica.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 w-full max-w-3xl">
               <div className="p-6 bg-white/[0.02] border border-white/5 rounded-2xl">
                  <Layers className="text-red-500 mb-4" />
                  <h4 className="font-bold text-sm uppercase tracking-widest mb-2">Lineales</h4>
                  <p className="text-xs text-gray-500">Domina el tren cronológico y la gramática básica.</p>
               </div>
               <div className="p-6 bg-white/[0.02] border border-white/5 rounded-2xl">
                  <LayoutPanelTop className="text-red-500 mb-4" />
                  <h4 className="font-bold text-sm uppercase tracking-widest mb-2">Sintaxis</h4>
                  <p className="text-xs text-gray-500">Cruza ejes de tensión y detecta bloqueos en Cruz.</p>
               </div>
               <div className="p-6 bg-white/[0.02] border border-white/5 rounded-2xl">
                  <Hash className="text-red-500 mb-4" />
                  <h4 className="font-bold text-sm uppercase tracking-widest mb-2">Matriciales</h4>
                  <p className="text-xs text-gray-500">Lectura de entorno, diagonales y perímetro avanzado.</p>
               </div>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: rgba(255,255,255,0.02); }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(255,255,255,0.2); }
        
        .animate-slide-up {
          animation: slideUp 0.5s ease-out forwards;
        }
        
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
