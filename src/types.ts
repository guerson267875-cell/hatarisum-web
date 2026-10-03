// Ladrillo con precio publicado (precio por millar, en soles)
export interface Producto {
  id: string;
  nombre: string;
  uso: string;               // uso típico, ej. "Muro que carga peso"
  descripcion: string;       // 1 frase para la ficha
  dimensiones: string;       // ej. "10 × 14 × 24 cm"
  peso: string;              // ej. "3.7 kg"
  rendimiento: string;       // ej. "34 por m² de muro"
  precioPlanta: number;      // precio de lista en planta
  precioPlantaPromo?: number; // precio de la promo de apertura (solo en planta)
  precioObra: number;        // puesto en obra, Arequipa (ya incluye llevarlo)
  image: string;             // clases tailwind del gradiente de la card
}

export interface CursorState {
  type: 'default' | 'hover' | 'view' | 'drag' | 'click';
  text?: string;
}
