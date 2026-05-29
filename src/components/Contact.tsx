import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import { CursorState } from '../types';

// ⚠️ PENDIENTE: reemplazar por el número real de WhatsApp de Hatarisum.
// Formato internacional sin "+" ni espacios (ej. Perú: 51 + 9 dígitos => "51957577494").
const WHATSAPP_NUMERO = '51000000000';

interface ContactProps {
  setCursorState: React.Dispatch<React.SetStateAction<CursorState>>;
}

const intereses = [
  { key: 'junta', label: 'Armar una junta vecinal' },
  { key: 'contratista', label: 'Soy contratista / obra' },
  { key: 'cotizar', label: 'Solo cotizar' },
];

export default function Contact({ setCursorState }: ContactProps) {
  const [formData, setFormData] = useState({ nombre: '', telefono: '', mensaje: '', interes: 'junta' });
  const [enviado, setEnviado] = useState(false);

  const hover = (entering: boolean) => setCursorState({ type: entering ? 'hover' : 'default' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.nombre || !formData.telefono) return;

    const interesLabel = intereses.find((i) => i.key === formData.interes)?.label ?? '';
    const texto =
      `Hola Hatarisum 👋\n` +
      `Soy ${formData.nombre}.\n` +
      `Me interesa: ${interesLabel}.\n` +
      `Mi teléfono: ${formData.telefono}.\n` +
      (formData.mensaje ? `${formData.mensaje}` : '');

    const url = `https://wa.me/${WHATSAPP_NUMERO}?text=${encodeURIComponent(texto)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
    setEnviado(true);
  };

  return (
    <section
      id="contact"
      className="relative min-h-screen py-24 px-6 md:px-12 max-w-7xl mx-auto border-t border-white/[0.04] select-none"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">

        {/* COLUMNA IZQUIERDA — TEXTO Y CANALES */}
        <div className="lg:col-span-5 space-y-8">
          <div>
            <p className="font-mono text-[10px] tracking-[0.3em] text-[#B8442A] uppercase mb-2">
              HABLEMOS
            </p>
            <h2 className="text-3xl md:text-5xl font-display font-extrabold text-hueso tracking-tight">
              Arma tu junta o pide tu cotización
            </h2>
            <p className="text-zinc-300 text-sm font-light leading-relaxed mt-4 max-w-md">
              Cuéntanos qué necesitas y te respondemos por WhatsApp. Seas una familia organizando tu
              cuadra o un contratista pidiendo para tu obra, conversemos.
            </p>
          </div>

          {/* Canales */}
          <div className="border-t border-white/[0.05] pt-8 space-y-6">
            <span className="font-mono text-[9px] tracking-[0.2em] text-zinc-500 uppercase block">
              Nuestros canales
            </span>

            <div className="grid grid-cols-2 gap-4">
              <a
                href={`https://wa.me/${WHATSAPP_NUMERO}`}
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={() => hover(true)}
                onMouseLeave={() => hover(false)}
                className="group cursor-none border border-[#B8442A]/30 bg-[#B8442A]/10 p-4 rounded-xl hover:bg-[#B8442A]/20 transition-all text-left"
              >
                <span className="font-mono text-[8px] text-[#D4A24C] block uppercase mb-1">WhatsApp</span>
                <span className="text-xs font-mono text-hueso group-hover:text-white transition-colors">Escríbenos →</span>
              </a>

              <a
                href="#instagram"
                onMouseEnter={() => hover(true)}
                onMouseLeave={() => hover(false)}
                className="group cursor-none border border-white/[0.04] bg-white/[0.01] p-4 rounded-xl hover:bg-white/[0.03] hover:border-white/10 transition-all text-left"
              >
                <span className="font-mono text-[8px] text-zinc-500 block uppercase mb-1">Instagram</span>
                <span className="text-xs font-mono text-zinc-300 group-hover:text-white transition-colors">@hatarisum</span>
              </a>

              <a
                href="#facebook"
                onMouseEnter={() => hover(true)}
                onMouseLeave={() => hover(false)}
                className="group cursor-none border border-white/[0.04] bg-white/[0.01] p-4 rounded-xl hover:bg-white/[0.03] hover:border-white/10 transition-all text-left"
              >
                <span className="font-mono text-[8px] text-zinc-500 block uppercase mb-1">Facebook</span>
                <span className="text-xs font-mono text-zinc-300 group-hover:text-white transition-colors">Hatarisum</span>
              </a>

              <div className="border border-white/[0.04] bg-white/[0.01] p-4 rounded-xl text-left">
                <span className="font-mono text-[8px] text-zinc-500 block uppercase mb-1">Zona</span>
                <span className="text-xs font-mono text-zinc-300">Arequipa, Perú</span>
              </div>
            </div>
          </div>
        </div>

        {/* COLUMNA DERECHA — FORMULARIO */}
        <div className="lg:col-span-7 bg-[#0B1426] border border-white/[0.05] p-6 md:p-8 rounded-2xl relative shadow-2xl">

          <AnimatePresence mode="wait">
            {!enviado ? (
              <motion.form
                key="contact-form"
                onSubmit={handleSubmit}
                initial={{ opacity: 1 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-6"
              >
                {/* NOMBRE */}
                <div>
                  <label className="font-mono text-[9px] tracking-widest text-zinc-500 uppercase block mb-2">
                    ¿Cómo te llamas?
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.nombre}
                    onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                    className="w-full bg-[#070E1A] border border-white/5 rounded-lg px-4 py-3 text-sm font-sans text-hueso focus:outline-none focus:border-[#D4A24C] focus:ring-1 focus:ring-[#D4A24C]/20 transition-all cursor-none"
                    onMouseEnter={() => hover(true)}
                    onMouseLeave={() => hover(false)}
                  />
                </div>

                {/* TELÉFONO */}
                <div>
                  <label className="font-mono text-[9px] tracking-widest text-zinc-500 uppercase block mb-2">
                    Tu número de WhatsApp
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="9XX XXX XXX"
                    value={formData.telefono}
                    onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
                    className="w-full bg-[#070E1A] border border-white/5 rounded-lg px-4 py-3 text-sm font-sans text-hueso placeholder:text-zinc-600 focus:outline-none focus:border-[#D4A24C] focus:ring-1 focus:ring-[#D4A24C]/20 transition-all cursor-none"
                    onMouseEnter={() => hover(true)}
                    onMouseLeave={() => hover(false)}
                  />
                </div>

                {/* TIPO DE INTERÉS */}
                <div>
                  <label className="font-mono text-[9px] tracking-widest text-zinc-500 uppercase block mb-2">
                    ¿Qué necesitas?
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    {intereses.map((item) => (
                      <button
                        key={item.key}
                        type="button"
                        onClick={() => setFormData({ ...formData, interes: item.key })}
                        className={`px-3 py-2.5 rounded-lg font-mono text-[9px] tracking-wider uppercase transition-all border cursor-none text-center ${
                          formData.interes === item.key
                            ? 'bg-[#B8442A]/25 border-[#B8442A] text-white'
                            : 'bg-[#070E1A] border-white/5 text-zinc-400 hover:text-white hover:border-white/10'
                        }`}
                        onMouseEnter={() => hover(true)}
                        onMouseLeave={() => hover(false)}
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* MENSAJE */}
                <div>
                  <label className="font-mono text-[9px] tracking-widest text-zinc-500 uppercase block mb-2">
                    Cuéntanos un poco más (opcional)
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Ej. Somos 8 vecinos en Alto Selva Alegre, queremos King Kong para muro."
                    value={formData.mensaje}
                    onChange={(e) => setFormData({ ...formData, mensaje: e.target.value })}
                    className="w-full bg-[#070E1A] border border-white/5 rounded-lg px-4 py-3 text-sm font-sans text-hueso placeholder:text-zinc-600 focus:outline-none focus:border-[#D4A24C] focus:ring-1 focus:ring-[#D4A24C]/20 transition-all resize-none cursor-none"
                    onMouseEnter={() => hover(true)}
                    onMouseLeave={() => hover(false)}
                  />
                </div>

                {/* ENVIAR */}
                <button
                  type="submit"
                  className="w-full flex items-center justify-center space-x-2 text-xs font-mono tracking-widest text-white bg-[#B8442A] hover:bg-[#D4593A] font-semibold uppercase py-3.5 px-6 rounded-lg transition-all shadow-xl cursor-none"
                  onMouseEnter={() => hover(true)}
                  onMouseLeave={() => hover(false)}
                >
                  <span>Enviar por WhatsApp</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              </motion.form>
            ) : (
              <motion.div
                key="success-screen"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-12 text-center space-y-6"
              >
                <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-[#B8442A]/15 border border-[#D4593A] text-[#D4593A]">
                  <CheckCircle2 className="h-8 w-8" />
                </div>

                <div className="space-y-2">
                  <h3 className="text-xl md:text-2xl font-display font-bold text-hueso">
                    ¡Listo! Abrimos tu WhatsApp
                  </h3>
                  <p className="text-zinc-400 text-sm font-light max-w-md mx-auto leading-relaxed">
                    Te llevamos a la conversación con tu mensaje ya escrito. Solo dale enviar y
                    conversamos. Si no se abrió, escríbenos directo por WhatsApp.
                  </p>
                </div>

                <button
                  onClick={() => setEnviado(false)}
                  className="inline-flex items-center space-x-2 text-[10px] font-mono tracking-widest text-zinc-400 hover:text-white cursor-none"
                  onMouseEnter={() => hover(true)}
                  onMouseLeave={() => hover(false)}
                >
                  <span>Volver al formulario</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
