/**
 * Honeypot validation utility
 *
 * Provides spam detection using honeypot field.
 * Bots typically fill all form fields, including hidden honeypot fields.
 * Legitimate users never see or fill the honeypot field.
 */

/**
 * Validates honeypot field for spam detection
 * Returns true if the request appears to be legitimate (honeypot is empty)
 * Returns false if the request appears to be from a bot (honeypot is filled)
 *
 * @param honeypotValue - The value of the honeypot field from the request
 * @returns true if request is likely legitimate, false if likely spam
 */
export function isValidHoneypot(honeypotValue: unknown): boolean {
  // Honeypot should be undefined, null, or empty string
  // Any other value indicates a bot filled it in
  if (honeypotValue === undefined || honeypotValue === null) {
    return true;
  }

  if (typeof honeypotValue === "string" && honeypotValue.trim() === "") {
    return true;
  }

  // Honeypot was filled - likely a bot
  return false;
}

/**
 * Checks if request is from a bot based on honeypot field
 * This is the inverse of isValidHoneypot for clearer code
 *
 * @param honeypotValue - The value of the honeypot field from the request
 * @returns true if request is likely from a bot, false if likely legitimate
 */
export function isBot(honeypotValue: unknown): boolean {
  return !isValidHoneypot(honeypotValue);
}
