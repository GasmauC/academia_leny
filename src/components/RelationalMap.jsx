import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import ForceGraph2D from 'react-force-graph-2d';
import { cardsDictionary as lenormandCardsDictionary } from '../data/db/lenormand_cards';
import { pokerCardsDictionary } from '../data/db/poker_cards';
import { comparisonCategories } from '../data/db/advanced_comparisons';
import { semanticDictionary } from '../data/db/semantic_dictionary';
import { LenormandAPI } from '../data/api';
import { 
  Maximize, ZoomIn, ZoomOut, Target, X, Network, ExternalLink, 
  Search, Filter, ChevronRight, Layers, LayoutPanelTop, BookOpen, Hexagon,
  ChevronLeft, Atom, ArrowUpRight
} from 'lucide-react';

// === CONSTRUCCIÓN DE TOPOLOGÍAS SECUENCIALES ===

const spreadsData = [
  { id: 'combinations', label: 'Tirada de Pares', cards: [1, 2, 27] }, 
  { id: 'triplets', label: 'Tríadas Lineales', cards: [1, 2, 3] },
  { id: 'grid3x3', label: 'Retrato de 9 Cartas', cards: [3,4,30,8] },
  { id: 'grandTableau', label: 'Grand Tableau', cards: [28, 29] }, 
  { id: 'dailyCard', label: 'Carta Diaria', cards: [2] }
];

// === POKER SUITS MAP ===
const pokerSuitsData = [
  { id: 'Corazones', name: 'Corazones', emoji: '♥', color: '#ef4444', desc: 'Emociones y Relaciones' },
  { id: 'Tréboles', name: 'Tréboles', emoji: '♣', color: '#d1d5db', desc: 'Trabajo y Esfuerzo' },
  { id: 'Diamantes', name: 'Diamantes', emoji: '♦', color: '#ef4444', desc: 'Material y Finanzas' },
  { id: 'Picas', name: 'Picas', emoji: '♠', color: '#d1d5db', desc: 'Desafíos y Obstáculos' }
];

