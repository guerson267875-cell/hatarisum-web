import React from 'react';
import { CursorState } from '../types';
import Wordmark from './Wordmark';

interface HeaderProps {
  setCursorState: React.Dispatch<React.SetStateAction<CursorState>>;
}

export default function Header({ setCursorState }: HeaderProps) {
  const handleHover = (entering: boolean) => {
    setCursorState(entering ? { type: 'hover' } : { type: 'default' });
  };

  return (
    <header
      id="main-app-header"
      className="fixed top-0 left-0 right-0 z-40 bg-transparent transition-all duration-300 py-6 px-6 md:px-12 pointer-events-none"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between pointer-events-auto">

        {/* LOGO — Wordmark Hatarisum */}
        <a
          href="#app-root-container"
          id="header-logo"
          className="hover:opacity-80 transition-opacity cursor-none"
          onMouseEnter={() => handleHover(true)}
          onMouseLeave={() => handleHover(false)}
        >
          <Wordmark className="h-9 md:h-11" />
        </a>

        {/* CTA de contacto */}
        <a
          href="#contact"
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
