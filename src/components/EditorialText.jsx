import React from 'react';

/**
 * EditorialText
 * Convierte strings crudos (con sintaxis estilo Markdown: **, -, 1., >) 
 * en componentes React con la identidad corporativa de Academia Leny (modo oscuro, dorado).
 */
export default function EditorialText({ text, className = '' }) {
  if (!text || typeof text !== 'string') return null;

  // Separar el texto en bloques usando dobles saltos de línea (\n\n)
  const blocks = text.split(/\n\n+/);

  return (
    <div className={`space-y-6 ${className}`}>
      {blocks.map((block, bIdx) => {
        const trimmed = block.trim();
        if (!trimmed) return null;

        // 1. Detección de Blockquotes (Citas o Notas)
        if (trimmed.startsWith('>')) {
          const content = trimmed.split('\n').map(line => line.replace(/^>\s?/, '')).join(' ');
          return (
            <blockquote key={bIdx} className="p-5 my-6 bg-gradient-to-r from-leny-accent/10 to-transparent border-l-4 border-leny-accent rounded-r-xl shadow-sm italic text-white/90">
              {parseInlineRules(content)}
            </blockquote>
          );
        }

        // 2. Detección de Listas con Viñetas (Bullets)
        if (trimmed.startsWith('- ')) {
          const items = trimmed.split('\n').filter(line => line.trim().startsWith('- '));
          return (
            <ul key={bIdx} className="space-y-3 pl-2 my-6">
              {items.map((item, iIdx) => {
                const content = item.replace(/^- /, '').trim();
                return (
                  <li key={iIdx} className="flex items-start gap-4">
                    <span className="w-1.5 h-1.5 rounded-full bg-leny-accent flex-shrink-0 mt-2.5 shadow-[0_0_8px_rgba(205,174,104,0.6)]"></span>
                    <span className="flex-1 leading-relaxed text-white/80">{parseInlineRules(content)}</span>
                  </li>
                );
              })}
            </ul>
          );
        }

        // 3. Detección de Listas Numeradas (1. , 2. )
        if (trimmed.match(/^\d+\.\s/)) {
          const items = trimmed.split('\n').filter(line => line.trim().match(/^\d+\.\s/));
          return (
            <ol key={bIdx} className="space-y-4 pl-2 my-6">
              {items.map((item, iIdx) => {
                const match = item.match(/^(\d+)\.\s(.*)/);
                if (!match) return null;
                const num = match[1];
                const content = match[2].trim();
                return (
                  <li key={iIdx} className="flex items-start gap-3">
                    <span className="text-leny-accent font-serif font-bold min-w-[24px] mt-0.5">{num}.</span>
                    <span className="flex-1 leading-relaxed text-white/80">{parseInlineRules(content)}</span>
                  </li>
                );
              })}
            </ol>
          );
        }

        // 4. Detección de Títulos Menores (###) o Mayúsculas estrictas cortas
        if (trimmed.startsWith('### ')) {
          return (
            <h4 key={bIdx} className="text-xl font-serif text-leny-accent mt-8 mb-4">
              {parseInlineRules(trimmed.replace(/^###\s/, ''))}
            </h4>
          );
        }

        // 5. Párrafo Normal con espaciado amplio
        return (
          <p key={bIdx} className="leading-relaxed text-white/70 whitespace-pre-line text-[15px] sm:text-base">
            {parseInlineRules(trimmed)}
          </p>
        );
      })}
    </div>
  );
}

// Función auxiliar para detectar Negritas (**...**) y Cursivas (*...* o _..._) en línea.
function parseInlineRules(text) {
  // Regex para atrapar **negrita**
  const parts = text.split(/(\*\*.*?\*\*|\*.*?\*)/g);
  
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      const inner = part.slice(2, -2);
      return <strong key={i} className="font-bold text-white tracking-wide">{inner}</strong>;
    }
    if (part.startsWith('*') && part.endsWith('*')) {
      const inner = part.slice(1, -1);
      return <em key={i} className="italic text-leny-accent/90">{inner}</em>;
    }
    return part;
  });
}
