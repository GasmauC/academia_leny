import React, { useState, useEffect } from 'react';
import { LenormandAPI } from './data/api';
import { PokerAPI } from './data/poker_api';
import Sidebar from './components/Sidebar';
import StudentDashboard from './components/StudentDashboard';
import GlobalSearch from './components/GlobalSearch';
import Reader from './components/Reader';
import DictionaryReader from './components/DictionaryReader';
import CardProfile from './components/CardProfile';
import CompareDesk from './components/CompareDesk';
import CombinationsTheory from './components/CombinationsTheory';
import PokerCombinationsTheory from './components/PokerCombinationsTheory';
import TripletsTheory from './components/TripletsTheory';
import PokerTripletsTheory from './components/PokerTripletsTheory';
import QuintetsTheory from './components/QuintetsTheory';
import PokerQuintetsTheory from './components/PokerQuintetsTheory';
import NineCardsTheory from './components/NineCardsTheory';
import PokerNineCardsTheory from './components/PokerNineCardsTheory';
import PokerExamplesBank from './components/PokerExamplesBank';
import PokerExerciseBank from './components/PokerExerciseBank';
import GrandTableauTheory from './components/GrandTableauTheory';
import SpreadsMenu from './components/SpreadsMenu';
import DailyCardTheory from './components/DailyCardTheory';
import TrustMethodTheory from './components/TrustMethodTheory';
import ExerciseBank from './components/ExerciseBank';
import TutorAI from './components/TutorAI';
import AtlasOfCards from './components/AtlasOfCards';
import FlashcardsModule from './components/FlashcardsModule';
import RelationalMap from './components/RelationalMap';
import StudySidebar from './components/StudySidebar';
import PokerSuitsMenu from './components/PokerSuitsMenu';
import PokerVisualAtlas from './components/PokerVisualAtlas';
import PokerCardProfile from './components/PokerCardProfile';
import { useStudyData } from './hooks/useStudyData';
import { PokerProvider } from './context/PokerContext';
import { cardsDictionary as lenormandCardsDictionary } from './data/db/lenormand_cards';
import { pokerCardsDictionary } from './data/db/poker_cards';
import { Library, ArrowRightLeft, BookOpen, Search, Star, Sparkles, Target, Grip, Image, Network, LayoutTemplate, FlaskConical } from 'lucide-react';

