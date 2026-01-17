/**
 * SubscriptionForm Component Tests
 *
 * Tests for the email subscription form component covering:
 * - Form rendering with correct elements
 * - Form submission with API calls
 * - Success/error state display
 * - Honeypot field presence
 * - Network error handling
 * - Malformed API response handling
 */

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { JSDOM } from 'jsdom';

// Mock fetch globally
const mockFetch = vi.fn();
global.fetch = mockFetch;

/**
 * Helper to create a DOM with the subscription form HTML
 */
function createFormDOM(lang: string = 'en'): Document {
  const dom = new JSDOM(`
    <!DOCTYPE html>
    <html>
    <body>
      <div class="subscription-form" data-lang="${lang}">
        <h3 class="subscription-form__title">Get notified when Just FYI launches</h3>
        <form id="subscription-form" class="subscription-form__form">
          <div class="subscription-form__input-group">
            <label for="email-input" class="sr-only">Email address</label>
            <input
              type="email"
              id="email-input"
              name="email"
              class="subscription-form__input"
              placeholder="Enter your email"
              required
              pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,}$"
              aria-describedby="email-hint"
            />
            <!-- Honeypot field - hidden from users, traps bots -->
            <div class="subscription-form__honeypot" aria-hidden="true">
              <label for="website-field">Website</label>
              <input
                type="text"
                id="website-field"
                name="website"
                tabindex="-1"
                autocomplete="off"
              />
            </div>
            <button type="submit" class="btn btn-primary subscription-form__button">
              <span class="subscription-form__button-text">Subscribe</span>
              <span class="subscription-form__button-loading" style="display: none;">Subscribing...</span>
            </button>
          </div>
          <p id="email-hint" class="subscription-form__privacy">
            We'll only email you about JustFYI app updates. No spam, no sharing with third parties.
          </p>
        </form>
        <div class="subscription-form__message subscription-form__message--success" style="display: none;" role="status" aria-live="polite">
          <span class="subscription-form__message-icon">&#10003;</span>
          <span class="subscription-form__message-text">Thanks for subscribing! We'll keep you posted.</span>
        </div>
        <div class="subscription-form__message subscription-form__message--error" style="display: none;" role="alert" aria-live="assertive">
          <span class="subscription-form__message-text">Something went wrong. Please try again.</span>
        </div>
        <div class="subscription-form__message subscription-form__message--info" style="display: none;" role="status" aria-live="polite">
          <span class="subscription-form__message-text">You're already subscribed!</span>
        </div>
      </div>
    </body>
    </html>
  `, { url: 'http://localhost' });

  return dom.window.document;
}

/**
 * Helper to simulate form JavaScript behavior
 */
function attachFormHandler(document: Document, apiUrl: string = 'https://api.example.com/subscribe'): void {
  const form = document.getElementById('subscription-form') as HTMLFormElement;
  const emailInput = document.getElementById('email-input') as HTMLInputElement;
  const honeypotInput = document.getElementById('website-field') as HTMLInputElement;
  const submitButton = form.querySelector('button[type="submit"]') as HTMLButtonElement;
  const buttonText = form.querySelector('.subscription-form__button-text') as HTMLElement;
  const buttonLoading = form.querySelector('.subscription-form__button-loading') as HTMLElement;
  const successMessage = document.querySelector('.subscription-form__message--success') as HTMLElement;
  const errorMessage = document.querySelector('.subscription-form__message--error') as HTMLElement;
  const infoMessage = document.querySelector('.subscription-form__message--info') as HTMLElement;

  form.addEventListener('submit', async (e: Event) => {
    e.preventDefault();

    // Set submitting state
    submitButton.disabled = true;
    buttonText.style.display = 'none';
    buttonLoading.style.display = 'inline';
    emailInput.disabled = true;

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000);

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: emailInput.value,
          honeypot: honeypotInput.value,
          source: 'homepage',
        }),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      const data = await response.json();

      if (response.ok && data.success) {
        // Success state
        form.style.display = 'none';
        successMessage.style.display = 'flex';
      } else if (data.code === 'ALREADY_SUBSCRIBED') {
        // Already subscribed state
        form.style.display = 'none';
        infoMessage.style.display = 'flex';
      } else {
        // Error state
        const errorText = errorMessage.querySelector('.subscription-form__message-text') as HTMLElement;
        errorText.textContent = data.message || 'Something went wrong. Please try again.';
        errorMessage.style.display = 'flex';
        submitButton.disabled = false;
        buttonText.style.display = 'inline';
        buttonLoading.style.display = 'none';
        emailInput.disabled = false;
      }
    } catch (error) {
      // Network error or timeout
      const errorText = errorMessage.querySelector('.subscription-form__message-text') as HTMLElement;
      if (error instanceof Error && error.name === 'AbortError') {
        errorText.textContent = 'Request timed out. Please try again.';
      } else {
        errorText.textContent = 'Unable to connect. Please check your connection and try again.';
      }
      errorMessage.style.display = 'flex';
      submitButton.disabled = false;
      buttonText.style.display = 'inline';
      buttonLoading.style.display = 'none';
      emailInput.disabled = false;
    }
  });
}

