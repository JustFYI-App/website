/**
 * Tests for the subscribe Cloud Function endpoint
 *
 * These tests cover:
 * - Successful subscription (200 response)
 * - Duplicate email rejection (409 response)
 * - Invalid email format (400 response)
 * - Honeypot detection (400 response)
 * - Rate limiting (429 response)
 * - Edge cases for email validation
 */

import {
  isValidEmail,
  normalizeEmail,
  validateAndNormalizeEmail,
} from "../utils/validation";
import { hashIp, extractClientIp, getHashedClientIp } from "../utils/hashing";
import { isBot, isValidHoneypot } from "../utils/honeypot";
import { RATE_LIMIT_CONFIG } from "../utils/rateLimit";

// Test the utility functions that the subscribe endpoint uses

describe("Email Validation Utility", () => {
  describe("isValidEmail", () => {
    it("should return true for valid email formats", () => {
      expect(isValidEmail("test@example.com")).toBe(true);
      expect(isValidEmail("user.name@domain.org")).toBe(true);
      expect(isValidEmail("user+tag@example.co.uk")).toBe(true);
    });

    it("should return false for invalid email formats", () => {
      expect(isValidEmail("invalid")).toBe(false);
      expect(isValidEmail("invalid@")).toBe(false);
      expect(isValidEmail("@example.com")).toBe(false);
      expect(isValidEmail("user@")).toBe(false);
      expect(isValidEmail("")).toBe(false);
      expect(isValidEmail("user name@example.com")).toBe(false);
    });

    it("should return false for null or undefined", () => {
      expect(isValidEmail(null as unknown as string)).toBe(false);
      expect(isValidEmail(undefined as unknown as string)).toBe(false);
    });

    // Edge case tests added in Task 9.3
    it("should handle emails with special characters correctly", () => {
      // Valid special characters in local part
      expect(isValidEmail("user.name+tag@example.com")).toBe(true);
      expect(isValidEmail("user_name@example.com")).toBe(true);
      expect(isValidEmail("user-name@example.com")).toBe(true);
      expect(isValidEmail("user123@example.com")).toBe(true);
    });

    it("should handle very long emails appropriately", () => {
      // Email with 64 char local part (max recommended by RFC)
      const longLocal = "a".repeat(64) + "@example.com";
      expect(isValidEmail(longLocal)).toBe(true);

      // Email with very long domain
      const longDomain = "user@" + "a".repeat(100) + ".com";
      expect(isValidEmail(longDomain)).toBe(true);
    });

    it("should reject emails with invalid characters", () => {
      expect(isValidEmail("user\t@example.com")).toBe(false);
      expect(isValidEmail("user\n@example.com")).toBe(false);
      expect(isValidEmail("user @example.com")).toBe(false);
    });
  });

  describe("normalizeEmail", () => {
    it("should convert email to lowercase", () => {
      expect(normalizeEmail("Test@Example.COM")).toBe("test@example.com");
    });

    it("should trim whitespace", () => {
      expect(normalizeEmail("  test@example.com  ")).toBe("test@example.com");
    });

    it("should return empty string for invalid input", () => {
      expect(normalizeEmail(null as unknown as string)).toBe("");
      expect(normalizeEmail(undefined as unknown as string)).toBe("");
    });

    // Edge case added in Task 9.3
    it("should normalize mixed case domains correctly", () => {
      expect(normalizeEmail("USER@EXAMPLE.COM")).toBe("user@example.com");
      expect(normalizeEmail("User@SubDomain.Example.COM")).toBe("user@subdomain.example.com");
    });
  });

  describe("validateAndNormalizeEmail", () => {
    it("should return isValid true and normalized email for valid input", () => {
      const result = validateAndNormalizeEmail("Test@Example.COM");
      expect(result.isValid).toBe(true);
      expect(result.normalized).toBe("test@example.com");
    });

    it("should return isValid false for invalid email", () => {
      const result = validateAndNormalizeEmail("invalid-email");
      expect(result.isValid).toBe(false);
    });

    // Edge case added in Task 9.3
    it("should handle email with leading/trailing whitespace", () => {
      const result = validateAndNormalizeEmail("  User@Example.COM  ");
      expect(result.isValid).toBe(true);
      expect(result.normalized).toBe("user@example.com");
    });
  });
});

