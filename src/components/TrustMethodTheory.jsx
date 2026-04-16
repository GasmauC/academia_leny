import React from 'react';
import { ShieldQuestion, UserCheck, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { cardsDictionary } from '../data/db/lenormand_cards';

export default function TrustMethodTheory() {
  const fox = cardsDictionary.find(c => c.id === '14-el-zorro') || { name: 'El Zorro' };
  const dog = cardsDictionary.find(c => c.id === '18-el-perro') || { name: 'El Perro' };
  const snake = cardsDictionary.find(c => c.id === '7-la-serpiente') || { name: 'La Serpiente' };

  return (
    <div className="h-full overflow-y-auto p-6 md:p-12 custom-scrollbar fade-in bg-leny-darker/50">
      <div className="max-w-3xl mx-auto space-y-12 pb-32">
        
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center justify-center p-4 bg-red-500/10 text-red-500 rounded-full mb-4">
            <ShieldQuestion className="w-12 h-12" />
          </div>
          <h1 className="text-4xl md:text-5xl font-serif text-white">El Método "¿Debo Confiar?"</h1>
          <p className="text-xl text-leny-dim">Evaluación táctica de lealtades e intenciones.</p>
        </div>

        {/* Teoría Crítica */}
        <section className="bg-leny-dark border border-white/10 rounded-2xl p-8 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-2 h-full bg-red-500"></div>
          <h2 className="text-2xl font-serif text-white mb-4 flex items-center gap-3">
            <UserCheck className="w-6 h-6 text-red-500" />
            Dinámica de la Tirada
          </h2>
          <div className="text-lg text-white/90 leading-relaxed font-serif pt-4">
            Este método, presentado en el Capítulo 6 del libro, está diseñado quirúrgicamente para responder dudas sobre socios comerciales, nuevas amistades o parejas recientes. Su premisa es buscar "alertas rojas" (red flags) u homologar la honestidad de la persona o situación.
          </div>
        </section>

        {/* Estructura (Generalmente se usan 3 cartas rápidas enfocadas) */}
        <section className="bg-black/30 border border-white/10 rounded-2xl p-8">
          <h3 className="text-2xl font-serif text-white mb-6">Tarjetas Señalizadoras Primarias</h3>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white/5 border border-green-500/30 rounded-xl p-6 text-center hover:bg-green-500/5 transition-colors">
              <CheckCircle2 className="w-8 h-8 text-green-400 mx-auto mb-3" />
              <div className="text-[2rem] mb-2">🐶</div>
              <h4 className="font-bold text-lg text-white mb-1">{dog.name}</h4>
              <p className="text-sm text-leny-dim">Confianza sólida, lealtad y amigabilidad genuina.</p>
            </div>

            <div className="bg-white/5 border border-orange-500/30 rounded-xl p-6 text-center hover:bg-orange-500/5 transition-colors">
              <AlertTriangle className="w-8 h-8 text-orange-400 mx-auto mb-3" />
              <div className="text-[2rem] mb-2">🦊</div>
              <h4 className="font-bold text-lg text-white mb-1">{fox.name}</h4>
              <p className="text-sm text-leny-dim">Falsedad táctica, conveniencia o alguien que vela por sí mismo.</p>
            </div>

            <div className="bg-white/5 border border-red-500/30 rounded-xl p-6 text-center hover:bg-red-500/5 transition-colors">
              <AlertTriangle className="w-8 h-8 text-red-500 mx-auto mb-3" />
              <div className="text-[2rem] mb-2">🐍</div>
              <h4 className="font-bold text-lg text-white mb-1">{snake.name}</h4>
              <p className="text-sm text-leny-dim">Traición flagrante, toxicidad, intenciones ocultas dañinas.</p>
            </div>
          </div>
        </section>

        {/* Metodología */}
        <section className="bg-gradient-to-br from-white/5 to-transparent border border-white/10 rounded-2xl p-8">
          <h2 className="text-2xl font-serif text-white mb-6">Lectura Aplicada</h2>
          <div className="space-y-4">
            <p className="text-leny-dim">
              Saca de 3 a 5 cartas. La presencia de cartas oscuras (como los Ratones, la Serpiente, el Zorro o las Nubes) mancha la intención de la persona. Si dominan las cartas protectoras (El Perro, El Oso, El Ancla o El Corazón), tienes luz verde.
            </p>
            
            <div className="bg-red-950/30 border-l-4 border-red-500 p-6 rounded-r-xl mt-6">
              <h3 className="font-bold text-red-500 mb-2 font-serif text-xl">Escenario de Alerta Oculta</h3>
              <p className="text-sm text-white/80">
                Imagina sacar: <strong>El Jinete + El Anillo + El Zorro</strong>. 
                <br/><br/>
                La oferta parece rápida y tentadora (Jinete + Anillo), prometiendo una alianza. Pero el Zorro al final dictamina que la oferta tiene "letra pequeña", trampa o egoísmo. <strong>La decisión oracular es rotunda: No confíes.</strong>
              </p>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
