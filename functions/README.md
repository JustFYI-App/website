# JustFYI Website Cloud Functions

Firebase Cloud Functions for the JustFYI website email subscription system.

## Overview

This Firebase project (`justfyi-web`) provides a backend for collecting email subscriptions. It is **completely separate** from the main JustFYI app Firebase project to maintain the app's anonymous architecture.

**Region:** `europe-west1` (Frankfurt, Germany) for EU data residency and GDPR compliance.

## Endpoints

### POST /subscribe

Subscribe an email address to receive JustFYI app updates.

**URL:** `https://europe-west1-justfyi-web.cloudfunctions.net/subscribe`

**Method:** `POST`

**Content-Type:** `application/json`

**CORS:** Only accepts requests from `justfyi.app` (and `localhost` in development mode)

#### Request Body

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `email` | string | Yes | Email address to subscribe |
| `honeypot` | string | No | Spam protection field (must be empty) |
| `source` | string | No | Subscription source (default: `"website"`) |

#### Example Request

```bash
curl -X POST \
  https://europe-west1-justfyi-web.cloudfunctions.net/subscribe \
  -H "Content-Type: application/json" \
  -H "Origin: https://justfyi.app" \
  -d '{
    "email": "user@example.com",
    "honeypot": "",
    "source": "homepage"
  }'
```

#### Response Format

All responses return JSON with the following structure:

**Success Response:**
```json
{
  "success": true,
  "message": "Successfully subscribed!"
}
```

**Error Response:**
```json
{
  "success": false,
  "code": "ERROR_CODE",
  "message": "Human-readable error message"
}
```

## Response Codes

| HTTP Status | Code | Message | Description |
|-------------|------|---------|-------------|
| 200 | - | Successfully subscribed! | Email was successfully added to the subscriber list |
| 400 | `INVALID_EMAIL` | Please enter a valid email address. | Email format validation failed |
| 400 | `INVALID_REQUEST` | Invalid request. | Honeypot field was filled (bot detected) |
| 405 | `METHOD_NOT_ALLOWED` | Only POST requests are allowed. | Request method was not POST |
| 409 | `ALREADY_SUBSCRIBED` | This email is already subscribed. | Email address already exists in the database |
| 429 | `RATE_LIMITED` | Too many requests. Please try again later. | IP exceeded 5 requests per hour |
| 500 | `SERVER_ERROR` | Something went wrong. Please try again. | Internal server error |

## Example Responses

### Success (200)

```bash
curl -X POST \
  https://europe-west1-justfyi-web.cloudfunctions.net/subscribe \
  -H "Content-Type: application/json" \
  -H "Origin: https://justfyi.app" \
  -d '{"email": "new@example.com", "honeypot": ""}'
```

Response:
```json
{
  "success": true,
  "message": "Successfully subscribed!"
}
```

### Already Subscribed (409)

```bash
curl -X POST \
  https://europe-west1-justfyi-web.cloudfunctions.net/subscribe \
  -H "Content-Type: application/json" \
  -H "Origin: https://justfyi.app" \
  -d '{"email": "existing@example.com", "honeypot": ""}'
```

Response:
```json
{
  "success": false,
  "code": "ALREADY_SUBSCRIBED",
  "message": "This email is already subscribed."
}
```

### Invalid Email (400)

```bash
curl -X POST \
  https://europe-west1-justfyi-web.cloudfunctions.net/subscribe \
  -H "Content-Type: application/json" \
  -H "Origin: https://justfyi.app" \
  -d '{"email": "not-an-email", "honeypot": ""}'
```

Response:
```json
{
  "success": false,
  "code": "INVALID_EMAIL",
  "message": "Please enter a valid email address."
}
```

### Rate Limited (429)

```bash
# After 5 requests from the same IP within an hour
curl -X POST \
  https://europe-west1-justfyi-web.cloudfunctions.net/subscribe \
  -H "Content-Type: application/json" \
  -H "Origin: https://justfyi.app" \
  -d '{"email": "test@example.com", "honeypot": ""}'
```

Response:
```json
{
  "success": false,
  "code": "RATE_LIMITED",
  "message": "Too many requests. Please try again later."
}
```

## Spam Protection

The endpoint includes multiple layers of spam protection:

### 1. Honeypot Field

A hidden form field that should remain empty. Bots typically fill all form fields, triggering this protection.

```json
{
  "email": "user@example.com",
  "honeypot": "" 
}
```

### 2. Rate Limiting

- **Limit:** 5 requests per IP address per hour
- **Implementation:** Sliding window tracked in Firestore
- **Privacy:** IP addresses are SHA-256 hashed before storage

### 3. Email Validation

- Standard regex pattern validation
- Automatic lowercase normalization
- Deduplication using email as document ID

## Data Storage

### Firestore Collections

#### `subscribers`

Stores email subscription records.