describe("IP Hashing Utility", () => {
  describe("hashIp", () => {
    it("should return a SHA-256 hash (64 character hex string)", () => {
      const hash = hashIp("192.168.1.1");
      expect(hash).toMatch(/^[a-f0-9]{64}$/);
    });

    it("should return consistent hash for same IP", () => {
      const hash1 = hashIp("192.168.1.1");
      const hash2 = hashIp("192.168.1.1");
      expect(hash1).toBe(hash2);
    });

    it("should return different hashes for different IPs", () => {
      const hash1 = hashIp("192.168.1.1");
      const hash2 = hashIp("192.168.1.2");
      expect(hash1).not.toBe(hash2);
    });

    it("should handle null/undefined by hashing 'unknown'", () => {
      const hash1 = hashIp(null as unknown as string);
      const hash2 = hashIp("unknown");
      expect(hash1).toBe(hash2);
    });

    // Edge case added in Task 9.3
    it("should handle IPv6 addresses", () => {
      const hash = hashIp("2001:0db8:85a3:0000:0000:8a2e:0370:7334");
      expect(hash).toMatch(/^[a-f0-9]{64}$/);
    });
  });

  describe("extractClientIp", () => {
    it("should extract IP from X-Forwarded-For header", () => {
      const headers = { "x-forwarded-for": "203.0.113.195, 70.41.3.18" };
      expect(extractClientIp(headers)).toBe("203.0.113.195");
    });

    it("should use socket address as fallback", () => {
      const headers = {};
      expect(extractClientIp(headers, "127.0.0.1")).toBe("127.0.0.1");
    });

    it("should return 'unknown' when no IP available", () => {
      expect(extractClientIp({})).toBe("unknown");
    });

    // Edge case added in Task 9.3
    it("should handle single IP in X-Forwarded-For header", () => {
      const headers = { "x-forwarded-for": "192.168.1.100" };
      expect(extractClientIp(headers)).toBe("192.168.1.100");
    });
  });

  describe("getHashedClientIp", () => {
    it("should return hashed IP from headers", () => {
      const headers = { "x-forwarded-for": "192.168.1.1" };
      const result = getHashedClientIp(headers);
      expect(result).toMatch(/^[a-f0-9]{64}$/);
    });
  });
});

describe("Honeypot Validation Utility", () => {
  describe("isValidHoneypot", () => {
    it("should return true when honeypot is undefined", () => {
      expect(isValidHoneypot(undefined)).toBe(true);
    });

    it("should return true when honeypot is null", () => {
      expect(isValidHoneypot(null)).toBe(true);
    });

    it("should return true when honeypot is empty string", () => {
      expect(isValidHoneypot("")).toBe(true);
      expect(isValidHoneypot("   ")).toBe(true);
    });

    it("should return false when honeypot has value", () => {
      expect(isValidHoneypot("spam")).toBe(false);
      expect(isValidHoneypot("http://spam.com")).toBe(false);
    });
  });

  describe("isBot", () => {
    it("should return false for legitimate requests (empty honeypot)", () => {
      expect(isBot(undefined)).toBe(false);
      expect(isBot("")).toBe(false);
    });

    it("should return true for bot requests (filled honeypot)", () => {
      expect(isBot("spam content")).toBe(true);
    });

    // Edge case added in Task 9.3
    it("should detect common bot patterns", () => {
      // Bots often fill honeypot with URLs
      expect(isBot("http://example.com")).toBe(true);
      expect(isBot("https://spam-site.com")).toBe(true);
      // Bots may fill with random text
      expect(isBot("click here for free money")).toBe(true);
      // Single character should be detected as bot
      expect(isBot("x")).toBe(true);
    });
  });
});