const App = () => {
  const [activeModule, setActiveModule] = useState('lenormand'); // 'lenormand' | 'poker'
  const currentDictionary = activeModule === 'poker' ? pokerCardsDictionary : lenormandCardsDictionary;
  const [navigationMap, setNavigationMap] = useState([]);
  const [stats, setStats] = useState(null);
  
  const [appMode, setAppMode] = useState('estudio'); // 'libro' | 'estudio'
  const [viewMode, setViewMode] = useState('cover'); // default starts in cover/dashboard
  const [activeNodeId, setActiveNodeId] = useState(null);
  const [activeCardId, setActiveCardId] = useState(null);
  const [activeExerciseId, setActiveExerciseId] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  const studyData = useStudyData();

  useEffect(() => {
    const api = activeModule === 'lenormand' ? LenormandAPI : PokerAPI;
    const map = api.getNavigationMap();
    const stts = api.getStats();
    
    setNavigationMap(map);
    setStats(stts);

    // Reset active node if needed when switching
    if (viewMode === 'reader') {
      if (map.length > 0) setActiveNodeId(map[0].id);
      else setActiveNodeId(null);
    }
  }, [activeModule]);

  const handleStartReading = () => {
    setViewMode('reader');
    if (navigationMap.length > 0) {
      setActiveNodeId(navigationMap[0].id);
    }
  };

  const handleSelectNode = (node) => {
    setViewMode('reader');
    setActiveNodeId(node.id);
    if (window.innerWidth < 768) {
      setIsSidebarOpen(false); 
    }
  };

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const getLinearNodeArray = () => {
    const list = [];
    const traverse = (n) => {
      list.push(n);
      n.subsections.forEach(traverse);
    };
    navigationMap.forEach(traverse);
    return list;
  };

  const handleNavigate = (params) => {
    if (params.appMode) handleToggleMode(params.appMode);
    if (params.viewMode) setViewMode(params.viewMode);
    if (params.activeNodeId) setActiveNodeId(params.activeNodeId);
    if (params.activeCardId) setActiveCardId(params.activeCardId);
    if (params.activeModule) setActiveModule(params.activeModule);
    if (params.activeExerciseId) setActiveExerciseId(params.activeExerciseId);
    if (params.scrollTo) {
       setTimeout(() => {
          const el = document.getElementById(params.scrollTo);
          if (el) el.scrollIntoView({ behavior: 'smooth' });
       }, 300);
    }
    setIsSidebarOpen(false);
  };

  useEffect(() => {
    // Tracking History and Progress
    if (viewMode === 'reader' && activeNodeId) studyData.markNodeAsRead(activeNodeId);
    
    let hItem = null;
    if (viewMode === 'reader') {
      const node = getLinearNodeArray().find(n => n.id === activeNodeId);
      if (node) hItem = { id: `node-${node.id}`, type: 'reader', title: node.title, subtitle: 'Libro', path: { viewMode: 'reader', activeNodeId: node.id } };
    } else if (viewMode === 'cardProfile') {
      const card = currentDictionary.find(c => c.id === activeCardId);
      if (card) hItem = { id: `card-${card.id}`, type: 'card', title: `Carta ${card.number}: ${card.name}`, subtitle: 'Diccionario', path: { viewMode: 'cardProfile', activeCardId: card.id } };
    } else if (['combinations', 'triplets', 'quintets', 'grid3x3', 'grandTableau', 'dailyCard', 'trustMethod', 'spreadsMenu', 'relationalMap'].includes(viewMode)) {
      const titles = { combinations: 'Pares', triplets: 'Tríadas', quintets: 'Quintetos', grid3x3: 'Retrato 3x3', grandTableau: 'Grand Tableau', dailyCard: 'Energía del Día', trustMethod: '¿Debo Confiar?', spreadsMenu: 'Menú de Tiradas', relationalMap: 'Mapa Relacional' };
      hItem = { id: `mod-${viewMode}`, type: viewMode, title: `Módulo: ${titles[viewMode]}`, subtitle: 'Teoría Práctica', path: { viewMode } };
    }

    setCurrentItem(hItem);
    if (hItem) studyData.addToHistory(hItem);
  }, [viewMode, activeNodeId, activeCardId, navigationMap]);

  const handleNavigatePrevious = () => {
    const arr = getLinearNodeArray();
    const idx = arr.findIndex(n => n.id === activeNodeId);
    if (idx > 0) setActiveNodeId(arr[idx - 1].id);
    else setViewMode('cover');
  };

  const handleNavigateNext = () => {
    const arr = getLinearNodeArray();
    const idx = arr.findIndex(n => n.id === activeNodeId);
    if (idx < arr.length - 1) setActiveNodeId(arr[idx + 1].id);
  };

  const activeNode = getLinearNodeArray().find(n => n.id === activeNodeId);

  // MANEJADOR DE CAMBIO DE MODO
  const handleToggleMode = (newMode) => {
      setAppMode(newMode);
      if (newMode === 'libro') {
          // Bloquear en Modo Libro: Solo Portada o Lector
          if (viewMode !== 'cover' && viewMode !== 'reader') {
               setViewMode('reader');
               if (!activeNodeId) handleStartReading();
          }
      } else {
          // Bloquear en Modo Estudio: Expulsar del Lector Secuencial
          if (viewMode === 'reader') {
               setViewMode('cardsMenu'); // Redirigir al Atlas de Cartas por defecto
          }
      }
  };

  const handleToggleModule = (mod) => {
      setActiveModule(mod);
      if (viewMode === 'cardProfile') {
          setViewMode('cardsMenu');
          setActiveCardId(null);
      }
  };

  if (!stats) return <div className="min-h-screen flex items-center justify-center bg-leny-dark text-white font-title text-2xl">Cargando la Sabiduría del Pequeño Leny...</div>;

  return (
    <PokerProvider onNavigate={handleNavigate}>
      <div className={`flex flex-col text-white min-h-screen overflow-hidden h-screen w-screen font-sans ${appMode === 'libro' ? 'bg-[#0f121a]' : 'bg-[#05070a]'}`}>
      
      {/* BARRA SUPERIOR ARQUITECTÓNICA */}
      <div className={`fixed top-0 inset-x-0 transition-all duration-500 flex items-center justify-between px-4 md:px-8 z-50 ${appMode === 'libro' ? 'h-[64px] bg-black/90 border-b border-leny-accent/20 shadow-md' : 'h-[72px] bg-transparent'}`}>
        
        {/* LOGO IZQUIERDA */}
        <button onClick={() => setViewMode('cover')} className="flex flex-col items-start gap-[1px] group w-48 shrink-0">
          <div className="flex items-baseline gap-1.5">
            <span className="font-serif tracking-widest text-[22px] font-light text-white/90 group-hover:text-white transition-colors">Academia</span>
            <span className="font-serif tracking-widest text-lg font-bold text-leny-accent italic mr-1">Leny</span>
          </div>
          <span className="font-sans text-[7.5px] tracking-[0.35em] text-white/30 group-hover:text-white/60 transition-colors uppercase font-medium">By Gastón Mauricio</span>
        </button>

        {/* TOGGLE MÁSTER CENTRAL (Selector de Mundos) */}
        <div className="absolute left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2 mt-4">
            <div className="flex bg-black/80 p-1 rounded-xl border border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.5)]">
                <button 
                    onClick={() => handleToggleMode('libro')}
                    className={`flex items-center gap-2 px-6 py-2 rounded-lg text-xs font-bold tracking-[0.2em] uppercase transition-all duration-300 ${appMode === 'libro' ? 'bg-leny-accent text-black shadow-lg scale-105' : 'text-white/40 hover:text-white/80'}`}
                >
                    <LayoutTemplate size={16} strokeWidth={1.5} /> Modo Libro
                </button>
                <button 
                    onClick={() => handleToggleMode('estudio')}
                    className={`flex items-center gap-2 px-6 py-2 rounded-lg text-xs font-bold tracking-[0.2em] uppercase transition-all duration-300 ${appMode === 'estudio' ? 'bg-purple-600 text-white shadow-[0_0_20px_rgba(147,51,234,0.4)] scale-105' : 'text-white/40 hover:text-white/80'}`}
                >
                    <FlaskConical size={16} strokeWidth={1.5} /> Laboratorio
                </button>
            </div>
            
            {/* SELECTOR DE MÓDULO */}
            <div className="flex bg-black/60 p-0.5 rounded-lg border border-white/5 shadow-inner">
                <button 
                    onClick={() => handleToggleModule('lenormand')}
                    className={`px-4 py-1 text-[9px] rounded uppercase font-bold tracking-[0.2em] transition-colors ${activeModule === 'lenormand' ? 'bg-leny-accent/20 text-leny-accent' : 'text-white/30 hover:text-white/60'}`}
                >Lenormand</button>
                <button 
                    onClick={() => handleToggleModule('poker')}
                    className={`px-4 py-1 text-[9px] rounded uppercase font-bold tracking-[0.2em] transition-colors ${activeModule === 'poker' ? 'bg-red-500/20 text-red-500' : 'text-white/30 hover:text-white/60'}`}
                >Póker</button>
            </div>
        </div>

        {/* HERRAMIENTAS DERECHA (Buscador y Utilidades globales, nada de botones amontonados) */}
        <div className="flex items-center gap-4 w-auto min-w-[50px] justify-end">
            <button 
                onClick={() => setSearchOpen(true)}
                className="p-2.5 rounded-full bg-white/5 border border-white/10 hover:border-leny-accent/50 hover:bg-leny-accent/10 transition-colors text-white/70 hover:text-leny-accent group flex items-center gap-2"
                title="Buscador Universal (Ctrl+K)"
            >
                <Search className="w-5 h-5 group-hover:scale-110 transition-transform" strokeWidth={1.5} />
            </button>
        </div>
      </div>

      {/* ÁREA CENTRAL DE CARGA SEGÚN MODO */}
      <div className={`flex w-full h-full relative transition-all duration-500 ${appMode === 'libro' ? 'pt-[64px]' : 'pt-[72px]'}`}>
        
        {/* === ENTORNO 1: MODO LIBRO LINEAL === */}
        {appMode === 'libro' && (
          <>
            <Sidebar 
                navigationMap={navigationMap} 
                activeNodeId={activeNodeId} 
                onSelectNode={handleSelectNode} 
                isSidebarOpen={isSidebarOpen} 
                activeModule={activeModule}
            />
            {/* Lector Canónico (Sin distracciones redondeadas, toma el 100% de alto natural) */}
            <div className="flex-1 overflow-hidden h-full relative bg-[#131722] border-l border-white/5">
                {viewMode === 'cover' && <StudentDashboard onStart={handleStartReading} onNavigate={handleNavigate} stats={stats} activeModule={activeModule} />}
                {viewMode === 'reader' && activeNode && (
                    <Reader 
                        activeNode={activeNode} 
                        onToggleSidebar={toggleSidebar} 
                        onNavigatePrevious={handleNavigatePrevious} 
                        onNavigateNext={handleNavigateNext} 
                        onSelectSubchapter={handleSelectNode}
                        setViewMode={setViewMode}
                        onNavigate={handleNavigate}
                        activeModule={activeModule}
                    />
                )}
            </div>
          </>
        )}

        {/* === ENTORNO 2: MODO LABORATORIO DE ESTUDIO === */}
        {appMode === 'estudio' && (
          <>
            <StudySidebar 
                currentView={viewMode}
                onViewChange={(mode) => {
                    setViewMode(mode);
                    if (window.innerWidth < 768) setIsSidebarOpen(false);
                }}
                isOpen={isSidebarOpen}
                activeModule={activeModule}
            />
            {/* Lector Canónico o Contenido Central (Con redondeo superior solo en Desktop si se desea, o cuadrado para amalgamar mejor) */}
            <div className="flex-1 overflow-hidden h-full relative bg-[#06080d] md:border-l border-white/10 shadow-[-10px_0_30px_rgba(0,0,0,0.8)]">
            
            {viewMode === 'cover' && <StudentDashboard onStart={() => setViewMode('cardsMenu')} onNavigate={handleNavigate} stats={stats} activeModule={activeModule} />}

            {viewMode === 'cardsMenu' && (
              activeModule === 'poker' ? (
                <div className="h-full w-full fade-in">
                  <PokerVisualAtlas onNavigate={handleNavigate} />
                </div>
              ) : (
              <div className="h-full overflow-y-auto p-6 md:p-12 custom-scrollbar fade-in bg-gradient-to-br from-[#0a0a14] to-black">
                
                <div className="max-w-[1200px] w-full mx-auto">
                  {/* Dashboard Práctico Héroe */}
                  <div className="flex flex-col mb-16">
                    <div className="bg-purple-950/20 border border-purple-500/20 rounded-[2rem] p-8 md:p-12 lg:p-16 shadow-inner text-center relative overflow-hidden backdrop-blur-xl">
                      <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
                         <FlaskConical size={250} strokeWidth={0.5} />
                      </div>
                      
                      <div className="text-[10px] text-purple-400 uppercase tracking-[0.3em] font-bold mb-6 decoration-purple-400/30 underline underline-offset-4 flex justify-center items-center gap-2">
                         <FlaskConical size={14}/> Laboratorio Operativo
                      </div>
                      <h1 className="text-3xl lg:text-5xl font-serif text-white mb-6 relative z-10 drop-shadow-[0_2px_10px_rgba(168,85,247,0.2)]">Arsenal de Herramientas</h1>
                      <p className="text-purple-200/60 mb-10 max-w-2xl mx-auto leading-relaxed text-lg relative z-10 font-light">
                        Este espacio excluye la teoría secuencial. Has entrado al simulador de entrenamiento oracular. Puedes diseccionar cartas empíricamente, memorizar visualmente y cruzar datos en el mapa de relaciones.
                      </p>
                      
                      <div className="relative z-10 flex gap-4 justify-center">
                        <button 
                          onClick={() => { setViewMode('exercises'); }}
                          className="px-8 flex items-center gap-3 py-4 bg-cyan-600 hover:bg-cyan-500 text-white font-bold rounded-xl uppercase tracking-widest text-xs transition-colors shadow-lg"
                        >
                          <Target size={16} strokeWidth={2} /> Adentrarse al Campo Práctico
                        </button>
                      </div>
                    </div>
                  </div>
                  
                  {/* Grid Visual Cartas */}
                  <div className="flex items-center gap-3 mb-8 justify-center">
                      <div className="h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent flex-1"></div>
                      <div className="text-xs uppercase tracking-[0.3em] text-purple-300/80 font-bold px-4">Inventario Cartomántico</div>
                      <div className="h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent flex-1"></div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 pb-20 w-full justify-items-center">
                    {currentDictionary.map(card => (
                      <button
                        key={card.id}
                        onClick={() => { setActiveCardId(card.id); setViewMode('cardProfile'); }}
                        className={`bg-black/40 border w-full border-white/5 rounded-2xl p-6 flex flex-col items-center gap-4 transition-all duration-300 hover:-translate-y-1 ${activeModule === 'poker' ? 'hover:border-red-500/50 hover:bg-red-900/10' : 'hover:border-purple-500/50 hover:bg-purple-900/10'} group shadow-lg`}
                      >
                        <div className={`text-5xl group-hover:scale-110 transition-transform duration-300 drop-shadow-lg pb-1 ${card.color === 'rojo' ? 'text-red-500' : card.color === 'negro' ? 'text-gray-300' : ''}`}>{card.emoji}</div>
                        <div className="text-center w-full">
                          <div className={`text-[10px] ${activeModule === 'poker' ? 'text-red-400/80' : 'text-purple-400/80'} font-bold tracking-[0.2em] uppercase mb-1`}>{card.number}</div>
                          <div className="text-white/90 font-medium tracking-wide text-sm border-t border-white/10 pt-2">{card.name}</div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              )
            )}

            {/* Inyecciones de Módulos (Solo accesibles en Modo Estudio) */}
            {viewMode === 'cardProfile' && (
              <div className="h-full p-4 lg:p-8 fade-in bg-[#06080d]">
                <div className="max-w-[1200px] w-full mx-auto h-full"> 
                  {activeModule === 'poker' ? (
                    <PokerCardProfile 
                      card={currentDictionary.find(c => c.id === activeCardId)} 
                      onClose={() => setViewMode('cardsMenu')} 
                      onNext={() => {
                        const idx = currentDictionary.findIndex(c => c.id === activeCardId);
                        setActiveCardId(currentDictionary[(idx + 1) % currentDictionary.length].id);
                      }}
                      onPrev={() => {
                        const idx = currentDictionary.findIndex(c => c.id === activeCardId);
                        setActiveCardId(currentDictionary[(idx - 1 + currentDictionary.length) % currentDictionary.length].id);
                      }}
                    />
                  ) : (
                    <CardProfile 
                      card={currentDictionary.find(c => c.id === activeCardId)} 
                      activeModule={activeModule}
                      onClose={() => setViewMode('cardsMenu')} 
                      onNavigate={handleNavigate}
                      onNext={() => {
                        const idx = currentDictionary.findIndex(c => c.id === activeCardId);
                        setActiveCardId(currentDictionary[(idx + 1) % currentDictionary.length].id);
                      }}
                      onPrev={() => {
                        const idx = currentDictionary.findIndex(c => c.id === activeCardId);
                        setActiveCardId(currentDictionary[(idx - 1 + currentDictionary.length) % currentDictionary.length].id);
                      }}
                    />
                  )}
                </div>
              </div>
            )}

            {viewMode === 'compareDesk' && (
              <div className="h-full p-0 fade-in bg-[#06080d]">
                <div className="w-full h-full">
                  <CompareDesk onClose={() => setViewMode('cardsMenu')} activeModule={activeModule} />
                </div>
              </div>
            )}

            {viewMode === 'spreadsMenu' && <SpreadsMenu onSelectMode={(mode) => setViewMode(mode)} activeModule={activeModule} />}
            {viewMode === 'dailyCard' && <div className="h-full w-full"><DailyCardTheory /></div>}
            {viewMode === 'trustMethod' && <div className="h-full w-full"><TrustMethodTheory /></div>}
            {viewMode === 'combinations' && <div className="h-full w-full">{activeModule === 'poker' ? <PokerCombinationsTheory /> : <CombinationsTheory />}</div>}
            {viewMode === 'triplets' && <div className="h-full w-full">{activeModule === 'poker' ? <PokerTripletsTheory /> : <TripletsTheory />}</div>}
            {viewMode === 'quintets' && <div className="h-full w-full">{activeModule === 'poker' ? <PokerQuintetsTheory /> : <QuintetsTheory />}</div>}
            {viewMode === 'grid3x3' && <div className="h-full w-full">{activeModule === 'poker' ? <PokerNineCardsTheory /> : <NineCardsTheory />}</div>}
            {viewMode === 'pokerExamples' && <div className="h-full w-full"><PokerExamplesBank /></div>}
            {viewMode === 'pokerExercises' && <div className="h-full w-full"><PokerExerciseBank onNavigate={handleNavigate} /></div>}
            {viewMode === 'grandTableau' && <div className="h-full w-full bg-leny-dark"><GrandTableauTheory /></div>}
            
            {viewMode === 'exercises' && (
              <div className="h-full w-full">
                <ExerciseBank 
                  initialExercise={activeExerciseId} 
                  clearInitial={() => setActiveExerciseId(null)} 
                  onNavigate={handleNavigate} 
                />
              </div>
            )}

            {viewMode === 'tutor' && <div className="h-full w-full"><TutorAI /></div>}
            {viewMode === 'flashcards' && <div className="h-full w-full"><FlashcardsModule onNavigate={handleNavigate} activeModule={activeModule} /></div>}
            
            {viewMode === 'relationalMap' && (
              <div className="h-full w-full relative z-40 bg-black">
                <RelationalMap onClose={() => setViewMode('cardsMenu')} onNavigate={handleNavigate} activeModule={activeModule} />
              </div>
            )}

          </div>
          </>
        )}

        {/* Global Floating Actions (Bookmark icon persists if it corresponds) */}
        {currentItem && appMode === 'libro' && !['cover'].includes(viewMode) && (
          <button 
            onClick={() => studyData.toggleBookmark(currentItem)}
            title="Añadir a Marcadores de Lectura"
            className={`fixed bottom-8 right-8 p-4 rounded-full shadow-2xl z-40 transition-all hover:scale-110 ${studyData.isBookmarked(currentItem.id) ? 'bg-leny-accent text-black shadow-[0_0_20px_rgba(205,174,104,0.4)]' : 'bg-black border border-white/20 text-white shadow-[0_0_20px_rgba(0,0,0,0.5)]'}`}
          >
            <Star className="w-6 h-6" strokeWidth={1.5} fill={studyData.isBookmarked(currentItem.id) ? "currentColor" : "none"} />
          </button>
        )}

        {/* Overlay movil para cerrar sidebar */}
        {isSidebarOpen && window.innerWidth < 768 && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-30" onClick={() => setIsSidebarOpen(false)} />
        )}
      </div>

      {/* Global Search Modal */}
      <GlobalSearch isOpen={searchOpen} onClose={() => setSearchOpen(false)} onNavigate={handleNavigate} activeModule={activeModule} />
    </div>
    </PokerProvider>
  );
};

export default App;
