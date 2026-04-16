import React, { useState, useEffect } from 'react';

const PageOutline = ({ sections, scrollContainerRef }) => {
  const [activeSection, setActiveSection] = useState();

  useEffect(() => {
    setActiveSection(sections[0]?.id);
    if (!scrollContainerRef?.current) return;
    
    // Intersection observer para iluminar los puntitos
    const observer = new IntersectionObserver((entries) => {
      const visibleEntries = entries.filter((e) => e.isIntersecting);
      if (visibleEntries.length > 0) {
        // Tomamos el primero visible
        setActiveSection(visibleEntries[0].target.id);
      }
    }, {
      root: scrollContainerRef.current,
      rootMargin: '-10% 0px -70% 0px',
      threshold: 0
    });

    sections.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [sections, scrollContainerRef]);

  const handleScrollTo = (id) => {
    const el = document.getElementById(id);
    if (!el || !scrollContainerRef?.current) return;
    
    // Hacemos el smooth scroll interno dentro del contenedor
    // Calculamos la posición considerando un pequeño margen superior visual
    const top = el.offsetTop - 40; 
    scrollContainerRef.current.scrollTo({
      top: top > 0 ? top : 0,
      behavior: 'smooth'
    });
    setActiveSection(id);
  };

  if (!sections || sections.length === 0) return null;

  return (
    <div className="hidden 2xl:block w-56 shrink-0 sticky top-12 pt-12 self-start border-l border-white/5 pl-6 ml-6 z-20 transition-all-custom">
      <div className="text-[10px] uppercase font-bold tracking-widest text-leny-accent/60 mb-6 flex items-center gap-2">
        <span className="w-4 h-px bg-leny-accent/30 inline-block"></span>
        Navegación
      </div>
      <nav className="flex flex-col gap-4">
        {sections.map(({ id, label }) => {
          const isActive = activeSection === id;
          return (
            <button
              key={id}
              onClick={() => handleScrollTo(id)}
              className={`text-left text-[13px] tracking-wide transition-all duration-300 flex items-center gap-3 group ${isActive ? 'text-leny-accent font-medium' : 'text-leny-dim hover:text-white'}`}
            >
              <div className="w-3 flex justify-center items-center">
                 <span className={`rounded-full transition-all duration-300 ${isActive ? 'w-2 h-2 bg-leny-accent shadow-[0_0_10px_rgba(201,162,39,0.9)]' : 'w-1.5 h-1.5 bg-transparent border border-white/20 group-hover:border-leny-accent group-hover:bg-leny-accent/30'}`} />
              </div>
              <span className="truncate">{label}</span>
            </button>
          );
        })}
      </nav>
    </div>
  );
};

export default PageOutline;
