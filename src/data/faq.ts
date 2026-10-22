import { productos, precioPlantaTexto, soles, PRECIOS_REVISADOS } from './productos';
import { WHATSAPP_VISIBLE, DIRECCION_FABRICA } from './contacto';

// ============================================================
// PREGUNTAS FRECUENTES — las ve la gente en la web (sección «Preguntas») y las leen los
// buscadores y las IA (HTML estático, datos estructurados y llms.txt, ver seo.ts).
// Precios, medidas y rendimiento salen de productos.ts: no escribir cifras a mano aquí.
// ============================================================

export interface Pregunta {
  pregunta: string;
  respuesta: string;
}

const [kk, pandereta, hueco12] = productos;

export const preguntasFrecuentes = (hoy: Date = new Date()): Pregunta[] => [
  {
    pregunta: '¿Qué ladrillo comprar para construir mi casa en Arequipa?',
    respuesta:
      'Depende de la parte de la obra. Para los muros que cargan peso se usa el King Kong H-10; ' +
      'para tabiques y cercos que no cargan peso, la pandereta; y para el techo aligerado, el ' +
      'Hueco 12 (losa de 17 cm) o el Hueco 15 (losa de 20 cm). En Hatarisum los cuatro salen de ' +
      'nuestra fábrica Oro Rojo, en Arequipa, y se venden por millar. La elección final la ' +
      'confirma tu maestro de obra o tu ingeniero.',
  },
  {
    pregunta: '¿Cuánto cuesta el millar de ladrillo en Arequipa?',
    respuesta:
      'Precio por millar en Hatarisum, en planta y puesto en tu obra: ' +
      productos
        .map((p) => `${p.nombre}, ${precioPlantaTexto(p, hoy)} en planta y ${soles(p.precioObra)} en obra`)
        .join('; ') +
      '. El precio en obra ya incluye llevarlo dentro de Arequipa. ' +
      `Precios revisados el ${PRECIOS_REVISADOS}.`,
  },
  {
    pregunta: '¿Cuántos ladrillos entran en un metro cuadrado?',
    respuesta:
      `Con nuestros ladrillos: King Kong H-10, ${kk.rendimiento} de muro; pandereta, ` +
      `${pandereta.rendimiento} de tabique; Hueco 12 o Hueco 15, ${hueco12.rendimiento} de techo ` +
      'aligerado. Por ejemplo, un cuarto de 3 × 3 m con muros de 2.4 m de alto tiene unos 29 m² ' +
      'de muro: necesitas cerca de 1,000 King Kong, un millar. Son cuentas aproximadas; la ' +
      'cantidad exacta la define tu maestro de obra.',
  },
  {
    pregunta: '¿Llevan el ladrillo hasta la obra? ¿Cobran flete?',
    respuesta:
      'Sí. Te lo llevamos a tu obra en Arequipa y el precio puesto en obra ya incluye llevarlo: ' +
      'no cobramos flete aparte. Dinos en qué zona es tu obra y si entra un camión; un asesor ' +
      'confirma la cobertura y el día de entrega. Si prefieres, lo recoges en nuestra fábrica ' +
      'con tu transporte, al precio en planta.',
  },
  {
    pregunta: '¿Puedo comprar el ladrillo por partes, mientras avanzo mi casa?',
    respuesta:
      'Sí. Si levantas tu casa por etapas, cotiza tu pedido completo, sepáralo y recíbelo de a ' +
      'pocos, según avance tu obra. Si te falta para completar el millar, puedes juntar tu pedido ' +
      'con tus vecinos. Las condiciones te las explica un asesor por WhatsApp.',
  },
  {
    pregunta: '¿Cómo hago mi pedido?',
    respuesta:
      `Escríbenos por WhatsApp al ${WHATSAPP_VISIBLE}. Dinos qué ladrillo necesitas, cuántos ` +
      'millares y si lo recoges en planta o te lo llevamos; si es a tu obra, dinos el distrito. ' +
      'Te respondemos con el precio y un asesor coordina el pago y la fecha de entrega.',
  },
  {
    pregunta: '¿Dónde está la fábrica?',
    respuesta:
      `Nuestra fábrica, Oro Rojo, está en ${DIRECCION_FABRICA}. Ahí se carga el ladrillo cuando ` +
      'lo compras en planta. Hatarisum es como te atendemos y te vendemos: una sola casa, por eso ' +
      'el precio es de fábrica.',
  },
  {
    pregunta: '¿Tienen ficha técnica de cada ladrillo?',
    respuesta:
      'Sí. Cada producto tiene su ficha técnica en PDF, con medidas, peso y rendimiento. ' +
      productos.map((p) => `${p.nombre}: ${p.dimensiones}, ${p.peso}`).join('. ') +
      '. Las fichas se descargan en la sección de precios de esta página.',
  },
  {
    pregunta: '¿Qué es Hatarisum?',
    respuesta:
      'Hatarisum vende el ladrillo de nuestra fábrica, Oro Rojo, en Arequipa, Perú: King Kong, ' +
      'pandereta y ladrillo de techo por millar, en planta o puesto en obra. Atendemos a familias ' +
      'que construyen su casa, maestros de obra, inmobiliarias y contratistas. Hatarisum es ' +
      'quechua y quiere decir «levantémonos juntos».',
  },
];
