import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Network, MapPin, Building2 } from 'lucide-react';
import { Respaldo, CursorState } from '../types';

interface CollectiveProps {
  setCursorState: React.Dispatch<React.SetStateAction<CursorState>>;
}

export default function Collective({ setCursorState }: CollectiveProps) {
  const [zonaActiva, setZonaActiva] = useState<string | null>('Alto Selva Alegre');

  // Zonas de Arequipa atendidas (coordenadas sobre un mapa estilizado)
  const zonas = [
    { name: 'Cerro Colorado', x: '32%', y: '34%', detalle: 'Cono Norte y alrededores' },
    { name: 'Cayma', x: '46%', y: '28%', detalle: 'Zona norte de la ciudad' },
    { name: 'Alto Selva Alegre', x: '60%', y: '40%', detalle: 'Asentamientos en ladera' },
    { name: 'Paucarpata', x: '64%', y: '62%', detalle: 'Zona este metropolitana' },
    { name: 'José L. Bustamante', x: '50%', y: '70%', detalle: 'Zona sur de Arequipa' },
  ];

  // Punto central (depósito) del que parten las rutas
  const depot = { x: '50%', y: '50%' };

  const respaldos: Respaldo[] = [
    {
      id: 'r-1',
      nombre: 'Hatarisum',
      rol: 'Organización y logística',
      zona: 'Arequipa',
      image: 'H',
      detalle: 'Juntamos a los vecinos y movemos el ladrillo a la obra.',
    },
    {
      id: 'r-2',
      nombre: 'Ladrillera Oro Rojo',
      rol: 'Fabricante — calidad de planta',
      zona: 'Arequipa',
      image: 'O',
      detalle: 'Grupo Ladrilleras Oro Rojo AQP. Catálogo completo de fábrica.',
    },
    {
      id: 'r-3',
      nombre: 'Atención directa',
      rol: 'Trato personalizado',
      zona: 'WhatsApp',
      image: '＋',
      detalle: 'Conversas con una persona, no con un bot. Te asesoramos en tu pedido.',
    },
  ];

  const handleZonaHover = (entering: boolean, name?: string) => {
    setZonaActiva(entering ? name || null : 'Alto Selva Alegre');
    setCursorState(entering ? { type: 'view', text: name?.toUpperCase() } : { type: 'default' });
  };

  return (
    <section
      id="collective"
      className="relative min-h-screen py-24 px-6 md:px-12 max-w-7xl mx-auto border-t border-white/[0.04] select-none"
    >
      {/* ENCABEZADO */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-end mb-16">
        <div className="col-span-12 md:col-span-8">
          <p className="font-mono text-[10px] tracking-[0.3em] text-[#D4A24C] uppercase mb-2">
            DÓNDE OPERAMOS
          </p>
          <h2 className="text-3xl md:text-5xl font-display font-extrabold text-hueso tracking-tight">
            Cerca de tu barrio
          </h2>
        </div>
        <div className="col-span-12 md:col-span-4">
          <p className="text-zinc-400 text-xs font-light leading-relaxed max-w-sm">
            Operamos en Arequipa metropolitana. Llevamos el ladrillo desde la planta hasta tu calle,
            con el respaldo de Ladrillera Oro Rojo.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

        {/* MAPA DE COBERTURA INTERACTIVO */}
        <div className="col-span-12 lg:col-span-7 bg-[#0B1426] border border-white/[0.05] rounded-2xl p-6 md:p-8 aspect-[16/10] relative overflow-hidden flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-white/[0.05] pb-4 mb-4">
              <div className="flex items-center space-x-2">
                <Network className="h-4 w-4 text-[#D4593A]" />
                <span className="font-mono text-[10px] tracking-wider text-zinc-300 uppercase">
                  Cobertura en Arequipa
                </span>
              </div>
              <span className="font-mono text-[8px] text-zinc-600 bg-white/5 px-2 py-0.5 rounded">
                HATARISUM // ZONAS
              </span>
            </div>
            <p className="font-mono text-[8px] text-zinc-500 tracking-widest uppercase">
              TOCA O PASA EL CURSOR POR LAS ZONAS PARA VER LAS RUTAS
            </p>
          </div>

          {/* Lienzo del mapa */}
          <div className="relative flex-grow h-44 sm:h-64 my-6 border border-dashed border-white/[0.04] rounded-lg bg-[#070E1A] overflow-hidden">

            {/* Líneas que conectan el depósito central con cada zona */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none">
              {zonas.map((z, i) => (
                <g key={i}>
                  <line
                    x1={depot.x}
                    y1={depot.y}
                    x2={z.x}
                    y2={z.y}
                    stroke="#D4A24C"
                    strokeWidth="0.6"
                    className="opacity-20"
                  />
                  <circle
                    cx={z.x}
                    cy={z.y}
                    r="18"
                    fill="none"
                    stroke="#B8442A"
                    strokeWidth="0.5"
                    className="opacity-15 animate-ping"
                    style={{ animationDuration: '4s' }}
                  />
                </g>
              ))}
            </svg>

            {/* Depósito central */}
            <div
              className="absolute z-10"
              style={{ left: depot.x, top: depot.y, transform: 'translate(-50%, -50%)' }}
            >
              <div className="h-3 w-3 rounded-full bg-[#D4A24C] shadow-[0_0_12px_rgba(212,162,76,0.8)]" />
            </div>

            {/* Pines de zona */}
            {zonas.map((z) => {
              const isSel = zonaActiva === z.name;
              return (
                <div
                  key={z.name}
                  className="absolute z-10 cursor-none"
                  style={{ left: z.x, top: z.y, transform: 'translate(-50%, -50%)' }}
                  onMouseEnter={() => handleZonaHover(true, z.name)}
                  onMouseLeave={() => handleZonaHover(false)}
                >
                  <div className="relative group/pin">
                    <div className={`h-8 w-8 rounded-full border flex items-center justify-center transition-all duration-300 ${
                      isSel
                        ? 'border-[#D4593A] bg-[#B8442A]/20 scale-125'
                        : 'border-white/10 group-hover/pin:border-white/40'
                    }`}>
                      <div className={`h-2.5 w-2.5 rounded-full transition-colors ${
                        isSel ? 'bg-[#D4593A]' : 'bg-white/40 group-hover/pin:bg-white'
                      }`} />
                    </div>
                    <span className="hidden md:block absolute left-10 top-1/2 -translate-y-1/2 font-mono text-[9px] font-bold text-white tracking-widest uppercase bg-black/80 px-2 py-0.5 rounded border border-white/10 shadow-lg pointer-events-none whitespace-nowrap">
                      {z.name}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Barra de detalle */}
          <div className="border-t border-white/[0.05] pt-4 flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-2 sm:space-y-0 text-zinc-500 font-mono text-[9px]">
            <span className="flex items-center">
              <MapPin className="h-3.5 w-3.5 text-[#D4593A] mr-1.5 animate-pulse" />
              {zonaActiva ? zonaActiva.toUpperCase() : 'ELIGE UNA ZONA'}
            </span>
            <span className="text-zinc-400 text-right uppercase">
              {zonaActiva ? zonas.find((z) => z.name === zonaActiva)?.detalle : 'Cobertura: Arequipa metropolitana'}
            </span>
          </div>
        </div>

        {/* TARJETAS DE RESPALDO */}
        <div className="col-span-12 lg:col-span-5 space-y-6">
          <span className="font-mono text-[9px] tracking-[0.2em] text-[#D4A24C] uppercase block border-b border-white/[0.05] pb-3 mb-2">
            Quién está detrás
          </span>

          <div className="space-y-4">
            {respaldos.map((r) => (
              <div
                key={r.id}
                className="flex items-center space-x-4 p-4 rounded-xl border border-white/[0.04] bg-white/[0.01] hover:bg-white/[0.02] hover:border-[#B8442A]/30 transition-all group"
              >
                <div className="h-12 w-12 shrink-0 rounded-full bg-[#070E1A] border border-white/10 flex items-center justify-center font-display font-bold text-hueso group-hover:bg-[#B8442A] group-hover:text-white transition-colors duration-300">
                  {r.image}
                </div>

                <div className="flex-grow">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-display font-bold text-hueso group-hover:text-white">
                      {r.nombre}
                    </h4>
                    <span className="text-[9px] font-mono text-zinc-500 flex items-center">
                      <Building2 className="h-3 w-3 mr-1 text-zinc-600" />
                      {r.zona}
                    </span>
                  </div>
                  <p className="text-xs text-[#D4A24C] font-sans font-light mt-0.5 leading-tight">
                    {r.rol}
                  </p>
                  <span className="text-[11px] font-sans text-zinc-400 block mt-1.5 leading-snug">
                    {r.detalle}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
