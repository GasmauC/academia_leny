import React, { useState } from 'react';
import { BookOpen, PenTool, Layout, ChevronRight, ChevronDown, Search } from 'lucide-react';

const getIcons = (activeModule) => {
  const accent = activeModule === 'poker' ? 'text-red-500' : 'text-leny-accent';
  return {
    theory: <BookOpen size={16} strokeWidth={1.5} className={`text-white/40 group-hover:${accent} flex-shrink-0 transition-colors`} />,
    practice: <Layout size={16} strokeWidth={1.5} className={`text-white/40 group-hover:${accent} flex-shrink-0 transition-colors`} />,
    examples: <PenTool size={16} strokeWidth={1.5} className={`text-white/40 group-hover:${accent} flex-shrink-0 transition-colors`} />
  };
};

const TreeNode = ({ node, level, activeNodeId, onSelect, forceOpen, activeModule }) => {
  const [isOpen, setIsOpen] = useState(level < 2);
  const hasChildren = node.subsections && node.subsections.length > 0;
  const isActive = activeNodeId === node.id;
  const isEffectivelyOpen = forceOpen || isOpen;
  const textAccent = activeModule === 'poker' ? 'text-red-500' : 'text-leny-accent';
  const borderAccent = activeModule === 'poker' ? 'border-red-500' : 'border-leny-accent';
  const bgAccent = activeModule === 'poker' ? 'bg-red-500' : 'bg-leny-accent';
  const icons = getIcons(activeModule);

  const handleToggle = (e) => {
    e.stopPropagation();
    if (hasChildren) setIsOpen(!isOpen);
    else onSelect(node);
  };

  // Nivel 1: Capítulos (Gran jerarquía, Sans)
  if (level === 1) {
    return (
      <div className="mb-2.5">
        <div 
          onClick={() => {
            onSelect(node);
            if (hasChildren && !isOpen) setIsOpen(true);
          }}
          className={`flex items-center gap-3 py-3 px-3 cursor-pointer transition-all duration-300 group font-sans border-l-[3px] rounded-r-lg
            ${isActive 
              ? `${borderAccent} bg-white/[0.03]` 
              : 'border-transparent hover:border-white/10'
            }`}
        >
          <div className="flex-shrink-0">
            {icons[node.type] || <BookOpen size={15} strokeWidth={1} className={`transition-colors ${isActive ? textAccent : 'text-white/30 group-hover:text-white/60'}`} />}
          </div>
          
          <div className="flex-1">
            <h3 className={`font-sans text-[14px] leading-snug tracking-wide transition-colors ${isActive ? 'text-white font-semibold drop-shadow-md' : 'text-white/60 group-hover:text-white/90 font-medium'}`}>
              {node.title}
            </h3>
          </div>
          
          {hasChildren && (
            <div onClick={handleToggle} className={`p-1 rounded-full transition-colors cursor-pointer flex-shrink-0 ${isActive ? `${textAccent} opacity-80` : 'text-white/30 hover:text-white/60'}`}>
              {isEffectivelyOpen ? <ChevronDown size={16} strokeWidth={1.5} /> : <ChevronRight size={16} strokeWidth={1.5} />}
            </div>
          )}
        </div>

        {/* Subcapítulos Expandibles */}
        <div className={`overflow-hidden transition-all duration-500 ease-in-out ${isEffectivelyOpen ? 'max-h-[2500px] opacity-100 mt-1' : 'max-h-0 opacity-0'}`}>
          <div className="ml-5 pl-4 border-l border-white/5 space-y-0.5 py-1">
            {hasChildren && node.subsections.map(child => (
              <TreeNode 
                key={child.id} 
                node={child} 
                level={2} 
                activeNodeId={activeNodeId}
                onSelect={onSelect}
                forceOpen={forceOpen}
                activeModule={activeModule}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Nivel 2 o Mayor: Secciones Internas
  return (
    <div>
      <div 
        onClick={() => {
          onSelect(node);
          if (hasChildren && !isOpen) setIsOpen(true);
        }}
        className={`group flex items-center justify-between py-1.5 pl-3 pr-2 cursor-pointer transition-all duration-300 border-l-[3px] rounded-r-lg
          ${isActive 
            ? `${borderAccent} bg-white/[0.02]` 
            : 'border-transparent hover:border-white/10'
          }`}
      >
        <div className="flex items-center gap-2.5 w-full">
          <div className={`w-1.5 h-1.5 rounded-full flex-shrink-0 transition-all duration-300 ${isActive ? `${bgAccent} ${activeModule === 'poker' ? 'shadow-[0_0_8px_rgba(220,38,38,0.6)]' : 'shadow-[0_0_8px_rgba(205,174,104,0.6)]'}` : 'bg-white/20 group-hover:bg-white/60'}`}></div>
          <span className={`text-[12.5px] leading-relaxed pr-2 font-sans transition-colors ${isActive ? 'text-white font-medium text-shadow-sm' : 'text-white/50 group-hover:text-white/80'}`}>
            {node.title}
          </span>
        </div>
        
        {hasChildren && (
          <div onClick={handleToggle} className={`p-1 cursor-pointer flex-shrink-0 transition-colors ${isActive ? `${textAccent}/80` : 'text-white/30 hover:text-white'}`}>
            {isEffectivelyOpen ? <ChevronDown size={14} strokeWidth={1} /> : <ChevronRight size={14} strokeWidth={1} />}
          </div>
        )}
      </div>

      {/* Subsecciones Nivel 3 */}
      {hasChildren && (
        <div className={`overflow-hidden transition-all duration-500 ease-in-out ${isEffectivelyOpen ? 'max-h-[1500px] opacity-100 mt-0.5' : 'max-h-0 opacity-0'}`}>
          <div className="ml-4 pl-3 border-l border-white/5 space-y-0.5">
            {node.subsections.map(child => (
              <TreeNode 
                key={child.id} 
                node={child} 
                level={level + 1} 
                activeNodeId={activeNodeId}
                onSelect={onSelect}
                forceOpen={forceOpen}
                activeModule={activeModule}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const Sidebar = ({ navigationMap, activeNodeId, onSelectNode, isSidebarOpen, activeModule = 'lenormand' }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const filterTree = (nodes, query) => {
    if (!query) return nodes;
    const lowerQuery = query.toLowerCase();

    return nodes.reduce((filtered, node) => {
      // 1. Revisa coincidencia en el título
      const titleMatches = node.title && node.title.toLowerCase().includes(lowerQuery);
      
      // 2. Revisa coincidencia en los contenidos (búsqueda predictiva dentro de los párrafos)
      const contentMatches = node.content && node.content.some(c => typeof c === 'string' && c.toLowerCase().includes(lowerQuery));
      
      const isMatch = titleMatches || contentMatches;

      // 3. Evalúa los hijos recursivamente
      const filteredChildren = filterTree(node.subsections || [], query);

      if (isMatch || filteredChildren.length > 0) {
        filtered.push({
          ...node,
          subsections: filteredChildren.length > 0 ? filteredChildren : node.subsections // Mantiene intactos los hijos si el match es del padre
        });
      }
      return filtered;
    }, []);
  };

  const filteredTree = filterTree(navigationMap, searchQuery);
  const isSearching = searchQuery.trim().length > 0;

  return (
    <div className={`fixed inset-y-0 left-0 bg-[#05070a] w-72 md:w-[280px] transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 z-20 flex flex-col md:translate-x-0 md:static shadow-sm md:shadow-none`}>
      <div className="p-6 pb-2 border-transparent flex flex-col shrink-0 mt-2 gap-4">
        <h2 className="font-serif text-[18px] text-white/90 font-medium leading-relaxed tracking-wider">La Biblia<br/><span className={`italic ${activeModule === 'poker' ? 'text-red-500' : 'text-leny-accent'} text-2xl`}>{activeModule === 'poker' ? 'Póker' : 'Lenormand'}</span></h2>
        
        {/* Buscador Interno Interactivo */}
        <div className="relative group">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search size={14} className={`text-white/30 group-focus-within:${activeModule === 'poker' ? 'text-red-500' : 'text-leny-accent'} transition-colors`} />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar en el libro..."
            className={`w-full bg-[#0a0d14] border border-white/10 rounded-lg py-2 pl-9 pr-3 text-xs text-white placeholder-white/30 focus:outline-none focus:border-${activeModule === 'poker' ? 'red-500/50' : 'leny-accent/50'} focus:bg-white/5 transition-all`}
          />
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
        {filteredTree.length > 0 ? (
          filteredTree.map(node => (
            <TreeNode 
              key={node.id} 
              node={node} 
              level={1} 
              activeNodeId={activeNodeId}
              onSelect={onSelectNode}
              forceOpen={isSearching}
              activeModule={activeModule}
            />
          ))
        ) : (
          <div className="text-center py-10 px-4">
            <Search className="w-8 h-8 text-white/10 mx-auto mb-3" />
            <p className="text-xs text-white/40 font-sans">No se encontraron resultados para "{searchQuery}"</p>
          </div>
        )}
        
        {/* Espacio final por el scroll */}
        <div className="h-16"></div>
      </div>
    </div>
  );
};

export default Sidebar;
