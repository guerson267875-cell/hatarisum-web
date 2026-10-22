import { Producto } from '../types';
import {
  productos,
  precioPlantaTexto,
  promoVigente,
  soles,
  PRECIOS_REVISADOS,
} from './productos';
import {
  WHATSAPP_NUMERO,
  WHATSAPP_VISIBLE,
  waLink,
  MAPS_FABRICA,
  FABRICA,
  DIRECCION_FABRICA,
  SITIO,
  redes,
} from './contacto';
import { preguntasFrecuentes } from './faq';

// ============================================================
// LO QUE LEEN LOS BUSCADORES Y LAS IA
// La web es una app de React: sin JavaScript se ve vacía, y los bots de ChatGPT, Claude o
// Perplexity no ejecutan JavaScript. vite.config.ts usa estas funciones al compilar para
// meter en el HTML el mismo contenido que ve la gente, los datos estructurados (schema.org),
// llms.txt y sitemap.xml. React reemplaza el HTML estático apenas carga.
// Todo sale de productos.ts, contacto.ts y faq.ts: no escribir precios aquí.
// ============================================================

const esc = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

const fichaUrl = (archivo: string) => `${SITIO}/fichas/${archivo}`;

const DESCRIPCION =
  'Hatarisum vende el ladrillo de nuestra fábrica, Oro Rojo, en Arequipa, Perú: King Kong H-10, ' +
  'pandereta, Hueco 12 y Hueco 15 por millar, en planta o puesto en tu obra. Cotiza por WhatsApp.';

// ---------- Datos estructurados (JSON-LD) ----------

const ID_NEGOCIO = `${SITIO}/#negocio`;
const ID_FABRICA = `${SITIO}/#fabrica`;

const direccion = {
  '@type': 'PostalAddress',
  streetAddress: FABRICA.calle,
  addressLocality: FABRICA.distrito,
  addressRegion: FABRICA.ciudad,
  addressCountry: 'PE',
};

const arequipa = { '@type': 'City', name: 'Arequipa' };

const precioMillar = (precio: number) => ({
  '@type': 'UnitPriceSpecification',
  price: precio,
  priceCurrency: 'PEN',
  referenceQuantity: { '@type': 'QuantitativeValue', value: 1000, unitText: 'ladrillos (1 millar)' },
});

const oferta = (nombre: string, precio: number, extra: Record<string, string> = {}) => ({
  '@type': 'Offer',
  name: nombre,
  price: precio,
  priceCurrency: 'PEN',
  priceSpecification: precioMillar(precio),
  seller: { '@id': ID_NEGOCIO },
  areaServed: arequipa,
  url: `${SITIO}/#precios`,
  ...extra,
});

const ofertas = (p: Producto, hoy: Date) => {
  const planta = 'En planta: recojo en nuestra fábrica';
  const lista =
    p.precioPlantaPromo !== undefined && promoVigente(hoy)
      ? [
          oferta(`${planta} (promoción)`, p.precioPlantaPromo, { priceValidUntil: '2026-10-31' }),
          oferta(planta, p.precioPlanta, { validFrom: '2026-11-01' }),
        ]
      : [oferta(planta, p.precioPlanta)];
  return [...lista, oferta('Puesto en obra en Arequipa (incluye llevarlo)', p.precioObra)];
};

