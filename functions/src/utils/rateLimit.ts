/**
 * Rate limiting utility
 *
 * Implements sliding window rate limiting using Firestore.
 * Tracks requests per IP hash in the rate_limits collection.
 */

import * as admin from "firebase-admin";

/**
 * Rate limit configuration
 */
export const RATE_LIMIT_CONFIG = {
  /** Maximum number of requests allowed per window */
  maxRequests: 5,
  /** Window duration in milliseconds (1 hour) */
  windowMs: 60 * 60 * 1000,
  /** Collection name for storing rate limit data */
  collection: "rate_limits",
};

/**
 * Rate limit check result
 */
export interface RateLimitResult {
  /** Whether the request is allowed */
  allowed: boolean;
  /** Current request count in the window */
  currentCount: number;
  /** Remaining requests in the window */
  remaining: number;
  /** Time until window resets (in milliseconds) */
  resetIn: number;
}

/**
 * Checks and updates rate limit for a given IP hash
 * Uses sliding window approach - window resets after windowMs has passed
 *
 * @param db - Firestore database instance
 * @param ipHash - SHA-256 hash of the client IP address
 * @returns RateLimitResult with allowed status and metadata
 */
export async function checkRateLimit(
  db: admin.firestore.Firestore,
  ipHash: string
): Promise<RateLimitResult> {
  const now = Date.now();
  const docRef = db.collection(RATE_LIMIT_CONFIG.collection).doc(ipHash);

  const doc = await docRef.get();

  if (doc.exists) {
    const data = doc.data();
    const windowStart = data?.windowStart || 0;
    const currentCount = data?.count || 0;
    const windowAge = now - windowStart;

    // Check if we're still within the current window
    if (windowAge < RATE_LIMIT_CONFIG.windowMs) {
      // Window is still active
      if (currentCount >= RATE_LIMIT_CONFIG.maxRequests) {
        // Rate limit exceeded
        return {
          allowed: false,
          currentCount,
          remaining: 0,
          resetIn: RATE_LIMIT_CONFIG.windowMs - windowAge,
        };
      }

      // Increment count within current window
      await docRef.update({
        count: admin.firestore.FieldValue.increment(1),
      });

      return {
        allowed: true,
        currentCount: currentCount + 1,
        remaining: RATE_LIMIT_CONFIG.maxRequests - currentCount - 1,
        resetIn: RATE_LIMIT_CONFIG.windowMs - windowAge,
      };
    } else {
      // Window has expired, reset it
      await docRef.set({
        count: 1,
        windowStart: now,
      });

      return {
        allowed: true,
        currentCount: 1,
        remaining: RATE_LIMIT_CONFIG.maxRequests - 1,
        resetIn: RATE_LIMIT_CONFIG.windowMs,
      };
    }
  } else {
    // No rate limit record exists, create one
    await docRef.set({
      count: 1,
      windowStart: now,
    });

    return {
      allowed: true,
      currentCount: 1,
      remaining: RATE_LIMIT_CONFIG.maxRequests - 1,
      resetIn: RATE_LIMIT_CONFIG.windowMs,
    };
  }
}

/**
 * Cleans up expired rate limit entries
 * Should be run periodically (e.g., via scheduled function)
 *
 * @param db - Firestore database instance
 * @returns Number of deleted entries
 */
export async function cleanupExpiredRateLimits(
  db: admin.firestore.Firestore
): Promise<number> {
  const now = Date.now();
  const expirationThreshold = now - RATE_LIMIT_CONFIG.windowMs;

  const expiredDocs = await db
    .collection(RATE_LIMIT_CONFIG.collection)
    .where("windowStart", "<", expirationThreshold)
    .get();

  let deletedCount = 0;
  const batch = db.batch();

  expiredDocs.docs.forEach((doc) => {
    batch.delete(doc.ref);
    deletedCount++;
  });

  if (deletedCount > 0) {
    await batch.commit();
  }

  return deletedCount;
}
