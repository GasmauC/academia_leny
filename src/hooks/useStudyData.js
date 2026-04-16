import { useState, useEffect } from 'react';

// Estructura de item para history y bookmarks:
// { id: 'unico', type: 'reader'|'card'|'theory'|'exercise', title: 'Nombre', subtitle: 'Para info extra', path: { viewMode: 'reader', activeNodeId: '1.2' } }

export function useStudyData() {
  const [bookmarks, setBookmarks] = useState(() => {
    try { return JSON.parse(localStorage.getItem('leny_bookmarks')) || []; } 
    catch(e) { return [] }
  });
  
  const [history, setHistory] = useState(() => {
    try { return JSON.parse(localStorage.getItem('leny_history')) || []; } 
    catch(e) { return [] }
  });

  const [readNodes, setReadNodes] = useState(() => {
    try { return JSON.parse(localStorage.getItem('leny_read_nodes')) || []; } 
    catch(e) { return [] }
  });

  // Guardar en localStorage cuando cambian
  useEffect(() => { localStorage.setItem('leny_bookmarks', JSON.stringify(bookmarks)); }, [bookmarks]);
  useEffect(() => { localStorage.setItem('leny_history', JSON.stringify(history)); }, [history]);
  useEffect(() => { localStorage.setItem('leny_read_nodes', JSON.stringify(readNodes)); }, [readNodes]);

  const toggleBookmark = (item) => {
    if (!item || !item.id) return;
    setBookmarks(prev => {
      const exists = prev.find(b => b.id === item.id);
      if (exists) return prev.filter(b => b.id !== item.id);
      return [{...item, savedAt: Date.now()}, ...prev];
    });
  };

  const isBookmarked = (id) => bookmarks.some(b => b.id === id);

  const addToHistory = (item) => {
    if (!item || !item.id) return;
    setHistory(prev => {
      // Remover si ya existe para subirlo al tope
      const filtered = prev.filter(h => h.id !== item.id);
      const newHistory = [{...item, visitedAt: Date.now()}, ...filtered];
      // Mantener solo los últimos 20 visitados
      return newHistory.slice(0, 20);
    });
  };

  const markNodeAsRead = (nodeId) => {
    if (!nodeId) return;
    setReadNodes(prev => {
      if (prev.includes(nodeId)) return prev;
      return [...prev, nodeId];
    });
  };

  const clearHistory = () => setHistory([]);

  return {
    bookmarks,
    toggleBookmark,
    isBookmarked,
    history,
    addToHistory,
    clearHistory,
    readNodes,
    markNodeAsRead
  };
}
