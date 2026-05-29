import { Producto, CategoriaProducto } from '../types';

// ============================================================
// CATÁLOGO — Ladrillera Oro Rojo (datos reales, ver foto en
// "Precios Ladrilleria Oro Rojo/"). Único punto de verdad del
// catálogo. Estructura estilo ladrilloslark.pe/productos/:
// pestañas por aplicación + grid de cards.
//
// NOTA: las imágenes son placeholders (gradiente). Reemplazar
// `image` por <img src> cuando lleguen las fotos reales.
// ============================================================

export const categorias: { value: CategoriaProducto; label: string }[] = [
  { value: 'muro', label: 'Ladrillos para Muro' },
  { value: 'techo', label: 'Ladrillos para Techo' },
  { value: 'tejas', label: 'Tejas' },
  { value: 'pisos', label: 'Pisos / Pastelero' },
];

export const productos: Producto[] = [
  // ---------- MURO ----------
  {
    id: 'kk-h8',
    nombre: 'King Kong H-8',
    categoria: 'muro',
    dimensiones: '8 × 13 × 22 cm',
    peso: '2.2 kg',
    rendimiento: '45 und/m²',
    uso: 'Tabiquería liviana',
    descripcion: 'Ladrillo liviano de 8 huecos, ideal para tabiques y divisiones que no cargan peso.',
    accentColor: '#B8442A',
    image: 'bg-gradient-to-br from-[#8A3320] via-[#B8442A] to-[#1A2B4A]',
  },
  {
    id: 'kk-h9',
    nombre: 'King Kong H-9',
    categoria: 'muro',
    dimensiones: '9 × 14 × 24 cm',
    peso: '3.4 kg',
    rendimiento: '37 und/m²',
    uso: 'Muros',
    descripcion: 'Formato intermedio de 9 huecos para muros de vivienda con buen rendimiento por m².',
    accentColor: '#D4593A',
    image: 'bg-gradient-to-br from-[#B8442A] via-[#D4593A] to-[#1A2B4A]',
  },
  {
    id: 'kk-h10',
    nombre: 'King Kong H-10',
    categoria: 'muro',
    dimensiones: '10 × 14 × 24 cm',
    peso: '3.7 kg',
    rendimiento: '34 und/m²',
    uso: 'Muro portante',
    descripcion: 'El clásico para muro portante. Resistente, pensado para soportar la estructura de tu casa.',
    accentColor: '#B8442A',
    image: 'bg-gradient-to-br from-[#8A3320] via-[#B8442A] to-[#D4593A]',
  },
  {
    id: 'pandereta',
    nombre: 'Pandereta',
    categoria: 'muro',
    dimensiones: '10 × 14 × 22 cm',
    peso: '2.4 kg',
    rendimiento: '37 und/m²',
    uso: 'Tabiquería no portante',
    descripcion: 'Ladrillo liviano para tabiques y cercos. Rápido de asentar y económico.',
    accentColor: '#D4A24C',
    image: 'bg-gradient-to-br from-[#1A2B4A] via-[#B8442A] to-[#D4A24C]',
  },
  {
    id: 'bloqueta',
    nombre: 'Bloqueta',
    categoria: 'muro',
    dimensiones: '12 × 17 × 28 cm',
    peso: '4.6 kg',
    rendimiento: '18 und/m²',
    uso: 'Muros / cerco',
    descripcion: 'Gran formato que cubre más por unidad. Ideal para cercos y muros que avanzan rápido.',
    accentColor: '#1A2B4A',
    image: 'bg-gradient-to-br from-[#070E1A] via-[#1A2B4A] to-[#B8442A]',
  },

  // ---------- TECHO ----------
  {
    id: 'hueco-12',
    nombre: 'Hueco 12',
    categoria: 'techo',
    dimensiones: '12 × 30 × 30 cm',
    peso: '6.5 kg',
    rendimiento: '9 und/m²',
    uso: 'Aligerado de techo',
    descripcion: 'Ladrillo de techo para losa aligerada de 12 cm. Aligera el peso y mejora el aislamiento.',
    accentColor: '#D4593A',
    image: 'bg-gradient-to-br from-[#1A2B4A] via-[#8A3320] to-[#D4593A]',
  },
  {
    id: 'hueco-15',
    nombre: 'Hueco 15',
    categoria: 'techo',
    dimensiones: '15 × 30 × 30 cm',
    peso: '7.0 kg',
    rendimiento: '9 und/m²',
    uso: 'Aligerado de techo',
    descripcion: 'Para losas aligeradas de 15 cm, en techos con mayor luz entre apoyos.',
    accentColor: '#B8442A',
    image: 'bg-gradient-to-br from-[#070E1A] via-[#B8442A] to-[#1A2B4A]',
  },
  {
    id: 'hueco-20',
    nombre: 'Hueco 20',
    categoria: 'techo',
    dimensiones: '20 × 30 × 30 cm',
    rendimiento: '9 und/m²',
    uso: 'Aligerado de techo',
    descripcion: 'El de mayor altura para losas de 20 cm, en techos que cubren grandes distancias.',
    accentColor: '#D4A24C',
    image: 'bg-gradient-to-br from-[#1A2B4A] via-[#D4A24C] to-[#8A3320]',
  },

  // ---------- TEJAS ----------
  {
    id: 'teja-27',
    nombre: 'Teja N°27',
    categoria: 'tejas',
    dimensiones: '27 cm',
    uso: 'Cobertura / techo a dos aguas',
    descripcion: 'Teja de arcilla de 27 cm para techos inclinados con buen acabado tradicional.',
    accentColor: '#B8442A',
    image: 'bg-gradient-to-br from-[#8A3320] via-[#B8442A] to-[#D4593A]',
  },
  {
    id: 'teja-36',
    nombre: 'Teja N°36',
    categoria: 'tejas',
    dimensiones: '36 cm',
    uso: 'Cobertura / techo a dos aguas',
    descripcion: 'Teja de 36 cm que cubre más superficie por pieza en techos a dos aguas.',
    accentColor: '#D4593A',
    image: 'bg-gradient-to-br from-[#B8442A] via-[#D4593A] to-[#1A2B4A]',
  },
  {
    id: 'teja-40',
    nombre: 'Teja N°40',
    categoria: 'tejas',
    dimensiones: '40 cm',
    uso: 'Cobertura / techo a dos aguas',
    descripcion: 'La teja de mayor formato, para coberturas amplias con menos piezas.',
    accentColor: '#D4A24C',
    image: 'bg-gradient-to-br from-[#1A2B4A] via-[#B8442A] to-[#D4A24C]',
  },

  // ---------- PISOS / PASTELERO ----------
  {
    id: 'pastelero-20',
    nombre: 'Pastelero 20×20',
    categoria: 'pisos',
    dimensiones: '20 × 20 cm',
    uso: 'Piso / acabado de azotea',
    descripcion: 'Ladrillo pastelero para pisos y acabado de azoteas. Protege la losa y da terminación.',
    accentColor: '#B8442A',
    image: 'bg-gradient-to-br from-[#070E1A] via-[#1A2B4A] to-[#B8442A]',
  },
  {
    id: 'pastelero-24',
    nombre: 'Pastelero 24×24',
    categoria: 'pisos',
    dimensiones: '24 × 24 cm',
    uso: 'Piso / acabado de azotea',
    descripcion: 'Formato de 24 cm que cubre más por pieza en azoteas y patios.',
    accentColor: '#D4593A',
    image: 'bg-gradient-to-br from-[#1A2B4A] via-[#8A3320] to-[#D4593A]',
  },
];