| Field | Type | Description |
|-------|------|-------------|
| `email` | string | Normalized email address (document ID) |
| `subscribedAt` | timestamp | Server timestamp when subscribed |
| `ipHash` | string | SHA-256 hash of subscriber's IP |
| `userAgent` | string | Browser user agent string |
| `source` | string | Subscription source (e.g., "homepage") |

#### `rate_limits`

Tracks rate limiting per IP hash.

| Field | Type | Description |
|-------|------|-------------|
| `count` | number | Request count in current window |
| `windowStart` | timestamp | Start of the rate limit window |

### Security Rules

All Firestore collections have a deny-all policy for client access:

```
allow read, write: if false;
```

Only the Cloud Functions (via Admin SDK) can read/write data.

## Local Development

### Prerequisites

- Node.js 20+
- Firebase CLI (`npm install -g firebase-tools`)
- Firebase project configured

### Setup

```bash
# Navigate to functions directory
cd functions

# Install dependencies
npm install

# Build TypeScript
npm run build
```

### Running Locally

```bash
# Start Firebase emulators
npm run serve

# Or from project root
firebase emulators:start
```

The function will be available at:
- http://localhost:5001/justfyi-web/europe-west1/subscribe

Emulator UI: http://localhost:4000

### Testing

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run security rules tests (requires emulator)
npm run test:rules
```

### Local API Testing

```bash
# Test with emulator
curl -X POST \
  http://localhost:5001/justfyi-web/europe-west1/subscribe \
  -H "Content-Type: application/json" \
  -H "Origin: http://localhost:4321" \
  -d '{"email": "test@example.com", "honeypot": ""}'
```

## Deployment

### Prerequisites

1. Firebase project created (see `FIREBASE_SETUP.md`)
2. Firebase CLI authenticated (`firebase login`)
3. Project selected (`firebase use justfyi-web`)

### Manual Deployment

```bash
# Build functions
npm run build

# Deploy functions only
firebase deploy --only functions

# Deploy everything (functions + security rules)
cd ..
firebase deploy
```

### Automated Deployment

GitHub Actions workflow (`.github/workflows/firebase-deploy.yml`) automatically deploys when:
- Changes are pushed to `main` branch in `functions/` directory
- Manually triggered via GitHub Actions UI

### Verify Deployment

```bash
# Test the deployed function
curl -X POST \
  https://europe-west1-justfyi-web.cloudfunctions.net/subscribe \
  -H "Content-Type: application/json" \
  -H "Origin: https://justfyi.app" \
  -d '{"email": "test@example.com", "honeypot": ""}'
```

Check Firebase Console > Functions > Logs for any errors.

## Project Structure

```
functions/
├── src/
│   ├── index.ts              # Main Cloud Functions entry point
│   ├── utils/
│   │   ├── index.ts          # Utility exports
│   │   ├── validation.ts     # Email validation
│   │   ├── hashing.ts        # IP hashing (SHA-256)
│   │   ├── rateLimit.ts      # Rate limiting logic
│   │   └── honeypot.ts       # Honeypot validation
│   └── __tests__/
│       ├── subscribe.test.ts       # Subscribe endpoint tests
│       └── firestore.rules.test.ts # Security rules tests
├── lib/                      # Compiled JavaScript (generated)
├── package.json
├── tsconfig.json
├── jest.config.js
├── .eslintrc.js
├── FIREBASE_SETUP.md         # Firebase Console setup guide
└── README.md                 # This file
```

## Environment Variables

### Runtime Environment

| Variable | Description | Set By |
|----------|-------------|--------|
| `FUNCTIONS_EMULATOR` | Set to `"true"` in emulator mode | Firebase CLI |

When `FUNCTIONS_EMULATOR=true`, localhost origins are allowed for CORS.

### No Secrets Required

The Cloud Functions use Firebase Admin SDK which authenticates automatically using the service account associated with the Cloud Functions runtime. No API keys or secrets need to be configured.

## Troubleshooting

### CORS Errors

- Verify the request includes the `Origin` header
- Check that the origin is in the allowed list (`justfyi.app` or localhost in dev)
- Use the Firebase emulator for local testing

### Function Not Found (404)

- Verify the function is deployed: `firebase functions:list`
- Check the URL format: `https://europe-west1-justfyi-web.cloudfunctions.net/subscribe`
- Ensure the region is correct (`europe-west1`)

### Rate Limit Issues

- Rate limit is 5 requests per IP per hour
- Rate limit data is in the `rate_limits` collection
- Clear test data manually in Firebase Console if needed

### Build Errors

```bash
# Clean and rebuild
rm -rf lib
npm run build
```

### Emulator Issues

```bash
# Reset emulator data
firebase emulators:start --clear-data-on-exit

# Check emulator status
firebase emulators:start --only functions,firestore
```

## Additional Resources

- [FIREBASE_SETUP.md](FIREBASE_SETUP.md) - Complete Firebase Console setup instructions
- [Firebase Cloud Functions Documentation](https://firebase.google.com/docs/functions)
- [Firestore Documentation](https://firebase.google.com/docs/firestore)