function generateGraphForPath(path, activeModule = 'lenormand') {
  const isPoker = activeModule === 'poker';
  const cardsDictionary = isPoker ? pokerCardsDictionary : lenormandCardsDictionary;
  
  const nodes = [];
  const links = [];

  const addNode = (id, label, nodeType, weight, icon, data = {}, color = '#fff') => {
      // Evitar duplicados
      if (!nodes.find(n => n.id === id)) {
         nodes.push({ 
             id, label, nodeType, weight, icon, color, data, val: weight,
             x: (Math.random() - 0.5) * 300,
             y: (Math.random() - 0.5) * 300
         });
      }
  };
  const addLink = (source, target, type = 'medium', label = '') => {
      let color = 'rgba(255,255,255,0.2)';
      let width = 1;
      let particleSize = 0;
      if (type === 'strong') { color = 'rgba(205,174,104,0.6)'; width = 3; particleSize = 4; }
      else if (type === 'medium') { color = 'rgba(255,255,255,0.4)'; width = 1.5; particleSize = 2; }
      else if (type === 'weak') { color = 'rgba(255,255,255,0.1)'; width = 0.5; }
      links.push({ source, target, linkType: type, label, color, width, particleSize });
  };

  const currentLevel = path[path.length - 1];

  // NIVEL 1: MACRO UNIVERSO
  if (currentLevel.type === 'universe') {
      if (isPoker) {
          pokerSuitsData.forEach(suit => {
              addNode(`concept-${suit.id}`, suit.name.toUpperCase(), 'concept', 45, suit.emoji, { concept: suit.id, context: suit.desc }, suit.color);
          });
      } else {
          semanticDictionary.forEach(sem => {
              addNode(`concept-${sem.concept}`, sem.concept.toUpperCase(), 'concept', 40, '☀️', sem, 'rgba(205,174,104,0.9)');
          });
      }
      return { nodes, links };
  }

  // NIVEL 2: EXPANSIÓN DE CONCEPTO / PALO
  if (currentLevel.type === 'concept') {
      if (isPoker) {
          const suitId = currentLevel.id.split('-')[1];
          const suit = pokerSuitsData.find(s => s.id === suitId);
          addNode(`concept-${suit.id}`, suit.name.toUpperCase(), 'concept', 55, suit.emoji, { concept: suit.id, context: suit.desc }, suit.color);
          
          cardsDictionary.filter(c => c.suit === suitId).forEach(cCard => {
              let cColor = cCard.color === 'rojo' ? '#ef4444' : '#d1d5db';
              addNode(`card-${cCard.id}`, `${cCard.number}. ${cCard.name}`, 'card', 25, cCard.emoji, cCard, cColor);
              addLink(`concept-${suit.id}`, `card-${cCard.id}`, 'medium', 'Pertenece al Palo');
          });
          return { nodes, links };
      }

      const sem = currentLevel.data;
      addNode(`concept-${sem.concept}`, sem.concept.toUpperCase(), 'concept', 50, '☀️', sem, 'rgba(205,174,104,0.9)');
      
      const pCard = cardsDictionary.find(c => c.id === sem.primaryCardId);
      if (pCard) {
         let pColor = pCard.polarity.includes('+') ? '#34d399' : pCard.polarity.includes('-') ? '#f87171' : '#a1a1aa';
         addNode(`card-${pCard.id}`, `${pCard.number}. ${pCard.name}`, 'card', 35, pCard.emoji, pCard, pColor);
         addLink(`concept-${sem.concept}`, `card-${pCard.id}`, 'strong', 'Gobernante Principal');
      }

      sem.relatedCardIds.forEach(cid => {
          const cCard = cardsDictionary.find(c => c.id === cid);
          if (cCard) {
              let cColor = cCard.polarity.includes('+') ? '#34d399' : cCard.polarity.includes('-') ? '#f87171' : '#a1a1aa';
              addNode(`card-${cCard.id}`, `${cCard.number}. ${cCard.name}`, 'card', 25, cCard.emoji, cCard, cColor);
              addLink(`concept-${sem.concept}`, `card-${cCard.id}`, 'medium', 'Contexto Secundario');
              if (pCard) addLink(`card-${pCard.id}`, `card-${cCard.id}`, 'weak', 'Subordinada en este tema');
          }
      });
      return { nodes, links };
  }

  // NIVEL 3/4: EXPANSIÓN DE CARTA
  if (currentLevel.type === 'card') {
      const card = currentLevel.data;
      let cColor = isPoker 
        ? (card.color === 'rojo' ? '#ef4444' : '#d1d5db') 
        : (card.polarity.includes('+') ? '#34d399' : card.polarity.includes('-') ? '#f87171' : '#a1a1aa');
      addNode(`card-${card.id}`, `${card.number}. ${card.name}`, 'card', 50, card.emoji, card, cColor);

      // 1. Conceptos a los que pertenece (Orígenes)
      if (isPoker) {
          const suit = pokerSuitsData.find(s => s.id === card.suit);
          if (suit) {
              addNode(`concept-${suit.id}`, suit.name.toUpperCase(), 'concept', 35, suit.emoji, { concept: suit.id, context: suit.desc }, suit.color);
              addLink(`card-${card.id}`, `concept-${suit.id}`, 'strong', 'Gobierna el ámbito de');
          }
      } else {
          semanticDictionary.forEach(sem => {
              if (sem.primaryCardId === card.id || sem.relatedCardIds.includes(card.id)) {
                  addNode(`concept-${sem.concept}`, sem.concept.toUpperCase(), 'concept', 25, '☀️', sem, 'rgba(205,174,104,0.6)');
                  addLink(`card-${card.id}`, `concept-${sem.concept}`, sem.primaryCardId === card.id ? 'strong' : 'medium', 'Pertenece a la esfera de');
              }
          });
      }

      // 2. Batallas Semánticas (Roces) - Solo Lenormand por ahora
      if (!isPoker) {
          comparisonCategories.forEach(cat => {
          cat.comparisons.forEach(comp => {
              if (comp.cards.includes(card.id)) {
                  addNode(`comp-${comp.id}`, comp.title, 'comparison', 25, '⚔️', { catId: cat.id, comp }, '#a78bfa');
                  addLink(`card-${card.id}`, `comp-${comp.id}`, 'medium', 'Confusión Documentada');
                  // Agregar al rival
                  const rivalId = comp.cards.find(id => id !== card.id);
                  const rival = cardsDictionary.find(c => c.id === rivalId);
                  if (rival) {
                      addNode(`card-${rival.id}`, `${rival.number}. ${rival.name}`, 'card', 20, rival.emoji, rival, '#dc2626'); // Rival in redish tone for contrast
                      addLink(`comp-${comp.id}`, `card-${rival.id}`, 'weak', 'Rival directo');
                  }
              }
          });
          });
      }

      // 3. Tiradas donde brilla (Práctica)
      spreadsData.forEach(sp => {
          if (sp.cards.includes(card.id)) {
              addNode(`spread-${sp.id}`, sp.label, 'spread', 30, '🔮', sp, '#38bdf8');
              addLink(`card-${card.id}`, `spread-${sp.id}`, 'medium', 'Aplicado en Tirada');
          }
      });

      return { nodes, links };
  }

  // NIVEL COMPARTIDO EXPANSIÓN MÓDULO (Si eligen una tirada o batalla)
  if (currentLevel.type === 'spread') {
      const sp = currentLevel.data;
      addNode(`spread-${sp.id}`, sp.label, 'spread', 50, '🔮', sp, '#38bdf8');
      
      sp.cards.forEach(cid => {
          const card = cardsDictionary.find(c => c.id === cid);
          if (card) {
               addNode(`card-${card.id}`, `${card.number}. ${card.name}`, 'card', 30, card.emoji, card, '#a1a1aa');
               addLink(`spread-${sp.id}`, `card-${card.id}`, 'strong', 'Pieza Clave del Módulo');
          }
      });
      return { nodes, links };
  }

  if (currentLevel.type === 'comparison') {
      const { comp } = currentLevel.data;
      addNode(`comp-${comp.id}`, comp.title, 'comparison', 50, '⚔️', currentLevel.data, '#a78bfa');
      
      comp.cards.forEach(cid => {
          const card = cardsDictionary.find(c => c.id === cid);
          if (card) {
               addNode(`card-${card.id}`, `${card.number}. ${card.name}`, 'card', 35, card.emoji, card, '#a1a1aa');
               addLink(`comp-${comp.id}`, `card-${card.id}`, 'strong', 'Sujeto de Debate');
          }
      });
      return { nodes, links };
  }

  return { nodes: [], links: [] };
}


