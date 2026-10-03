// La web de Hatarisum vive en Cloudflare Pages (https://hatarisum.pages.dev).
// Este Worker solo atiende la dirección vieja hatarisum.guerson267875.workers.dev
// y la manda, con la misma ruta, a la nueva. Publicar: npx wrangler deploy (en esta carpeta).
const DESTINO = 'https://hatarisum.pages.dev';

export default {
  fetch(request) {
    const url = new URL(request.url);
    return Response.redirect(DESTINO + url.pathname + url.search, 301);
  },
};
