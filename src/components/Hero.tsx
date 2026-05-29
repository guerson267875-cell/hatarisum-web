import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CursorState } from '../types';

interface HeroProps {
  setCursorState: React.Dispatch<React.SetStateAction<CursorState>>;
}

export default function Hero({ setCursorState }: HeroProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleHover = (entering: boolean, text?: string) => {
    if (entering) {
      setCursorState({ type: 'view', text: text || 'IR →' });
    } else {
      setCursorState({ type: 'default' });
    }
  };

  // Titulares rotativos. La palabra entre {} se resalta en dorado.
  const phrases = [
    'Levantémonos {juntos}',
    'Tu casa, {ladrillo} a ladrillo',
    'Precio de {millar} para tu barrio',
  ];

  const subs = [
    'Juntamos a tu comunidad para que el ladrillo cueste lo justo.',
    'Organizamos la junta vecinal; tú levantas tu pared.',
    'Distribuidor de Ladrillera Oro Rojo en Arequipa.',
  ];

  const navItems = [
    { label: 'CÓMO FUNCIONA', href: '#services' },
    { label: 'PROPÓSITO', href: '#manifesto' },
    { label: 'CATÁLOGO', href: '#catalogo' },
    { label: 'COBERTURA', href: '#collective' },
    { label: 'CONTACTO', href: '#contact' },
  ];

  // Auto-rotación cada 4.5s
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % phrases.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [phrases.length]);

  const currentPhrase = phrases[activeIndex];
  const currentSub = subs[activeIndex];

  // Resalta en dorado la palabra entre llaves {}
  const renderHighlighted = (text: string) => {
    const parts = text.split(/(\{[^}]+\})/g);
    return (
      <>
        {parts.map((part, i) => {
          if (part.startsWith('{') && part.endsWith('}')) {
            return (
              <span key={i} className="text-[#D4A24C]">
                {part.slice(1, -1)}
              </span>
            );
          }
          return <React.Fragment key={i}>{part}</React.Fragment>;
        })}
      </>
    );
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen w-full flex flex-col justify-between pt-32 pb-16 px-6 md:px-12 select-none overflow-hidden"
    >

      {/* Navegación vertical superior derecha */}
      <div className="absolute top-[120px] right-[24px] md:right-[48px] text-right z-30 flex flex-col space-y-2.5">
        {navItems.map((item, index) => (
          <a
            key={index}
            href={item.href}
            onMouseEnter={() => handleHover(true, 'IR →')}
            onMouseLeave={() => handleHover(false)}
            className="text-[11px] font-sans font-light tracking-[0.25em] text-hueso/50 hover:text-white transition-all duration-300 transform hover:translate-x-[-4px] cursor-none block"
          >
            {item.label}
          </a>
        ))}
      </div>

      {/* Tipografía principal con slider */}
      <div className="flex-1 flex flex-col justify-center items-center text-center px-4">
        <div className="min-h-[160px] sm:min-h-[220px] md:min-h-[280px] flex flex-col items-center justify-center w-full max-w-5xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, y: 35 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -25 }}
              transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col items-center"
            >
              <h1 className="text-[34px] sm:text-[50px] md:text-[70px] lg:text-[78px] font-display font-extrabold tracking-tight text-hueso leading-[1.08]">
                {renderHighlighted(currentPhrase)}
              </h1>

              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.3 }}
                className="text-sm md:text-base font-sans font-light text-hueso/60 max-w-md mt-6 tracking-wide leading-relaxed"
              >
                {currentSub}
              </motion.p>
            </motion.div>
          </AnimatePresence>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="flex flex-col sm:flex-row items-center gap-3 mt-10"
          >
            <a
              href="#services"
              onMouseEnter={() => handleHover(true, 'VER')}
              onMouseLeave={() => handleHover(false)}
              className="cursor-none bg-[#B8442A] hover:bg-[#D4593A] text-white text-xs font-mono tracking-widest uppercase px-6 py-3.5 rounded-full transition-colors duration-200"
            >
              Arma tu junta vecinal
            </a>
            <a
              href="#catalogo"
              onMouseEnter={() => handleHover(true, 'VER')}
              onMouseLeave={() => handleHover(false)}
              className="cursor-none border border-white/15 hover:border-[#D4A24C] text-hueso/80 hover:text-white text-xs font-mono tracking-widest uppercase px-6 py-3.5 rounded-full transition-colors duration-200"
            >
              Ver catálogo
            </a>
          </motion.div>
        </div>
      </div>

      {/* Pie del hero */}
      <div className="w-full flex items-end justify-between max-w-7xl mx-auto mt-auto">

        {/* Sello giratorio "baja" */}
        <div className="relative group cursor-none">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 12, ease: "linear" }}
            className="w-24 h-24 md:w-28 md:h-28 text-hueso/40 group-hover:text-white transition-colors duration-300"
          >
            <svg viewBox="0 0 100 100" className="w-full h-full">
              <defs>
                <path
                  id="textPath"
                  d="M 50, 50 m -35, 0 a 35,35 0 1,1 70,0 a 35,35 0 1,1 -70,0"
                />
              </defs>
              <text className="font-mono text-[6.5px] uppercase fill-current tracking-[0.25em]">
                <textPath href="#textPath" startOffset="0%">
                  • baja para ver más • baja para ver más
                </textPath>
              </text>
            </svg>
          </motion.div>
          {/* Anillos centrales */}
          <div className="absolute inset-0 flex items-center justify-center opacity-40 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
            <svg viewBox="0 0 40 40" className="w-8 h-8 fill-none stroke-[#D4A24C]" strokeWidth="1.2">
              <circle cx="16" cy="20" r="8" />
              <circle cx="24" cy="20" r="8" />
            </svg>
          </div>
        </div>

        {/* Texto decorativo */}
        <div className="text-[10px] font-mono tracking-widest text-hueso/20 uppercase hidden sm:block">
          arequipa • perú
        </div>

      </div>

    </section>
  );
}
