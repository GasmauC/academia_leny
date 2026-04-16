import dbData from './db/lenormand_book.json';
import cardsTheory from './db/lenormand_cards_theory.json';

// Caché del mapa maestro para la navegación app
let cachedMap = null;

export const generateNavigationTree = () => {
  let idCounter = 1;

  // Procesador recursivo de nodos del JSON para asignar Ids únicos
  const processNode = (node, currentLevel) => {
    let subsectionsToProcess = node.subsections || [];

    return {
      id: `node-${idCounter++}`,
      title: node.title,
      type: 'theory',
      level: currentLevel,
      content: node.content || [],
      subsections: subsectionsToProcess.map(sub => processNode(sub, currentLevel + 1))
    };
  };

  // 3. Distribución del libro manteniendo el índice real (level 0 del JSON)
  return dbData.subsections.map(n => processNode(n, n.level !== undefined ? n.level : 1));
};

export const LenormandAPI = {
  getDatabase: () => dbData,
  
  /**
   * Obtiene el árbol didáctico completo (Mapa Maestro Modular)
   */
  getNavigationMap: () => {
    if (!cachedMap) {
      cachedMap = generateNavigationTree();
    }
    return cachedMap;
  },

  /**
   * Calcula estadísticas precisas sobre cuántos temas contiene cada módulo
   */
  getStats: () => {
    const map = LenormandAPI.getNavigationMap();
    let totalNodes = 0;
    let counts = { theory: 0, practice: 0, examples: 0 };
    
    const count = (node) => {
      // Contar solo nodos que tengan contenido real para reflejar el volumen de estudio verdadero
      if (node.content && node.content.length > 0) {
        totalNodes++;
        if (counts[node.type] !== undefined) counts[node.type]++;
      }
      node.subsections.forEach(count);
    };
    
    map.forEach(count);
    
    // Si la lectura en bruto da números bajos (algunos nodos son solo contenedores), 
    // contamos todos independientemente.
    if (totalNodes < 50) {
      totalNodes = 0; counts = { theory: 0, practice: 0, examples: 0 };
      const countAll = (node) => {
        totalNodes++;
        if (counts[node.type] !== undefined) counts[node.type]++;
        node.subsections.forEach(countAll);
      };
      map.forEach(countAll);
    }

    return { totalNodes, counts };
  }
};

export default LenormandAPI;
