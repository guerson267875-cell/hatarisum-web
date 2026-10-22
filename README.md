# Hatarisum — Web

Web pública de **Hatarisum**: vende el ladrillo de nuestra fábrica, Oro Rojo, en Arequipa.
Tagline: *Levantémonos juntos.*

**En vivo:** https://hatarisum.pages.dev (Cloudflare Pages, proyecto `hatarisum`).

Las direcciones viejas solo redirigen aquí:
- `guerson267875-cell.github.io/hatarisum-web/` — rama `gh-pages` de este repo (index y 404).
- `hatarisum.guerson267875.workers.dev` — Worker de redirección en `redireccion-workers-dev/`
  (se publica con `npx wrangler deploy` dentro de esa carpeta; casi nunca hace falta tocarlo).

## Qué muestra

- **Precios** de los 4 productos (King Kong H-10, Pandereta, Hueco 12, Hueco 15), en planta y
  puesto en obra. Salen de la configuración v4 del agente de WhatsApp.
- **La promo de S/ 1 el ladrillo se apaga sola el 1/11/2026**: desde ese día la web muestra
  S/ 1,100 en planta, sin el aviso de promo (`FIN_PROMO` en `src/data/productos.ts`).
- Cómo comprar (en planta / puesto en obra), los 4 pasos y una sección por cliente: familia,
  maestro (Club Maestro), inmobiliaria o contratista.
- Nuestra fábrica: voz «una sola casa» (manual MRC-GRP-02). Oro Rojo es «nuestra fábrica»;
  nunca «distribuidor autorizado», «aliado» ni «proveedor».
- Contacto: el formulario arma el mensaje y abre WhatsApp. No hay backend ni cookies.

## Buscadores e IA (desde el 22/10/2026)

La web es una app de React: sin JavaScript se veía vacía, y los bots de ChatGPT, Claude y Perplexity no ejecutan JavaScript. Ahora, al compilar, el plugin `seoEstatico` de `vite.config.ts` usa `src/data/seo.ts` para:

- Meter dentro de `<div id="root">` el mismo contenido que ve la gente (precios, medidas, cómo comprar, fábrica, preguntas y contacto). React lo reemplaza apenas carga.
- Agregar datos estructurados schema.org en `<head>`: negocio, fábrica Oro Rojo, los 4 productos con precio en planta y en obra, y las preguntas frecuentes.
- Generar `llms.txt` (resumen para IA) y `sitemap.xml` con la fecha de compilación.

`public/robots.txt` deja entrar a todos los bots, IA incluida. El archivo `public/6424e5fec82592fc7d6cf9ea998344b4.txt` es la clave de **IndexNow**: después de publicar cambios grandes, avisar a Bing (de él salen Copilot y la búsqueda de ChatGPT):

```bash
curl -X POST https://api.indexnow.org/indexnow -H "Content-Type: application/json" -d '{"host":"hatarisum.pages.dev","key":"6424e5fec82592fc7d6cf9ea998344b4","keyLocation":"https://hatarisum.pages.dev/6424e5fec82592fc7d6cf9ea998344b4.txt","urlList":["https://hatarisum.pages.dev/","https://hatarisum.pages.dev/llms.txt"]}'
```

Para revisar lo que ve un bot: `curl -A "GPTBot/1.1" https://hatarisum.pages.dev/`.

## Dónde se cambia cada cosa

| Qué | Archivo |
|---|---|
| Precios, fin de la promo, otros productos | `src/data/productos.ts` (y subir `PRECIOS_REVISADOS`) |
| Preguntas frecuentes (web, buscadores e IA) | `src/data/faq.ts` |
| Lo que leen buscadores e IA (HTML estático, schema.org, llms.txt, sitemap) | `src/data/seo.ts` |
| WhatsApp, redes, ubicación y dirección de la fábrica | `src/data/contacto.ts` |
| Título, descripción y vista previa al compartir el link | `index.html` |
| Ícono, sello de la fábrica, imagen de vista previa | `public/` (salen de `COORDINACION/co-branding/FOTOS_DE_PERFIL/`) |
| Paleta y fuentes | `src/index.css` |

## Correr y publicar

```bash
npm install
npm run dev         # http://localhost:3000
npm run desplegar   # revisa tipos, compila y publica en Cloudflare
```

`desplegar` usa la sesión de Wrangler de la máquina (`npx wrangler login` si pide entrar).

## Dominio propio (opcional)

Para que la web sea `www.hatarisum.com` (o `.pe`), primero hay que comprar el dominio. Luego se
conecta en el panel de Cloudflare: Workers y Pages → `hatarisum` → Dominios personalizados.

Después hay que cambiar la URL en `index.html` (canonical y `og:*`), en `SITIO` de
`src/data/contacto.ts`, en `public/robots.txt`, en los dos redirects (rama `gh-pages` y
`redireccion-workers-dev/index.js`) y en la configuración del agente de WhatsApp.

Con dominio propio aparecen en Cloudflare los controles de bots de IA (Security → Settings →
AI bot policies y AI Crawl Control). **Dejar Search y Agent en «Allow»**: si se bloquean,
ChatGPT, Claude y Perplexity no pueden leer ni citar la web.
