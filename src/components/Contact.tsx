import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, ArrowRight, ArrowUpRight, MapPin } from 'lucide-react';
import { CursorState } from '../types';
import { waLink, WHATSAPP_VISIBLE, MAPS_FABRICA, redes } from '../data/contacto';

interface ContactProps {
  setCursorState: React.Dispatch<React.SetStateAction<CursorState>>;
}

const perfiles = [
  { key: 'familia', label: 'Construyo mi casa' },
  { key: 'maestro', label: 'Soy maestro de obra' },
  { key: 'empresa', label: 'Inmobiliaria o contratista' },
];

const modalidades = [
  { key: 'planta', label: 'Lo recojo en planta' },
  { key: 'obra', label: 'Que me lo lleven' },
  { key: 'nose', label: 'Todavía no sé' },
];

export default function Contact({ setCursorState }: ContactProps) {
  const [formData, setFormData] = useState({ nombre: '', perfil: 'familia', modalidad: 'nose', mensaje: '' });
  const [enviado, setEnviado] = useState(false);

  const hover = (entering: boolean) => setCursorState({ type: entering ? 'hover' : 'default' });

  // El teléfono no se pide: llega solo con el chat de WhatsApp
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.nombre.trim()) return;

    const perfil = perfiles.find((i) => i.key === formData.perfil)?.label ?? '';
    const modalidad = modalidades.find((i) => i.key === formData.modalidad)?.label ?? '';
    const texto =
      `Hola Hatarisum 👋\n` +
      `Soy ${formData.nombre.trim()}. ${perfil}.\n` +
      `${modalidad}.\n` +
      (formData.mensaje.trim() ? formData.mensaje.trim() : 'Quiero cotizar ladrillo.');

    window.open(waLink(texto), '_blank', 'noopener,noreferrer');
    setEnviado(true);
  };

  const chip = (activo: boolean) =>
    `px-3 py-2.5 rounded-lg font-mono text-[10px] tracking-wider uppercase transition-all border cursor-none text-center ${
      activo
        ? 'bg-[#B8442A]/25 border-[#B8442A] text-white'
        : 'bg-[#070E1A] border-white/5 text-zinc-400 hover:text-white hover:border-white/10'
    }`;

  return (
    <section
      id="contact"
      className="relative py-24 px-6 md:px-12 max-w-7xl mx-auto border-t border-white/[0.04] select-none"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">

        {/* COLUMNA IZQUIERDA — TEXTO Y CANALES */}
        <div className="lg:col-span-5 space-y-8">
          <div>
            <p className="font-mono text-[10px] tracking-[0.3em] text-[#B8442A] uppercase mb-2">
              HABLEMOS
            </p>
            <h2 className="text-3xl md:text-5xl font-display font-extrabold text-hueso tracking-tight">
              Cotiza por WhatsApp
            </h2>
            <p className="text-zinc-300 text-sm font-light leading-relaxed mt-4 max-w-md">
              Cuéntanos qué vas a construir y te respondemos por WhatsApp con el precio de lo que
              necesitas, en planta o puesto en tu obra.
            </p>
          </div>

          {/* Canales */}
          <div className="border-t border-white/[0.05] pt-8 space-y-4">
            <a
              href={waLink('Hola Hatarisum, quiero cotizar ladrillo.')}
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={() => hover(true)}
              onMouseLeave={() => hover(false)}
              className="group cursor-none flex items-center justify-between border border-[#B8442A]/30 bg-[#B8442A]/10 p-4 rounded-xl hover:bg-[#B8442A]/20 transition-all"
            >
              <span>
                <span className="font-mono text-[9px] tracking-widest text-[#D4A24C] block uppercase mb-1">WhatsApp</span>
                <span className="text-base font-display font-bold text-hueso group-hover:text-white transition-colors">{WHATSAPP_VISIBLE}</span>
              </span>
              <ArrowUpRight className="h-5 w-5 text-[#D4A24C]" />
            </a>

            <div className="grid grid-cols-2 gap-3">
              {redes.map((r) => (
                <a
                  key={r.red}
                  href={r.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  onMouseEnter={() => hover(true)}
                  onMouseLeave={() => hover(false)}
                  className="group cursor-none border border-white/[0.06] bg-[#0B1426]/80 backdrop-blur-sm p-4 rounded-xl hover:border-white/15 transition-all text-left"
                >
                  <span className="font-mono text-[9px] tracking-widest text-zinc-500 block uppercase mb-1">{r.red}</span>
                  <span className="text-xs font-mono text-zinc-300 group-hover:text-white transition-colors break-all">{r.usuario}</span>
                </a>
              ))}
              <a
                href={MAPS_FABRICA}
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={() => hover(true)}
                onMouseLeave={() => hover(false)}
                className="group cursor-none border border-white/[0.06] bg-[#0B1426]/80 backdrop-blur-sm p-4 rounded-xl hover:border-white/15 transition-all text-left"
              >
                <span className="font-mono text-[9px] tracking-widest text-zinc-500 block uppercase mb-1">Fábrica</span>
                <span className="text-xs font-mono text-zinc-300 group-hover:text-white transition-colors inline-flex items-center gap-1">
                  <MapPin className="h-3.5 w-3.5 text-[#D4593A]" /> Ver mapa
                </span>
              </a>
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
                  <label htmlFor="cf-nombre" className="font-mono text-[9px] tracking-widest text-zinc-500 uppercase block mb-2">
                    ¿Cómo te llamas?
                  </label>
                  <input
                    id="cf-nombre"
                    type="text"
                    required
                    autoComplete="given-name"
                    value={formData.nombre}
                    onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                    className="w-full bg-[#070E1A] border border-white/5 rounded-lg px-4 py-3 text-base md:text-sm font-sans text-hueso focus:outline-none focus:border-[#D4A24C] focus:ring-1 focus:ring-[#D4A24C]/20 transition-all cursor-none"
                    onMouseEnter={() => hover(true)}
                    onMouseLeave={() => hover(false)}
                  />
                </div>

                {/* PERFIL */}
                <div>
                  <span className="font-mono text-[9px] tracking-widest text-zinc-500 uppercase block mb-2">
                    ¿Quién eres?
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    {perfiles.map((item) => (
                      <button
                        key={item.key}
                        type="button"
                        aria-pressed={formData.perfil === item.key}
                        onClick={() => setFormData({ ...formData, perfil: item.key })}
                        className={chip(formData.perfil === item.key)}
                        onMouseEnter={() => hover(true)}
                        onMouseLeave={() => hover(false)}
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* MODALIDAD */}
                <div>
                  <span className="font-mono text-[9px] tracking-widest text-zinc-500 uppercase block mb-2">
                    ¿Cómo lo quieres?
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    {modalidades.map((item) => (
                      <button
                        key={item.key}
                        type="button"
                        aria-pressed={formData.modalidad === item.key}
                        onClick={() => setFormData({ ...formData, modalidad: item.key })}
                        className={chip(formData.modalidad === item.key)}
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
                  <label htmlFor="cf-mensaje" className="font-mono text-[9px] tracking-widest text-zinc-500 uppercase block mb-2">
                    ¿Qué vas a construir? (opcional)
                  </label>
                  <textarea
                    id="cf-mensaje"
                    rows={4}
                    placeholder="Ej. Voy a levantar un cuarto en Cerro Colorado, necesito King Kong."
                    value={formData.mensaje}
                    onChange={(e) => setFormData({ ...formData, mensaje: e.target.value })}
                    className="w-full bg-[#070E1A] border border-white/5 rounded-lg px-4 py-3 text-base md:text-sm font-sans text-hueso placeholder:text-zinc-600 focus:outline-none focus:border-[#D4A24C] focus:ring-1 focus:ring-[#D4A24C]/20 transition-all resize-none cursor-none"
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
                    Tu mensaje ya está escrito: solo dale enviar. Si no se abrió, escríbenos al{' '}
                    {WHATSAPP_VISIBLE}.
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
