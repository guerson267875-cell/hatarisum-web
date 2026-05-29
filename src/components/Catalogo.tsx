import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import { CategoriaProducto, CursorState } from '../types';
import { productos, categorias } from '../data/productos';

interface CatalogoProps {
  setCursorState: React.Dispatch<React.SetStateAction<CursorState>>;
}

export default function Catalogo({ setCursorState }: CatalogoProps) {
  const [categoriaActiva, setCategoriaActiva] = useState<CategoriaProducto>('muro');

  const labelCategoria = (c: CategoriaProducto) =>
    categorias.find((x) => x.value === c)?.label ?? '';

  const productosFiltrados = productos.filter((p) => p.categoria === categoriaActiva);

  const handleHover = (entering: boolean, text?: string) => {
    setCursorState(entering ? { type: text ? 'view' : 'hover', text } : { type: 'default' });
  };

  return (
    <section
      id="catalogo"
      className="relative min-h-screen py-24 px-6 md:px-12 max-w-7xl mx-auto border-t border-white/[0.04] select-none"
    >
      {/* ENCABEZADO */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-end mb-12">
        <div className="col-span-12 md:col-span-8">
          <p className="font-mono text-[10px] tracking-[0.3em] text-[#D4A24C] uppercase mb-2">
            CATÁLOGO • LADRILLERA ORO ROJO
          </p>
          <h2 className="text-3xl md:text-5xl font-display font-extrabold text-hueso tracking-tight">
            Nuestros ladrillos
          </h2>
        </div>
        <div className="col-span-12 md:col-span-4">
          <p className="text-zinc-400 text-xs font-light leading-relaxed max-w-md">
            Ladrillo de fábrica para muro, techo, cobertura y pisos. El precio se cotiza por millar
            puesto en obra — escríbenos y te pasamos el detalle.
          </p>
        </div>
      </div>

      {/* PESTAÑAS por aplicación (estilo Lark) */}
      <div
        role="tablist"
        aria-label="Categorías de producto"
        className="flex flex-wrap gap-2 pb-8 border-b border-white/[0.06] mb-12"
      >
        {categorias.map((cat) => {
          const activa = categoriaActiva === cat.value;
          return (
            <button
              key={cat.value}
              role="tab"
              aria-selected={activa}
              onClick={() => setCategoriaActiva(cat.value)}
              onMouseEnter={() => handleHover(true)}
              onMouseLeave={() => handleHover(false)}
              className={`px-4 py-2.5 rounded-full font-mono text-[10px] md:text-[11px] tracking-wider uppercase transition-all cursor-none ${
                activa
                  ? 'bg-[#B8442A] text-white font-semibold'
                  : 'bg-white/[0.02] border border-white/10 text-zinc-400 hover:text-white hover:border-[#D4A24C]/50'
              }`}
            >
              {cat.label}
            </button>
          );
        })}
      </div>

      {/* GRID DE CARDS */}
      <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence mode="popLayout">
          {productosFiltrados.map((p, idx) => (
            <motion.article
              key={p.id}
              layout
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.45, delay: idx * 0.06 }}
              onMouseEnter={() => handleHover(true)}
              onMouseLeave={() => handleHover(false)}
              className="group rounded-2xl border border-white/[0.05] bg-[#101D33]/60 overflow-hidden flex flex-col cursor-none transition-all duration-300 hover:border-[#B8442A]/40 hover:bg-[#101D33]"
            >
              {/* Imagen / placeholder con gradiente */}
              <div className={`relative aspect-[4/3] ${p.image} flex items-center justify-center overflow-hidden`}>
                <div className="absolute inset-0 bg-gradient-to-t from-[#070E1A]/60 to-transparent" />
                <span className="relative z-10 font-mono text-[9px] tracking-[0.25em] text-white/70 uppercase border border-white/20 px-3 py-1 rounded-full backdrop-blur-sm">
                  {labelCategoria(p.categoria)}
                </span>
                {/* Reflejo al hacer hover */}
                <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/[0.06] to-white/0 pointer-events-none transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
              </div>

              {/* Cuerpo */}
              <div className="p-5 flex flex-col flex-grow">
                <h3 className="text-lg font-display font-bold text-hueso group-hover:text-white transition-colors">
                  {p.nombre}
                </h3>
                <p className="text-[11px] text-zinc-400 font-light mt-1 leading-relaxed">
                  {p.descripcion}
                </p>

                {/* Specs */}
                <dl className="mt-4 grid grid-cols-2 gap-x-3 gap-y-2 border-t border-white/[0.05] pt-4 text-[10px] font-mono">
                  <div>
                    <dt className="text-zinc-500 uppercase tracking-wider">Medida</dt>
                    <dd className="text-zinc-200 mt-0.5">{p.dimensiones}</dd>
                  </div>
                  {p.rendimiento && (
                    <div>
                      <dt className="text-zinc-500 uppercase tracking-wider">Rendimiento</dt>
                      <dd className="text-zinc-200 mt-0.5">{p.rendimiento}</dd>
                    </div>
                  )}
                  {p.peso && (
                    <div>
                      <dt className="text-zinc-500 uppercase tracking-wider">Peso</dt>
                      <dd className="text-zinc-200 mt-0.5">{p.peso}</dd>
                    </div>
                  )}
                  <div>
                    <dt className="text-zinc-500 uppercase tracking-wider">Uso</dt>
                    <dd className="text-zinc-200 mt-0.5">{p.uso}</dd>
                  </div>
                </dl>

                {/* CTA */}
                <a
                  href="#contact"
                  onMouseEnter={() => handleHover(true)}
                  onMouseLeave={() => handleHover(false)}
                  className="mt-5 inline-flex items-center justify-between text-[11px] font-mono tracking-widest uppercase text-[#D4A24C] hover:text-white border border-[#D4A24C]/30 hover:border-[#D4A24C] rounded-lg px-4 py-2.5 transition-colors cursor-none"
                >
                  <span>Cotizar por WhatsApp</span>
                  <ArrowUpRight className="h-4 w-4" />
                </a>
              </div>
            </motion.article>
          ))}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}
