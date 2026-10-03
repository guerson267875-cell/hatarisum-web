import React from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight, Calculator } from 'lucide-react';
import { CursorState } from '../types';
import { productos, otrosProductos, precioEnPlanta, promoVigente, soles } from '../data/productos';
import { waLink } from '../data/contacto';

interface PreciosProps {
  setCursorState: React.Dispatch<React.SetStateAction<CursorState>>;
}

export default function Precios({ setCursorState }: PreciosProps) {
  const promo = promoVigente();
  const kk = productos.find((p) => p.id === 'kk-h10')!;

  const handleHover = (entering: boolean, text?: string) => {
    setCursorState(entering ? { type: text ? 'view' : 'hover', text } : { type: 'default' });
  };

  // Ejemplos para calcular (los mismos que usa el agente de WhatsApp)
  const ejemplos = [
    {
      obra: 'Un cuarto de 3 × 3 m',
      detalle: 'Muros de 2.4 m de alto, unos 29 m²',
      cantidad: 'Unos 1,000 King Kong H-10',
      extra: `1 millar: ${soles(precioEnPlanta(kk))} en planta o ${soles(kk.precioObra)} en tu obra`,
    },
    {
      obra: 'Un tabique de 10 m²',
      detalle: 'División interior o cerco',
      cantidad: 'Unas 370 Panderetas',
      extra: 'Junta tu pedido con tus vecinos y completen el millar',
    },
    {
      obra: 'Un techo de 30 m²',
      detalle: 'Losa aligerada',
      cantidad: 'Unos 270 Hueco 15',
      extra: 'El espesor del techo lo define tu maestro o ingeniero',
    },
  ];

  return (
    <section
      id="precios"
      className="relative py-24 px-6 md:px-12 max-w-7xl mx-auto border-t border-white/[0.04] select-none"
    >
      {/* ENCABEZADO */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-end mb-12">
        <div className="md:col-span-7">
          <p className="font-mono text-[10px] tracking-[0.3em] text-[#D4A24C] uppercase mb-2">
            PRECIOS POR MILLAR • NUESTRA FÁBRICA ORO ROJO
          </p>
          <h2 className="text-3xl md:text-5xl font-display font-extrabold text-hueso tracking-tight">
            Precios claros, por millar
          </h2>
        </div>
        <div className="md:col-span-5">
          <p className="text-zinc-400 text-sm font-light leading-relaxed max-w-md">
            Cada ladrillo tiene dos precios: <span className="text-hueso">en planta</span>, si lo recoges con
            tu transporte, o <span className="text-hueso">puesto en obra</span>, si te lo llevamos en Arequipa.
            El precio en obra ya incluye llevarlo: no cobramos flete aparte.
          </p>
        </div>
      </div>

      {/* CARDS DE PRECIO */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
        {productos.map((p, idx) => {
          const conPromo = promo && p.precioPlantaPromo !== undefined;
          return (
            <motion.article
              key={p.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.45, delay: idx * 0.06 }}
              onMouseEnter={() => handleHover(true)}
              onMouseLeave={() => handleHover(false)}
              className="group rounded-2xl border border-white/[0.06] bg-[#101D33]/70 overflow-hidden flex flex-col cursor-none transition-all duration-300 hover:border-[#B8442A]/40 hover:bg-[#101D33]"
            >
              {/* Franja de color */}
              <div className={`relative h-24 ${p.image} flex items-center justify-between px-5 overflow-hidden`}>
                <div className="absolute inset-0 bg-gradient-to-t from-[#070E1A]/50 to-transparent" />
                <span className="relative z-10 font-mono text-[9px] tracking-[0.2em] text-white/80 uppercase border border-white/25 px-3 py-1 rounded-full backdrop-blur-sm">
                  {p.uso}
                </span>
                {conPromo && (
                  <span className="relative z-10 font-mono text-[9px] tracking-[0.15em] uppercase bg-[#D4A24C] text-[#070E1A] font-semibold px-2.5 py-1 rounded-full">
                    Promo
                  </span>
                )}
                <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/[0.06] to-white/0 pointer-events-none transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
              </div>

              {/* Cuerpo */}
              <div className="p-5 flex flex-col flex-grow">
                <h3 className="text-xl font-display font-bold text-hueso group-hover:text-white transition-colors">
                  {p.nombre}
                </h3>
                <p className="text-[12px] text-zinc-400 font-light mt-1 leading-relaxed">
                  {p.descripcion}
                </p>

                {/* Precios */}
                <div className="mt-5 grid grid-cols-2 rounded-xl border border-white/[0.07] overflow-hidden">
                  <div className="p-3 bg-[#070E1A]/50">
                    <span className="block font-mono text-[9px] tracking-wider uppercase text-zinc-500">En planta</span>
                    <span className="block font-display font-extrabold text-[22px] leading-tight text-hueso mt-1">
                      {soles(precioEnPlanta(p))}
                    </span>
                    {conPromo ? (
                      <span className="block text-[10px] text-[#D4A24C] leading-snug mt-0.5">
                        S/ 1 el ladrillo, hasta el 31/10
                      </span>
                    ) : (
                      <span className="block text-[10px] text-zinc-500 leading-snug mt-0.5">Tú pones el transporte</span>
                    )}
                  </div>
                  <div className="p-3 bg-[#B8442A]/10 border-l border-white/[0.07]">
                    <span className="block font-mono text-[9px] tracking-wider uppercase text-zinc-500">Puesto en obra</span>
                    <span className="block font-display font-extrabold text-[22px] leading-tight text-hueso mt-1">
                      {soles(p.precioObra)}
                    </span>
                    <span className="block text-[10px] text-zinc-500 leading-snug mt-0.5">Sin flete aparte</span>
                  </div>
                </div>

                {/* Specs */}
                <dl className="mt-4 mb-5 grid grid-cols-[1.7fr_1fr_1fr] gap-x-2 text-[10px] font-mono whitespace-nowrap">
                  <div>
                    <dt className="text-zinc-500 uppercase tracking-wider">Medida</dt>
                    <dd className="text-zinc-200 mt-0.5">{p.dimensiones}</dd>
                  </div>
                  <div>
                    <dt className="text-zinc-500 uppercase tracking-wider">Peso</dt>
                    <dd className="text-zinc-200 mt-0.5">{p.peso}</dd>
                  </div>
                  <div>
                    <dt className="text-zinc-500 uppercase tracking-wider">Rinde</dt>
                    <dd className="text-zinc-200 mt-0.5">{p.rendimiento}</dd>
                  </div>
                </dl>

                {/* CTA */}
                <a
                  href={waLink(`Hola Hatarisum, quiero cotizar ${p.nombre}.`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  onMouseEnter={() => handleHover(true, 'WHATSAPP')}
                  onMouseLeave={() => handleHover(false)}
                  className="mt-auto inline-flex items-center justify-between text-[11px] font-mono tracking-widest uppercase text-[#D4A24C] hover:text-white border border-[#D4A24C]/30 hover:border-[#D4A24C] rounded-lg px-4 py-2.5 transition-colors cursor-none"
                >
                  <span>Cotizar por WhatsApp</span>
                  <ArrowUpRight className="h-4 w-4" />
                </a>
              </div>
            </motion.article>
          );
        })}
      </div>

      {/* Letra chica */}
      <p className="mt-6 text-[11px] text-zinc-500 font-light leading-relaxed max-w-3xl">
        Precios por millar (1,000 ladrillos), en soles.
        {promo && ' La promo de S/ 1 el ladrillo es solo en planta, desde 1 millar, hasta el 31 de octubre de 2026.'}
        {' '}El stock, la cobertura de tu zona y el día de carga o de entrega los confirma un asesor por WhatsApp.
      </p>

      {/* ¿CUÁNTO NECESITO? + OTROS PRODUCTOS */}
      <div className="mt-16 grid grid-cols-1 lg:grid-cols-12 gap-8">

        <div className="lg:col-span-8 rounded-2xl border border-white/[0.05] bg-[#0B1426]/80 p-6 md:p-8">
          <div className="flex items-center gap-2 mb-1">
            <Calculator className="h-4 w-4 text-[#D4593A]" />
            <span className="font-mono text-[10px] tracking-[0.25em] text-zinc-300 uppercase">¿Cuánto necesito?</span>
          </div>
          <p className="text-zinc-400 text-xs font-light mb-6">
            Cuentas aproximadas. La cantidad exacta la define tu maestro de obra.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {ejemplos.map((e) => (
              <div key={e.obra} className="rounded-xl border border-white/[0.05] bg-[#070E1A]/60 p-4">
                <h4 className="font-display font-bold text-hueso text-base">{e.obra}</h4>
                <p className="text-[11px] text-zinc-500 mt-0.5">{e.detalle}</p>
                <p className="font-display font-bold text-[#D4A24C] text-lg mt-3 leading-snug">{e.cantidad}</p>
                <p className="text-[11px] text-zinc-400 mt-2 leading-snug">{e.extra}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-4 rounded-2xl border border-white/[0.06] bg-[#0B1426]/80 backdrop-blur-sm p-6 md:p-8 flex flex-col">
          <span className="font-mono text-[10px] tracking-[0.25em] text-zinc-300 uppercase">Más de nuestra fábrica</span>
          <p className="text-zinc-400 text-xs font-light mt-1 mb-5">Pregunta precio y disponibilidad por WhatsApp.</p>
          <ul className="flex flex-wrap gap-2">
            {otrosProductos.map((o) => (
              <li
                key={o}
                className="text-[11px] font-sans text-zinc-300 border border-white/10 rounded-full px-3 py-1.5"
              >
                {o}
              </li>
            ))}
          </ul>
          <a
            href={waLink('Hola Hatarisum, quiero consultar por otros productos de la fábrica.')}
            target="_blank"
            rel="noopener noreferrer"
            onMouseEnter={() => handleHover(true, 'WHATSAPP')}
            onMouseLeave={() => handleHover(false)}
            className="mt-6 lg:mt-auto lg:pt-6 inline-flex items-center gap-1.5 text-[11px] font-mono tracking-widest uppercase text-[#D4A24C] hover:text-white transition-colors cursor-none"
          >
            <span>Consultar</span>
            <ArrowUpRight className="h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
