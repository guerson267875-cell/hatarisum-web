import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig, type Plugin} from 'vite';
import {htmlEstatico, jsonLd, llmsTxt, sitemapXml} from './src/data/seo';

// Buscadores e IA: mete en el HTML el contenido de la web y los datos estructurados, y genera
// llms.txt y sitemap.xml al compilar (ver src/data/seo.ts).
function seoEstatico(): Plugin {
  return {
    name: 'seo-estatico',
    transformIndexHtml(html) {
      return html
        .replace('</head>', `  <script type="application/ld+json">${jsonLd()}</script>\n  </head>`)
        .replace('<div id="root"></div>', `<div id="root">${htmlEstatico()}</div>`);
    },
    generateBundle() {
      this.emitFile({type: 'asset', fileName: 'llms.txt', source: llmsTxt()});
      this.emitFile({type: 'asset', fileName: 'sitemap.xml', source: sitemapXml()});
    },
  };
}

export default defineConfig(() => {
  return {
    // Ruta relativa: sirve en la raíz de Cloudflare Pages y en cualquier dominio propio.
    base: './',
    plugins: [react(), tailwindcss(), seoEstatico()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modifyâfile watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
