import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowUpRight, X } from 'lucide-react';

import BackgroundCanvas from './components/BackgroundCanvas';
import CustomCursor from './components/CustomCursor';
import Header from './components/Header';
import Hero from './components/Hero';
import Manifesto from './components/Manifesto';
import Catalogo from './components/Catalogo';
import Services from './components/Services';
import Collective from './components/Collective';
import Contact from './components/Contact';
import Wordmark from './components/Wordmark';
import IntroLoader from './components/IntroLoader';
import { CursorState } from './types';

export default function App() {
  // Custom Cursor Status
  const [cursorState, setCursorState] = useState<CursorState>({ type: 'default' });

  // Cookie banner visibility status
  const [showCookieBanner, setShowCookieBanner] = useState(true);

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

        {/* PROPÓSITO / MANIFIESTO */}
        <Manifesto setCursorState={setCursorState} />

        {/* CATÁLOGO DE LADRILLO ORO ROJO */}
        <Catalogo setCursorState={setCursorState} />

        {/* CÓMO FUNCIONA (comunitaria vs B2B) */}
        <Services setCursorState={setCursorState} />

        {/* COBERTURA Y RESPALDO */}
        <Collective setCursorState={setCursorState} />

        {/* CONTACTO */}
        <Contact setCursorState={setCursorState} />

      </main>

      {/* FOOTER */}
      <footer
        id="app-master-footer"
        className="relative z-10 border-t border-white/[0.04] bg-[#070E1A]/95 backdrop-blur-md py-16 px-6 md:px-12 select-none"
      >
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 items-start">

          {/* Columna del wordmark + tagline */}
          <div className="col-span-12 md:col-span-6 space-y-4">
            <Wordmark className="h-7" />
            <p className="text-zinc-400 text-xs font-light max-w-sm leading-relaxed">
              Distribuidora de ladrillo en Arequipa. Juntamos a tu comunidad para comprar a precio de
              millar y atendemos a contratistas como distribuidor de Ladrillera Oro Rojo.
            </p>
          </div>

          {/* Columna de créditos + volver arriba */}
          <div className="col-span-12 md:col-span-6 md:text-right flex flex-col md:items-end justify-between h-full space-y-6 md:space-y-0">
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
        <div className="max-w-7xl mx-auto border-t border-white/[0.04] mt-12 pt-8 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 text-zinc-600 font-mono text-[9px]">
          <span>© {new Date().getFullYear()} Hatarisum. Levantémonos juntos.</span>
          <span className="text-zinc-500 text-center md:text-right">
            Distribuidor de Ladrillera Oro Rojo — Arequipa, Perú.
          </span>
        </div>
      </footer>

      {/* BANNER DE COOKIES */}
      <AnimatePresence>
        {showCookieBanner && (
          <motion.div
            id="floating-cookie-banner"
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: 1 }}
            className="fixed bottom-6 right-6 z-50 max-w-sm bg-[#070E1A]/80 border border-white/[0.08] backdrop-blur-xl p-4 rounded-xl shadow-2xl flex items-center justify-between space-x-4 select-none"
          >
            <div className="text-[11px] text-zinc-300 font-sans font-light leading-snug">
              Usamos cookies para que tu visita funcione mejor.{' '}
              <a
                href="#privacy"
                onMouseEnter={() => handleCursorHover(true)}
                onMouseLeave={() => handleCursorHover(false)}
                className="underline hover:text-white cursor-none ml-1 text-zinc-400"
              >
                Política de privacidad
              </a>
            </div>

            <div className="flex items-center space-x-3 shrink-0">
              <button
                onClick={() => setShowCookieBanner(false)}
                onMouseEnter={() => handleCursorHover(true)}
                onMouseLeave={() => handleCursorHover(false)}
                className="cursor-none px-4 py-2 bg-[#B8442A] text-white rounded-full text-[11px] font-sans font-medium hover:bg-[#D4593A] transition-colors duration-200"
              >
                Aceptar
              </button>

              <button
                onClick={() => setShowCookieBanner(false)}
                onMouseEnter={() => handleCursorHover(true)}
                onMouseLeave={() => handleCursorHover(false)}
                className="cursor-none text-zinc-400 hover:text-white p-1 transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
