/**
 * Site Configuration
 *
 * Central configuration file for all branding, theming, and site-wide settings.
 * Changing values here will update the entire site appearance and metadata.
 */

export interface SiteConfig {
  // Core branding
  name: string;
  tagline: string;
  description: string;
  domain: string;

  // Colors
  colors: {
    primary: string;
    primaryDark: string;
    primaryLight: string;
    secondary: string;
    secondaryDark: string;
    accent: string;
    text: {
      primary: string;
      secondary: string;
      muted: string;
      inverse: string;
    };
    background: {
      primary: string;
      secondary: string;
      tertiary: string;
    };
    border: string;
    success: string;
    warning: string;
    error: string;
  };

  // Links
  links: {
    github: string;
    appStore: string;
    playStore: string;
  };

  // Contact
  contact: {
    email: string;
    githubIssues: string;
  };

  // SEO and metadata
  meta: {
    author: string;
    keywords: string[];
    ogImage: string;
    twitterHandle: string;
  };
}

export const siteConfig: SiteConfig = {
  // Core branding
  name: 'Just FYI',
  tagline: 'Privacy-First Anonymous Contact Tracing',
  description: 'Just FYI is a privacy-first anonymous STI contact tracing app that helps communities stay safe while protecting your identity.',
  domain: 'justfyi.app',

  // Colors - Primary: #6370D8 (Purple/Blue from app icon)
  // All colors chosen for WCAG AA contrast compliance
  colors: {
    // Primary purple/blue palette (from app icon)
    primary: '#6370D8',        // Main brand color (darker purple from icon)
    primaryDark: '#4A4C80',    // Darker shade for hover states
    primaryLight: '#8E97DF',   // Lighter shade (from icon gradient)

    // Secondary color (orange accent from icon notification dot)
    secondary: '#F06236',      // Orange for positive actions
    secondaryDark: '#E15023',  // Darker orange

    // Accent color
    accent: '#FC7146',         // Bright orange from icon

    // Text colors (WCAG AA compliant)
    text: {
      primary: '#1f2937',      // Main text - contrast ratio 12.6:1 on white
      secondary: '#4b5563',    // Secondary text - contrast ratio 7.4:1 on white
      muted: '#6b7280',        // Muted text - contrast ratio 5.0:1 on white
      inverse: '#ffffff',      // Text on dark backgrounds
    },

    // Background colors
    background: {
      primary: '#ffffff',      // Main background
      secondary: '#f9fafb',    // Slightly off-white for sections
      tertiary: '#f3f4f6',     // Lighter gray for cards/elements
    },

    // UI colors
    border: '#e5e7eb',         // Border color
    success: '#10b981',        // Success states
    warning: '#f59e0b',        // Warning states
    error: '#ef4444',          // Error states
  },

  // Links
  links: {
    github: 'https://github.com/JustFYI-App/JustFYI',
    appStore: '#',             // Placeholder until app is published
    playStore: '#',            // Placeholder until app is published
  },

  // Contact
  contact: {
    email: 'support@justfyi.app',
    githubIssues: 'https://github.com/JustFYI-App/JustFYI/issues',
  },

  // SEO and metadata
  meta: {
    author: 'Just FYI Team',
    keywords: [
      // Primary keywords
      'STI notification app',
      'anonymous contact tracing',
      'sexual health app',
      'privacy-first health app',
      // Long-tail keywords
      'anonymous STI partner notification',
      'private sexual health alerts',
      'Bluetooth contact tracing app',
      'LGBTQ+ sexual health',
      'confidential STI notification',
      'partner notification service',
      // Feature keywords
      'encrypted health data',
      'anonymous health notifications',
      'no registration health app',
      'offline contact tracing',
      // Community keywords
      'sexual health community',
      'safe sex notification',
      'discreet STI alerts',
    ],
    ogImage: '/og-image.png',
    twitterHandle: '',         // Placeholder - no Twitter account yet
  },
};

/**
 * Helper function to get the full site URL
 */
export function getSiteUrl(): string {
  return `https://${siteConfig.domain}`;
}

/**
 * Helper function to generate full URLs for paths
 */
export function getFullUrl(path: string): string {
  const base = getSiteUrl();
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return `${base}${cleanPath}`;
}

export default siteConfig;
