import React, { useEffect, useState } from 'react';
import { CursorState } from '../types';
import { waLink } from '../data/contacto';
import Wordmark from './Wordmark';

interface HeaderProps {
  setCursorState: React.Dispatch<React.SetStateAction<CursorState>>;
}

export default function Header({ setCursorState }: HeaderProps) {
  // Al bajar, el encabezado toma fondo para no montarse sobre el contenido
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleHover = (entering: boolean) => {
    setCursorState(entering ? { type: 'hover' } : { type: 'default' });
  };

  return (
    <header
      id="main-app-header"
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 px-6 md:px-12 pointer-events-none border-b ${
        scrolled
          ? 'py-3 bg-[#070E1A]/85 backdrop-blur-xl border-white/[0.06]'
          : 'py-6 bg-transparent border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between pointer-events-auto">

        {/* LOGO — Wordmark Hatarisum */}
        <a
          href="#app-root-container"
          id="header-logo"
          aria-label="Hatarisum, volver al inicio"
          className="hover:opacity-80 transition-opacity cursor-none"
          onMouseEnter={() => handleHover(true)}
          onMouseLeave={() => handleHover(false)}
        >
          <Wordmark
            className={`transition-all duration-300 ${
              scrolled
                ? 'text-[clamp(1.3rem,1rem+1.4vw,1.9rem)]'
                : 'text-[clamp(1.6rem,1.1rem+2.2vw,2.5rem)]'
            }`}
          />
        </a>

        {/* CTA de contacto */}
        <a
          href={waLink('Hola Hatarisum, quiero cotizar ladrillo.')}
          target="_blank"
          rel="noopener noreferrer"
          onMouseEnter={() => handleHover(true)}
          onMouseLeave={() => handleHover(false)}
          className="cursor-none text-[10px] md:text-[11px] font-mono tracking-[0.18em] uppercase text-hueso/80 hover:text-white border border-white/15 hover:border-[#D4A24C] rounded-full px-4 py-2 transition-colors duration-200"
        >
          Cotizar
        </a>

      </div>
    </header>
  );
}
