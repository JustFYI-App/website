/**
 * API Configuration
 *
 * Central configuration for API endpoints used by the website.
 * Supports environment variable overrides for different environments (dev/prod).
 *
 * Environment Variables:
 * - PUBLIC_SUBSCRIBE_API_URL: Override the default subscription endpoint URL
 *
 * Usage:
 * ```ts
 * import { apiConfig, getSubscribeUrl } from '@config/api';
 * const url = getSubscribeUrl();
 * ```
 */

export interface ApiConfig {
  /**
   * Email subscription endpoint
   * Default: Cloud Function URL in europe-west1 (Frankfurt) region
   */
  subscribeUrl: string;

  /**
   * Request timeout in milliseconds
   */
  timeout: number;
}

/**
 * Default Cloud Function URL
 * Region: europe-west1 (Frankfurt) for EU data residency
 * Project: justfyi-web
 */
const DEFAULT_SUBSCRIBE_URL = 'https://europe-west1-justfyi-web.cloudfunctions.net/subscribe';

/**
 * Default request timeout (10 seconds)
 */
const DEFAULT_TIMEOUT = 10000;

/**
 * API configuration object
 * Uses environment variables when available, falls back to defaults
 */
export const apiConfig: ApiConfig = {
  subscribeUrl: import.meta.env.PUBLIC_SUBSCRIBE_API_URL || DEFAULT_SUBSCRIBE_URL,
  timeout: DEFAULT_TIMEOUT,
};

/**
 * Get the subscription API URL
 * @returns The configured subscription endpoint URL
 */
export function getSubscribeUrl(): string {
  return apiConfig.subscribeUrl;
}

/**
 * Get the request timeout
 * @returns The configured timeout in milliseconds
 */
export function getTimeout(): number {
  return apiConfig.timeout;
}

export default apiConfig;
