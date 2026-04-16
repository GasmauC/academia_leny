import React, { useState, useEffect, useRef } from 'react';
import { Search, X, BookOpen, Layers, Target, GraduationCap, LayoutPanelTop, GalleryHorizontal, Hash, ArrowRight, Network, ChevronDown, Sparkles } from 'lucide-react';
import { LenormandAPI } from '../data/api';
import { cardsDictionary } from '../data/db/lenormand_cards';
import { comparisonCategories } from '../data/db/advanced_comparisons';
import { semanticDictionary } from '../data/db/semantic_dictionary';
import { theoryBlocks as combinationsBlocks } from '../data/combinations_theory';
import { tripletsBlocks } from '../data/triplets_theory';
import { quintetsBlocks } from '../data/quintets_theory';
import { ninecardsBlocks } from '../data/ninecards_theory';
import { gtBlocks } from '../data/grandtableau_theory';

export default function GlobalSearch({ isOpen, onClose, onNavigate }) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState({ 
      canonicalNode: null,
      cards: [], 
      theory: [], 
      practical: [], 
      semanticLinks: [] 
  });
  const [showSecondaryCards, setShowSecondaryCards] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) onClose();
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) inputRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setQuery('');
      setResults({ canonicalNode: null, cards: [], theory: [], practical: [], semanticLinks: [] });
      setShowSecondaryCards(false);
    }
  }, [isOpen]);

  const searchEverything = (searchTerm) => {
    setShowSecondaryCards(false);
    if (!searchTerm || searchTerm.trim().length < 2) {
      setResults({ canonicalNode: null, cards: [], theory: [], practical: [], semanticLinks: [] });
      return;
    }
    
    const lowers = searchTerm.toLowerCase();
    const stopwords = ['el', 'la', 'los', 'las', 'un', 'una', 'unos', 'unas', 'y', 'de', 'del', 'al', 'con', 'por', 'para', 'en'];
    const queryWords = lowers.split(/\s+/).filter(w => !stopwords.includes(w) && w.length > 1);
    const searchTerms = queryWords.length > 0 ? queryWords : [lowers];

    const matchesQuery = (text) => {
        if (!text || typeof text !== 'string') return false;
        const normalized = text.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
        return searchTerms.some(word => {
            const wordN = word.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
            return normalized.includes(wordN);
        });
    };

    const newResults = { canonicalNode: null, cards: [], theory: [], practical: [], semanticLinks: [] };
    const foundCardIds = new Set();

    // INTERCEPCIÓN SEMÁNTICA ESTRATÉGICA
    // Revisar si la consulta coincide limpiamente con un concepto en el Diccionario Ontológico
    let conceptualMatch = null;
    for (const entry of semanticDictionary) {
        if (entry.keywords.some(kw => matchesQuery(kw))) {
             conceptualMatch = entry;
             break; // Priorizar el primer concepto que coincida
        }
    }

    if (conceptualMatch) {
         // Si hay Match Canónico, se extraen las cartas y se aíslan visualmente
         const pCard = cardsDictionary.find(c => c.id === conceptualMatch.primaryCardId);
         const sCards = conceptualMatch.relatedCardIds.map(id => cardsDictionary.find(c => c.id === id)).filter(Boolean);
         
         newResults.canonicalNode = {
            concept: conceptualMatch.concept.toUpperCase(),
            context: conceptualMatch.context,
            primary: pCard,
            secondary: sCards
         };
         
         foundCardIds.add(pCard.id);
         sCards.forEach(c => foundCardIds.add(c.id));
    } else {
         // Si no hay interceptación maestra, hacer búsqueda libre normal en cartas
         cardsDictionary.forEach(c => {
            let textToSearch = `${c.name} ${c.baseMeaning} ${c.symbolicCore} ${c.actionVerb} ${c.mainTheme} `;
            if (c.readings) {
                textToSearch += Object.values(c.readings).join(" ");
            }
            if (c.contextualLayers) {
                textToSearch += Object.values(c.contextualLayers).join(" ");
            }

            if (matchesQuery(textToSearch)) {
              foundCardIds.add(c.id);
              newResults.cards.push({
                id: `card-${c.id}`,
                type: 'card',
                icon: <span className="text-xl">{c.emoji}</span>,
                title: `${c.number}. ${c.name}`,
                subtitle: c.actionVerb,
                action: () => onNavigate({ viewMode: 'cardProfile', activeCardId: c.id })
              });
            }
        });
    }

    // Construcción de Enlaces Semánticos basados en Cartas Encontradas
    if (foundCardIds.size > 0 && foundCardIds.size < 5) {
        comparisonCategories.forEach(cat => {
            const catMatched = cat.comparisons.some(comp => comp.cards.some(cid => foundCardIds.has(cid)));
            if (catMatched) {
                newResults.semanticLinks.push({
                    id: `cat-${cat.id}`,
                    icon: <Network className="w-5 h-5 text-leny-accent"/>,
                    title: `Concepto Familia: ${cat.title}`,
                    subtitle: `Explora esto en el Mapa Relacional`,
                    action: () => onNavigate({ viewMode: 'relationalMap' })
                });
            }
        });
    }

    // EL LIBRO (Teoría pura)
    const map = LenormandAPI.getNavigationMap();
    const traverse = (node) => {
      let nodeText = node.title + " ";
      if (node.content && Array.isArray(node.content)) {
        nodeText += node.content.join(" ");
      }
      if (matchesQuery(nodeText)) {
        newResults.theory.push({
          id: `node-${node.id}`,
          icon: <BookOpen className="w-4 h-4 text-white" />,
          title: node.title,
          subtitle: 'Ir a este capítulo del libro',
          action: () => onNavigate({ viewMode: 'reader', activeNodeId: node.id })
        });
      }
      node.subsections.forEach(traverse);
    };
    map.forEach(traverse);

    // MÓDULOS DE TIRADAS (Práctica)
    const searchModule = (blocks, typeLabel, vMode, IconCmp) => {
      blocks.forEach(b => {
        let blockText = b.title + " " + (b.content || "");
        if (b.exercises) blockText += JSON.stringify(b.exercises);

        if (matchesQuery(blockText)) {
          newResults.practical.push({
            id: `mod-${vMode}-${b.id}`,
            icon: <IconCmp className="w-4 h-4 text-green-400" />,
            title: `${typeLabel}: ${b.title}`,
            subtitle: 'Lección de Práctica Oracular',
            action: () => onNavigate({ viewMode: vMode, scrollTo: b.id })
          });
        }
      });
    };

    searchModule(combinationsBlocks, "Pares", "combinations", Layers);
    searchModule(tripletsBlocks, "Tríadas", "triplets", GalleryHorizontal);
    searchModule(quintetsBlocks, "Quintetos", "quintets", LayoutPanelTop);
    searchModule(ninecardsBlocks, "Malla 3x3", "grid3x3", Hash);
    searchModule(gtBlocks, "GT", "grandTableau", GraduationCap);

    setResults(newResults);
  };

  useEffect(() => {
    const timer = setTimeout(() => searchEverything(query), 300);
    return () => clearTimeout(timer);
  }, [query]);

  const hasResults = results.canonicalNode || results.cards.length > 0 || results.theory.length > 0 || results.practical.length > 0 || results.semanticLinks.length > 0;

  if (!isOpen) return null;

  const renderResultGroup = (title, items, limit = 5) => {
      if (!items || items.length === 0) return null;
      return (
          <div className="mb-6">
              <div className="text-[10px] text-leny-accent uppercase font-bold tracking-widest pl-2 mb-3 opacity-80">{title}</div>
              <div className="flex flex-col gap-2">
                  {items.slice(0, limit).map(r => (
                      <button
                        key={r.id}
                        onClick={() => { r.action(); onClose(); }}
                        className="flex items-center justify-between p-3 rounded-lg bg-white/5 hover:bg-white/10 border border-transparent hover:border-white/10 transition-all text-left group"
                      >
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-lg bg-black/40 border border-white/5 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                            {r.icon}
                          </div>
                          <div>
                            <h4 className="font-serif text-white group-hover:text-leny-accent transition-colors text-base leading-tight">{r.title}</h4>
                            <p className="text-[11px] text-white/50 mt-0.5 line-clamp-1">{r.subtitle}</p>
                          </div>
                        </div>
                        <ArrowRight className="w-4 h-4 text-white/10 group-hover:text-leny-accent transition-all -translate-x-2 group-hover:translate-x-0" />
                      </button>
                  ))}
              </div>
          </div>
      );
  };

  const renderCanonicalNode = () => {
      if (!results.canonicalNode) return null;
      const { concept, primary, secondary, context } = results.canonicalNode;

      return (
          <div className="mb-8 p-1">
              <div className="text-[10px] text-leny-accent uppercase font-bold tracking-widest pl-2 mb-3 opacity-80 flex items-center gap-2">
                  <Sparkles className="w-3 h-3"/> Eje Temático Canónico: {concept}
              </div>
              
              {/* Carta Principal / Regente */}
              <button 
                  onClick={() => { onNavigate({ viewMode: 'cardProfile', activeCardId: primary.id }); onClose(); }}
                  className="w-full relative overflow-hidden bg-gradient-to-br from-red-950/40 via-black to-leny-darker border-l-4 border-l-leny-accent border-y border-r border-white/10 rounded-xl p-5 mb-4 group text-left hover:shadow-[0_0_20px_rgba(205,174,104,0.15)] transition-shadow"
              >
                 <div className="absolute top-0 right-0 p-4 opacity-5 text-6xl rotate-12 transition-transform group-hover:rotate-0">
                     {primary.emoji}
                 </div>
                 <div className="flex items-center gap-4 relative z-10">
                     <div className="w-16 h-16 rounded-xl bg-leny-accent/10 flex items-center justify-center text-4xl drop-shadow-md border border-leny-accent/30 group-hover:scale-105 transition-transform shrink-0">
                         {primary.emoji}
                     </div>
                     <div>
                         <div className="text-xs text-leny-accent mb-0.5 font-bold uppercase tracking-widest">Gobernante Primario</div>
                         <h3 className="text-2xl font-serif text-white leading-none">{primary.name}</h3>
                         <p className="text-xs text-leny-dim mt-2 line-clamp-2 md:line-clamp-none pr-8">
                             {context}
                         </p>
                     </div>
                 </div>
              </button>

              {/* Cartas Secundarias Expandibles */}
              {secondary && secondary.length > 0 && (
                  <div className="bg-black/30 border border-white/5 rounded-xl overflow-hidden">
                      <button 
                          onClick={() => setShowSecondaryCards(!showSecondaryCards)}
                          className="w-full p-4 flex items-center justify-between text-left hover:bg-white/5 transition-colors"
                      >
                          <span className="text-xs font-bold uppercase tracking-widest text-white/50">
                              {showSecondaryCards ? `Ocultar periferia secundaria` : `Mostrar ${secondary.length} cartas periféricas menores`}
                          </span>
                          <ChevronDown className={`w-4 h-4 text-white/40 transition-transform ${showSecondaryCards ? 'rotate-180' : ''}`} />
                      </button>
                      
                      {showSecondaryCards && (
                          <div className="p-4 border-t border-white/5 grid grid-cols-1 sm:grid-cols-2 gap-3 bg-black/20">
                              {secondary.map((c, i) => (
                                  <button
                                      key={c.id}
                                      onClick={() => { onNavigate({ viewMode: 'cardProfile', activeCardId: c.id }); onClose(); }}
                                      className="flex items-center p-3 bg-white/5 hover:bg-white/10 rounded-lg border border-white/5 transition-colors gap-3 justify-start text-left"
                                  >
                                      <div className="w-8 h-8 flex items-center justify-center bg-black/40 rounded text-xl shrink-0 opacity-80">{c.emoji}</div>
                                      <div>
                                          <div className="text-white font-medium text-sm leading-tight">{c.name}</div>
                                          <div className="text-[10px] text-white/40 uppercase">Prioridad {i+2}</div>
                                      </div>
                                  </button>
                              ))}
                          </div>
                      )}
                  </div>
              )}
          </div>
      );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 md:pt-20 px-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200" onClick={onClose}>
      <div 
        className="w-full max-w-3xl bg-leny-darker/95 border border-leny-accent/20 rounded-2xl shadow-2xl flex flex-col max-h-[85vh] overflow-hidden slide-in-from-top-8"
        onClick={e => e.stopPropagation()}
      >
        {/* Barra de input */}
        <div className="p-5 border-b border-white/10 flex items-center gap-4 bg-black/20">
          <Search className="w-7 h-7 text-leny-accent" />
          <input 
            ref={inputRef}
            type="text"
            placeholder="Intenta con 'Enfermedad', 'Trabajo', 'Mentiras'..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 bg-transparent border-none text-white text-xl placeholder:text-white/20 focus:outline-none"
          />
          <button onClick={onClose} className="p-2 hover:bg-red-500/20 text-red-300 rounded-lg transition-colors">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Resultados */}
        <div className="flex-1 overflow-y-auto p-4 md:p-6 custom-scrollbar">
          {query.trim().length < 2 ? (
            <div className="text-center py-20 text-leny-dim space-y-4">
              <Network className="w-12 h-12 mx-auto text-leny-accent/30" />
              <p className="text-base text-white/70">Ontología Semántica Activada</p>
              <p className="opacity-50 text-sm max-w-md mx-auto">Ingresa conceptos filosóficos para descubrir el Gobernante Primario y su periferia energética (ej. "Lentitud").</p>
            </div>
          ) : !hasResults ? (
            <div className="text-center py-20 text-white/40">
              No se hallaron ramificaciones oraculares para "<span className="text-leny-accent font-bold">{query}</span>".
            </div>
          ) : (
            <div className="flex flex-col">
              
              {/* Prioridad 1: Nodo Canónico */}
              {renderCanonicalNode()}

              {/* Grid Secundario */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                <div className="col-span-1">
                    {!results.canonicalNode && renderResultGroup("Catálogo de Cartas", results.cards, 8)}
                    {renderResultGroup("Teoría Teórica de Apoyo", results.theory, 4)}
                </div>
                <div className="col-span-1 border-t md:border-t-0 md:border-l border-white/5 md:pl-8">
                    {renderResultGroup("Ejercicios y Tiradas", results.practical, 6)}
                    {renderResultGroup("Conexiones de Red", results.semanticLinks, 3)}
                </div>
              </div>
              
            </div>
          )}
        </div>
        
        {/* Footer shortcuts */}
        <div className="bg-black/60 px-5 py-3 text-[10px] text-white/30 border-t border-white/10 flex justify-between uppercase font-bold tracking-widest">
           <span>ENTER para abrir nodo</span>
           <span>ESC para finalizar búsqueda</span>
        </div>
      </div>
    </div>
  );
}
