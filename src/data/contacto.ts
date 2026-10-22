// Canales oficiales de Hatarisum

// Formato internacional sin "+" ni espacios
export const WHATSAPP_NUMERO = '51927185052';
export const WHATSAPP_VISIBLE = '+51 927 185 052';

export const waLink = (texto?: string) =>
  `https://wa.me/${WHATSAPP_NUMERO}${texto ? `?text=${encodeURIComponent(texto)}` : ''}`;

// Ubicación de nuestra fábrica (recojo en planta). Misma dirección que el agente de WhatsApp.
export const MAPS_FABRICA = 'https://maps.app.goo.gl/GRpEMRc4Y9hbj5vP7';
export const FABRICA = { calle: 'Av. Vía Corpac, Zamácola', distrito: 'Cerro Colorado', ciudad: 'Arequipa' };
export const DIRECCION_FABRICA = `${FABRICA.calle}, ${FABRICA.distrito}, ${FABRICA.ciudad}`;

// Dirección pública de la web (canonical, sitemap, datos estructurados)
export const SITIO = 'https://hatarisum.pages.dev';

export const redes = [
  { red: 'Instagram', usuario: '@hatarisum.up', url: 'https://www.instagram.com/hatarisum.up/' },
  { red: 'Facebook', usuario: 'Hatarisum', url: 'https://www.facebook.com/1263079650217449' },
  { red: 'TikTok', usuario: '@hatarisum0', url: 'https://www.tiktok.com/@hatarisum0' },
];
