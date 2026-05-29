import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, Users, Building2, Truck, ShieldCheck } from 'lucide-react';
import { Service, CursorState } from '../types';

interface ServicesProps {
  setCursorState: React.Dispatch<React.SetStateAction<CursorState>>;
}

export default function Services({ setCursorState }: ServicesProps) {
  const [activeService, setActiveService] = useState<string | null>('serv-1');

  const servicesData: Service[] = [
    {
      id: 'serv-1',
      number: '01',
      title: 'Línea comunitaria — junta vecinal',
      tagline: 'PARA FAMILIAS Y BARRIOS (AAHH)',
      description:
        'Si vives en un asentamiento humano o barrio en crecimiento, no compres solo. Junta a tus vecinos, sumen sus pedidos hasta llegar al millar y consíganlo al precio de mayorista. Nosotros coordinamos todo y lo dejamos en la obra.',
      capabilities: [
        'Arma tu grupo de vecinos',
        'Confirmamos cuánto falta para el millar',
        'Coordinamos el pago de forma clara',
        'Entregamos el ladrillo en tu calle',
      ],
    },
    {
      id: 'serv-2',
      number: '02',
      title: 'Línea distribuidor — contratistas y obras',
      tagline: 'PARA CONTRATISTAS Y OBRAS FORMALES',
      description:
        'Atendemos a contratistas, maestros y obras formales como distribuidor de Ladrillera Oro Rojo. Cotización por millar puesto en obra, volumen disponible y entrega programada según tu cronograma.',
      capabilities: [
        'Cotización por millar puesto en obra',
        'Volumen y stock disponible',
        'Comprobante y factura',
        'Entrega programada a tu obra',
      ],
    },
    {
      id: 'serv-3',
      number: '03',
      title: 'Logística y entrega',
      tagline: 'DE LA PLANTA A TU OBRA',
      description:
        'Movemos el ladrillo desde la planta hasta tu calle u obra en Arequipa. El transporte se calcula aparte y se suma transparente al precio de planta, sin sorpresas.',
      capabilities: [
        'Transporte cotizado por separado',
        'Cobertura en Arequipa metropolitana',
        'Coordinación de fecha y hora',
        'Descarga en el punto acordado',
      ],
    },
    {
      id: 'serv-4',
      number: '04',
      title: 'Respaldo Oro Rojo',
      tagline: 'CALIDAD DE FÁBRICA',
      description:
        'El ladrillo viene de Grupo Ladrilleras Oro Rojo AQP. Trabajamos con su catálogo de muro, techo, teja y pastelero, para que tengas calidad de fábrica con la cercanía de un distribuidor local.',
      capabilities: [
        'Catálogo completo Oro Rojo',
        'King Kong, pandereta y bloqueta',
        'Ladrillo de techo y teja',
        'Pastelero para pisos y azotea',
      ],
    },
  ];

  const handleServiceClick = (id: string) => {
    setActiveService(activeService === id ? null : id);
  };

  const getIcon = (num: string) => {
    switch (num) {
      case '01': return <Users className="h-5 w-5 text-[#D4593A]" />;
      case '02': return <Building2 className="h-5 w-5 text-[#D4A24C]" />;
      case '03': return <Truck className="h-5 w-5 text-[#B8442A]" />;
      default: return <ShieldCheck className="h-5 w-5 text-[#D4593A]" />;
    }
  };

  return (
    <section
      id="services"
      className="relative min-h-screen py-24 px-6 md:px-12 max-w-7xl mx-auto border-t border-white/[0.04] select-none"
    >
      {/* ENCABEZADO */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-end mb-20">
        <div className="col-span-12 md:col-span-8">
          <p className="font-mono text-[10px] tracking-[0.3em] text-[#B8442A] uppercase mb-2">
            CÓMO COMPRAS CON NOSOTROS
          </p>
          <h2 className="text-3xl md:text-5xl font-display font-extrabold text-hueso tracking-tight">
            Dos caminos, un solo precio justo
          </h2>
        </div>
        <div className="col-span-12 md:col-span-4">
          <p className="text-zinc-400 text-xs font-light leading-relaxed max-w-md">
            Seas una familia organizando tu cuadra o un contratista pidiendo para tu obra, el ladrillo
            te llega al mismo precio de millar. Así funciona.
          </p>
        </div>
      </div>

      {/* ACORDEÓN */}
      <div className="border-t border-white/5 space-y-1">
        {servicesData.map((s) => {
          const isOpen = activeService === s.id;

          return (
            <div
              key={s.id}
              className={`border-b border-white/5 transition-all duration-300 ${
                isOpen ? 'bg-white/[0.01]' : 'hover:bg-white/[0.005]'
              }`}
            >
              <button
                onClick={() => handleServiceClick(s.id)}
                onMouseEnter={() => setCursorState({ type: 'hover' })}
                onMouseLeave={() => setCursorState({ type: 'default' })}
                className="w-full flex items-center justify-between py-8 text-left cursor-none group"
              >
                <div className="flex items-center space-x-6 md:space-x-8 pr-4">
                  <span className="font-mono text-zinc-500 text-xs md:text-sm">
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

                <div className="flex items-center space-x-4">
                  <div className="hidden sm:flex p-2 rounded-full bg-[#070E1A] border border-white/10">
                    {getIcon(s.number)}
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

              {/* CUERPO EXPANDIBLE */}
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.35, ease: 'easeInOut' }}
                    className="overflow-hidden"
                  >
                    <div className="pb-8 pt-2 pl-12 md:pl-16 pr-6 grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
                      {/* Descripción */}
                      <div className="md:col-span-7">
                        <p className="text-sm text-zinc-300 font-sans font-light leading-relaxed max-w-xl">
                          {s.description}
                        </p>
                      </div>

                      {/* Pasos / incluye */}
                      <div className="md:col-span-5 bg-[#070E1A]/50 p-5 rounded-lg border border-white/[0.04]">
                        <span className="font-mono text-[9px] tracking-[0.25em] text-zinc-500 uppercase block mb-3 border-b border-white/[0.04] pb-2">
                          PASOS / INCLUYE
                        </span>
                        <ul className="space-y-2">
                          {s.capabilities.map((cap, capIdx) => (
                            <li key={capIdx} className="flex items-center space-x-2.5">
                              <div className="h-1.5 w-1.5 rounded-full bg-[#B8442A]" />
                              <span className="text-[12px] font-sans text-zinc-300">
                                {cap}
                              </span>
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
    </section>
  );
}
