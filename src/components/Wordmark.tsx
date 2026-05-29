import React from 'react';

interface WordmarkProps {
  className?: string;   // controla la altura, ej. "h-7"
  showTagline?: boolean;
}

/**
 * Wordmark Hatarisum — anatomía de marca:
 * "Hatari" + columna de 5 ladrillos ascendente (3 tonos terracota alternados)
 * con cabeza-flecha triangular encima + "sum." + punto terracota.
 * Sobre fondo oscuro el texto va en hueso; los ladrillos mantienen terracota.
 */
export default function Wordmark({ className = 'h-8', showTagline = false }: WordmarkProps) {
  return (
    <span className={`inline-flex flex-col select-none ${className}`} role="img" aria-label="Hatarisum — Levantémonos juntos">
      <span className="inline-flex items-end leading-none" style={{ height: '100%' }}>
        <span className="font-display font-extrabold tracking-tight text-hueso" style={{ fontSize: '0.86em', lineHeight: 1 }}>
          Hatari
        </span>

        {/* Columna de ladrillos con cabeza-flecha (atraviesa el cap height) */}
        <svg
          viewBox="0 0 20 56"
          className="w-auto mx-[0.04em]"
          style={{ height: '1.32em', transform: 'translateY(-0.2em)' }}
          aria-hidden="true"
        >
          {/* Cabeza-flecha triangular */}
          <polygon points="10,0 2.5,8 17.5,8" fill="#B8442A" />
          {/* 5 ladrillos (de arriba a abajo): claro, base, oscuro, base, claro */}
          {[
            { y: 9, fill: '#D4593A' },
            { y: 18.4, fill: '#B8442A' },
            { y: 27.8, fill: '#8A3320' },
            { y: 37.2, fill: '#B8442A' },
            { y: 46.6, fill: '#D4593A' },
          ].map((b, i) => (
            <g key={i}>
              <rect x="1" y={b.y} width="18" height="8.2" rx="1.6" fill={b.fill} />
              <line x1="10" y1={b.y + 1.4} x2="10" y2={b.y + 6.8} stroke="#070E1A" strokeWidth="0.9" opacity="0.3" />
            </g>
          ))}
        </svg>

        <span className="font-display font-extrabold tracking-tight text-hueso" style={{ fontSize: '0.86em', lineHeight: 1 }}>
          sum<span className="text-terracota">.</span>
        </span>
      </span>

      {showTagline && (
        <span className="font-sans text-dorado/80 uppercase mt-1.5" style={{ fontSize: '0.26em', letterSpacing: '0.22em' }}>
          Levantémonos juntos
        </span>
      )}
    </span>
  );
}