export const jsonLd = (hoy: Date = new Date()) => {
  const precios = productos.flatMap((p) => [p.precioPlantaPromo ?? p.precioPlanta, p.precioObra]);
  const datos = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': `${SITIO}/#web`,
        url: `${SITIO}/`,
        name: 'Hatarisum',
        inLanguage: 'es-PE',
        publisher: { '@id': ID_NEGOCIO },
      },
      {
        '@type': 'HardwareStore',
        '@id': ID_NEGOCIO,
        name: 'Hatarisum',
        slogan: 'Levantémonos juntos',
        description: DESCRIPCION,
        url: `${SITIO}/`,
        logo: `${SITIO}/icon-512.png`,
        image: `${SITIO}/og.jpg`,
        telephone: `+${WHATSAPP_NUMERO}`,
        address: direccion,
        hasMap: MAPS_FABRICA,
        areaServed: arequipa,
        currenciesAccepted: 'PEN',
        priceRange: `${soles(Math.min(...precios))} – ${soles(Math.max(...precios))} por millar`,
        sameAs: redes.map((r) => r.url),
        contactPoint: {
          '@type': 'ContactPoint',
          contactType: 'sales',
          telephone: `+${WHATSAPP_NUMERO}`,
          url: waLink(),
          availableLanguage: 'es',
          areaServed: arequipa,
        },
        makesOffer: productos.map((p) => ({ '@type': 'Offer', itemOffered: { '@id': `${SITIO}/#${p.id}` } })),
      },
      {
        '@type': 'Organization',
        '@id': ID_FABRICA,
        name: 'Oro Rojo',
        alternateName: 'Ladrilleras Oro Rojo',
        description: 'Nuestra fábrica de ladrillo de arcilla en Arequipa, con horno túnel.',
        slogan: 'Construyendo futuros sólidos',
        address: direccion,
        hasMap: MAPS_FABRICA,
      },
      ...productos.map((p) => ({
        '@type': 'Product',
        '@id': `${SITIO}/#${p.id}`,
        name: `Ladrillo ${p.nombre}`,
        description: `${p.descripcion} Medidas ${p.dimensiones}, peso ${p.peso}, rendimiento ${p.rendimiento}.`,
        category: 'Ladrillo de arcilla',
        material: 'Arcilla cocida',
        brand: { '@type': 'Brand', name: 'Hatarisum' },
        manufacturer: { '@id': ID_FABRICA },
        additionalProperty: [
          { '@type': 'PropertyValue', name: 'Uso', value: p.uso },
          { '@type': 'PropertyValue', name: 'Medidas', value: p.dimensiones },
          { '@type': 'PropertyValue', name: 'Peso', value: p.peso },
          { '@type': 'PropertyValue', name: 'Rendimiento', value: p.rendimiento },
        ],
        subjectOf: { '@type': 'DigitalDocument', name: `Ficha técnica ${p.nombre} (PDF)`, url: fichaUrl(p.ficha) },
        offers: ofertas(p, hoy),
      })),
      {
        '@type': 'FAQPage',
        '@id': `${SITIO}/#preguntas`,
        mainEntity: preguntasFrecuentes(hoy).map((f) => ({
          '@type': 'Question',
          name: f.pregunta,
          acceptedAnswer: { '@type': 'Answer', text: f.respuesta },
        })),
      },
    ],
  };
  // «<» escapado para que ningún texto pueda cerrar el <script> que lo contiene
  return JSON.stringify(datos).replace(/</g, '\\u003c');
};

// ---------- HTML estático dentro de <div id="root"> ----------

export const htmlEstatico = (hoy: Date = new Date()) => {
  const filasPrecios = productos
    .map(
      (p) =>
        `<tr><td>${esc(p.nombre)}</td><td>${esc(p.uso)}</td><td>${esc(precioPlantaTexto(p, hoy))}</td><td>${esc(soles(p.precioObra))}</td></tr>`,
    )
    .join('');
  const filasFichas = productos
    .map(
      (p) =>
        `<tr><td>${esc(p.nombre)}</td><td>${esc(p.dimensiones)}</td><td>${esc(p.peso)}</td><td>${esc(p.rendimiento)}</td><td><a href="${fichaUrl(p.ficha)}">PDF</a></td></tr>`,
    )
    .join('');
  const preguntas = preguntasFrecuentes(hoy)
    .map((f) => `<h3>${esc(f.pregunta)}</h3><p>${esc(f.respuesta)}</p>`)
    .join('');
  const listaRedes = redes
    .map((r) => `<li><a href="${r.url}">${esc(r.red)} ${esc(r.usuario)}</a></li>`)
    .join('');

  return `<div id="seo-estatico"><style>
#seo-estatico{background:#0A1322;color:#FAF7F2;font:16px/1.6 Inter,system-ui,sans-serif;max-width:880px;margin:0 auto;padding:32px 20px 64px}
#seo-estatico h1{font-size:30px;line-height:1.2;margin:8px 0 12px}#seo-estatico h2{font-size:22px;margin:40px 0 10px;color:#D4A24C}
#seo-estatico h3{font-size:17px;margin:20px 0 4px}#seo-estatico a{color:#D4A24C}#seo-estatico small{color:#a1a1aa}
#seo-estatico table{border-collapse:collapse;width:100%;font-size:14px}#seo-estatico th,#seo-estatico td{border:1px solid #24324d;padding:8px;text-align:left}
</style>
<header>
<small>Hatarisum · Levantémonos juntos</small>
<h1>Ladrillo de fábrica en Arequipa: King Kong, pandereta y techo por millar</h1>
<p>${esc(DESCRIPCION)}</p>
<p><a href="${waLink('Hola Hatarisum, quiero cotizar ladrillo.')}">Cotiza por WhatsApp: ${WHATSAPP_VISIBLE}</a></p>
</header>
<main>
<section id="precios-estatico">
<h2>Precios por millar</h2>
<table><thead><tr><th>Ladrillo</th><th>Uso</th><th>En planta</th><th>Puesto en obra (Arequipa)</th></tr></thead><tbody>${filasPrecios}</tbody></table>
<p>Precios por millar (1,000 ladrillos), en soles. En planta: lo recoges con tu transporte en nuestra fábrica. Puesto en obra: te lo llevamos en Arequipa y el precio ya incluye llevarlo; no cobramos flete aparte. <small>Precios revisados el ${PRECIOS_REVISADOS}.</small></p>
</section>
<section>
<h2>Medidas, peso y rendimiento</h2>
<table><thead><tr><th>Ladrillo</th><th>Medidas</th><th>Peso</th><th>Rendimiento</th><th>Ficha técnica</th></tr></thead><tbody>${filasFichas}</tbody></table>
<p><a href="${fichaUrl('Fichas-Tecnicas-Hatarisum.pdf')}">Catálogo técnico completo (PDF)</a></p>
</section>
<section>
<h2>Cómo comprar</h2>
<ul>
<li><strong>En planta:</strong> vienes con tu camión, tu volquete o el transporte de tu maestro y cargas en nuestra fábrica. Es el precio más bajo.</li>
<li><strong>Puesto en obra:</strong> te lo llevamos a tu obra en Arequipa. Dinos en qué zona es y si entra un camión; un asesor confirma la cobertura y el día de entrega.</li>
<li><strong>Familias que construyen por etapas:</strong> cotiza tu pedido completo, sepáralo y recíbelo de a pocos. Si te falta para el millar, junta tu pedido con tus vecinos.</li>
<li><strong>Maestros de obra:</strong> precio por millar, pedidos para varias obras y el Club Maestro, nuestro canal de WhatsApp con beneficios por lo que compras en el mes.</li>
<li><strong>Inmobiliarias y contratistas:</strong> cotización por producto y millares, entregas programadas según su cronograma y ficha técnica de cada producto.</li>
</ul>
</section>
<section>
<h2>Nuestra fábrica</h2>
<p>Oro Rojo es nuestra fábrica en Arequipa: de su horno sale cada ladrillo que vendemos. Hatarisum es como te atendemos y te vendemos; por eso el precio es de fábrica. Hatarisum es quechua y quiere decir «levantémonos juntos».</p>
<p>Dirección de la fábrica: ${esc(DIRECCION_FABRICA)}. <a href="${MAPS_FABRICA}">Ver en el mapa</a></p>
</section>
<section>
<h2>Preguntas frecuentes</h2>
${preguntas}
</section>
<section>
<h2>Contacto</h2>
<p>WhatsApp: <a href="${waLink()}">${WHATSAPP_VISIBLE}</a></p>
<ul>${listaRedes}</ul>
</section>
</main>
</div>`;
};