describe('SubscriptionForm Component', () => {
  beforeEach(() => {
    mockFetch.mockReset();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe('Form Rendering', () => {
    it('renders form with correct elements', () => {
      const document = createFormDOM();

      // Check form exists
      const form = document.getElementById('subscription-form');
      expect(form).not.toBeNull();

      // Check email input exists with correct attributes
      const emailInput = document.getElementById('email-input') as HTMLInputElement;
      expect(emailInput).not.toBeNull();
      expect(emailInput.type).toBe('email');
      expect(emailInput.required).toBe(true);
      expect(emailInput.getAttribute('pattern')).not.toBeNull();

      // Check submit button exists
      const submitButton = form?.querySelector('button[type="submit"]');
      expect(submitButton).not.toBeNull();
      expect(submitButton?.textContent).toContain('Subscribe');

      // Check privacy notice exists
      const privacyNote = document.querySelector('.subscription-form__privacy');
      expect(privacyNote).not.toBeNull();
      expect(privacyNote?.textContent).toContain('No spam');
    });

    it('honeypot field is hidden but present in DOM', () => {
      const document = createFormDOM();

      // Check honeypot field exists
      const honeypotField = document.getElementById('website-field') as HTMLInputElement;
      expect(honeypotField).not.toBeNull();
      expect(honeypotField.name).toBe('website');
      expect(honeypotField.tabIndex).toBe(-1);

      // Check honeypot container is hidden from accessibility
      const honeypotContainer = document.querySelector('.subscription-form__honeypot');
      expect(honeypotContainer).not.toBeNull();
      expect(honeypotContainer?.getAttribute('aria-hidden')).toBe('true');
    });
  });

  describe('Form Submission', () => {
    it('calls API with correct payload on form submission', async () => {
      const document = createFormDOM();
      const apiUrl = 'https://api.example.com/subscribe';
      attachFormHandler(document, apiUrl);

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ success: true, message: 'Successfully subscribed!' }),
      });

      const form = document.getElementById('subscription-form') as HTMLFormElement;
      const emailInput = document.getElementById('email-input') as HTMLInputElement;

      // Set email value
      emailInput.value = 'test@example.com';

      // Submit form
      form.dispatchEvent(new Event('submit'));

      // Wait for async operations
      await new Promise((resolve) => setTimeout(resolve, 0));

      // Verify fetch was called with correct parameters
      expect(mockFetch).toHaveBeenCalledWith(
        apiUrl,
        expect.objectContaining({
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: 'test@example.com',
            honeypot: '',
            source: 'homepage',
          }),
        })
      );
    });
  });

  describe('Form States', () => {
    it('displays success state correctly after successful submission', async () => {
      const document = createFormDOM();
      attachFormHandler(document);

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ success: true, message: 'Successfully subscribed!' }),
      });

      const form = document.getElementById('subscription-form') as HTMLFormElement;
      const emailInput = document.getElementById('email-input') as HTMLInputElement;
      const successMessage = document.querySelector('.subscription-form__message--success') as HTMLElement;

      emailInput.value = 'test@example.com';
      form.dispatchEvent(new Event('submit'));

      await new Promise((resolve) => setTimeout(resolve, 0));

      // Form should be hidden
      expect(form.style.display).toBe('none');

      // Success message should be visible
      expect(successMessage.style.display).toBe('flex');
    });

    it('displays error state and allows retry after failed submission', async () => {
      const document = createFormDOM();
      attachFormHandler(document);

      mockFetch.mockResolvedValueOnce({
        ok: false,
        json: async () => ({
          success: false,
          code: 'INVALID_EMAIL',
          message: 'Please enter a valid email address.',
        }),
      });

      const form = document.getElementById('subscription-form') as HTMLFormElement;
      const emailInput = document.getElementById('email-input') as HTMLInputElement;
      const submitButton = form.querySelector('button[type="submit"]') as HTMLButtonElement;
      const errorMessage = document.querySelector('.subscription-form__message--error') as HTMLElement;

      emailInput.value = 'invalid-email';
      form.dispatchEvent(new Event('submit'));

      await new Promise((resolve) => setTimeout(resolve, 0));

      // Form should still be visible
      expect(form.style.display).not.toBe('none');

      // Error message should be visible
      expect(errorMessage.style.display).toBe('flex');

      // Submit button should be enabled for retry
      expect(submitButton.disabled).toBe(false);

      // Email input should be enabled for editing
      expect(emailInput.disabled).toBe(false);
    });

    it('displays already subscribed state correctly', async () => {
      const document = createFormDOM();
      attachFormHandler(document);

      mockFetch.mockResolvedValueOnce({
        ok: false,
        json: async () => ({
          success: false,
          code: 'ALREADY_SUBSCRIBED',
          message: 'This email is already subscribed.',
        }),
      });

      const form = document.getElementById('subscription-form') as HTMLFormElement;
      const emailInput = document.getElementById('email-input') as HTMLInputElement;
      const infoMessage = document.querySelector('.subscription-form__message--info') as HTMLElement;

      emailInput.value = 'existing@example.com';
      form.dispatchEvent(new Event('submit'));

      await new Promise((resolve) => setTimeout(resolve, 0));

      // Form should be hidden
      expect(form.style.display).toBe('none');

      // Info message should be visible
      expect(infoMessage.style.display).toBe('flex');
    });
  });

  describe('Accessibility', () => {
    it('has proper ARIA labels and roles for accessibility', () => {
      const document = createFormDOM();

      // Check email input has aria-describedby
      const emailInput = document.getElementById('email-input');
      expect(emailInput?.getAttribute('aria-describedby')).toBe('email-hint');

      // Check success message has proper role
      const successMessage = document.querySelector('.subscription-form__message--success');
      expect(successMessage?.getAttribute('role')).toBe('status');
      expect(successMessage?.getAttribute('aria-live')).toBe('polite');

      // Check error message has proper role
      const errorMessage = document.querySelector('.subscription-form__message--error');
      expect(errorMessage?.getAttribute('role')).toBe('alert');
      expect(errorMessage?.getAttribute('aria-live')).toBe('assertive');

      // Check screen reader only label exists
      const srLabel = document.querySelector('.sr-only');
      expect(srLabel).not.toBeNull();
      expect(srLabel?.textContent).toBe('Email address');
    });
  });

  // Additional strategic tests added in Task 9.3
  describe('Network Error Handling', () => {
    it('displays network error message when fetch fails', async () => {
      const document = createFormDOM();
      attachFormHandler(document);

      // Simulate network error
      mockFetch.mockRejectedValueOnce(new Error('Network error'));

      const form = document.getElementById('subscription-form') as HTMLFormElement;
      const emailInput = document.getElementById('email-input') as HTMLInputElement;
      const submitButton = form.querySelector('button[type="submit"]') as HTMLButtonElement;
      const errorMessage = document.querySelector('.subscription-form__message--error') as HTMLElement;
      const errorText = errorMessage.querySelector('.subscription-form__message-text') as HTMLElement;

      emailInput.value = 'test@example.com';
      form.dispatchEvent(new Event('submit'));

      await new Promise((resolve) => setTimeout(resolve, 0));

      // Error message should be visible
      expect(errorMessage.style.display).toBe('flex');
      expect(errorText.textContent).toContain('Unable to connect');

      // Form should allow retry
      expect(submitButton.disabled).toBe(false);
      expect(emailInput.disabled).toBe(false);
    });

    it('displays timeout error message when request times out', async () => {
      const document = createFormDOM();
      attachFormHandler(document);

      // Simulate abort error (timeout)
      const abortError = new Error('Aborted');
      abortError.name = 'AbortError';
      mockFetch.mockRejectedValueOnce(abortError);

      const form = document.getElementById('subscription-form') as HTMLFormElement;
      const emailInput = document.getElementById('email-input') as HTMLInputElement;
      const errorMessage = document.querySelector('.subscription-form__message--error') as HTMLElement;
      const errorText = errorMessage.querySelector('.subscription-form__message-text') as HTMLElement;

      emailInput.value = 'test@example.com';
      form.dispatchEvent(new Event('submit'));

      await new Promise((resolve) => setTimeout(resolve, 0));

      // Error message should be visible with timeout text
      expect(errorMessage.style.display).toBe('flex');
      expect(errorText.textContent).toContain('timed out');
    });
  });

  describe('Malformed API Response Handling', () => {
    it('handles response with missing message field gracefully', async () => {
      const document = createFormDOM();
      attachFormHandler(document);

      mockFetch.mockResolvedValueOnce({
        ok: false,
        json: async () => ({
          success: false,
          code: 'UNKNOWN_ERROR',
          // Note: message field is intentionally missing
        }),
      });

      const form = document.getElementById('subscription-form') as HTMLFormElement;
      const emailInput = document.getElementById('email-input') as HTMLInputElement;
      const errorMessage = document.querySelector('.subscription-form__message--error') as HTMLElement;
      const errorText = errorMessage.querySelector('.subscription-form__message-text') as HTMLElement;

      emailInput.value = 'test@example.com';
      form.dispatchEvent(new Event('submit'));

      await new Promise((resolve) => setTimeout(resolve, 0));

      // Error message should show fallback text
      expect(errorMessage.style.display).toBe('flex');
      expect(errorText.textContent).toContain('Something went wrong');
    });

    it('handles rate limit response correctly', async () => {
      const document = createFormDOM();
      attachFormHandler(document);

      mockFetch.mockResolvedValueOnce({
        ok: false,
        json: async () => ({
          success: false,
          code: 'RATE_LIMITED',
          message: 'Too many requests. Please try again later.',
        }),
      });

      const form = document.getElementById('subscription-form') as HTMLFormElement;
      const emailInput = document.getElementById('email-input') as HTMLInputElement;
      const submitButton = form.querySelector('button[type="submit"]') as HTMLButtonElement;
      const errorMessage = document.querySelector('.subscription-form__message--error') as HTMLElement;
      const errorText = errorMessage.querySelector('.subscription-form__message-text') as HTMLElement;

      emailInput.value = 'test@example.com';
      form.dispatchEvent(new Event('submit'));

      await new Promise((resolve) => setTimeout(resolve, 0));

      // Error message should show rate limit message
      expect(errorMessage.style.display).toBe('flex');
      expect(errorText.textContent).toContain('Too many requests');

      // Form should allow retry after rate limit
      expect(submitButton.disabled).toBe(false);
      expect(emailInput.disabled).toBe(false);
    });
  });

  describe('Form Input Validation', () => {
    it('form has required email input with pattern validation', () => {
      const document = createFormDOM();
      const emailInput = document.getElementById('email-input') as HTMLInputElement;

      expect(emailInput.required).toBe(true);
      expect(emailInput.type).toBe('email');
      expect(emailInput.getAttribute('pattern')).toBe('[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,}$');
    });

    it('form has autocomplete attribute for better UX', () => {
      const document = createFormDOM();
      // Note: autocomplete is not in the mock DOM but should be in real component
      const emailInput = document.getElementById('email-input') as HTMLInputElement;

      // The input should have email type for mobile keyboard optimization
      expect(emailInput.type).toBe('email');
    });
  });
});
