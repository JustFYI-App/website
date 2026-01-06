// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  // Site URL - configurable for deployment
  site: 'https://justfyi.app',

  // Static output mode (default for Astro, but explicit for clarity)
  output: 'static',

  // Build configuration
  build: {
    // Generate clean URLs without .html extension
    format: 'directory',
  },

  // Enable sitemap generation
  integrations: [
    sitemap({
      // Include all language versions
      i18n: {
        defaultLocale: 'en',
        locales: {
          en: 'en',
          de: 'de',
          es: 'es',
          fr: 'fr',
          pt: 'pt',
        },
      },
    }),
  ],

  // Vite configuration for path aliases
  vite: {
    resolve: {
      alias: {
        '@': '/src',
        '@components': '/src/components',
        '@layouts': '/src/layouts',
        '@config': '/src/config',
        '@styles': '/src/styles',
        '@i18n': '/src/i18n',
        '@content': '/src/content',
      },
    },
  },
});
