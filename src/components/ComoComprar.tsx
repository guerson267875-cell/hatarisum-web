import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, Home, HardHat, Building2, Factory, Truck, MapPin } from 'lucide-react';
import { CursorState } from '../types';
import { MAPS_FABRICA } from '../data/contacto';

interface ComoComprarProps {
  setCursorState: React.Dispatch<React.SetStateAction<CursorState>>;
}

interface Perfil {
  id: string;
  number: string;
  icon: React.ReactNode;
  title: string;
  tagline: string;
  description: string;
  items: string[];
}

export default function ComoComprar({ setCursorState }: ComoComprarProps) {
  const [activo, setActivo] = useState<string | null>('familia');

  const hover = (entering: boolean, text?: string) =>
    setCursorState(entering ? { type: text ? 'view' : 'hover', text } : { type: 'default' });

  const pasos = [
    { n: '01', t: 'Escríbenos', d: 'Por WhatsApp: qué ladrillo y cuántos millares necesitas.' },
    { n: '02', t: 'Elige cómo', d: 'Lo recoges en planta o te lo llevamos a tu obra.' },
    { n: '03', t: 'Confirmamos', d: 'Un asesor confirma el stock, tu zona y el día de carga o entrega.' },
    { n: '04', t: 'Pagas y cargas', d: 'Pagas antes de cargar o de recibir. El asesor te indica cómo.' },
  ];

  const perfiles: Perfil[] = [
    {
      id: 'familia',
      number: '01',
      icon: <Home className="h-5 w-5 text-[#D4593A]" />,
      title: 'Construyes tu casa',
      tagline: 'FAMILIAS • AUTOCONSTRUCCIÓN',
      description:
        'Si levantas tu casa por etapas, no tienes que comprar todo de golpe. Cotiza tu pedido completo, sepáralo y recíbelo de a pocos, según avance tu obra. Las condiciones te las explica un asesor.',
      items: [
        'Te ayudamos a calcular cuánto necesitas',
        'Compra por etapas: separa y recibe de a pocos',
        '¿Te falta para el millar? Junta tu pedido con tus vecinos',
        'Lo recoges en planta o te lo llevamos',
      ],
    },
    {
      id: 'maestro',
      number: '02',
      icon: <HardHat className="h-5 w-5 text-[#D4A24C]" />,
      title: 'Eres maestro de obra',
      tagline: 'MAESTROS • CLUB MAESTRO',
      description:
        'Dinos qué ladrillo, cuántos millares y dónde, y te cotizamos al toque. Si compras seguido, entra al Club Maestro: nuestro canal de WhatsApp para maestros, con beneficios por lo que compras en el mes.',
      items: [
        'Precio por millar, en planta o en obra',
        'Club Maestro: beneficios por lo que compras en el mes',
        'Pedidos para varias obras a la vez',
        'Atención directa por WhatsApp',
      ],
    },
    {
      id: 'empresa',
      number: '03',
      icon: <Building2 className="h-5 w-5 text-[#B8442A]" />,
      title: 'Inmobiliaria o contratista',
      tagline: 'OBRAS • PROYECTOS',
      description:
        'Cotización por producto y millares, en planta o puesta en obra en Arequipa. Indíquenos el distrito y la fecha requerida; un asesor confirma stock, programación de entregas y comprobante.',
      items: [
        'Precio de fábrica, sin intermediarios',
        'Entregas programadas según su cronograma',
        'Comprobante y ficha técnica: los coordina un asesor',
        'King Kong, Pandereta, Hueco 12 y Hueco 15',
      ],
    },
  ];

  return (
    <section
      id="como-comprar"
      className="relative py-24 px-6 md:px-12 max-w-7xl mx-auto border-t border-white/[0.04] select-none"
    >
      {/* ENCABEZADO */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-end mb-12">
        <div className="md:col-span-7">
          <p className="font-mono text-[10px] tracking-[0.3em] text-[#B8442A] uppercase mb-2">
            CÓMO COMPRAR
          </p>
          <h2 className="text-3xl md:text-5xl font-display font-extrabold text-hueso tracking-tight">
            Dos formas de llevarte tu ladrillo
          </h2>
        </div>
        <div className="md:col-span-5">
          <p className="text-zinc-400 text-sm font-light leading-relaxed max-w-md">
            Vendemos por millar, directo de nuestra fábrica. Tú eliges si lo recoges o si te lo
            llevamos.
          </p>
        </div>
      </div>

      {/* EN PLANTA / PUESTO EN OBRA */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="rounded-2xl border border-white/[0.06] bg-[#101D33]/85 backdrop-blur-sm p-6 md:p-8">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-[#070E1A]/70"><Factory className="h-5 w-5 text-[#D4A24C]" /></div>
            <h3 className="font-display font-bold text-2xl text-hueso">En planta</h3>
          </div>
          <p className="text-zinc-300 text-sm font-light leading-relaxed mt-4">
            Vienes con tu camión, tu volquete o el transporte de tu maestro y cargas en nuestra fábrica.
            Es el precio más bajo, porque tú pones el transporte.
          </p>
          <a
            href={MAPS_FABRICA}
            target="_blank"
            rel="noopener noreferrer"
            onMouseEnter={() => hover(true, 'MAPA')}
            onMouseLeave={() => hover(false)}
            className="cursor-none mt-5 inline-flex items-center gap-1.5 text-[11px] font-mono tracking-widest uppercase text-[#D4A24C] hover:text-white transition-colors"
          >
            <MapPin className="h-4 w-4" />
            <span>Cómo llegar a la fábrica</span>
          </a>
        </div>

        <div className="rounded-2xl border border-[#B8442A]/25 bg-[#2A1A1F]/85 backdrop-blur-sm p-6 md:p-8">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-[#070E1A]/70"><Truck className="h-5 w-5 text-[#D4593A]" /></div>
            <h3 className="font-display font-bold text-2xl text-hueso">Puesto en obra</h3>
          </div>
          <p className="text-zinc-300 text-sm font-light leading-relaxed mt-4">
            Te lo llevamos a tu obra en Arequipa. El precio ya incluye llevarlo: no cobramos flete
            aparte. Dinos en qué zona es tu obra y si entra un camión; un asesor confirma la cobertura
            y el día de entrega.
          </p>
          <span className="mt-5 inline-flex items-center gap-1.5 text-[11px] font-mono tracking-widest uppercase text-zinc-400">
            <MapPin className="h-4 w-4 text-[#D4593A]" />
            <span>Arequipa • consulta tu zona</span>
          </span>
        </div>
      </div>

      {/* PASOS */}
      <ol className="mt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {pasos.map((p) => (
          <li key={p.n} className="rounded-2xl border border-white/[0.06] bg-[#0B1426]/80 backdrop-blur-sm p-5">
            <span className="font-mono text-[11px] text-[#B8442A]">{p.n} //</span>
            <h4 className="font-display font-bold text-hueso text-lg mt-2">{p.t}</h4>
            <p className="text-[12px] text-zinc-400 font-light leading-relaxed mt-1">{p.d}</p>
          </li>
        ))}
      </ol>

      {/* PARA QUIÉN — ACORDEÓN */}
      <div className="mt-20">
        <span className="font-mono text-[10px] tracking-[0.3em] text-[#D4A24C] uppercase block mb-4">
          ¿QUIÉN ERES?
        </span>
        <div className="border-t border-white/5 space-y-1">
          {perfiles.map((s) => {
            const isOpen = activo === s.id;
            return (
              <div
                key={s.id}
                className={`border-b border-white/5 transition-all duration-300 ${
                  isOpen ? 'bg-white/[0.01]' : 'hover:bg-white/[0.005]'
                }`}
              >
                <button
                  onClick={() => setActivo(isOpen ? null : s.id)}
                  aria-expanded={isOpen}
                  onMouseEnter={() => hover(true)}
                  onMouseLeave={() => hover(false)}
                  className="w-full flex items-center justify-between py-7 text-left cursor-none group"
                >
                  <div className="flex items-center space-x-5 md:space-x-8 pr-4">
                    <span className="font-mono text-zinc-500 text-xs md:text-sm shrink-0">
                      {s.number} //
                    </span>
                    <div>
                      <h3 className="text-lg md:text-2xl font-display font-bold text-hueso group-hover:text-[#D4593A] transition-colors">
                        {s.title}
                      </h3>
                      <span className="font-mono text-[9px] tracking-widest text-[#D4A24C] uppercase block mt-1">
                        {s.tagline}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4 shrink-0">
                    <div className="hidden sm:flex p-2 rounded-full bg-[#070E1A] border border-white/10">
                      {s.icon}
                    </div>
                    <motion.div
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                      className="p-1.5"
                    >
                      <ChevronDown className="h-5 w-5 text-zinc-500 group-hover:text-white" />
                    </motion.div>
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: 'easeInOut' }}
                      className="overflow-hidden"
                    >
                      <div className="pb-8 pt-1 md:pl-16 grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 items-start">
                        <div className="md:col-span-7">
                          <p className="text-sm text-zinc-300 font-sans font-light leading-relaxed max-w-xl">
                            {s.description}
                          </p>
                        </div>
                        <div className="md:col-span-5 bg-[#070E1A]/50 p-5 rounded-lg border border-white/[0.04]">
                          <ul className="space-y-2.5">
                            {s.items.map((it) => (
                              <li key={it} className="flex items-start space-x-2.5">
                                <div className="h-1.5 w-1.5 rounded-full bg-[#B8442A] mt-[7px] shrink-0" />
                                <span className="text-[12px] font-sans text-zinc-300 leading-relaxed">{it}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