const RelationalMap = ({ onClose, onNavigate, activeModule = 'lenormand' }) => {
  const fgRef = useRef();
  const [windowDimensions, setWindowDimensions] = useState({ width: window.innerWidth, height: window.innerHeight });
  
  // HISTORIAL DE NAVEGACIÓN (BREADCRUMBS)
  // Inicializamos en el nivel Macro Universo
  const [history, setHistory] = useState([ { type: 'universe', id: 'root', label: 'Ecosistema Oracular' } ]);
  const currentLevel = history[history.length - 1];

  // NODO SELECCIONADO EN EL NIVEL ACTUAL (Foco para el panel lateral)
  const [selectedNode, setSelectedNode] = useState(null);
  const [hoverNode, setHoverNode] = useState(null);

  // GRAFÍA ACTUAL
  const graphData = useMemo(() => generateGraphForPath(history, activeModule), [history, activeModule]);

  useEffect(() => {
    const handleResize = () => setWindowDimensions({ width: window.innerWidth, height: window.innerHeight });
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Al cambiar de capa o centrar, animamos y refrescamos la selección
  useEffect(() => {
      setSelectedNode(null);
      if (fgRef.current) {
          fgRef.current.d3Force('charge').strength(currentLevel.type === 'universe' ? -400 : -800);
          fgRef.current.d3Force('link').distance(currentLevel.type === 'universe' ? 150 : 80);
          // Restaurar center force (es necesario o volarán al infinito si no tienen links!)
          // react-force-graph-2d ya incluye d3Force('center'), solo le damos re-heat
          fgRef.current.d3ReheatSimulation();
          
          setTimeout(() => {
              if (fgRef.current) fgRef.current.zoomToFit(1000, 150);
          }, 400);
      }
  }, [history]);

  // NAVEGAR HACIA ADENTRO (Push history)
  const pushLevel = (node) => {
      if (node.nodeType === 'concept' && currentLevel.type !== 'concept') {
          setHistory([...history, { type: 'concept', id: node.id, label: node.label, data: node.data }]);
      } else if (node.nodeType === 'card' && currentLevel.type !== 'card') {
          setHistory([...history, { type: 'card', id: node.id, label: node.label, data: node.data }]);
      } else if (node.nodeType === 'spread' && currentLevel.type !== 'spread') {
          setHistory([...history, { type: 'spread', id: node.id, label: node.label, data: node.data }]);
      } else if (node.nodeType === 'comparison' && currentLevel.type !== 'comparison') {
          setHistory([...history, { type: 'comparison', id: node.id, label: node.label, data: node.data }]);
      } else {
          // Si hace click en el mismo nivel, solo lo seleccionamos para leer el panel lateral, no profundizamos 
          // (ej. pincha una carta secundaria estando ya en la vista de Concepto). 
          // Si el usuario quiere profundizar, le dará al botón "Expandir" del Panel.
          handleFocusNode(node);
      }
  };

  // NAVEGAR HACIA ATRÁS (Click en breadcrumb)
  const popToLevel = (index) => {
      if (index === history.length - 1) return; // ya estamos ahí
      setHistory(history.slice(0, index + 1));
  };

  // CENTRAR CÁMARA
  const handleFocusNode = useCallback(node => {
    setSelectedNode(node);
    const distance = 100;
    const distRatio = 1 + distance/Math.hypot(node.x, node.y, node.z||0);
    fgRef.current.cameraPosition(
      { x: node.x * distRatio, y: node.y * distRatio, z: node.z ? node.z * distRatio : distance }, 
      node, 
      1000
    );
  }, [fgRef]);


  // DIBUJADO DE NODOS EN D3 CANVAS
  const paintNode = useCallback((node, ctx, globalScale) => {
    const isFocused = selectedNode && node.id === selectedNode.id;
    const isHovered = hoverNode && node.id === hoverNode.id;
    
    let opacity = 1;
    if (selectedNode && !isFocused) opacity = 0.3;
    else if (hoverNode && !isHovered) opacity = 0.6;
    ctx.globalAlpha = opacity;

    const radius = node.val; // El valor que emite generateGraph 

    // Renderizado según Node Type
    const isMainContext = (currentLevel.id === node.id); // Si es el nodo central de esta capa
    const actualRadius = isMainContext ? radius * 1.5 : radius;
    
    ctx.beginPath();
    if (node.nodeType === 'spread' || node.nodeType === 'comparison') {
         ctx.rect(node.x - actualRadius/2, node.y - actualRadius/2, actualRadius, actualRadius);
    } else {
         ctx.arc(node.x, node.y, actualRadius, 0, 2 * Math.PI, false);
    }
    
    ctx.fillStyle = node.nodeType === 'concept' ? 'rgba(10,10,10,0.9)' : 'rgba(15,20,30,0.95)';
    ctx.fill();
    
    ctx.lineWidth = isFocused || isHovered || isMainContext ? 3 : 1;
    ctx.strokeStyle = isMainContext ? '#fff' : node.color;
    
    if (node.nodeType === 'concept' || isMainContext) {
         ctx.shadowColor = node.color; 
         ctx.shadowBlur = isMainContext ? 30 : 15;
    }
    ctx.stroke();
    ctx.shadowBlur = 0; // reset

    // Draw Icon / Emoji
    const fontSize = actualRadius * 0.8;
    ctx.font = `${fontSize}px Sans-Serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = '#fff';
    ctx.fillText(node.icon, node.x, node.y - (node.nodeType === 'concept' ? 0 : 2));

    // Draw Label below
    if (globalScale > 1.2 || isFocused || isHovered || isMainContext) {
        const labelSize = (isMainContext ? 16 : 12) / globalScale + (isFocused ? 4 : 0);
        ctx.font = `${node.nodeType === 'concept' || isMainContext ? 'bold ':''}${Math.max(4, labelSize)}px Sans-Serif`;
        ctx.fillStyle = isMainContext ? '#fff' : isFocused ? '#c9a227' : 'rgba(255,255,255,0.8)';
        ctx.fillText(node.label, node.x, node.y + actualRadius + labelSize);
    }
    
    ctx.globalAlpha = 1;
  }, [selectedNode, hoverNode, currentLevel]);


  // RENDERIZADO DEL PANEL LATERAL: GUIANDO AL USUARIO
  const renderSidePanel = () => {
     // Si hay un nodo seleccionado explícitamente se muestra ese, sino se muestra el nodo principal del nivel en el que estamos (excepto si estamos en el universo).
     let node = selectedNode;
     if (!node && currentLevel.type !== 'universe') {
         node = {
             id: currentLevel.id,
             label: currentLevel.label,
             nodeType: currentLevel.type,
             icon: currentLevel.type === 'concept' ? '☀️' : currentLevel.type === 'card' ? currentLevel.data.emoji : currentLevel.type === 'spread' ? '🔮' : '⚔️',
             data: currentLevel.data
         };
     }

     if (!node) return null;

     const handleDeepDive = () => {
         pushLevel(node);
     };

     return (
        <div className="absolute right-4 top-28 bottom-4 w-80 bg-leny-darker/95 backdrop-blur-3xl border border-white/10 rounded-2xl flex flex-col z-20 shadow-2xl animate-fade-in custom-scrollbar overflow-y-auto">
            
            {/* Header del Panel */}
            <div className={`p-6 border-b border-white/10 ${node.id === currentLevel.id ? 'bg-leny-accent/5' : 'bg-white/5'} shrink-0`}>
                <div className="flex justify-between items-start mb-2">
                    <span className={`text-[10px] ${activeModule==='poker' ? 'text-red-400' : 'text-leny-accent'} font-bold uppercase tracking-widest px-2 py-1 bg-white/10 inline-block rounded`}>
                        Info: {node.nodeType === 'spread' ? 'Módulo de Tirada' : node.nodeType === 'concept' ? (activeModule==='poker' ? 'Palo Principal' : 'Familia Conceptual') : node.nodeType === 'comparison' ? 'Batalla Semántica' : 'Carta'}
                    </span>
                    {selectedNode && (
                       <button onClick={() => setSelectedNode(null)} className="text-white/40 hover:text-white p-1 hover:bg-white/10 rounded transition-colors" title="Cerrar Foco"><X size={16}/></button>
                    )}
                </div>
                <div className="flex items-center gap-4">
                    <div className="text-4xl drop-shadow-md">{node.icon}</div>
                    <h3 className="text-2xl font-serif leading-tight text-white">{node.label}</h3>
                </div>
            </div>

            <div className="p-6 space-y-6">
                {/* 1. QUÉ ESTOY VIENDO Y POR QUÉ IMPORTA */}
                <div className="space-y-4">
                    <div className="text-[10px] text-leny-dim uppercase tracking-widest border-b border-white/10 pb-1">Contexto Conceptual</div>
                    
                    {node.nodeType === 'concept' && (
                        <p className="text-sm text-white/90 leading-relaxed italic border-l-2 border-leny-accent pl-4">
                            "{node.data.context}"
                        </p>
                    )}
                    {node.nodeType === 'card' && (
                        <>
                           <div className="font-bold text-leny-accent italic">{node.data.actionVerb}</div>
                           <p className="text-sm text-white/70 leading-relaxed">{node.data.symbolicCore}</p>
                           {node.id !== currentLevel.id && (
                               <div className="bg-white/5 border border-white/10 p-3 rounded-lg mt-2 space-y-1">
                                   <div className="text-xs font-bold text-white/60 uppercase">Su rol en esta capa:</div>
                                   <div className="text-sm text-white/90">
                                       {/* Encontrar el vínculo con el nodo activo si existe para explicar por qué vemos esto */}
                                       {graphData.links.find(l => (l.source.id === currentLevel.id && l.target.id === node.id) || (l.target.id === currentLevel.id && l.source.id === node.id))?.label || "Componente entrelazado"}
                                   </div>
                               </div>
                           )}
                        </>
                    )}
                    {node.nodeType === 'spread' && (
                        <p className="text-sm text-sky-200/90 leading-relaxed">
                            Es un esquema físico para desplegar las cartas orientando su lectura topológica. Las cartas enlazadas a él sirven como significadores excelentes.
                        </p>
                    )}
                    {node.nodeType === 'comparison' && (
                        <p className="text-sm text-purple-200/90 leading-relaxed">
                            Muestra la diferencia y choque semántico entre dos energías que suelen interpretarse erróneamente por los estudiantes.
                        </p>
                    )}
                </div>

                {/* 2. QUÉ PUEDO EXPLORAR DESPUÉS (El paso guiado) */}
                <div className="space-y-3 pt-6 border-t border-white/10">
                    <div className="text-[10px] text-leny-dim uppercase tracking-widest border-b border-white/10 pb-1 mb-3">Acciones Sugeridas</div>
                    
                    {/* Botón de Expansión en la misma Red */}
                    {node.id !== currentLevel.id && (
                        <button onClick={handleDeepDive} className="w-full bg-leny-accent/20 hover:bg-leny-accent text-white hover:text-black font-bold text-xs uppercase tracking-widest p-4 rounded-xl border border-leny-accent/40 shadow-lg transition-all flex items-center justify-between group">
                            <span className="flex items-center gap-2"><Network size={14}/> Focalizar y Expandir Nodo</span>
                            <ArrowUpRight size={14} className="opacity-50 group-hover:opacity-100" />
                        </button>
                    )}

                    {/* Botones de escape aplicativo transversal */}
                    {node.nodeType === 'card' && (
                        <button onClick={() => onNavigate({ viewMode: 'cardProfile', activeCardId: node.data.id })} className="w-full flex justify-between items-center bg-gray-800 p-4 rounded-xl hover:bg-gray-700 transition-colors group">
                            <div className="flex items-center gap-2"><BookOpen size={14} className="text-white/60"/> <span className="font-semibold text-xs tracking-wider uppercase">Leer Diccionario</span></div>
                            <ExternalLink size={14} className="text-white/30 group-hover:text-leny-accent" />
                        </button>
                    )}
                    {node.nodeType === 'comparison' && (
                        <button onClick={() => onNavigate({ viewMode: 'compareDesk' })} className="w-full flex justify-between items-center bg-purple-900/30 p-4 rounded-xl border border-purple-500/20 hover:bg-purple-900/60 transition-colors group">
                            <div className="flex items-center gap-2"><Layers size={14} className="text-purple-400"/> <span className="font-semibold text-xs tracking-wider uppercase text-purple-200">Ir al Laboratorio</span></div>
                            <ExternalLink size={14} className="text-purple-400" />
                        </button>
                    )}
                    {node.nodeType === 'spread' && (
                        <button onClick={() => onNavigate({ viewMode: node.data.id })} className="w-full flex justify-between items-center bg-sky-900/30 p-4 rounded-xl border border-sky-500/20 hover:bg-sky-900/60 transition-colors group">
                            <div className="flex items-center gap-2"><LayoutPanelTop size={14} className="text-sky-400"/> <span className="font-semibold text-xs tracking-wider uppercase text-sky-200">Practicar Ejercicio</span></div>
                            <ExternalLink size={14} className="text-sky-400" />
                        </button>
                    )}
                </div>
            </div>
        </div>
     );
  };


  return (
    <div className="flex w-full h-full bg-[#030408] relative overflow-hidden text-white font-sans animate-fade-in custom-scrollbar">
      
      {/* BREADCRUMB HEADER (Mando de Capas) */}
      <div className="absolute top-0 inset-x-0 p-6 flex flex-col items-start z-10 pointer-events-none gap-4">
         
         <div className="pointer-events-auto bg-black/80 backdrop-blur-3xl border border-white/10 rounded-2xl px-6 py-4 shadow-2xl flex items-center max-w-4xl w-full">
             <ol className="flex items-center flex-wrap gap-2 w-full text-sm">
                 {history.map((lvl, index) => {
                     const isLast = index === history.length - 1;
                     return (
                         <React.Fragment key={index}>
                             <li>
                                 <button
                                     onClick={() => popToLevel(index)}
                                     disabled={isLast}
                                     className={`flex items-center gap-2 font-serif text-lg md:text-xl transition-all ${isLast ? 'text-leny-accent font-bold drop-shadow-md' : 'text-white/40 hover:text-white line-through decoration-white/20'}`}
                                 >
                                     {lvl.type === 'universe' && <Atom className="w-5 h-5" />}
                                     {lvl.label}
                                 </button>
                             </li>
                             {!isLast && (
                                 <li><ChevronRight className="w-5 h-5 text-white/20" /></li>
                             )}
                         </React.Fragment>
                     );
                 })}
             </ol>
             
             {/* Info de nivel actual a la derecha */}
             <div className="ml-auto flex items-center gap-4 border-l border-white/10 pl-6 shrink-0">
                 <div className="text-[10px] text-leny-dim uppercase tracking-widest text-right">
                     <div>Capa de Profundidad {history.length}</div>
                     <div className="text-white/60 font-bold">{graphData.nodes.length} Nodos Activos</div>
                 </div>
                 
                 {history.length > 1 && (
                     <button onClick={() => popToLevel(history.length - 2)} className="flex items-center justify-center p-3 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 transition-colors" title="Subir a la capa exterior">
                         <ChevronLeft className="w-5 h-5 text-white" />
                     </button>
                 )}
                 {onClose && (
                    <button onClick={onClose} className="p-3 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-full border border-red-500/20 transition-colors" title="Cerrar Mapa">
                        <X size={20}/>
                    </button>
                 )}
             </div>
         </div>

         {/* Controles de Cámara (Pequeños, Abajo a la izquierda) */}
         <div className="flex gap-2 pointer-events-auto mt-auto">
            <button onClick={() => fgRef.current.zoom(fgRef.current.zoom() * 1.5, 600)} className="p-2 bg-black/50 border border-white/10 hover:bg-white/10 rounded-lg text-white/80"><ZoomIn size={16}/></button>
            <button onClick={() => fgRef.current.zoom(fgRef.current.zoom() / 1.5, 600)} className="p-2 bg-black/50 border border-white/10 hover:bg-white/10 rounded-lg text-white/80"><ZoomOut size={16}/></button>
            <button onClick={() => fgRef.current.zoomToFit(600, 100)} className="p-2 bg-black/50 border border-white/10 hover:bg-white/10 rounded-lg text-white/80"><Maximize size={16}/></button>
         </div>
      </div>

      {/* RENDER D3 GRAVITY ENGINE */}
      <div className={`w-full h-full cursor-grab active:cursor-grabbing transition-opacity duration-700 ${graphData.nodes.length === 0 ? 'opacity-0' : 'opacity-100'}`}>
          <ForceGraph2D
             ref={fgRef}
             width={windowDimensions.width}
             height={windowDimensions.height}
             graphData={graphData}
             nodeLabel={null} // Panel lateral gobierna esto
             nodeRelSize={8}
             linkColor={link => link.color}
             linkWidth={link => link.width}
             linkOpacity={1}
             linkDirectionalParticles={link => link.particleSize}
             linkDirectionalParticleWidth={1.5}
             linkDirectionalParticleSpeed={0.015}
             backgroundColor="transparent"
             onNodeClick={(node) => {
                 if (node.id === currentLevel.id) return; // Ya es el centro explícito
                 handleFocusNode(node);
                 // Si hace doble click en un nodo lo expande (o damos la acción en click directo, pero propusimos hacerlo por panel)
                 // Dejar clic para focus/panel, y el panel tiene el boton "Expandir Nodo" (Profundizar)
             }}
             onNodeHover={node => setHoverNode(node)}
             onBackgroundClick={() => setSelectedNode(null)}
             nodeCanvasObject={paintNode}
             d3VelocityDecay={0.15} 
          />
      </div>

      {/* PANEL ESTRATÉGICO LATERAL */}
      {renderSidePanel()}

    </div>
  );
};

export default RelationalMap;
