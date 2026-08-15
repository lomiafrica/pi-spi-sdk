/**
 * Utility functions for PI-SPI operations
 *
 * Common helper functions for formatting amounts, validating inputs,
 * and other utility operations.
 */

/**
 * Format amount from centimes to XOF
 * @param centimes - Amount in centimes
 * @returns Formatted amount string (e.g., "1 500 XOF")
 */
export function formatAmount(centimes: number): string {
  const xof = centimes / 100;
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'XOF',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(xof);
}

/**
 * Convert XOF to centimes
 * @param xof - Amount in XOF
 * @returns Amount in centimes
 */
export function xofToCentimes(xof: number): number {
  return Math.round(xof * 100);
}

/**
 * Convert centimes to XOF
 * @param centimes - Amount in centimes
 * @returns Amount in XOF
 */
export function centimesToXof(centimes: number): number {
  return centimes / 100;
}

/**
 * Validate account number format
 * @param accountNumber - Account number to validate
 * @returns True if valid format
 */
export function isValidAccountNumber(accountNumber: string): boolean {
  // PI-SPI account numbers are typically 22 characters
  // Format: [Country Code][Bank Code][Account Number]
  // Example: CIC2344256727788288822 (Côte d'Ivoire)
  return /^[A-Z]{2,3}\d{19,22}$/.test(accountNumber);
}

/**
 * Validate SHID alias format (UUID)
 * @param alias - Alias to validate
 * @returns True if valid UUID format
 */
export function isValidShidAlias(alias: string): boolean {
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
  return uuidRegex.test(alias);
}

/**
 * Validate phone number format (for MBNO alias)
 * @param phoneNumber - Phone number to validate
 * @returns True if valid format
 */
export function isValidPhoneNumber(phoneNumber: string): boolean {
  // Basic validation for West African phone numbers
  // Format: +[country code][number] or [country code][number]
  const phoneRegex = /^\+?[1-9]\d{8,12}$/;
  return phoneRegex.test(phoneNumber.replace(/[\s-]/g, ''));
}

/**
 * Extract country code from account number
 * @param accountNumber - Account number
 * @returns Country code or null
 */
export function getCountryFromAccount(accountNumber: string): string | null {
  const countryMap = new Map([
    ['CI', "Côte d'Ivoire"],
    ['SN', 'Senegal'],
    ['BJ', 'Benin'],
    ['BF', 'Burkina Faso'],
    ['ML', 'Mali'],
    ['NE', 'Niger'],
    ['TG', 'Togo'],
    ['GW', 'Guinea-Bissau'],
  ]);

  const countryCode = accountNumber.substring(0, 2);
  return countryMap.get(countryCode) || null;
}

/**
 * Sleep/delay utility
 * @param ms - Milliseconds to wait
 */
export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Retry a function with exponential backoff
 * @param fn - Function to retry
 * @param maxRetries - Maximum number of retries
 * @param initialDelay - Initial delay in milliseconds
 */
export async function retryWithBackoff<T>(
  fn: () => Promise<T>,
  maxRetries: number = 3,
  initialDelay: number = 1000
): Promise<T> {
  let lastError: Error | undefined;

  for (let i = 0; i < maxRetries; i++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error instanceof Error ? error : new Error(String(error));
      if (i < maxRetries - 1) {
        const delay = initialDelay * Math.pow(2, i);
        await sleep(delay);
      }
    }
  }

  throw lastError ?? new Error('Retry failed with unknown error');
}
