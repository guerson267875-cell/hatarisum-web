import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';

import BackgroundCanvas from './components/BackgroundCanvas';
import CustomCursor from './components/CustomCursor';
import Header from './components/Header';
import Hero from './components/Hero';
import Precios from './components/Precios';
import ComoComprar from './components/ComoComprar';
import Fabrica from './components/Fabrica';
import Contact from './components/Contact';
import Wordmark from './components/Wordmark';
import IntroLoader from './components/IntroLoader';
import { CursorState } from './types';
import { waLink, WHATSAPP_VISIBLE } from './data/contacto';

export default function App() {
  // Custom Cursor Status
  const [cursorState, setCursorState] = useState<CursorState>({ type: 'default' });

  const handleCursorHover = (entering: boolean) => {
    setCursorState(entering ? { type: 'hover' } : { type: 'default' });
  };

  return (
    <div
      id="app-root-container"
      className="relative min-h-screen text-hueso font-sans overflow-x-hidden selection:bg-[#B8442A]/35 selection:text-white custom-cursor-hover"
    >
      {/* Pantalla de intro / loader */}
      <IntroLoader onComplete={() => {}} />

      {/* Cursor interactivo con estela */}
      <CustomCursor cursorState={cursorState} />

      {/* Fondo fluido animado (WebGL + fallback CSS) */}
      <BackgroundCanvas />

      {/* Navegación superior persistente */}
      <Header setCursorState={setCursorState} />

      {/* Wrapper de secciones */}
      <main id="scroll-main-wrapper" className="relative z-10">

        {/* HERO */}
        <Hero setCursorState={setCursorState} />

        {/* PRECIOS (en planta y puesto en obra) */}
        <Precios setCursorState={setCursorState} />

        {/* CÓMO COMPRAR (planta / obra, pasos y perfiles) */}
        <ComoComprar setCursorState={setCursorState} />

        {/* NUESTRA FÁBRICA (una sola casa) */}
        <Fabrica setCursorState={setCursorState} />

        {/* CONTACTO */}
        <Contact setCursorState={setCursorState} />

      </main>

      {/* FOOTER */}
      <footer
        id="app-master-footer"
        className="relative z-10 border-t border-white/[0.04] bg-[#070E1A]/95 backdrop-blur-md pt-16 pb-28 md:pb-16 px-6 md:px-12 select-none"
      >
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 items-start">

          {/* Columna del wordmark + tagline */}
          <div className="md:col-span-6 space-y-4">
            <Wordmark className="text-[clamp(1.35rem,1rem+1.6vw,2rem)]" showTagline />
            <p className="text-zinc-400 text-xs font-light max-w-sm leading-relaxed">
              Hatarisum vende el ladrillo de nuestra fábrica, Oro Rojo, en Arequipa. Precio de fábrica,
              en planta o puesto en tu obra.
            </p>
          </div>

          {/* Columna de contacto + volver arriba */}
          <div className="md:col-span-6 md:text-right flex flex-col md:items-end gap-4">
            <a
              href={waLink()}
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={() => handleCursorHover(true)}
              onMouseLeave={() => handleCursorHover(false)}
              className="font-mono text-xs text-hueso/80 hover:text-white tracking-widest cursor-none"
            >
              WhatsApp {WHATSAPP_VISIBLE}
            </a>
            <span className="font-mono text-[9px] text-zinc-500 tracking-widest uppercase">
              Arequipa • Perú
            </span>

            <a
              href="#app-root-container"
              onMouseEnter={() => handleCursorHover(true)}
              onMouseLeave={() => handleCursorHover(false)}
              className="inline-flex items-center space-x-1.5 text-[10px] font-mono tracking-widest text-dorado hover:text-white transition-colors cursor-none"
            >
              <span>VOLVER ARRIBA</span>
              <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>
        </div>

        {/* Barra de copyright */}
        <div className="max-w-7xl mx-auto border-t border-white/[0.04] mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-zinc-600 font-mono text-[9px] text-center">
          <span>© {new Date().getFullYear()} Hatarisum. Levantémonos juntos.</span>
          <span className="text-zinc-500 md:text-right">
            Nuestra fábrica: Oro Rojo • Arequipa, Perú
          </span>
        </div>
      </footer>

      {/* BOTÓN FLOTANTE DE WHATSAPP */}
      <motion.a
        href={waLink('Hola Hatarisum, quiero cotizar ladrillo.')}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Escríbenos por WhatsApp al ${WHATSAPP_VISIBLE}`}
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, delay: 3.2 }}
        onMouseEnter={() => handleCursorHover(true)}
        onMouseLeave={() => handleCursorHover(false)}
        className="cursor-none fixed bottom-5 right-5 md:bottom-8 md:right-8 z-50 h-14 w-14 rounded-full bg-[#B8442A] hover:bg-[#D4593A] shadow-[0_8px_30px_rgba(184,68,42,0.45)] flex items-center justify-center transition-colors"
      >
        <svg viewBox="0 0 24 24" className="h-7 w-7 fill-white" aria-hidden="true">
          <path d="M17.47 14.38c-.3-.15-1.75-.86-2.02-.96-.27-.1-.47-.15-.67.15-.2.3-.77.96-.94 1.16-.17.2-.35.22-.64.07-.3-.15-1.25-.46-2.38-1.47-.88-.78-1.47-1.75-1.64-2.05-.17-.3-.02-.46.13-.6.13-.14.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.67-1.6-.92-2.2-.24-.58-.49-.5-.67-.5h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48 0 1.46 1.07 2.88 1.21 3.07.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.7.63.71.22 1.36.19 1.87.12.57-.09 1.75-.72 2-1.41.25-.69.25-1.29.17-1.41-.07-.12-.27-.2-.57-.35zM12.05 21.5h-.01a9.4 9.4 0 0 1-4.79-1.31l-.34-.2-3.56.93.95-3.47-.22-.36a9.42 9.42 0 0 1-1.44-5.02c0-5.2 4.24-9.44 9.45-9.44a9.4 9.4 0 0 1 6.68 2.77 9.38 9.38 0 0 1 2.76 6.68c0 5.21-4.24 9.44-9.44 9.44zm8.04-17.48A11.3 11.3 0 0 0 12.05.68C5.78.68.68 5.78.68 12.05c0 2 .52 3.96 1.52 5.68L.58 23.62l6.03-1.58a11.33 11.33 0 0 0 5.43 1.38h.01c6.27 0 11.37-5.1 11.37-11.37 0-3.04-1.18-5.9-3.33-8.03z" />
        </svg>
      </motion.a>
    </div>
  );
}
