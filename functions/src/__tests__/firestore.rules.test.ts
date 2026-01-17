/**
 * Firestore Security Rules Unit Tests
 *
 * These tests verify that:
 * 1. All client read/write access is denied to the subscribers collection
 * 2. All client read/write access is denied to the rate_limits collection
 * 3. Cloud Functions (via Admin SDK) can still read/write (Admin SDK bypasses security rules)
 *
 * IMPORTANT: These tests require the Firestore emulator to be running!
 *
 * To run these tests:
 * 1. Start the emulator: firebase emulators:start --only firestore
 * 2. Run tests: npm run test:rules
 *
 * If the emulator is not running, these tests will be automatically skipped.
 */

import {
  initializeTestEnvironment,
  assertFails,
  assertSucceeds,
  RulesTestEnvironment,
} from "@firebase/rules-unit-testing";
import * as fs from "fs";
import * as path from "path";
import * as net from "net";

let testEnv: RulesTestEnvironment;
let emulatorAvailable = false;

// Read the rules file
const rulesPath = path.resolve(__dirname, "../../../firestore.rules");

/**
 * Check if the Firestore emulator is running
 */
async function isEmulatorRunning(): Promise<boolean> {
  return new Promise((resolve) => {
    const socket = new net.Socket();
    const timeout = 1000;

    socket.setTimeout(timeout);

    socket.on("connect", () => {
      socket.destroy();
      resolve(true);
    });

    socket.on("timeout", () => {
      socket.destroy();
      resolve(false);
    });

    socket.on("error", () => {
      socket.destroy();
      resolve(false);
    });

    socket.connect(8080, "127.0.0.1");
  });
}

// Check emulator availability before all tests
beforeAll(async () => {
  emulatorAvailable = await isEmulatorRunning();

  if (!emulatorAvailable) {
    console.warn(
      "\n⚠️  Firestore emulator is not running on port 8080.\n" +
        "   Security rules tests will be SKIPPED.\n" +
        "   To run these tests:\n" +
        "   1. Start emulator: firebase emulators:start --only firestore\n" +
        "   2. Run tests: npm run test:rules\n"
    );
    return;
  }

  // Check if rules file exists
  if (!fs.existsSync(rulesPath)) {
    throw new Error(
      `Firestore rules file not found at: ${rulesPath}\n` +
        "Make sure firestore.rules exists in the project root."
    );
  }

  const rules = fs.readFileSync(rulesPath, "utf8");

  testEnv = await initializeTestEnvironment({
    projectId: "justfyi-web-test",
    firestore: {
      rules,
      host: "127.0.0.1",
      port: 8080,
    },
  });
});

afterAll(async () => {
  if (testEnv) {
    await testEnv.cleanup();
  }
});

beforeEach(async () => {
  if (testEnv) {
    await testEnv.clearFirestore();
  }
});

// Helper to conditionally run tests
const describeIfEmulator = (name: string, fn: () => void) => {
  if (emulatorAvailable) {
    describe(name, fn);
  } else {
    describe.skip(name, fn);
  }
};

