/**
 * Language Configuration
 *
 * Defines all supported languages for the Just FYI website.
 * Language labels are displayed in their native form.
 */

/**
 * Supported language codes
 */
export const languages = {
  en: 'English',
  de: 'Deutsch',
  es: 'Espanol',
  fr: 'Francais',
  pt: 'Portugues',
} as const;

/**
 * Type for supported language codes
 */
export type LanguageCode = keyof typeof languages;

/**
 * Array of all supported language codes
 */
export const languageCodes = Object.keys(languages) as LanguageCode[];

/**
 * Default language code
 */
export const defaultLanguage: LanguageCode = 'en';

/**
 * Language configuration with additional metadata
 */
export interface LanguageConfig {
  code: LanguageCode;
  label: string;
  nativeLabel: string;
  isRTL: boolean;
  hrefLang: string;
}

/**
 * Full language configuration for each supported language
 */
export const languageConfigs: Record<LanguageCode, LanguageConfig> = {
  en: {
    code: 'en',
    label: 'English',
    nativeLabel: 'English',
    isRTL: false,
    hrefLang: 'en',
  },
  de: {
    code: 'de',
    label: 'German',
    nativeLabel: 'Deutsch',
    isRTL: false,
    hrefLang: 'de',
  },
  es: {
    code: 'es',
    label: 'Spanish',
    nativeLabel: 'Espanol',
    isRTL: false,
    hrefLang: 'es',
  },
  fr: {
    code: 'fr',
    label: 'French',
    nativeLabel: 'Francais',
    isRTL: false,
    hrefLang: 'fr',
  },
  pt: {
    code: 'pt',
    label: 'Portuguese',
    nativeLabel: 'Portugues',
    isRTL: false,
    hrefLang: 'pt',
  },
};

/**
 * Check if a language code is supported
 */
export function isValidLanguage(code: string): code is LanguageCode {
  return code in languages;
}

/**
 * Get language config by code, with fallback to default
 */
export function getLanguageConfig(code: string): LanguageConfig {
  if (isValidLanguage(code)) {
    return languageConfigs[code];
  }
  return languageConfigs[defaultLanguage];
}
