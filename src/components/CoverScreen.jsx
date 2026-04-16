import React from 'react';
import { BookOpen, PenTool, Layout } from 'lucide-react';

const CoverScreen = ({ onStart, stats }) => {
  return (
    <div className="flex-1 flex flex-col items-center justify-center p-8 bg-leny-dark relative overflow-y-auto">
      {/* Decorative background */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/black-linen.png")' }}></div>

      <div className="max-w-3xl w-full text-center z-10 space-y-8 mt-10">
        
        {/* Title Area */}
        <div className="space-y-4">
          <h2 className="text-leny-accent uppercase tracking-[0.2em] text-sm font-semibold">Odete Lopes Mazza</h2>
          <h1 className="text-5xl md:text-7xl font-title text-white font-bold leading-tight">
            La Biblia de la Baraja<br/>
            <span className="text-gray-400 font-light">Petit Lenormand</span>
          </h1>
          <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto pt-4 leading-relaxed">
            Una guía interactiva completa para aprender a leer, combinando la precisión de la teoría original con una experiencia fluida. 
            Sin cortes, sin resúmenes. Toda la sabiduría preservada.
          </p>
        </div>

        {/* Start Button */}
        <div className="pt-8">
          <button 
            onClick={onStart}
            className="group relative px-8 py-4 bg-leny-accent text-leny-dark font-bold text-lg rounded-sm overflow-hidden transition-transform transform hover:scale-105 shadow-[0_0_20px_rgba(205,174,104,0.3)]"
          >
            <span className="relative z-10 flex items-center gap-2">
              <BookOpen size={20} /> Empezar a Leer
            </span>
          </button>
        </div>

        {/* Statistics Area */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-16 max-w-4xl w-full mx-auto">
          <div className="bg-leny-card p-6 rounded-lg border border-gray-800 text-center shadow-lg">
            <BookOpen className="w-8 h-8 text-leny-accent mx-auto mb-3" />
            <h3 className="text-3xl font-bold text-white mb-1">{stats.counts.theory}</h3>
            <p className="text-gray-400 text-sm uppercase tracking-wider">Temas de Teoría</p>
          </div>
          
          <div className="bg-leny-card p-6 rounded-lg border border-gray-800 text-center shadow-lg">
            <PenTool className="w-8 h-8 text-leny-secondary mx-auto mb-3" />
            <h3 className="text-3xl font-bold text-white mb-1">{stats.counts.practice}</h3>
            <p className="text-gray-400 text-sm uppercase tracking-wider">Práctica y Códigos</p>
          </div>
          
          <div className="bg-leny-card p-6 rounded-lg border border-gray-800 text-center shadow-lg">
            <Layout className="w-8 h-8 text-blue-400 mx-auto mb-3" />
            <h3 className="text-3xl font-bold text-white mb-1">{stats.counts.examples}</h3>
            <p className="text-gray-400 text-sm uppercase tracking-wider">Tiradas y Métodos</p>
          </div>
        </div>

        {/* Total Progress */}
        <div className="pt-10 w-full max-w-md mx-auto">
          <div className="flex justify-between text-sm text-gray-500 mb-2">
            <span>Progreso de Lectura Activa</span>
            <span>0% / {stats.totalNodes} Secciones</span>
          </div>
          <div className="h-2 w-full bg-leny-card rounded-full overflow-hidden">
            <div className="h-full bg-leny-accent w-[0%]"></div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default CoverScreen;