// ---------- llms.txt (resumen para IA, llmstxt.org) ----------

export const llmsTxt = (hoy: Date = new Date()) => {
  const filas = productos
    .map((p) => `| ${p.nombre} | ${p.uso} | ${precioPlantaTexto(p, hoy)} | ${soles(p.precioObra)} |`)
    .join('\n');
  const medidas = productos
    .map((p) => `- ${p.nombre}: ${p.dimensiones}, ${p.peso}, ${p.rendimiento}. Ficha técnica: ${fichaUrl(p.ficha)}`)
    .join('\n');
  const preguntas = preguntasFrecuentes(hoy)
    .map((f) => `### ${f.pregunta}\n\n${f.respuesta}`)
    .join('\n\n');

  return `# Hatarisum

> ${DESCRIPCION}

Web: ${SITIO}/
WhatsApp: ${WHATSAPP_VISIBLE} (${waLink()})
Fábrica (Oro Rojo): ${DIRECCION_FABRICA}. Mapa: ${MAPS_FABRICA}

## Precios por millar (soles, revisados el ${PRECIOS_REVISADOS})

| Ladrillo | Uso | En planta | Puesto en obra (Arequipa) |
|---|---|---|---|
${filas}

- En planta: el cliente recoge con su transporte en nuestra fábrica.
- Puesto en obra: lo llevamos a la obra en Arequipa; el precio ya incluye llevarlo, sin flete aparte. Un asesor confirma la zona y el día de entrega.
- Compra por etapas: se cotiza el pedido completo, se separa y se recibe de a pocos. Las condiciones las explica un asesor.

## Medidas, peso y rendimiento

${medidas}
- Catálogo técnico completo: ${fichaUrl('Fichas-Tecnicas-Hatarisum.pdf')}

## Preguntas frecuentes

${preguntas}

## Redes

${redes.map((r) => `- ${r.red}: ${r.url}`).join('\n')}
`;
};

// ---------- sitemap.xml ----------

export const sitemapXml = (hoy: Date = new Date()) => {
  const fecha = hoy.toISOString().slice(0, 10);
  const urls = [
    `${SITIO}/`,
    ...productos.map((p) => fichaUrl(p.ficha)),
    fichaUrl('Fichas-Tecnicas-Hatarisum.pdf'),
  ];
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((u) => `  <url><loc>${u}</loc><lastmod>${fecha}</lastmod></url>`).join('\n')}
</urlset>
`;
};
