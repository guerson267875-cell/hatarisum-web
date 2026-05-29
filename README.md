# Hatarisum — Web

Sitio web de **Hatarisum**, distribuidora de ladrillo en Arequipa, Perú.
Tagline: *Levantémonos juntos.*

Dos líneas de venta bajo una sola marca:
- **Comunitaria** — organizamos juntas vecinales (AAHH) para comprar a precio de millar.
- **Distribuidor** — venta a contratistas y obras como distribuidor de Ladrillera Oro Rojo.

## Stack

- React 19 + Vite 6 + TypeScript
- Tailwind CSS 4 (tokens de marca en `src/index.css`)
- Motion (animaciones) + lucide-react (íconos)
- Sitio estático (sin backend) — el contacto abre un link `wa.me`

## Correr en local

```bash
npm install
npm run dev      # http://localhost:3000
```

## Build de producción

```bash
npm run build    # genera dist/
npm run preview  # sirve el build localmente
```

## Estructura

- `src/components/` — secciones (Hero, Manifesto, Catalogo, Services, Collective, Contact, …)
- `src/data/productos.ts` — catálogo de ladrillo Oro Rojo (única fuente de verdad)
- `src/types.ts` — tipos compartidos
- `src/index.css` — paleta de marca y fuentes

## Pendientes

- Reemplazar `WHATSAPP_NUMERO` en `src/components/Contact.tsx` por el número real.
- Imágenes reales de producto (hoy son gradientes placeholder).
- Precios y handles de redes sociales reales.
