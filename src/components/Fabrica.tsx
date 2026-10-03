import React from 'react';
import { Coins, Truck, Layers, MapPin } from 'lucide-react';
import { CursorState } from '../types';
import { MAPS_FABRICA } from '../data/contacto';

interface FabricaProps {
  setCursorState: React.Dispatch<React.SetStateAction<CursorState>>;
}

// Una sola casa (MRC-GRP-02): Hatarisum habla; Oro Rojo es «nuestra fábrica».
export default function Fabrica({ setCursorState }: FabricaProps) {
  const hover = (entering: boolean, text?: string) =>
    setCursorState(entering ? { type: text ? 'view' : 'hover', text } : { type: 'default' });

  const pilares = [
    {
      icon: <Coins className="h-5 w-5 text-[#D4A24C]" />,
      title: 'Precio de fábrica',
      desc: 'Sin intermediarios: el ladrillo sale de nuestro horno y llega a ti.',
    },
    {
      icon: <Truck className="h-5 w-5 text-[#D4593A]" />,
      title: 'En planta o en tu obra',
      desc: 'Lo recoges con tu transporte o te lo llevamos en Arequipa, sin flete aparte.',
    },
    {
      icon: <Layers className="h-5 w-5 text-[#B8442A]" />,
      title: 'A tu ritmo',
      desc: 'Construyes por etapas: separa tu pedido y recíbelo de a pocos.',
    },
  ];

  return (
    <section
      id="fabrica"
      className="relative py-24 px-6 md:px-12 max-w-7xl mx-auto border-t border-white/[0.04] select-none"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

        {/* Texto */}
        <div className="lg:col-span-7 space-y-6">
          <p className="font-mono text-[10px] tracking-[0.3em] text-[#B8442A] uppercase">
            NUESTRA FÁBRICA
          </p>
          <h2 className="text-3xl md:text-[52px] font-display font-extrabold tracking-tight text-hueso leading-[1.08] max-w-xl">
            Una sola casa: fabricamos y te vendemos
          </h2>
          <p className="text-zinc-300 text-sm md:text-base font-sans font-light leading-relaxed max-w-lg">
            Oro Rojo es nuestra fábrica en Arequipa: de su horno sale cada ladrillo que vendemos.
            Hatarisum es como te atendemos y te vendemos. Por eso el precio es de fábrica.
          </p>
          <p className="text-zinc-400 text-sm md:text-base font-sans font-light italic leading-relaxed max-w-lg">
            Hatarisum es quechua y quiere decir «levantémonos juntos». Tú levantas tu casa; nosotros
            ponemos el ladrillo.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
            {pilares.map((p) => (
              <div
                key={p.title}
                onMouseEnter={() => hover(true)}
                onMouseLeave={() => hover(false)}
                className="group border border-white/[0.06] bg-[#0B1426]/80 backdrop-blur-sm p-5 rounded-2xl transition-all duration-300 hover:border-[#B8442A]/40 cursor-none"
              >
                <div className="p-2.5 bg-[#070E1A]/70 rounded-xl inline-flex group-hover:scale-110 transition-transform duration-300">
                  {p.icon}
                </div>
                <h4 className="font-display font-semibold text-base text-hueso mt-3">{p.title}</h4>
                <p className="text-[12px] text-zinc-400 leading-relaxed font-sans font-light mt-1">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Sello de la fábrica con la junta dorada «Nuestra fábrica» */}
        <div className="lg:col-span-5 flex flex-col items-center text-center">
          <span className="font-sans font-semibold text-[11px] tracking-[0.3em] uppercase text-[#D4A24C]">
            Nuestra fábrica
          </span>
          <div className="relative mt-5">
            <div className="absolute inset-0 rounded-full bg-[#B8442A]/25 blur-3xl" />
            <img
              src="./oro-rojo-sello.webp"
              alt="Sello de Oro Rojo, nuestra fábrica"
              width={360}
              height={360}
              loading="lazy"
              className="relative w-56 h-56 md:w-72 md:h-72 rounded-full"
            />
          </div>
          <span className="mt-5 font-mono text-[10px] tracking-[0.25em] uppercase text-zinc-400">
            Hecho en Arequipa
          </span>
          <a
            href={MAPS_FABRICA}
            target="_blank"
            rel="noopener noreferrer"
            onMouseEnter={() => hover(true, 'MAPA')}
            onMouseLeave={() => hover(false)}
            className="cursor-none mt-6 inline-flex items-center gap-1.5 border border-white/15 hover:border-[#D4A24C] rounded-full px-5 py-2.5 text-[11px] font-mono tracking-widest uppercase text-hueso/80 hover:text-white transition-colors"
          >
            <MapPin className="h-4 w-4 text-[#D4593A]" />
            <span>Ver la fábrica en el mapa</span>
          </a>
        </div>

      </div>
    </section>
  );
}
