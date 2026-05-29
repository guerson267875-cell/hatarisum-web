import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring, AnimatePresence } from 'motion/react';
import { CursorState } from '../types';

interface CustomCursorProps {
  cursorState: CursorState;
}

// Tonos de ladrillo (terracota de marca)
const TONOS = ['#D4593A', '#B8442A', '#8A3320'];

// Ladrillos que componen la "explosión" al hacer clic.
// home = posición de reposo (forma de flecha); dx/dy/rot = hacia dónde cae cada uno.
const ESCOMBROS = [
  { x: 1, y: 0, w: 7, h: 4.5, dx: -22, dy: 70, rot: -120 },
  { x: 1, y: 5, w: 7, h: 4.5, dx: -30, dy: 88, rot: 90 },
  { x: 2, y: 10, w: 8, h: 4.5, dx: -14, dy: 96, rot: -60 },
  { x: 3, y: 15, w: 9, h: 4.5, dx: -8, dy: 110, rot: 150 },
  { x: 4, y: 20, w: 8, h: 4.5, dx: 6, dy: 120, rot: -200 },
  { x: 9, y: 9, w: 7, h: 4.5, dx: 20, dy: 80, rot: 130 },
  { x: 11, y: 14, w: 8, h: 4.5, dx: 30, dy: 92, rot: -90 },
  { x: 13, y: 19, w: 8, h: 4.5, dx: 40, dy: 104, rot: 110 },
  { x: 8, y: 24, w: 8, h: 4.5, dx: 16, dy: 130, rot: -160 },
  { x: 15, y: 24, w: 9, h: 4.5, dx: 52, dy: 116, rot: 200 },
  { x: 17, y: 29, w: 8, h: 4.5, dx: 60, dy: 128, rot: -130 },
  { x: 6, y: 29, w: 8, h: 4.5, dx: 4, dy: 140, rot: 80 },
];

export default function CustomCursor({ cursorState }: CustomCursorProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [boomId, setBoomId] = useState(0);
  const [exploding, setExploding] = useState(false);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Spring muy ágil: la punta sigue al mouse casi al instante
  const x = useSpring(mouseX, { damping: 35, stiffness: 900, mass: 0.4 });
  const y = useSpring(mouseY, { damping: 35, stiffness: 900, mass: 0.4 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible && window.matchMedia('(pointer: fine)').matches) {
        setIsVisible(true);
      }
    };
    const handleLeave = () => setIsVisible(false);
    const handleEnter = () => setIsVisible(true);
    const handleDown = () => {
      if (!window.matchMedia('(pointer: fine)').matches) return;
      setBoomId((b) => b + 1);
      setExploding(true);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleDown);
    document.addEventListener('mouseleave', handleLeave);
    document.addEventListener('mouseenter', handleEnter);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleDown);
      document.removeEventListener('mouseleave', handleLeave);
      document.removeEventListener('mouseenter', handleEnter);
    };
  }, [isVisible, mouseX, mouseY]);

  // Cada clic (boomId) dispara la caída y se rearma a los ~700ms
  useEffect(() => {
    if (boomId === 0) return;
    setExploding(true);
    const t = setTimeout(() => setExploding(false), 700);
    return () => clearTimeout(t);
  }, [boomId]);

  if (!isVisible) return null;

  const isHover = cursorState.type === 'hover' || cursorState.type === 'view';
  const isView = cursorState.type === 'view';

  return (
    <motion.div
      id="brick-cursor"
      className="pointer-events-none fixed top-0 left-0 z-[60] hidden md:block"
      style={{ x, y }}
    >
      {/* Punta de la flecha en (3,2); desplazo para que coincida con el puntero real */}
      <div style={{ transform: 'translate(-3px, -2px)' }}>

        {/* FLECHA DE LADRILLO (estado de reposo) */}
        <motion.svg
          width="34"
          height="50"
          viewBox="0 0 24 36"
          animate={{
            scale: exploding ? 0.5 : isHover ? 1.18 : 1,
            opacity: exploding ? 0 : 1,
          }}
          transition={{
            scale: exploding
              ? { duration: 0.12 }
              : { type: 'spring', stiffness: 500, damping: 18 },
            opacity: { duration: exploding ? 0.1 : 0.25 },
          }}
          style={{
            filter: 'drop-shadow(2px 3px 3px rgba(0,0,0,0.45))',
            transformOrigin: '3px 2px',
          }}
        >
          <defs>
            {/* Patrón de ladrillo: terracota + juntas de mortero (aparejo a soga) */}
            <pattern id="ladrillo" width="9" height="6" patternUnits="userSpaceOnUse">
              <rect width="9" height="6" fill="#B8442A" />
              <rect width="9" height="2.7" fill="#CB5234" />
              <path
                d="M0 3 H9 M0 0 V3 M4.5 0 V3 M2.25 3 V6 M6.75 3 V6"
                stroke="#4A1C12"
                strokeWidth="0.85"
                fill="none"
              />
            </pattern>
            <linearGradient id="brilloLadrillo" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.18" />
              <stop offset="55%" stopColor="#ffffff" stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* Silueta de flecha de puntero, rellena con patrón de ladrillo */}
          <path
            d="M3 2 L3 30 L10 24 L15 35 L19 33 L14 22 L22 22 Z"
            fill="url(#ladrillo)"
            stroke="#4A1C12"
            strokeWidth="1.4"
            strokeLinejoin="round"
          />
          {/* Brillo superior para dar volumen */}
          <path
            d="M3 2 L3 30 L10 24 L15 35 L19 33 L14 22 L22 22 Z"
            fill="url(#brilloLadrillo)"
            stroke="none"
          />
        </motion.svg>

        {/* ESCOMBROS: ladrillos que caen al hacer clic */}
        <AnimatePresence>
          {exploding && (
            <div key={boomId} className="absolute top-0 left-0">
              {ESCOMBROS.map((b, i) => (
                <motion.div
                  key={i}
                  initial={{ x: b.x, y: b.y, rotate: 0, opacity: 1 }}
                  animate={{ x: b.x + b.dx, y: b.y + b.dy, rotate: b.rot, opacity: 0 }}
                  transition={{ duration: 0.7, ease: [0.45, 0, 0.9, 1] }}
                  style={{
                    position: 'absolute',
                    width: b.w,
                    height: b.h,
                    borderRadius: 1,
                    background: TONOS[i % TONOS.length],
                    border: '0.5px solid #4A1C12',
                    boxShadow: '1px 1px 2px rgba(0,0,0,0.4)',
                  }}
                />
              ))}
            </div>
          )}
        </AnimatePresence>

        {/* Etiqueta opcional cuando el estado es "view" (catálogo / enlaces) */}
        {isView && !exploding && (
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="absolute left-8 top-6 whitespace-nowrap rounded-full bg-[#B8442A] px-2.5 py-1 text-[9px] font-mono font-bold uppercase tracking-widest text-white shadow-lg"
          >
            {cursorState.text || 'VER'}
          </motion.span>
        )}
      </div>
    </motion.div>
  );
}
