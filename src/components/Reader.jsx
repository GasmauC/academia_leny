import React, { useEffect, useRef } from 'react';
import { Menu, ChevronLeft, ChevronRight, Bookmark, BookOpen } from 'lucide-react';
import EditorialText from './EditorialText';

const Reader = ({ activeNode, onToggleSidebar, onNavigatePrevious, onNavigateNext, onSelectSubchapter, setViewMode, activeModule = 'lenormand' }) => {
  const contentRef = useRef(null);

  const textAccent = activeModule === 'poker' ? 'text-red-500' : 'text-leny-accent';
  const bgAccent = activeModule === 'poker' ? 'bg-red-500' : 'bg-leny-accent';
  const borderAccent = activeModule === 'poker' ? 'border-red-500' : 'border-leny-accent';

  useEffect(() => {
    // Al cambiar de nodo, scrollear suavemente arriba
    if (contentRef.current) {
      contentRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [activeNode]);

  return (
    <div className="flex-1 flex flex-col h-full bg-leny-dark overflow-hidden">
      {/* HEADER / NAVIGATION BAR */}
      <div className="sticky top-0 z-10 flex items-center justify-between py-3 px-6 md:px-8 bg-leny-dark/90 backdrop-blur-md border-b border-white/5 transition-all">
        <div className="flex items-center gap-4">
          <button 
            onClick={onToggleSidebar}
            className="md:hidden p-2 text-gray-400 hover:text-white bg-white/5 hover:bg-white/10 rounded-lg transition-colors border border-white/5"
          >
            <Menu size={18} strokeWidth={1.5} />
          </button>
          
          <div className="flex flex-col">
            <span className={`text-[9px] ${textAccent}/60 uppercase tracking-[0.2em] font-bold mb-0.5`}>
              {activeNode.type === 'theory' ? 'TEORÍA' : activeNode.type === 'practice' ? 'PRÁCTICA' : 'MÉTODOS'}
            </span>
            <span className="text-sm font-sans text-gray-300 truncate max-w-[200px] md:max-w-md hidden sm:block opacity-70">
              {activeNode.title}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button className="p-2.5 rounded-full text-gray-500 hover:text-leny-accent hover:bg-leny-accent/10 transition-all border border-transparent hover:border-leny-accent/20" title="Guardar Progreso">
            <Bookmark size={18} strokeWidth={1.5} />
          </button>
        </div>
      </div>

      {/* ÁREA DE LECTURA (SCROLL INDEPENDIENTE) */}
      <div className="flex-1 overflow-y-auto custom-scrollbar book-content" ref={contentRef}>
        <div className="p-8 md:p-14 lg:py-20 lg:px-12 max-w-[800px] mx-auto w-full min-h-full flex flex-col">
          
          {/* Cabecera del Documento Editorial */}
          <div className={`mb-16 border-b ${borderAccent}/20 pb-12`}>
             <div className={`text-[10px] ${textAccent} uppercase tracking-[0.3em] font-bold mb-4 opacity-80 decoration-${activeModule === 'poker' ? 'red-500' : 'leny-accent'}/30 underline underline-offset-4`}>
               {activeNode.type === 'theory' ? 'Estudio Teórico' : activeNode.type === 'practice' ? 'Módulo Práctico' : 'Metodología'}
             </div>
             <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif text-white font-medium leading-[1.2] tracking-wide">
               {activeNode.title}
             </h1>
          </div>
          
          {/* CONTENIDO INTEGRAL - RENDERIZADO AVANZADO */}
          {activeNode.content && activeNode.content.length > 0 && (
            <div className="space-y-8 text-[#e5e7eb] text-lg md:text-xl font-light leading-[1.85] tracking-wide mb-20">
              {activeNode.content.map((paragraph, index) => {
                
                // 1. Detección de subtítulos menores o listados (texto corto en mayúsculas)
                if (paragraph.length < 70 && !paragraph.endsWith('.') && paragraph.toUpperCase() === paragraph) {
                  return <h3 key={index} className={`text-[22px] md:text-2xl font-title ${textAccent} mt-16 mb-6 font-bold tracking-widest pb-2 border-b border-white/5`}>{paragraph}</h3>;
                }
                
                // 2. Detección de "Advertencias", "Atención", "Reglas"
                const lowerText = paragraph.toLowerCase();
                if (lowerText.startsWith('atención') || lowerText.startsWith('nota importante') || lowerText.startsWith('importante') || lowerText.startsWith('advertencia')) {
                  return (
                    <div key={index} className="my-8 p-6 bg-red-900/10 border-l-4 border-red-500/50 rounded-r-lg">
                      <strong className="block text-red-400 font-bold mb-2 uppercase tracking-wider text-sm">Aviso Teórico Importante</strong>
                      <EditorialText text={paragraph} className="text-red-100 italic" />
                    </div>
                  );
                }

                // 3. Detección de ejemplos, combinaciones o definiciones
                if (lowerText.includes('ejemplo:')) {
                  return (
                    <div key={index} className="my-6 p-6 bg-white/5 border border-white/10 rounded-lg shadow-inner">
                      <EditorialText text={paragraph} className="text-gray-200" />
                    </div>
                  );
                }

                // Párrafo general con Drop Cap (Letra capital) solo para el primero
                return (
                  <div key={index} className={`text-left mb-10 ${index === 0 && paragraph.length > 100 ? `first-letter:text-5xl first-letter:font-title first-letter:${textAccent} first-letter:float-left first-letter:mr-3 first-letter:mt-1` : ''}`}>
                    <EditorialText text={paragraph} />
                  </div>
                );
              })}
            </div>
          )}

          {activeNode.subsections && activeNode.subsections.length > 0 && (
            // Portada Interna de Sección (Chapter Cover)
            <div className="py-8 lg:py-12 animate-fade-in fade-in flex-1 flex flex-col justify-center">
              <div className="bg-white/[0.02] border border-white/5 rounded-[2rem] p-8 md:p-12 lg:p-16 shadow-inner text-center relative overflow-hidden">
                {/* Decoración de fondo */}
                <div className="absolute top-0 right-0 p-16 opacity-5 pointer-events-none">
                  <BookOpen size={200} strokeWidth={0.5} />
                </div>
                
                <h3 className="text-3xl lg:text-4xl font-serif text-white mb-6 relative z-10 drop-shadow-md">Índice del Módulo</h3>
                <p className="text-gray-400 mb-12 max-w-2xl mx-auto leading-relaxed text-lg relative z-10 font-light">
                  Sigue el orden de los subcapítulos a continuación para avanzar en el estudio de esta sección.
                </p>
                
                <div className="flex flex-col items-center gap-8 relative z-10 w-full">
                  <div className="w-full max-w-2xl">
                    <div className={`text-xs uppercase tracking-[0.3em] ${textAccent}/60 font-bold mb-6`}>Contenido</div>
                    <div className="grid grid-cols-1 gap-3 w-full">
                      {activeNode.subsections.map((sub, idx) => (
                        <button 
                          key={sub.id}
                          onClick={() => onSelectSubchapter && onSelectSubchapter(sub)}
                          className={`text-left p-4 lg:p-5 rounded-2xl flex items-center justify-between group transition-all duration-300
                            ${idx === 0 
                              ? 'bg-gradient-to-r from-leny-accent/10 to-transparent border border-leny-accent/20 hover:from-leny-accent/20' 
                              : 'bg-white/[0.02] border border-white/5 hover:border-white/10 hover:bg-white/[0.04]'}`}
                        >
                          <div className="flex items-center gap-4">
                            <span className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold shadow-lg transition-transform group-hover:scale-105 ${idx === 0 ? `${bgAccent} ${activeModule === 'poker' ? 'text-white' : 'text-leny-dark'} font-title text-lg` : 'bg-white/10 text-white/50 font-sans'}`}>
                              {idx + 1}
                            </span>
                            <span className={`font-medium tracking-wide transition-colors ${idx === 0 ? 'text-white' : 'text-gray-400 group-hover:text-white/90'}`}>
                              {sub.title}
                            </span>
                          </div>
                          <div className={`p-2 rounded-full transition-all ${idx === 0 ? `${bgAccent}/20 ${textAccent} group-hover:${bgAccent} group-hover:${activeModule === 'poker' ? 'text-white' : 'text-leny-dark'}` : 'text-white/20 group-hover:text-white/60 bg-white/5'}`}>
                            <ChevronRight size={16} strokeWidth={2} className={`${idx === 0 ? 'group-hover:translate-x-0.5' : ''} transition-transform`} />
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  {activeNode.subsections[0] && (
                    <div className="mt-8">
                      <button 
                        onClick={() => onSelectSubchapter && onSelectSubchapter(activeNode.subsections[0])}
                        className="px-8 flex items-center gap-3 py-4 bg-white hover:bg-gray-100 text-black font-semibold rounded-full shadow-[0_4px_20px_rgba(255,255,255,0.15)] hover:shadow-[0_8px_30px_rgba(255,255,255,0.25)] transition-all hover:-translate-y-0.5 select-none"
                      >
                        <BookOpen size={18} strokeWidth={2} />
                        <span>Comenzar Lectura</span>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {(!activeNode.content || activeNode.content.length === 0) && (!activeNode.subsections || activeNode.subsections.length === 0) && (
            // Nodo vacío sin subcapítulos ni contenido
            <div className="text-gray-500 italic py-16 text-center text-xl font-light w-full flex-1 flex flex-col justify-center items-center">
              <BookOpen size={48} className="mx-auto mb-6 opacity-20" />
              <p>Sección en construcción o vacía.</p>
            </div>
          )}

          {/* FOOTER NAVIGATION */}
          <div className="border-t border-white/10 pt-8 mt-16 flex flex-col sm:flex-row items-center justify-between w-full gap-4 pb-12">
            <button 
              onClick={onNavigatePrevious}
              className="btn-secondary group"
            >
              <ChevronLeft size={20} className="group-hover:-translate-x-1 transition-transform" /> 
              <span>Módulo Anterior</span>
            </button>
            <button 
              onClick={onNavigateNext}
              className={`group flex w-full sm:w-auto items-center justify-center gap-3 ${activeModule === 'poker' ? 'text-white bg-red-600 hover:bg-red-500 shadow-[0_4px_14px_0_rgba(220,38,38,0.3)] hover:shadow-[0_6px_20px_rgba(220,38,38,0.4)]' : 'text-leny-dark bg-leny-accent hover:bg-yellow-400 shadow-[0_4px_14px_0_rgba(205,174,104,0.3)] hover:shadow-[0_6px_20px_rgba(205,174,104,0.4)]'} px-6 py-3 rounded-lg transition-all hover:-translate-y-0.5`}
            >
              <span className="font-semibold tracking-wide">Siguiente Módulo</span> 
              <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reader;
