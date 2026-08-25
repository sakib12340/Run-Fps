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
    locales: ['en', 'de', 'fr', 'es'],
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
      i18n: {
        defaultLocale: 'en',
        locales: {
          en: 'en',
          de: 'de',
          fr: 'fr',
          es: 'es'
        }
      }
    })
  ]
});