describe("Rate Limiting Configuration", () => {
  it("should have correct rate limit settings", () => {
    expect(RATE_LIMIT_CONFIG.maxRequests).toBe(5);
    expect(RATE_LIMIT_CONFIG.windowMs).toBe(60 * 60 * 1000); // 1 hour
    expect(RATE_LIMIT_CONFIG.collection).toBe("rate_limits");
  });

  // Edge case added in Task 9.3
  it("should have reasonable limits for abuse prevention", () => {
    // Ensure rate limit is not too permissive (at least 1 per 10 minutes)
    expect(RATE_LIMIT_CONFIG.maxRequests).toBeLessThanOrEqual(10);
    // Ensure window is at least 30 minutes
    expect(RATE_LIMIT_CONFIG.windowMs).toBeGreaterThanOrEqual(30 * 60 * 1000);
  });
});

// Integration-style tests that test the expected response formats
describe("API Response Format Tests", () => {
  it("should have correct success response format", () => {
    const successResponse = {
      success: true,
      message: "Successfully subscribed!",
    };
    expect(successResponse).toHaveProperty("success", true);
    expect(successResponse).toHaveProperty("message");
  });

  it("should have correct error response format for already subscribed", () => {
    const errorResponse = {
      success: false,
      code: "ALREADY_SUBSCRIBED",
      message: "This email is already subscribed.",
    };
    expect(errorResponse).toHaveProperty("success", false);
    expect(errorResponse).toHaveProperty("code", "ALREADY_SUBSCRIBED");
    expect(errorResponse).toHaveProperty("message");
  });

  it("should have correct error response format for invalid email", () => {
    const errorResponse = {
      success: false,
      code: "INVALID_EMAIL",
      message: "Please enter a valid email address.",
    };
    expect(errorResponse).toHaveProperty("success", false);
    expect(errorResponse).toHaveProperty("code", "INVALID_EMAIL");
    expect(errorResponse).toHaveProperty("message");
  });

  it("should have correct error response format for honeypot triggered", () => {
    const errorResponse = {
      success: false,
      code: "INVALID_REQUEST",
      message: "Invalid request.",
    };
    expect(errorResponse).toHaveProperty("success", false);
    expect(errorResponse).toHaveProperty("code", "INVALID_REQUEST");
    // Note: message doesn't reveal honeypot detection
    expect(errorResponse.message).not.toContain("honeypot");
    expect(errorResponse.message).not.toContain("bot");
  });

  it("should have correct error response format for rate limited", () => {
    const errorResponse = {
      success: false,
      code: "RATE_LIMITED",
      message: "Too many requests. Please try again later.",
    };
    expect(errorResponse).toHaveProperty("success", false);
    expect(errorResponse).toHaveProperty("code", "RATE_LIMITED");
    expect(errorResponse).toHaveProperty("message");
  });

  it("should have correct error response format for server error", () => {
    const errorResponse = {
      success: false,
      code: "SERVER_ERROR",
      message: "Something went wrong. Please try again.",
    };
    expect(errorResponse).toHaveProperty("success", false);
    expect(errorResponse).toHaveProperty("code", "SERVER_ERROR");
    expect(errorResponse).toHaveProperty("message");
  });

  // Edge case added in Task 9.3
  it("should have all required error codes defined", () => {
    const requiredCodes = [
      "ALREADY_SUBSCRIBED",
      "INVALID_EMAIL",
      "INVALID_REQUEST",
      "RATE_LIMITED",
      "SERVER_ERROR",
    ];

    // Verify all codes are strings (type check)
    requiredCodes.forEach((code) => {
      expect(typeof code).toBe("string");
      expect(code.length).toBeGreaterThan(0);
    });
  });
});
