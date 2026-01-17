/**
 * IP hashing utility
 *
 * Provides SHA-256 hashing for IP addresses to ensure privacy.
 * Raw IPs are never stored - only their hashes.
 */

import * as crypto from "crypto";

/**
 * Hashes an IP address using SHA-256
 * @param ip - The IP address to hash
 * @returns SHA-256 hash of the IP address as a hexadecimal string
 */
export function hashIp(ip: string): string {
  if (!ip || typeof ip !== "string") {
    return hashIp("unknown");
  }
  return crypto.createHash("sha256").update(ip).digest("hex");
}

/**
 * Extracts the client IP from request headers
 * Handles X-Forwarded-For header for proxied requests
 * @param headers - Request headers object
 * @param socketRemoteAddress - Optional socket remote address as fallback
 * @returns The client IP address or "unknown" if not available
 */
export function extractClientIp(
  headers: { [key: string]: string | string[] | undefined },
  socketRemoteAddress?: string
): string {
  // Check X-Forwarded-For header (common for proxied requests)
  const forwardedFor = headers["x-forwarded-for"];
  if (forwardedFor) {
    // Get the first IP in the chain (original client IP)
    const firstIp = Array.isArray(forwardedFor)
      ? forwardedFor[0]
      : forwardedFor.split(",")[0];
    return firstIp.trim();
  }

  // Fall back to socket remote address
  if (socketRemoteAddress) {
    return socketRemoteAddress;
  }

  return "unknown";
}

/**
 * Extracts and hashes the client IP address for privacy-preserving storage
 * @param headers - Request headers object
 * @param socketRemoteAddress - Optional socket remote address as fallback
 * @returns SHA-256 hash of the client IP address
 */
export function getHashedClientIp(
  headers: { [key: string]: string | string[] | undefined },
  socketRemoteAddress?: string
): string {
  const clientIp = extractClientIp(headers, socketRemoteAddress);
  return hashIp(clientIp);
}
