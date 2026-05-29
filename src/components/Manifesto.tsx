import React from 'react';
import { Users, Coins, ShieldCheck } from 'lucide-react';
import { CursorState } from '../types';

interface ManifestoProps {
  setCursorState: React.Dispatch<React.SetStateAction<CursorState>>;
}

export default function Manifesto({ setCursorState }: ManifestoProps) {
  const handleHover = (entering: boolean) => {
    setCursorState(entering ? { type: 'hover' } : { type: 'default' });
  };

  const pillars = [
    {
      icon: <Users className="h-5 w-5 text-[#D4593A]" />,
      title: 'Comunidad organizada',
      desc: 'Juntamos a los vecinos de tu cuadra para llegar al millar y comprar al precio de mayorista.',
    },
    {
      icon: <Coins className="h-5 w-5 text-[#D4A24C]" />,
      title: 'Precio justo',
      desc: 'El mismo ladrillo, sin el sobreprecio de comprar de a pocos. Transparente y claro en soles.',
    },
    {
      icon: <ShieldCheck className="h-5 w-5 text-[#B8442A]" />,
      title: 'Respaldo Oro Rojo',
      desc: 'Distribuimos ladrillo de Ladrillera Oro Rojo. Calidad de fábrica, puesta en tu obra.',
    },
  ];

  return (
    <section
      id="manifesto"
      className="relative min-h-screen py-24 px-6 md:px-12 max-w-7xl mx-auto border-t border-white/[0.04] flex flex-col justify-center select-none"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">

        {/* Columna izquierda: encabezado y declaración */}
        <div className="lg:col-span-6 space-y-6">
          <p className="font-mono text-[10px] tracking-[0.3em] text-[#B8442A] uppercase">
            NUESTRO PROPÓSITO
          </p>
          <h2 className="text-3xl md:text-[52px] font-display font-extrabold tracking-tight text-hueso leading-[1.08] max-w-md">
            Levantamos barrios, no solo paredes
          </h2>
          <p className="text-zinc-300 text-sm md:text-base font-sans font-light leading-relaxed max-w-lg pt-4">
            Hatarisum es una distribuidora de ladrillo en Arequipa. Hacemos dos cosas: organizamos a
            los vecinos de un mismo barrio para que junten su pedido y accedan al precio de millar, y
            atendemos a contratistas y obras formales como distribuidor de Ladrillera Oro Rojo.
          </p>
          <p className="text-zinc-400 text-sm md:text-base font-sans font-light italic leading-relaxed max-w-lg">
            Una casa propia no se construye sola. Nosotros movemos el ladrillo; tú te organizas y
            levantas tu casa.
          </p>
        </div>

        {/* Columna derecha: pilares */}
        <div className="lg:col-span-6 lg:pl-12 flex flex-col space-y-6 justify-center h-full">
          {pillars.map((p, i) => (
            <div
              key={i}
              onMouseEnter={() => handleHover(true)}
              onMouseLeave={() => handleHover(false)}
              className="group border border-white/[0.04] bg-white/[0.01] p-6 rounded-2xl relative overflow-hidden transition-all duration-300 hover:border-[#B8442A]/40 hover:bg-white/[0.02] flex items-start space-x-4 cursor-none"
            >
              <div className="p-3 bg-[#070E1A]/70 rounded-xl group-hover:scale-110 transition-transform duration-300">
                {p.icon}
              </div>
              <div className="space-y-1">
                <h4 className="font-display font-semibold text-base text-hueso group-hover:text-white transition-colors">
                  {p.title}
                </h4>
                <p className="text-[12px] text-zinc-400 leading-relaxed font-sans font-light">
                  {p.desc}
                </p>
              </div>
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-[#B8442A]/[0.06] to-transparent pointer-events-none rounded-bl-full" />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
