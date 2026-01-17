/**
 * Email validation utility
 *
 * Provides email format validation and normalization functions.
 */

/**
 * Standard regex pattern for email validation
 * Matches: local-part@domain.tld
 * - Local part: one or more characters that are not whitespace or @
 * - Domain: one or more characters that are not whitespace or @
 * - TLD: one or more characters that are not whitespace or @
 */
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Validates email format using standard regex pattern
 * @param email - The email address to validate
 * @returns true if email format is valid, false otherwise
 */
export function isValidEmail(email: string): boolean {
  if (!email || typeof email !== "string") {
    return false;
  }
  return EMAIL_REGEX.test(email.trim());
}

/**
 * Sanitizes an email address by removing non-ASCII characters
 * and other potentially problematic characters.
 * @param email - The email address to sanitize
 * @returns Sanitized email with only ASCII characters
 */
export function sanitizeEmail(email: string): string {
  if (!email || typeof email !== "string") {
    return "";
  }
  // Remove all non-ASCII characters (keep only printable ASCII 32-126)
  // eslint-disable-next-line no-control-regex
  return email.replace(/[^\x20-\x7E]/g, "").trim();
}

/**
 * Normalizes an email address by sanitizing, converting to lowercase, and trimming
 * @param email - The email address to normalize
 * @returns Normalized email address in lowercase with only ASCII characters
 */
export function normalizeEmail(email: string): string {
  if (!email || typeof email !== "string") {
    return "";
  }
  return sanitizeEmail(email).toLowerCase();
}

/**
 * Validates and normalizes an email address
 * @param email - The email address to validate and normalize
 * @returns Object with isValid boolean and normalized email string
 */
export function validateAndNormalizeEmail(email: string): {
  isValid: boolean;
  normalized: string;
} {
  const normalized = normalizeEmail(email);
  const isValid = isValidEmail(normalized);
  return { isValid, normalized };
}