describe("Firestore Security Rules", () => {
  // This test always runs to give feedback
  it("should check emulator availability", () => {
    if (!emulatorAvailable) {
      console.log("Emulator not running - skipping security rules tests");
    }
    expect(true).toBe(true); // Always passes
  });

  describeIfEmulator("subscribers collection", () => {
    describe("unauthenticated client", () => {
      it("should deny read access", async () => {
        const db = testEnv.unauthenticatedContext().firestore();
        const subscriberRef = db.collection("subscribers").doc("test@example.com");
        await assertFails(subscriberRef.get());
      });

      it("should deny write access", async () => {
        const db = testEnv.unauthenticatedContext().firestore();
        const subscriberRef = db.collection("subscribers").doc("test@example.com");
        await assertFails(
          subscriberRef.set({
            email: "test@example.com",
            subscribedAt: new Date(),
            ipHash: "abc123",
            userAgent: "test",
            source: "homepage",
          })
        );
      });

      it("should deny list access", async () => {
        const db = testEnv.unauthenticatedContext().firestore();
        const subscribersRef = db.collection("subscribers");
        await assertFails(subscribersRef.get());
      });

      it("should deny delete access", async () => {
        const db = testEnv.unauthenticatedContext().firestore();
        const subscriberRef = db.collection("subscribers").doc("test@example.com");
        await assertFails(subscriberRef.delete());
      });
    });

    describe("authenticated client", () => {
      it("should deny read access even when authenticated", async () => {
        const db = testEnv
          .authenticatedContext("user123", { email: "user@example.com" })
          .firestore();
        const subscriberRef = db.collection("subscribers").doc("test@example.com");
        await assertFails(subscriberRef.get());
      });

      it("should deny write access even when authenticated", async () => {
        const db = testEnv
          .authenticatedContext("user123", { email: "user@example.com" })
          .firestore();
        const subscriberRef = db.collection("subscribers").doc("test@example.com");
        await assertFails(
          subscriberRef.set({
            email: "test@example.com",
            subscribedAt: new Date(),
            ipHash: "abc123",
            userAgent: "test",
            source: "homepage",
          })
        );
      });
    });
  });

  describeIfEmulator("rate_limits collection", () => {
    describe("unauthenticated client", () => {
      it("should deny read access", async () => {
        const db = testEnv.unauthenticatedContext().firestore();
        const rateLimitRef = db.collection("rate_limits").doc("ip_hash_123");
        await assertFails(rateLimitRef.get());
      });

      it("should deny write access", async () => {
        const db = testEnv.unauthenticatedContext().firestore();
        const rateLimitRef = db.collection("rate_limits").doc("ip_hash_123");
        await assertFails(
          rateLimitRef.set({
            count: 1,
            windowStart: new Date(),
          })
        );
      });

      it("should deny list access", async () => {
        const db = testEnv.unauthenticatedContext().firestore();
        const rateLimitsRef = db.collection("rate_limits");
        await assertFails(rateLimitsRef.get());
      });

      it("should deny update access", async () => {
        const db = testEnv.unauthenticatedContext().firestore();
        const rateLimitRef = db.collection("rate_limits").doc("ip_hash_123");
        await assertFails(rateLimitRef.update({ count: 2 }));
      });
    });

    describe("authenticated client", () => {
      it("should deny read access even when authenticated", async () => {
        const db = testEnv
          .authenticatedContext("user123", { email: "user@example.com" })
          .firestore();
        const rateLimitRef = db.collection("rate_limits").doc("ip_hash_123");
        await assertFails(rateLimitRef.get());
      });

      it("should deny write access even when authenticated", async () => {
        const db = testEnv
          .authenticatedContext("user123", { email: "user@example.com" })
          .firestore();
        const rateLimitRef = db.collection("rate_limits").doc("ip_hash_123");
        await assertFails(
          rateLimitRef.set({
            count: 1,
            windowStart: new Date(),
          })
        );
      });
    });
  });

  describeIfEmulator("default deny rule", () => {
    it("should deny access to any unlisted collection", async () => {
      const db = testEnv.unauthenticatedContext().firestore();
      const randomRef = db.collection("random_collection").doc("doc1");
      await assertFails(randomRef.get());
      await assertFails(randomRef.set({ data: "test" }));
    });

    it("should deny access to nested documents", async () => {
      const db = testEnv.unauthenticatedContext().firestore();
      const nestedRef = db
        .collection("subscribers")
        .doc("test@example.com")
        .collection("nested")
        .doc("subdoc");
      await assertFails(nestedRef.get());
      await assertFails(nestedRef.set({ data: "test" }));
    });
  });

  describeIfEmulator("Admin SDK bypass (documented behavior)", () => {
    /**
     * Note: Admin SDK (used by Cloud Functions) bypasses security rules entirely.
     * This is not something that can be tested with the rules-unit-testing library,
     * as it only tests client-side access.
     *
     * The Admin SDK uses service account credentials and has unrestricted access
     * to Firestore, regardless of security rules. This is by design and is how
     * Cloud Functions can write to collections that deny all client access.
     *
     * This test documents this expected behavior using the test environment's
     * withSecurityRulesDisabled method to simulate Admin SDK access.
     */
    it("Admin SDK should be able to write to subscribers (rules bypassed)", async () => {
      await assertSucceeds(
        testEnv.withSecurityRulesDisabled(async (context) => {
          const db = context.firestore();
          await db.collection("subscribers").doc("admin-test@example.com").set({
            email: "admin-test@example.com",
            subscribedAt: new Date(),
            ipHash: "admin_hash",
            userAgent: "Cloud Function",
            source: "test",
          });
        })
      );
    });

    it("Admin SDK should be able to read from subscribers (rules bypassed)", async () => {
      // First write with rules disabled
      await testEnv.withSecurityRulesDisabled(async (context) => {
        const db = context.firestore();
        await db.collection("subscribers").doc("read-test@example.com").set({
          email: "read-test@example.com",
          subscribedAt: new Date(),
          ipHash: "read_hash",
          userAgent: "test",
          source: "test",
        });
      });

      // Then read with rules disabled (simulating Admin SDK)
      await assertSucceeds(
        testEnv.withSecurityRulesDisabled(async (context) => {
          const db = context.firestore();
          await db.collection("subscribers").doc("read-test@example.com").get();
        })
      );
    });

    it("Admin SDK should be able to write to rate_limits (rules bypassed)", async () => {
      await assertSucceeds(
        testEnv.withSecurityRulesDisabled(async (context) => {
          const db = context.firestore();
          await db.collection("rate_limits").doc("admin_ip_hash").set({
            count: 1,
            windowStart: new Date(),
          });
        })
      );
    });
  });
});
