import React from 'react';
import { Plus } from 'lucide-react';
import { CursorState } from '../types';
import { preguntasFrecuentes } from '../data/faq';

interface PreguntasFrecuentesProps {
  setCursorState: React.Dispatch<React.SetStateAction<CursorState>>;
}

// Las mismas preguntas van en el HTML estático y en los datos estructurados (src/data/seo.ts).
export default function PreguntasFrecuentes({ setCursorState }: PreguntasFrecuentesProps) {
  const hover = (entering: boolean) =>
    setCursorState(entering ? { type: 'hover' } : { type: 'default' });

  return (
    <section
      id="preguntas"
      className="relative py-24 px-6 md:px-12 max-w-7xl mx-auto border-t border-white/[0.04]"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

        <div className="lg:col-span-4 space-y-6 select-none">
          <p className="font-mono text-[10px] tracking-[0.3em] text-[#B8442A] uppercase">
            PREGUNTAS FRECUENTES
          </p>
          <h2 className="text-3xl md:text-[52px] font-display font-extrabold tracking-tight text-hueso leading-[1.08]">
            Lo que más nos preguntan
          </h2>
          <p className="text-zinc-400 text-sm md:text-base font-sans font-light leading-relaxed max-w-sm">
            ¿Te queda otra duda? Escríbenos por WhatsApp y te respondemos.
          </p>
        </div>

        <div className="lg:col-span-8 divide-y divide-white/[0.06] border-y border-white/[0.06]">
          {preguntasFrecuentes().map((f) => (
            <details key={f.pregunta} className="group py-5">
              <summary
                onMouseEnter={() => hover(true)}
                onMouseLeave={() => hover(false)}
                className="cursor-none list-none flex items-start justify-between gap-6 font-display font-semibold text-base md:text-lg text-hueso [&::-webkit-details-marker]:hidden"
              >
                <h3>{f.pregunta}</h3>
                <Plus className="h-5 w-5 shrink-0 mt-1 text-[#D4A24C] transition-transform duration-300 group-open:rotate-45" />
              </summary>
              <p className="mt-3 text-zinc-300 text-sm md:text-[15px] font-sans font-light leading-relaxed max-w-2xl">
                {f.respuesta}
              </p>
            </details>
          ))}
        </div>

      </div>
    </section>
  );
}
