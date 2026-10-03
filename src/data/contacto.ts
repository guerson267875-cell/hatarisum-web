// Canales oficiales de Hatarisum

// Formato internacional sin "+" ni espacios
export const WHATSAPP_NUMERO = '51927185052';
export const WHATSAPP_VISIBLE = '+51 927 185 052';

export const waLink = (texto?: string) =>
  `https://wa.me/${WHATSAPP_NUMERO}${texto ? `?text=${encodeURIComponent(texto)}` : ''}`;

// Ubicación de nuestra fábrica (recojo en planta)
export const MAPS_FABRICA = 'https://maps.app.goo.gl/GRpEMRc4Y9hbj5vP7';

export const redes = [
  { red: 'Instagram', usuario: '@hatarisum.up', url: 'https://www.instagram.com/hatarisum.up/' },
  { red: 'Facebook', usuario: 'Hatarisum', url: 'https://www.facebook.com/1263079650217449' },
  { red: 'TikTok', usuario: '@hatarisum0', url: 'https://www.tiktok.com/@hatarisum0' },
];
