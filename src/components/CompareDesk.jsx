import React, { useState } from 'react';
import { cardsDictionary } from '../data/db/lenormand_cards';
import { comparisonCategories } from '../data/db/advanced_comparisons';
import { 
  SplitSquareVertical, 
  BookOpen, 
  Maximize2, 
  ArrowLeftRight,
  Luggage,
  Scissors,
  Anchor,
  Sun,
  MessageSquare,
  Users,
  Link,
  ShieldAlert,
  GraduationCap,
  Sparkles,
  ChevronDown,
  CheckCircle2
} from 'lucide-react';
import EditorialText from './EditorialText';

const iconMap = {
  luggage: Luggage,
  scissors: Scissors,
  anchor: Anchor,
  sun: Sun,
  "message-square": MessageSquare,
  users: Users
};

const CompareDesk = ({ onClose }) => {
  const [activeTab, setActiveTab] = useState('teorico'); // 'teorico' | 'manual'
  
  // Estado para el Modo Teórico
  const [activeCategory, setActiveCategory] = useState(comparisonCategories[0].id);
  const [activeComparisonData, setActiveComparisonData] = useState(comparisonCategories[0].comparisons[0]);

  // Estado para el Modo Manual
  const [manualCards, setManualCards] = useState([1, 3]);
  const [isOpenMenu, setIsOpenMenu] = useState({ 0: false, 1: false });

  // HANDLERS MODO TEORICO
  const handleCategorySelect = (catId) => {
    setActiveCategory(catId);
    const cat = comparisonCategories.find(c => c.id === catId);
    setActiveComparisonData(cat.comparisons[0]); // Seleccionar el primer par por defecto al cambiar categoría
  };

  const currentCatData = comparisonCategories.find(c => c.id === activeCategory);

  // HANDLERS MODO MANUAL
  const manualCard1 = cardsDictionary.find(c => c.id === manualCards[0]);
  const manualCard2 = cardsDictionary.find(c => c.id === manualCards[1]);

  const handleManualSelect = (index, cardId) => {
    const newSelection = [...manualCards];
    newSelection[index] = cardId;
    setManualCards(newSelection);
    setIsOpenMenu({ ...isOpenMenu, [index]: false });
  };

  const renderCardSelector = (index, currentCard) => (
    <div className="relative z-20">
      <button 
        onClick={() => setIsOpenMenu({ ...isOpenMenu, [index]: !isOpenMenu[index] })}
        className="w-full flex items-center justify-between bg-white/5 border border-white/10 hover:border-leny-accent/50 rounded-lg p-4 transition-all"
      >
        <div className="flex items-center gap-3">
          <span className="text-2xl">{currentCard.emoji}</span>
          <span className="text-white font-medium">{currentCard.name}</span>
        </div>
        <ChevronDown className={`w-5 h-5 text-leny-dim transition-transform ${isOpenMenu[index] ? 'rotate-180' : ''}`} />
      </button>

      {isOpenMenu[index] && (
        <div className="absolute top-16 left-0 right-0 bg-leny-darker border border-white/10 rounded-lg shadow-2xl overflow-hidden max-h-80 overflow-y-auto z-50">
          {cardsDictionary.map(c => (
            <button
              key={c.id}
              disabled={manualCards.includes(c.id) && manualCards.indexOf(c.id) !== index}
              onClick={() => handleManualSelect(index, c.id)}
              className={`w-full text-left px-4 py-3 flex items-center gap-3 hover:bg-white/5 transition-colors ${
                manualCards.includes(c.id) && manualCards.indexOf(c.id) !== index ? 'opacity-30 cursor-not-allowed' : ''
              } ${currentCard.id === c.id ? 'bg-leny-accent/10 border-l-2 border-leny-accent' : ''}`}
            >
              <span className="text-xl">{c.emoji}</span>
              <span className="text-white">{c.name}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <div className="flex flex-col h-full bg-leny-dark/95 text-leny-text overflow-hidden rounded-xl border border-leny-accent/20 shadow-2xl relative animate-fade-in">
      {/* HEADER PRINCIPAL */}
      <div className="p-6 border-b border-white/5 bg-leny-darker/50 shrink-0 flex flex-col md:flex-row gap-6 md:items-center justify-between relative z-30">
        <div className="flex items-center gap-3">
          <SplitSquareVertical className="w-7 h-7 text-leny-accent" />
          <div>
            <h2 className="text-2xl font-serif text-white uppercase tracking-wider">Laboratorio Comparativo</h2>
            <p className="text-xs text-leny-dim">Desmitificando confusiones semánticas</p>
          </div>
        </div>

        <div className="flex items-center gap-2 bg-black/40 p-1 rounded-full border border-white/5">
          <button 
            onClick={() => setActiveTab('teorico')}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition-all ${activeTab === 'teorico' ? 'bg-leny-accent text-leny-dark shadow-[0_0_15px_rgba(205,174,104,0.3)]' : 'text-white/50 hover:text-white'}`}
          >
            <BookOpen className="w-4 h-4" /> Pares Frecuentes
          </button>
          <button 
            onClick={() => setActiveTab('manual')}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition-all ${activeTab === 'manual' ? 'bg-leny-accent text-leny-dark shadow-[0_0_15px_rgba(205,174,104,0.3)]' : 'text-white/50 hover:text-white'}`}
          >
            <ArrowLeftRight className="w-4 h-4" /> Sandbox Libre
          </button>
        </div>

        <button onClick={onClose} className="hidden md:block px-4 py-2 bg-white/5 hover:bg-white/10 rounded-lg transition-colors text-sm">
          Cerrar
        </button>
      </div>

      <div className="flex-1 overflow-hidden relative">
        {/* =====================
            MODO TEÓRICO GUIADO
            ===================== */}
        {activeTab === 'teorico' && (
          <div className="flex flex-col lg:flex-row h-full">
            {/* Sidebar Categorías */}
            <div className="w-full lg:w-72 bg-leny-darker border-b lg:border-b-0 lg:border-r border-white/5 flex-shrink-0 overflow-y-auto custom-scrollbar">
              <div className="p-4 text-[10px] text-leny-accent font-bold uppercase tracking-[0.2em] mb-2 sticky top-0 bg-leny-darker z-10">Familias de Confusión</div>
              <div className="px-2 space-y-1 pb-4">
                {comparisonCategories.map(cat => {
                  const Icon = iconMap[cat.icon] || SplitSquareVertical;
                  const isActive = activeCategory === cat.id;
                  return (
                    <button
                      key={cat.id}
                      onClick={() => handleCategorySelect(cat.id)}
                      className={`w-full flex items-center gap-3 p-3 rounded-lg text-left transition-all ${isActive ? 'bg-leny-accent/10 border border-leny-accent/20 text-white' : 'text-leny-dim hover:bg-white/5 hover:text-white/80'}`}
                    >
                      <Icon className={`w-5 h-5 ${isActive ? 'text-leny-accent' : 'opacity-70'}`} />
                      <div className="flex-1">
                        <div className="font-semibold text-sm">{cat.title}</div>
                        <div className="text-[10px] opacity-70 mt-0.5 line-clamp-1">{cat.description}</div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Contenido Principal Teoría */}
            <div className="flex-1 overflow-y-auto custom-scrollbar p-6 lg:p-10 relative">
              
              {/* Selector de Batalla */}
              <div className="mb-8">
                <div className="text-xs text-leny-accent uppercase tracking-widest font-bold mb-4">Batallas Semánticas en curso</div>
                <div className="flex flex-wrap gap-3">
                  {currentCatData?.comparisons.map(comp => {
                    const isActive = activeComparisonData.id === comp.id;
                    const c1 = cardsDictionary.find(c => c.id === comp.cards[0]);
                    const c2 = cardsDictionary.find(c => c.id === comp.cards[1]);
                    return (
                      <button
                        key={comp.id}
                        onClick={() => setActiveComparisonData(comp)}
                        className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border transition-all ${isActive ? 'bg-leny-accent text-leny-dark border-leny-accent shadow-[0_0_20px_rgba(205,174,104,0.2)]' : 'bg-white/5 border-white/10 text-white/70 hover:bg-white/10'}`}
                      >
                        <span className="text-lg">{c1.emoji}</span>
                        <span className="font-bold text-xs uppercase tracking-wider mx-1">VS</span>
                        <span className="text-lg">{c2.emoji}</span>
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* Arena de Batalla */}
              {activeComparisonData && (() => {
                const c1 = cardsDictionary.find(c => c.id === activeComparisonData.cards[0]);
                const c2 = cardsDictionary.find(c => c.id === activeComparisonData.cards[1]);

                return (
                  <div className="max-w-4xl max-w-5xl mx-auto space-y-8 animate-fade-in fade-in">
                    
                    <div className="text-center mb-10">
                      <h3 className="text-3xl md:text-4xl font-serif text-white mb-2">{activeComparisonData.title}</h3>
                      <div className="flex items-center justify-center gap-4 mt-6">
                        <div className="flex flex-col items-center p-4 bg-gradient-to-br from-white/5 to-transparent rounded-2xl border border-white/5 min-w-[120px]">
                          <span className="text-6xl mb-2 drop-shadow-lg">{c1.emoji}</span>
                          <span className="font-bold text-sm uppercase tracking-widest text-white/90">{c1.name}</span>
                        </div>
                        <div className="text-leny-accent font-serif italic text-2xl px-2">vs</div>
                        <div className="flex flex-col items-center p-4 bg-gradient-to-bl from-white/5 to-transparent rounded-2xl border border-white/5 min-w-[120px]">
                          <span className="text-6xl mb-2 drop-shadow-lg">{c2.emoji}</span>
                          <span className="font-bold text-sm uppercase tracking-widest text-white/90">{c2.name}</span>
                        </div>
                      </div>
                    </div>

                    {/* Similitudes */}
                    <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-6 md:p-8 hover:border-leny-accent/20 transition-colors">
                      <div className="flex items-center gap-3 mb-4">
                        <Link className="w-6 h-6 text-leny-accent" />
                        <h4 className="text-xl font-serif text-white">¿Por qué se confunden?</h4>
                      </div>
                      <p className="text-leny-dim text-lg leading-relaxed">{activeComparisonData.similitudes}</p>
                    </div>

                    {/* Diferencias Críticas */}
                    <div className="bg-black/30 border border-leny-accent/20 shadow-[inset_0_0_30px_rgba(205,174,104,0.03)] rounded-2xl p-6 md:p-8 relative overflow-hidden">
                      <div className="absolute top-0 right-0 p-8 opacity-5">
                        <Maximize2 className="w-32 h-32" />
                      </div>
                      <div className="flex items-center gap-3 mb-4 relative z-10">
                        <SplitSquareVertical className="w-6 h-6 text-leny-accent" />
                        <h4 className="text-xl font-serif text-white">La Diferencia Fundamental</h4>
                      </div>
                      <p className="text-white/90 text-lg leading-relaxed relative z-10">
                        <EditorialText text={activeComparisonData.diferencias} />
                      </p>
                    </div>

                    {/* Dual Cards Context Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="bg-gradient-to-br from-leny-accent/10 to-transparent border border-leny-accent/20 rounded-2xl p-6 md:p-8">
                        <div className="flex items-center gap-3 mb-4">
                          <Sparkles className="w-5 h-5 text-leny-accent" />
                          <h4 className="text-lg font-bold uppercase tracking-widest text-leny-accent text-sm">Cambio en Contextos</h4>
                        </div>
                        <p className="text-leny-text text-[15px] leading-relaxed">
                          <EditorialText text={activeComparisonData.contextoCambio} />
                        </p>
                      </div>

                      <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-6 md:p-8">
                        <div className="flex items-center gap-3 mb-4">
                          <GraduationCap className="w-5 h-5 text-white/60" />
                          <h4 className="text-lg font-bold uppercase tracking-widest text-white/60 text-sm">Ejemplos Prácticos</h4>
                        </div>
                        <p className="text-leny-text text-[15px] leading-relaxed italic">
                          "{activeComparisonData.ejemplosUso}"
                        </p>
                      </div>
                    </div>

                    {/* Warning Box */}
                    <div className="bg-red-950/20 border border-red-500/20 rounded-2xl p-6 md:p-8 mt-8 flex items-start gap-4">
                      <ShieldAlert className="w-8 h-8 text-red-400 mt-1 flex-shrink-0" />
                      <div>
                        <h4 className="text-red-400 font-bold uppercase tracking-widest text-sm mb-2">Error de Lectura Promedio</h4>
                        <p className="text-white/80 leading-relaxed text-sm md:text-base">
                          {activeComparisonData.erroresFrecuentes}
                        </p>
                      </div>
                    </div>

                  </div>
                );
              })()}
              
              <div className="h-20"></div> {/* Espaciador final */}
            </div>
          </div>
        )}

        {/* =====================
            MODO MANUAL MANTENIDO
            ===================== */}
        {activeTab === 'manual' && (
          <div className="h-full overflow-y-auto p-6 md:p-10 custom-scrollbar fade-in bg-leny-darker/30">
            <div className="max-w-6xl mx-auto space-y-10">
              
              <div className="text-center mb-8">
                <p className="text-leny-dim max-w-2xl mx-auto">
                  Selecciona dos cartas cualesquiera del mazo para contrastar visualmente su energía, polaridad y focos de acción.
                </p>
              </div>

              <div className="flex flex-col md:flex-row gap-6 relative">
                {/* Divisor VS Central */}
                <div className="hidden md:flex absolute inset-y-0 left-1/2 -translate-x-1/2 items-center justify-center z-10">
                  <div className="w-12 h-12 bg-leny-darker border border-leny-accent/30 rounded-full flex items-center justify-center shadow-lg text-leny-accent font-bold font-serif shadow-[0_0_15px_rgba(201,162,39,0.2)]">
                    VS
                  </div>
                </div>

                {/* Columna Izquierda */}
                <div className="flex-1 space-y-6">
                  {renderCardSelector(0, manualCard1)}
                  
                  <div className="bg-gradient-to-br from-white/5 to-transparent border border-white/10 rounded-xl p-8 relative overflow-hidden group">
                    <div className="text-6xl text-center mb-6 opacity-80 group-hover:scale-110 transition-transform">{manualCard1.emoji}</div>
                    <div className="text-center mb-8">
                      <div className="text-[10px] text-leny-accent mb-1 tracking-widest font-bold uppercase">NÚCLEO PRINCIPAL</div>
                      <div className="text-xl text-white font-medium min-h-[60px] flex items-center justify-center"><EditorialText text={manualCard1.symbolicCore} /></div>
                    </div>
                    
                    <div className="space-y-4 pt-6 border-t border-white/5">
                      <div className="bg-black/20 p-4 rounded-lg flex items-center justify-between">
                        <div className="text-[11px] text-leny-dim uppercase">Polaridad</div>
                        <div className="text-white font-medium text-sm">{manualCard1.polarity}</div>
                      </div>
                      <div className="bg-black/20 p-4 rounded-lg flex items-center justify-between">
                        <div className="text-[11px] text-leny-dim uppercase">Velocidad</div>
                        <div className="text-white font-medium text-sm">{manualCard1.timing}</div>
                      </div>
                      <div className="bg-black/20 p-4 rounded-lg text-center">
                        <div className="text-[11px] text-leny-dim uppercase mb-1">Área Específica</div>
                        <div className="text-white font-medium text-sm">{manualCard1.mainTheme}</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Divisor Móvil */}
                <div className="flex md:hidden items-center justify-center my-4">
                  <div className="w-10 h-10 bg-leny-darker border border-leny-accent/30 rounded-full flex items-center justify-center text-leny-accent font-bold font-serif">
                    VS
                  </div>
                </div>

                {/* Columna Derecha */}
                <div className="flex-1 space-y-6">
                  {renderCardSelector(1, manualCard2)}
                  
                  <div className="bg-gradient-to-bl from-white/5 to-transparent border border-white/10 rounded-xl p-8 relative overflow-hidden group">
                    <div className="text-6xl text-center mb-6 opacity-80 group-hover:scale-110 transition-transform">{manualCard2.emoji}</div>
                    <div className="text-center mb-8">
                      <div className="text-[10px] text-leny-accent mb-1 tracking-widest font-bold uppercase">NÚCLEO PRINCIPAL</div>
                      <div className="text-xl text-white font-medium min-h-[60px] flex items-center justify-center"><EditorialText text={manualCard2.symbolicCore} /></div>
                    </div>
                    
                    <div className="space-y-4 pt-6 border-t border-white/5">
                      <div className="bg-black/20 p-4 rounded-lg flex items-center justify-between">
                        <div className="text-[11px] text-leny-dim uppercase">Polaridad</div>
                        <div className="text-white font-medium text-sm">{manualCard2.polarity}</div>
                      </div>
                      <div className="bg-black/20 p-4 rounded-lg flex items-center justify-between">
                        <div className="text-[11px] text-leny-dim uppercase">Velocidad</div>
                        <div className="text-white font-medium text-sm">{manualCard2.timing}</div>
                      </div>
                      <div className="bg-black/20 p-4 rounded-lg text-center">
                        <div className="text-[11px] text-leny-dim uppercase mb-1">Área Específica</div>
                        <div className="text-white font-medium text-sm">{manualCard2.mainTheme}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Botones de Verbo de Acción */}
              <div className="bg-leny-accent/5 border border-leny-accent/30 rounded-xl p-8 mt-8 text-center max-w-4xl mx-auto shadow-[0_0_30px_rgba(201,162,39,0.05)]">
                <CheckCircle2 className="w-8 h-8 text-leny-accent mx-auto mb-4" />
                <h3 className="text-lg font-bold text-leny-accent uppercase tracking-widest mb-4">Destilación de Verbos de Acción</h3>
                <p className="text-white text-lg leading-relaxed">
                  <span className="opacity-75">La esencia activa de</span> <strong className="text-leny-accent">{manualCard1.name}</strong> <span className="opacity-75">se resume en</span> <em className="italic bg-black/40 px-2 py-1 rounded">"{manualCard1.actionVerb}"</em>.
                  <br className="my-2"/>
                  <span className="opacity-75">La esencia activa de</span> <strong className="text-leny-accent"> {manualCard2.name}</strong> <span className="opacity-75">se dirige hacia</span> <em className="italic bg-black/40 px-2 py-1 rounded">"{manualCard2.actionVerb}"</em>.
                </p>
              </div>

            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CompareDesk;
