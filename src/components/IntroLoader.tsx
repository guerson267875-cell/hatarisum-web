import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface IntroLoaderProps {
  onComplete: () => void;
}

export default function IntroLoader({ onComplete }: IntroLoaderProps) {
  const [stage, setStage] = useState<'fade-in' | 'fade-out' | 'done'>('fade-in');

  useEffect(() => {
    // Etapa 1: aparece y pulsa el tagline
    const fadeOutTimer = setTimeout(() => {
      setStage('fade-out');
    }, 2200);

    // Etapa 2: completa el loader y libera el contenido
    const completeTimer = setTimeout(() => {
      setStage('done');
      onComplete();
    }, 2900);

    return () => {
      clearTimeout(fadeOutTimer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  if (stage === 'done') return null;

  return (
    <AnimatePresence>
      {stage !== 'done' && (
        <motion.div
          id="hatarisum-intro-loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#0A1322] select-none pointer-events-auto"
        >
          {/* Luz ambiental girando lentamente */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <motion.div
              animate={{
                rotate: [0, 360],
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: "linear"
              }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vw] h-[70vw] rounded-full bg-radial from-[#B8442A]/20 via-[#1A2B4A]/15 to-transparent blur-[80px]"
            />
          </div>

          {/* Textura de grano */}
          <div
            className="absolute inset-0 pointer-events-none opacity-[0.05] mix-blend-overlay"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 250 250' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
            }}
          />

          {/* Tipografía central: Levantémonos juntos */}
          <div className="relative text-center z-10 px-6">
            <motion.h2
              initial={{ opacity: 0, y: 15 }}
              animate={{
                opacity: stage === 'fade-out' ? 0 : 1,
                y: stage === 'fade-out' ? -10 : 0
              }}
              transition={{
                duration: 0.8,
                ease: [0.16, 1, 0.3, 1]
              }}
              className="text-[30px] sm:text-[42px] md:text-[54px] font-display font-light tracking-wide text-hueso"
            >
              Levantémonos <span className="font-extrabold text-[#D4A24C]">juntos</span>
            </motion.h2>

            <motion.div
              initial={{ width: 0 }}
              animate={{
                width: stage === 'fade-out' ? 0 : 64,
                opacity: stage === 'fade-out' ? 0 : 1
              }}
              transition={{ delay: 0.4, duration: 1, ease: "easeOut" }}
              className="h-[1px] bg-white/20 mx-auto mt-4"
            />
          </div>

          {/* Tag inferior */}
          <div className="absolute bottom-12 left-0 right-0 text-center text-[9px] font-mono tracking-[0.2em] text-white/30 uppercase z-15">
            H A T A R I S U M • A R E Q U I P A
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
