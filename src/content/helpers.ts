/**
 * Content Collection Helper Functions
 *
 * Utility functions for working with content collections.
 */

/**
 * Extract page slug from content entry ID
 *
 * @param id - Content entry ID in format "en/about.md"
 * @returns The page slug without language prefix and extension (e.g., "about")
 *
 * @example
 * getPageSlugFromId("en/about.md") // returns "about"
 * getPageSlugFromId("de/privacy-policy.md") // returns "privacy-policy"
 */
export function getPageSlugFromId(id: string): string {
  const withoutExtension = id.replace(/\.md$/, '');
  const parts = withoutExtension.split('/');
  return parts[parts.length - 1];
}

/**
 * Extract language from content entry ID
 *
 * @param id - Content entry ID in format "en/about.md"
 * @returns The language code (e.g., "en", "de")
 *
 * @example
 * getLanguageFromId("en/about.md") // returns "en"
 * getLanguageFromId("de/privacy-policy.md") // returns "de"
 */
export function getLanguageFromId(id: string): string {
  const parts = id.split('/');
  return parts[0];
}
