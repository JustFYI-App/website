/**
 * Cloud Functions for JustFYI Website Email Subscription System
 *
 * This Firebase project (justfyi-web) is completely separate from the main
 * JustFYI app Firebase project to maintain the app's anonymous architecture.
 *
 * Functions are deployed to europe-west1 (Belgium) for EU data residency.
 */

import { onRequest } from "firebase-functions/v2/https";
import { setGlobalOptions } from "firebase-functions/v2";
import * as admin from "firebase-admin";
import { validateAndNormalizeEmail } from "./utils/validation.js";
import { getHashedClientIp } from "./utils/hashing.js";
import { checkRateLimit } from "./utils/rateLimit.js";
import { isBot } from "./utils/honeypot.js";

// Initialize Firebase Admin SDK
admin.initializeApp();

// Set default region to europe-west1 (Belgium) for EU data residency
setGlobalOptions({
  region: "europe-west1",
});

// Firestore reference
const db = admin.firestore();

// CORS configuration - only allow requests from justfyi.app
const ALLOWED_ORIGINS = [
  "https://justfyi.app",
  "https://www.justfyi.app",
];

// Development origins (only enabled when explicitly needed)
const DEV_ORIGINS = [
  "http://localhost:4321",
  "http://localhost:3000",
];

// Check if development mode is enabled via environment variable
const isDevelopment = process.env.FUNCTIONS_EMULATOR === "true";

/**
 * Validate CORS origin and return appropriate headers
 */
function getCorsHeaders(origin: string | undefined): Record<string, string> {
  const allowedOrigins = isDevelopment
    ? [...ALLOWED_ORIGINS, ...DEV_ORIGINS]
    : ALLOWED_ORIGINS;

  const isAllowed = origin && allowedOrigins.includes(origin);

  return {
    "Access-Control-Allow-Origin": isAllowed ? origin : ALLOWED_ORIGINS[0],
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Max-Age": "86400",
  };
}

/**
 * API Response types
 */
export interface SuccessResponse {
  success: true;
  message: string;
}

export interface ErrorResponse {
  success: false;
  code: string;
  message: string;
}

export type ApiResponse = SuccessResponse | ErrorResponse;

/**
 * Response codes enum for consistency
 */
export const ResponseCodes = {
  ALREADY_SUBSCRIBED: "ALREADY_SUBSCRIBED",
  INVALID_EMAIL: "INVALID_EMAIL",
  INVALID_REQUEST: "INVALID_REQUEST",
  RATE_LIMITED: "RATE_LIMITED",
  SERVER_ERROR: "SERVER_ERROR",
  METHOD_NOT_ALLOWED: "METHOD_NOT_ALLOWED",
} as const;

/**
 * Response messages
 */
export const ResponseMessages = {
  SUCCESS: "Successfully subscribed!",
  ALREADY_SUBSCRIBED: "This email is already subscribed.",
  INVALID_EMAIL: "Please enter a valid email address.",
  INVALID_REQUEST: "Invalid request.",
  RATE_LIMITED: "Too many requests. Please try again later.",
  SERVER_ERROR: "Something went wrong. Please try again.",
  METHOD_NOT_ALLOWED: "Only POST requests are allowed.",
} as const;

/**
 * Subscribe HTTP endpoint
 *
 * Handles email subscription requests with spam protection.
 * - Validates email format
 * - Checks honeypot field for bot detection
 * - Implements rate limiting per IP
 * - Stores subscriber data in Firestore
 *
 * POST /subscribe
 * Body: { email: string, honeypot?: string, source?: string }
 *
 * Response codes:
 * - 200: Successfully subscribed
 * - 400: Invalid email or honeypot triggered
 * - 405: Method not allowed
 * - 409: Already subscribed
 * - 429: Rate limited
 * - 500: Server error
 */
export const subscribe = onRequest(
  {
    cors: false, // We handle CORS manually for more control
  },
  async (req, res) => {
    const origin = req.headers.origin;
    const corsHeaders = getCorsHeaders(origin);

    // Handle preflight OPTIONS request
    if (req.method === "OPTIONS") {
      res.set(corsHeaders);
      res.status(204).send("");
      return;
    }

    // Only allow POST requests
    if (req.method !== "POST") {
      res.set(corsHeaders);
      res.status(405).json({
        success: false,
        code: ResponseCodes.METHOD_NOT_ALLOWED,
        message: ResponseMessages.METHOD_NOT_ALLOWED,
      } as ErrorResponse);
      return;
    }

    try {
      const { email, honeypot, source = "website" } = req.body || {};

      // Check honeypot field (should be empty) - don't reveal detection
      if (isBot(honeypot)) {
        res.set(corsHeaders);
        res.status(400).json({
          success: false,
          code: ResponseCodes.INVALID_REQUEST,
          message: ResponseMessages.INVALID_REQUEST,
        } as ErrorResponse);
        return;
      }

      // Validate and normalize email
      const { isValid, normalized: normalizedEmail } =
        validateAndNormalizeEmail(email);

      if (!isValid) {
        res.set(corsHeaders);
        res.status(400).json({
          success: false,
          code: ResponseCodes.INVALID_EMAIL,
          message: ResponseMessages.INVALID_EMAIL,
        } as ErrorResponse);
        return;
      }

      // Get hashed client IP for rate limiting (privacy-preserving)
      const ipHash = getHashedClientIp(
        req.headers as { [key: string]: string | string[] | undefined },
        req.socket?.remoteAddress
      );

      // Check rate limit (5 requests per IP per hour)
      const rateLimitResult = await checkRateLimit(db, ipHash);

      if (!rateLimitResult.allowed) {
        res.set(corsHeaders);
        res.status(429).json({
          success: false,
          code: ResponseCodes.RATE_LIMITED,
          message: ResponseMessages.RATE_LIMITED,
        } as ErrorResponse);
        return;
      }

      // Check if email already exists
      const existingDoc = await db
        .collection("subscribers")
        .doc(normalizedEmail)
        .get();

      if (existingDoc.exists) {
        res.set(corsHeaders);
        res.status(409).json({
          success: false,
          code: ResponseCodes.ALREADY_SUBSCRIBED,
          message: ResponseMessages.ALREADY_SUBSCRIBED,
        } as ErrorResponse);
        return;
      }

      // Store subscriber
      await db.collection("subscribers").doc(normalizedEmail).set({
        email: normalizedEmail,
        subscribedAt: admin.firestore.FieldValue.serverTimestamp(),
        ipHash: ipHash,
        userAgent: req.headers["user-agent"] || "unknown",
        source: source,
      });

      res.set(corsHeaders);
      res.status(200).json({
        success: true,
        message: ResponseMessages.SUCCESS,
      } as SuccessResponse);
    } catch (error) {
      console.error("Subscription error:", error);
      res.set(corsHeaders);
      res.status(500).json({
        success: false,
        code: ResponseCodes.SERVER_ERROR,
        message: ResponseMessages.SERVER_ERROR,
      } as ErrorResponse);
    }
  }
);
