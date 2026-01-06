/**
 * i18n Utility Functions
 *
 * Helper functions for internationalization, including URL manipulation,
 * language detection, and translation access.
 */

import {
  type LanguageCode,
  languageCodes,
  defaultLanguage,
  isValidLanguage,
  languageConfigs,
} from './languages';
import { ui, type UIKey } from './ui';

/**
 * Extract language code from a URL path
 *
 * @param url - The URL or path to extract language from
 * @returns The detected language code, or default language if not found
 *
 * @example
 * getLanguageFromUrl('/de/privacy-policy') // returns 'de'
 * getLanguageFromUrl('/privacy-policy') // returns 'en' (default)
 * getLanguageFromUrl(new URL('https://justfyi.app/fr/about')) // returns 'fr'
 */
export function getLanguageFromUrl(url: URL | string): LanguageCode {
  const pathname = typeof url === 'string' ? url : url.pathname;

  // Remove leading slash and get the first segment
  const segments = pathname.replace(/^\//, '').split('/');
  const firstSegment = segments[0];

  // Check if first segment is a valid language code
  if (firstSegment && isValidLanguage(firstSegment)) {
    return firstSegment;
  }

  // Default to English if no language prefix found
  return defaultLanguage;
}

/**
 * Generate a localized path for a given page
 *
 * @param path - The page path (without language prefix)
 * @param lang - The target language code
 * @returns The localized path
 *
 * @example
 * getLocalizedPath('privacy-policy', 'en') // returns '/privacy-policy'
 * getLocalizedPath('privacy-policy', 'de') // returns '/de/privacy-policy'
 * getLocalizedPath('', 'fr') // returns '/fr' (home page)
 * getLocalizedPath('/', 'en') // returns '/' (home page)
 */
export function getLocalizedPath(path: string, lang: LanguageCode): string {
  // Clean up the path - remove leading/trailing slashes
  const cleanPath = path.replace(/^\/|\/$/g, '');

  // For the default language (English), serve from root
  if (lang === defaultLanguage) {
    return cleanPath ? `/${cleanPath}` : '/';
  }

  // For other languages, add language prefix
  return cleanPath ? `/${lang}/${cleanPath}` : `/${lang}`;
}

/**
 * Get the path without the language prefix
 *
 * @param path - The full path including language prefix
 * @returns The path without the language prefix
 *
 * @example
 * getPathWithoutLanguage('/de/privacy-policy') // returns 'privacy-policy'
 * getPathWithoutLanguage('/privacy-policy') // returns 'privacy-policy'
 * getPathWithoutLanguage('/fr/') // returns ''
 */
export function getPathWithoutLanguage(path: string): string {
  const segments = path.replace(/^\//, '').split('/');
  const firstSegment = segments[0];

  // If first segment is a language code, remove it
  if (firstSegment && isValidLanguage(firstSegment)) {
    return segments.slice(1).join('/');
  }

  return segments.join('/');
}

/**
 * Alternate language link for hreflang tags
 */
export interface AlternateLanguageLink {
  lang: LanguageCode;
  hrefLang: string;
  url: string;
  label: string;
  isCurrent: boolean;
}

/**
 * Generate alternate language links for SEO hreflang tags
 *
 * @param currentPath - The current page path (can include language prefix)
 * @param baseUrl - The base URL of the site
 * @param currentLang - The current language (optional, will be detected from path if not provided)
 * @returns Array of alternate language links for all supported languages
 *
 * @example
 * getAlternateLanguageLinks('/de/privacy-policy', 'https://justfyi.app')
 * // Returns links for all 5 languages pointing to their respective versions
 */
export function getAlternateLanguageLinks(
  currentPath: string,
  baseUrl: string,
  currentLang?: LanguageCode
): AlternateLanguageLink[] {
  // Get the page path without language prefix
  const pagePath = getPathWithoutLanguage(currentPath);

  // Determine current language
  const activeLang = currentLang || getLanguageFromUrl(currentPath);

  // Generate links for all languages
  return languageCodes.map((lang) => {
    const localizedPath = getLocalizedPath(pagePath, lang);
    const config = languageConfigs[lang];

    return {
      lang,
      hrefLang: config.hrefLang,
      url: `${baseUrl.replace(/\/$/, '')}${localizedPath}`,
      label: config.nativeLabel,
      isCurrent: lang === activeLang,
    };
  });
}

/**
 * Get the x-default hreflang URL (typically the default language version)
 *
 * @param currentPath - The current page path
 * @param baseUrl - The base URL of the site
 * @returns The x-default URL for the page
 */
export function getXDefaultUrl(currentPath: string, baseUrl: string): string {
  const pagePath = getPathWithoutLanguage(currentPath);
  const defaultPath = getLocalizedPath(pagePath, defaultLanguage);
  return `${baseUrl.replace(/\/$/, '')}${defaultPath}`;
}

/**
 * Create a translations helper function for a specific language
 *
 * @param lang - The language code to use for translations
 * @returns A function that retrieves translations by key
 *
 * @example
 * const t = useTranslations('de');
 * t('nav.home') // returns 'Startseite'
 * t('nav.privacyPolicy') // returns 'Datenschutzerklaerung'
 */
export function useTranslations(lang: LanguageCode) {
  return function t(key: UIKey): string {
    // Get the translation for the requested language
    const translations = ui[lang];
    const defaultTranslations = ui[defaultLanguage];

    // Navigate through nested keys (e.g., 'nav.home')
    const keys = key.split('.');
    let value: unknown = translations;
    let defaultValue: unknown = defaultTranslations;

    for (const k of keys) {
      value = (value as Record<string, unknown>)?.[k];
      defaultValue = (defaultValue as Record<string, unknown>)?.[k];
    }

    // Return the translation, falling back to default language if not found
    if (typeof value === 'string') {
      return value;
    }

    if (typeof defaultValue === 'string') {
      return defaultValue;
    }

    // Return the key itself as fallback
    return key;
  };
}

/**
 * Get all translations for a language
 *
 * @param lang - The language code
 * @returns The full translations object for that language
 */
export function getTranslations(lang: LanguageCode) {
  return ui[lang] || ui[defaultLanguage];
}
