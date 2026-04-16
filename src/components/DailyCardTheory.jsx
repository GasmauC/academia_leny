import React from 'react';
import { Sun, Target, BookOpen, BrainCircuit } from 'lucide-react';
import { cardsDictionary } from '../data/db/lenormand_cards';

export default function DailyCardTheory() {
  const jinete = cardsDictionary.find(c => c.id === '1-el-jinete') || { name: 'El Jinete' };

  return (
    <div className="h-full overflow-y-auto p-6 md:p-12 custom-scrollbar fade-in bg-leny-darker/50">
      <div className="max-w-3xl mx-auto space-y-12 pb-32">
        
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center justify-center p-4 bg-yellow-500/10 text-yellow-500 rounded-full mb-4">
            <Sun className="w-12 h-12" />
          </div>
          <h1 className="text-4xl md:text-5xl font-serif text-white">El Método "Energía del Día"</h1>
          <p className="text-xl text-leny-dim">La conexión diaria con el Pequeño Leny</p>
        </div>

        {/* Intro Crítica */}
        <section className="bg-leny-dark border border-white/10 rounded-2xl p-8 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-2 h-full bg-leny-accent"></div>
          <h2 className="text-2xl font-serif text-white mb-4 flex items-center gap-3">
            <BookOpen className="w-6 h-6 text-leny-accent" />
            De la Biblia de Odete Lopes Mazza
          </h2>
          <div className="text-lg text-white/90 leading-relaxed font-serif italic border-l-2 border-white/20 pl-6 my-6">
            "Este es uno de los métodos más simples y por ese motivo, es uno de los primeros pasos enseñados en la fase de aprendizaje. Recomiendo este método como primera lección porque permite la interacción inicial del estudiante con las cartas sin ninguna complicación."
          </div>
          <p className="text-leny-dim">
            La idea central no es predecir un acontecimiento monumental todos los días, sino tomar la "temperatura" a las influencias que orbitan nuestro campo. A veces, la carta simplemente describirá un estado de ánimo o una tarea mundana.
          </p>
        </section>

        {/* Reglas Tácticas */}
        <section className="grid md:grid-cols-2 gap-6">
          <div className="bg-black/30 border border-white/5 rounded-2xl p-6 hover:border-white/10 transition-colors">
            <Target className="w-8 h-8 text-yellow-400 border border-yellow-400/20 p-1.5 rounded-lg mb-4" />
            <h3 className="text-lg font-bold text-white mb-2 tracking-widest uppercase text-xs">Propuesta Principal</h3>
            <p className="text-sm text-leny-dim">
              Mezclar las cartas por la mañana de forma relajada o hacer la pregunta concreta: "¿Qué me reserva el día de hoy?".
            </p>
          </div>
          
          <div className="bg-black/30 border border-white/5 rounded-2xl p-6 hover:border-white/10 transition-colors">
            <BrainCircuit className="w-8 h-8 text-purple-400 border border-purple-400/20 p-1.5 rounded-lg mb-4" />
            <h3 className="text-lg font-bold text-white mb-2 tracking-widest uppercase text-xs">Alineamiento de Espectativa</h3>
            <p className="text-sm text-leny-dim">
              Al final del día, reflexiona sobre cómo se manifestó la carta. Esta es la mejor forma de construir tu propio diccionario personal de significados (tu "lenguaje" con la baraja).
            </p>
          </div>
        </section>

        {/* Ejemplo Analítico */}
        <section className="bg-gradient-to-br from-white/5 to-transparent border border-white/10 rounded-2xl p-8">
          <h2 className="text-2xl font-serif text-white mb-8 border-b border-white/10 pb-4">
            Ejemplo Estructural: Una Lectura de 1 Carta
          </h2>
          
          <div className="flex flex-col md:flex-row gap-8 items-center bg-black/40 p-6 rounded-xl border border-white/5">
            {/* Carta Central */}
            <div className="relative group/card cursor-default min-w-[140px]">
              <div className="bg-leny-dark border-2 border-yellow-500/50 p-6 rounded-xl shadow-[0_0_30px_rgba(234,179,8,0.2)] flex flex-col items-center gap-4 transition-transform group-hover:scale-105">
                <span className="text-5xl drop-shadow-lg">🏇</span>
                <span className="font-serif text-white text-lg tracking-widest">{jinete.name}</span>
              </div>
              <div className="absolute -top-3 -right-3 w-8 h-8 bg-black rounded-full border border-white/20 flex items-center justify-center font-bold text-white text-xs z-10">
                1
              </div>
            </div>

            {/* Análisis Narrativo */}
            <div className="flex-1 space-y-4">
              <h3 className="text-xl font-serif text-leny-accent line-clamp-2">Día Dinámico</h3>
              <div className="bg-white/5 rounded-lg p-4 border-l-4 border-yellow-500">
                <div className="text-xs uppercase font-bold text-yellow-500/80 tracking-widest mb-2">Manifestaciones posibles:</div>
                <ul className="text-sm text-white/90 space-y-2 list-disc pl-4">
                  <li>La llegada de un paquete, noticia o mensaje rápido.</li>
                  <li>Un día en el que te sentirás muy activo, con necesidad de hacer deporte.</li>
                  <li>Visita inesperada de alguien joven (o con energía juvenil).</li>
                </ul>
              </div>
              <div className="text-xs text-leny-dim italic pt-2">
                "Nunca subestimes la carta del día; ella entrena tu músculo sintáctico para los grandes Tableaux."
              </div>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
