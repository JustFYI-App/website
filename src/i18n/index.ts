/**
 * i18n Module Index
 *
 * Central export point for all internationalization functionality.
 */

// Language configuration
export {
  languages,
  languageCodes,
  defaultLanguage,
  languageConfigs,
  isValidLanguage,
  getLanguageConfig,
  type LanguageCode,
  type LanguageConfig,
} from './languages';

// UI translations
export { ui, type UIKey, type UITranslations } from './ui';

// Utility functions
export {
  getLanguageFromUrl,
  getLocalizedPath,
  getPathWithoutLanguage,
  getAlternateLanguageLinks,
  getXDefaultUrl,
  useTranslations,
  getTranslations,
  type AlternateLanguageLink,
} from './utils';
