# Just FYI Website

A static marketing and documentation website for Just FYI, a privacy-first anonymous STI contact tracing mobile app.

## Overview

This website provides:
- Landing page with app features and benefits
- Privacy Policy (required for app stores)
- Terms of Service (required for app stores)
- FAQ section
- How It Works guide
- About page
- Contact information

Available in 5 languages: English, German, Spanish, French, and Portuguese.

## Tech Stack

- **Framework:** [Astro](https://astro.build/) - Static site generator
- **Styling:** Pure CSS with custom properties
- **JavaScript:** Zero client-side JavaScript (CSS-only mobile menu and accordions)
- **Build Output:** Static HTML/CSS files

## Quick Start

### Prerequisites

- Node.js 20 or higher
- npm

### Installation

```bash
# Navigate to website directory
cd website

# Install dependencies
npm install
```

### Development

```bash
# Start development server (http://localhost:4321)
npm run dev

# Build for production
npm run build

# Preview production build locally
npm run preview
```

## Project Structure

```
website/
├── public/
│   ├── favicon.svg          # Site favicon
│   └── robots.txt           # Search engine crawling rules
├── src/
│   ├── components/          # Reusable Astro components
│   │   ├── Header.astro     # Site header with navigation
│   │   ├── Footer.astro     # Site footer
│   │   ├── Navigation.astro # Navigation links
│   │   ├── LanguageSwitcher.astro
│   │   ├── MobileMenu.astro
│   │   └── ...
│   ├── config/
│   │   └── site.ts          # Central branding configuration
│   ├── content/
│   │   ├── config.ts        # Content collection schema
│   │   └── pages/
│   │       ├── en/          # English content (default)
│   │       ├── de/          # German content
│   │       ├── es/          # Spanish content
│   │       ├── fr/          # French content
│   │       └── pt/          # Portuguese content
│   ├── i18n/
│   │   ├── languages.ts     # Language configuration
│   │   ├── ui.ts            # UI translations
│   │   └── utils.ts         # i18n utility functions
│   ├── layouts/
│   │   └── BaseLayout.astro # Main page layout
│   ├── pages/
│   │   ├── index.astro      # English home page
│   │   ├── [page].astro     # English dynamic pages
│   │   └── [lang]/          # Localized pages
│   └── styles/
│       └── global.css       # Global styles
├── astro.config.mjs         # Astro configuration
├── netlify.toml             # Netlify deployment config
├── vercel.json              # Vercel deployment config
├── package.json
└── tsconfig.json
```

## Configuration

### Branding Configuration

All branding settings are centralized in `src/config/site.ts`:

```typescript
export const siteConfig = {
  // App name and tagline
  name: 'Just FYI',
  tagline: 'Privacy-First Anonymous Contact Tracing',

  // Website domain
  domain: 'justfyi.app',

  // Colors (primary brand color)
  colors: {
    primary: '#4285F4',
    // ... other colors
  },

  // External links
  links: {
    github: 'https://github.com/JustFYI-App/JustFYI',
    appStore: '#',  // Update when published
    playStore: '#', // Update when published
  },

  // Contact information
  contact: {
    email: 'support@justfyi.app',
    githubIssues: 'https://github.com/JustFYI-App/JustFYI/issues',
  },
};
```

#### Changing the Primary Color

1. Open `src/config/site.ts`
2. Modify `colors.primary` and related shades
3. Rebuild the site

#### Changing the Domain

1. Update `domain` in `src/config/site.ts`
2. Update `site` in `astro.config.mjs`
3. Update sitemap URL in `public/robots.txt`
4. Rebuild the site

### Adding/Editing Content

#### Content Files

All page content is in Markdown files located in `src/content/pages/{lang}/`:

- `home.md` - Landing page content
- `privacy-policy.md` - Privacy Policy
- `terms-of-service.md` - Terms of Service
- `faq.md` - Frequently Asked Questions
- `how-it-works.md` - How the app works
- `about.md` - About the project
- `contact.md` - Contact information

#### Editing Content

1. Open the relevant `.md` file in `src/content/pages/{lang}/`
2. Edit the frontmatter (title, description, dates)
3. Edit the Markdown content
4. Repeat for all language versions

#### Adding a New Language

1. Add the language to `src/i18n/languages.ts`
2. Add UI translations to `src/i18n/ui.ts`
3. Create content folder `src/content/pages/{lang}/`
4. Create all 7 Markdown files with translated content
5. Update `astro.config.mjs` sitemap locales

#### Adding a New Page

1. Create Markdown files in each language folder
2. Update navigation in `src/i18n/ui.ts`
3. Update `Navigation.astro` component
4. The dynamic routing will handle the rest

### UI Translations

Non-content UI strings (navigation labels, buttons, etc.) are in `src/i18n/ui.ts`:

```typescript
export const ui = {
  en: {
    'nav.home': 'Home',
    'nav.howItWorks': 'How It Works',
    // ...
  },
  de: {
    'nav.home': 'Startseite',
    'nav.howItWorks': 'So funktioniert es',
    // ...
  },
  // ... other languages
};
```

## Deployment

### Netlify

**Automatic Deployment:**
1. Connect your GitHub repository to Netlify
2. Netlify will auto-detect Astro and use `netlify.toml`
3. Deploy automatically on push to main branch

**Manual Deployment:**
```bash
# Install Netlify CLI
npm install -g netlify-cli

# Build and deploy
npm run build
netlify deploy --prod --dir=dist
```

### Vercel

**Automatic Deployment:**
1. Connect your GitHub repository to Vercel
2. Vercel will auto-detect Astro and use `vercel.json`
3. Deploy automatically on push to main branch

**Manual Deployment:**
```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel --prod
```

### GitHub Pages

**Setup:**

1. In your repository settings, go to Pages
2. Select "GitHub Actions" as the source
3. Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm
          cache-dependency-path: website/package-lock.json

      - name: Install dependencies
        working-directory: website
        run: npm ci

      - name: Build
        working-directory: website
        run: npm run build

      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: website/dist

  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

4. Update `astro.config.mjs` site URL to your GitHub Pages URL

### Cloudflare Pages

**Automatic Deployment:**

1. Log in to Cloudflare Dashboard
2. Go to Pages > Create a project
3. Connect your GitHub repository
4. Configure build settings:
   - **Framework preset:** Astro
   - **Build command:** `npm run build`
   - **Build output directory:** `dist`
   - **Root directory:** `website`
5. Deploy

**Environment Variables:**
- `NODE_VERSION`: `20`

**Custom Domain:**
1. Add your custom domain in Cloudflare Pages settings
2. Update DNS records as instructed
3. Update `astro.config.mjs` site URL

## Performance

This website is optimized for performance:

- **Zero JavaScript** - Pure CSS interactions
- **System fonts** - No external font loading
- **Static HTML** - Pre-rendered at build time
- **Optimized CSS** - Astro bundles and minifies CSS
- **No tracking** - No analytics or third-party scripts
- **No cookies** - Fully static, privacy-respecting

**Target metrics:**
- Initial page load: <100KB
- Time to First Byte: <200ms
- Largest Contentful Paint: <1s

## SEO

- Semantic HTML5 structure
- Meta tags (title, description, Open Graph, Twitter cards)
- hreflang tags for all language versions
- Auto-generated sitemap with language alternates
- robots.txt for search engine crawling

## Accessibility

- WCAG AA color contrast compliance
- Semantic HTML structure
- Skip-to-content link
- Focus indicators for keyboard navigation
- Reduced motion support
- Touch-friendly tap targets (min 44px)

## License

This website is part of the Just FYI project. See the main repository for license information.

## Links

- [Just FYI GitHub Repository](https://github.com/JustFYI-App/JustFYI)
- [Report Issues](https://github.com/JustFYI-App/JustFYI/issues)
