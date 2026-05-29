// Catálogo de producto (estilo ladrilloslark.pe — pestañas por aplicación)
export type CategoriaProducto = 'muro' | 'techo' | 'tejas' | 'pisos';

export interface Producto {
  id: string;
  nombre: string;
  categoria: CategoriaProducto;
  dimensiones: string;       // ej. "10 × 14 × 24 cm"
  peso?: string;             // ej. "3.7 kg"
  rendimiento?: string;      // ej. "34 und/m²"
  uso: string;               // uso típico, ej. "Muro portante"
  descripcion: string;       // 1 frase para la ficha
  accentColor: string;       // color de acento de la card (paleta Hatarisum)
  image: string;             // clases tailwind del gradiente placeholder
}

export interface Service {
  id: string;
  title: string;
  number: string;
  tagline: string;
  description: string;
  capabilities: string[];
}

export interface Respaldo {
  id: string;
  nombre: string;
  rol: string;
  zona: string;
  image: string;   // letra del monograma o iniciales
  detalle: string;
}

export interface CursorState {
  type: 'default' | 'hover' | 'view' | 'drag' | 'click';
  text?: string;
}

// Solo español por ahora. Estructura lista para sumar 'qu' (quechua) puntual después.
export type Lang = 'es';
