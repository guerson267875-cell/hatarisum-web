import { Producto } from '../types';

// ============================================================
// PRECIOS — único punto de verdad de la web.
// Fuente: HATARISUM_Marketing_y_Distribucion/04_Conversion_y_Cierre/
//   agente-whatsapp/configuracion-workspace-v4-planta-y-obra.md
// (decisión de Guerson, 02/10/2026). Si cambian allá, cambiar aquí.
//
// Precio por millar (1,000 ladrillos), en soles.
// ============================================================

// La promo de apertura (S/ 1 el ladrillo, solo en planta) vence el 31/10/2026.
// Desde el 1/11 la web muestra sola el precio de lista, igual que el agente.
export const FIN_PROMO = new Date('2026-11-01T00:00:00-05:00');
export const promoVigente = (hoy: Date = new Date()) => hoy < FIN_PROMO;

export const precioEnPlanta = (p: Producto) =>
  p.precioPlantaPromo !== undefined && promoVigente() ? p.precioPlantaPromo : p.precioPlanta;

export const soles = (n: number) => `S/ ${n.toLocaleString('en-US')}`;

// Los 4 productos con precio publicado
export const productos: Producto[] = [
  {
    id: 'kk-h10',
    nombre: 'King Kong H-10',
    uso: 'Muro que carga peso',
    descripcion: 'El clásico para los muros de tu casa. Resistente, para soportar la estructura.',
    dimensiones: '10 × 14 × 24 cm',
    peso: '3.7 kg',
    rendimiento: '34 por m²',
    precioPlanta: 1100,
    precioPlantaPromo: 1000,
    precioObra: 1170,
    image: 'bg-gradient-to-br from-[#8A3320] via-[#B8442A] to-[#D4593A]',
  },
  {
    id: 'pandereta',
    nombre: 'Pandereta',
    uso: 'Tabiques y cercos',
    descripcion: 'Liviana y rápida de asentar, para divisiones y cercos que no cargan peso.',
    dimensiones: '10 × 14 × 22 cm',
    peso: '2.4 kg',
    rendimiento: '37 por m²',
    precioPlanta: 1100,
    precioPlantaPromo: 1000,
    precioObra: 1150,
    image: 'bg-gradient-to-br from-[#1A2B4A] via-[#B8442A] to-[#D4A24C]',
  },
  {
    id: 'hueco-12',
    nombre: 'Hueco 12',
    uso: 'Techo aligerado',
    descripcion: 'Para losa aligerada de 12 cm. Aligera el peso del techo.',
    dimensiones: '12 × 30 × 30 cm',
    peso: '6.5 kg',
    rendimiento: '9 por m²',
    precioPlanta: 2700,
    precioObra: 3180,
    image: 'bg-gradient-to-br from-[#1A2B4A] via-[#8A3320] to-[#D4593A]',
  },
  {
    id: 'hueco-15',
    nombre: 'Hueco 15',
    uso: 'Techo aligerado',
    descripcion: 'Para losa aligerada de 15 cm, en techos con más luz entre apoyos.',
    dimensiones: '15 × 30 × 30 cm',
    peso: '7.0 kg',
    rendimiento: '9 por m²',
    precioPlanta: 2700,
    precioObra: 3180,
    image: 'bg-gradient-to-br from-[#070E1A] via-[#B8442A] to-[#1A2B4A]',
  },
];

// Más de nuestra fábrica: sin precio publicado, se consulta por WhatsApp
export const otrosProductos = [
  'Bloqueta',
  'Hueco 20',
  'King Kong H-8',
  'King Kong H-9',
  'Tejas N°27, 36 y 40',
  'Pastelero 20×20 y 24×24',
];
