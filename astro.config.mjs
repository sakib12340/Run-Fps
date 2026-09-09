// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

import icon from 'astro-icon';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://runfps.com',
  output: 'static',
  build: {
    format: 'directory',
    assets: '_astro',
    inlineStylesheets: 'always'
  },
  compressHTML: true,
  trailingSlash: 'ignore',

  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'de', 'fr', 'es', 'pt'],
    routing: {
      prefixDefaultLocale: true
    }
  },

  vite: {
    plugins: [tailwindcss()]
  },

  integrations: [
    icon(),
    sitemap({
      filter: (page) => page !== 'https://runfps.com/' && page !== 'https://runfps.com',
      lastmod: new Date(),
      serialize(item) {
        const links = item.links ?? [];
        if (!links.some((l) => l.lang === 'x-default')) {
          const en = links.find((l) => l.lang === 'en');
          links.push({ lang: 'x-default', url: en?.url ?? item.url });
        }
        return { ...item, links };
      },
      i18n: {
        defaultLocale: 'en',
        locales: {
          en: 'en',
          de: 'de',
          fr: 'fr',
          es: 'es',
          pt: 'pt'
        }
      }
    })
  ]
});

