import React from 'react';
import { BookOpen, Library, Grip, History, Star, Play, CheckCircle2, Target } from 'lucide-react';
import { useStudyData } from '../hooks/useStudyData';

const StudentDashboard = ({ onStart, onNavigate, stats, activeModule = 'lenormand' }) => {
  const { bookmarks, history, readNodes } = useStudyData();

  // Progress Calculations
  const totalTheory = stats?.totalNodes || 1;
  const readTheoryCount = readNodes.length;
  const theoryPercent = Math.min(100, Math.round((readTheoryCount / totalTheory) * 100));

  let exerciseCount = 0;
  try {
    const exProg = JSON.parse(localStorage.getItem('leny_exercise_progress')) || [];
    exerciseCount = exProg.length;
  } catch (e) {}
  const totalExercises = 170; // Hardcoded total from plan
  const exPercent = Math.min(100, Math.round((exerciseCount / totalExercises) * 100));

  const formatTimeAgo = (ts) => {
    const diff = Math.floor((Date.now() - ts) / 60000); // mins
    if (diff < 1) return 'Hace un momento';
    if (diff < 60) return `${diff} min`;
    if (diff < 1440) return `${Math.floor(diff/60)} hrs`;
    return `${Math.floor(diff/1440)} d`;
  };

  const handleActionClick = (item) => {
    if (item.path.activeNodeId) {
      onNavigate({ viewMode: item.type, activeNodeId: item.path.activeNodeId });
    } else if (item.path.activeCardId) {
      onNavigate({ viewMode: item.type, activeCardId: item.path.activeCardId });
    } else {
      onNavigate({ viewMode: item.type });
    }
  };

  return (
    <div className="flex-1 flex flex-col p-6 md:p-12 lg:p-16 bg-leny-dark relative overflow-y-auto custom-scrollbar fade-in h-full">
      <div className="max-w-6xl w-full mx-auto z-10 space-y-16 pb-32">
        
        {/* === NIVEL 1: ENCABEZADO Y BIENVENIDA === */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 pb-8 border-b border-white/5">
          <div className="space-y-4">
            <h2 className={`${activeModule === 'poker' ? 'text-red-500' : 'text-leny-accent'} uppercase tracking-[0.25em] text-[11px] font-bold flex items-center gap-3`}>
               <span className={`w-6 h-px ${activeModule === 'poker' ? 'bg-red-500/50' : 'bg-leny-accent/50'} inline-block`}></span>
               CENTRO DE CONTROL {activeModule === 'poker' ? 'PÓKER' : 'LENORMAND'}
            </h2>
            <h1 className="text-4xl md:text-5xl font-serif text-white leading-tight">
              Bienvenido a<br/><span className="font-bold text-5xl md:text-6xl">Tu Academia</span>
            </h1>
          </div>
          
          <button 
            onClick={onStart}
            className={`group px-8 py-4 ${activeModule === 'poker' ? 'bg-red-600 text-white hover:shadow-[0_15px_40px_rgba(220,38,38,0.3)]' : 'bg-leny-accent text-leny-dark shadow-[0_10px_30px_rgba(201,162,39,0.15)] hover:shadow-[0_15px_40px_rgba(201,162,39,0.3)]'} font-bold text-lg rounded-xl transition-all transform hover:-translate-y-1 flex items-center gap-3 shrink-0`}
          >
            {history.length > 0 ? (
              <><Play className="w-5 h-5 fill-leny-dark" /> Retomar Estudio</>
            ) : (
              <><BookOpen className="w-5 h-5" /> Iniciar Lectura</>
            )}
          </button>
        </div>

        {/* === NIVEL 2: ACCESOS RÁPIDOS INTELIGENTES === */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
           <button onClick={() => onNavigate({appMode: 'libro', viewMode: 'reader'})} className="bg-[#0a0d14] hover:bg-white/5 border border-white/5 hover:border-leny-accent/30 p-8 rounded-2xl flex flex-col items-center gap-5 transition-all duration-500 group">
              <div className="p-5 bg-black/40 group-hover:bg-leny-accent/10 rounded-full text-white/30 group-hover:text-leny-accent transition-colors ring-1 ring-white/5 group-hover:ring-leny-accent/30 shadow-xl"><BookOpen size={26} strokeWidth={1}/></div>
              <div className="text-center">
                 <div className="font-serif text-[20px] font-medium text-white/90 group-hover:text-white mb-2 transition-colors">Libro Teórico</div>
                 <div className="text-[9px] tracking-[0.2em] text-white/30 uppercase font-bold">Curso Completo</div>
              </div>
           </button>
           <button onClick={() => onNavigate({appMode: 'estudio', viewMode: 'cardsMenu'})} className="bg-[#0a0d14] hover:bg-white/5 border border-white/5 hover:border-leny-accent/30 p-8 rounded-2xl flex flex-col items-center gap-5 transition-all duration-500 group">
              <div className="p-5 bg-black/40 group-hover:bg-leny-accent/10 rounded-full text-white/30 group-hover:text-leny-accent transition-colors ring-1 ring-white/5 group-hover:ring-leny-accent/30 shadow-xl"><Library size={26} strokeWidth={1}/></div>
              <div className="text-center">
                 <div className="font-serif text-[20px] font-medium text-white/90 group-hover:text-white mb-2 transition-colors">Atlas de Cartas</div>
                 <div className="text-[9px] tracking-[0.2em] text-white/30 uppercase font-bold">Diccionario Absoluto</div>
              </div>
           </button>
           <button onClick={() => onNavigate({appMode: 'estudio', viewMode: 'spreadsMenu'})} className="bg-[#0a0d14] hover:bg-white/5 border border-white/5 hover:border-leny-accent/30 p-8 rounded-2xl flex flex-col items-center gap-5 transition-all duration-500 group">
              <div className="p-5 bg-black/40 group-hover:bg-leny-accent/10 rounded-full text-white/30 group-hover:text-leny-accent transition-colors ring-1 ring-white/5 group-hover:ring-leny-accent/30 shadow-xl"><Grip size={26} strokeWidth={1}/></div>
              <div className="text-center">
                 <div className="font-serif text-[20px] font-medium text-white/90 group-hover:text-white mb-2 transition-colors">Tiradas</div>
                 <div className="text-[9px] tracking-[0.2em] text-white/30 uppercase font-bold">Mesas de Lectura</div>
              </div>
           </button>
           <button onClick={() => onNavigate({appMode: 'estudio', viewMode: 'exercises'})} className="bg-[#0a0d14] hover:bg-white/5 border border-white/5 hover:border-leny-accent/30 p-8 rounded-2xl flex flex-col items-center gap-5 transition-all duration-500 group">
              <div className="p-5 bg-black/40 group-hover:bg-leny-accent/10 rounded-full text-white/30 group-hover:text-leny-accent transition-colors ring-1 ring-white/5 group-hover:ring-leny-accent/30 shadow-xl"><Target size={26} strokeWidth={1}/></div>
              <div className="text-center">
                 <div className="font-serif text-[20px] font-medium text-white/90 group-hover:text-white mb-2 transition-colors">Laboratorio</div>
                 <div className="text-[9px] tracking-[0.2em] text-white/30 uppercase font-bold">Práctica Pura</div>
              </div>
           </button>
        </div>

        {/* === NIVEL 3: PANEL DE PROGRESO UNIFICADO === */}
        <div className="bg-[#0a0d14] border border-white/5 rounded-3xl p-8 lg:p-12 shadow-2xl flex flex-col lg:flex-row items-center gap-12 lg:gap-16 relative overflow-hidden">
            {/* Decors */}
            <div className={`absolute top-0 right-0 w-64 h-64 ${activeModule === 'poker' ? 'bg-red-500/5' : 'bg-leny-accent/5'} rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2 pointer-events-none`}></div>
            
            <div className="w-full xl:w-1/2 grid grid-cols-1 md:grid-cols-2 gap-10">
                {/* Gauge: Teoría */}
                <div className="relative z-10">
                    <div className="flex justify-between items-end mb-4">
                        <div className="space-y-1">
                            <h3 className="text-white/60 font-bold text-[10px] tracking-[0.25em] uppercase flex items-center gap-2"><BookOpen size={14} className="text-leny-accent" /> Avance Teórico</h3>
                            <p className="text-xs text-white/30 font-serif italic">{readTheoryCount} de {totalTheory} capítulos</p>
                        </div>
                        <span className="text-3xl font-serif text-white/90">{theoryPercent}<span className="text-leny-accent text-lg">%</span></span>
                    </div>
                    <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden border border-white/5">
                        <div className="h-full bg-gradient-to-r from-leny-accent/20 to-leny-accent transition-all duration-1000" style={{width: `${theoryPercent}%`}}></div>
                    </div>
                </div>

                {/* Gauge: Práctica */}
                <div className="relative z-10">
                    <div className="flex justify-between items-end mb-4">
                        <div className="space-y-1">
                            <h3 className="text-white/60 font-bold text-[10px] tracking-[0.25em] uppercase flex items-center gap-2"><CheckCircle2 size={14} className="text-white/50" /> Nivel Práctico</h3>
                            <p className="text-xs text-white/30 font-serif italic">{exerciseCount} de {totalExercises} misiones</p>
                        </div>
                        <span className="text-3xl font-serif text-white/90">{exPercent}<span className="text-white/50 text-lg">%</span></span>
                    </div>
                    <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden border border-white/5">
                        <div className="h-full bg-gradient-to-r from-white/20 to-white/70 transition-all duration-1000" style={{width: `${exPercent}%`}}></div>
                    </div>
                </div>
            </div>

            <div className="hidden lg:block w-px h-24 bg-white/5 relative z-10"></div>

            {/* Micro-Stats Estáticas */}
            <div className="w-full xl:w-auto flex flex-1 justify-around lg:justify-between items-center relative z-10">
               <div className="text-center">
                 <div className="text-4xl font-serif text-leny-accent/80 mb-2">{stats?.counts?.examples || 62}</div>
                 <div className="text-[8px] font-bold tracking-[0.3em] uppercase text-white/40">Ejemplos</div>
               </div>
               <div className="text-center">
                 <div className="text-4xl font-serif text-leny-accent/80 mb-2">36</div>
                 <div className="text-[8px] font-bold tracking-[0.3em] uppercase text-white/40">Misterios</div>
               </div>
               <div className="text-center">
                 <div className="text-4xl font-serif text-leny-accent/80 mb-2">5</div>
                 <div className="text-[8px] font-bold tracking-[0.3em] uppercase text-white/40">Métodos</div>
               </div>
            </div>
        </div>

        {/* === NIVEL 4: TUS DATOS (Marcadores e Historial) === */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 pt-8">
          
          {/* COLUMNA: FAVORITOS (Marcadores) */}
          <div className="space-y-6">
             <div className="flex items-center justify-between mb-2">
                <h2 className="text-xl font-serif text-white flex items-center gap-3">
                   <Star className="w-5 h-5 text-yellow-400/80" fill="currentColor" /> Mis Marcadores
                </h2>
                {bookmarks.length > 0 && <span className="text-xs font-bold tracking-widest text-leny-accent/60 uppercase">{bookmarks.length} Guardados</span>}
             </div>

             {bookmarks.length === 0 ? (
               <div className="p-10 border border-white/5 bg-[#11151c] rounded-2xl flex flex-col items-center text-center text-white/30 h-40 justify-center">
                 <p className="text-sm">Aún no tienes elementos guardados.<br/>Abre lecturas y usa la estrella para acceder rápidamente aquí.</p>
               </div>
             ) : (
               <div className="grid grid-cols-1 gap-3">
                 {bookmarks.map((b, i) => (
                   <button 
                     key={i} 
                     onClick={() => handleActionClick(b)}
                     className="bg-[#11151c] border border-white/5 hover:border-yellow-400/30 p-5 rounded-xl text-left flex items-center gap-5 group transition-all hover:bg-[#1a1f29]"
                   >
                     <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-yellow-400/70 flex-shrink-0 group-hover:scale-110 group-hover:bg-yellow-400/10 group-hover:text-yellow-400 transition-all">
                       {b.type === 'card' ? <Library size={18}/> : <BookOpen size={18}/>}
                     </div>
                     <div className="flex-1 overflow-hidden">
                       <h4 className="text-white font-serif md:text-lg truncate group-hover:text-yellow-400 transition-colors">{b.title}</h4>
                       <p className="text-xs text-white/40 uppercase tracking-widest truncate mt-1">{b.subtitle || 'Sección Académica'}</p>
                     </div>
                   </button>
                 ))}
               </div>
             )}
          </div>

          {/* COLUMNA: HISTORIAL RECIENTE */}
          <div className="space-y-6">
             <div className="flex items-center justify-between mb-2">
                <h2 className="text-xl font-serif text-white flex items-center gap-3">
                   <History className="w-5 h-5 text-blue-400/80" /> Recientes
                </h2>
             </div>

             {history.length === 0 ? (
               <div className="p-10 border border-white/5 bg-[#11151c] rounded-2xl flex flex-col items-center text-center text-white/30 h-40 justify-center">
                 <p className="text-sm">Tu registro de estudio está vacío.<br/>El rastro de tu aprendizaje aparecerá aquí.</p>
               </div>
             ) : (
               <div className="flex flex-col border border-white/5 bg-[#11151c] rounded-2xl overflow-hidden">
                 {history.slice(0, 5).map((h, i) => (
                   <button 
                     key={i}
                     onClick={() => handleActionClick(h)} 
                     className="p-5 flex items-center gap-4 group transition-colors text-left border-b border-white/5 last:border-0 hover:bg-[#1a1f29]"
                   >
                     <div className="w-1.5 h-1.5 rounded-full bg-blue-500/30 group-hover:bg-blue-400 shrink-0"></div>
                     <div className="flex-1 min-w-0 pr-4">
                        <div className="text-sm text-white/70 group-hover:text-white truncate font-medium">{h.title}</div>
                        <div className="text-[10px] text-white/30 uppercase tracking-widest mt-1">
                           {h.type === 'reader' ? 'Libro' : h.type === 'card' ? 'Atlas' : 'Tirada Práctica'}
                        </div>
                     </div>
                     <div className="text-[10px] text-white/20 whitespace-nowrap uppercase tracking-widest group-hover:text-white/40">
                        {formatTimeAgo(h.visitedAt)}
                     </div>
                   </button>
                 ))}
               </div>
             )}
          </div>

        </div>

      </div>
    </div>
  );
};

export default StudentDashboard;
