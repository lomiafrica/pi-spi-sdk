/**
 * Webhooks (Notifications) service wrapper
 *
 * Provides methods for managing webhook configurations to receive real-time notifications
 * about payment events, payment requests, and fund returns.
 *
 * **Supported Events:**
 * - Payment events: `PAIEMENT_RECU`, `PAIEMENT_ENVOYE`, `PAIEMENT_REJETE`
 * - Payment request events: `RTP_RECU`, `RTP_REJETE`
 * - Fund return events: `RETOUR_ENVOYE`, `RETOUR_REJETE`, `RETOUR_RECU`
 * - Cancellation events: `ANNULATION_DEMANDE`, `ANNULATION_REJETE`
 *
 * **Webhook Security:**
 * - All communications must use SSL/TLS
 * - mTLS authentication required (certificate from BCEAO CA)
 * - Events are signed with HMAC for data integrity
 *
 * @example
 * ```typescript
 * // Create webhook for payment notifications
 * const webhook = await sdk.webhooks.create({
 *   callbackUrl: 'https://business.example.com/api/webhooks/pi-spi',
 *   events: ['PAIEMENT_RECU', 'PAIEMENT_ENVOYE']
 * });
 * ```
 */

import { BaseService } from './base';
import type { QueryParams } from '../query-builder';

export class WebhooksService extends BaseService {
  /**
   * Create a webhook configuration
   *
   * **Webhook Setup:**
   * - URL must be HTTPS
   * - Server must support mTLS with BCEAO-issued certificate
   * - Server must validate HMAC signatures
   * - Server must respond with 2xx status code
   *
   * **Event Types:**
   * - `PAIEMENT_RECU`: Payment received
   * - `PAIEMENT_ENVOYE`: Payment sent (irreversible)
   * - `PAIEMENT_REJETE`: Payment rejected
   * - `RTP_RECU`: Payment request received
   * - `RTP_REJETE`: Payment request rejected
   * - `RETOUR_ENVOYE`: Fund return sent
   * - `RETOUR_REJETE`: Fund return rejected
   * - `RETOUR_RECU`: Fund return received
   * - `ANNULATION_DEMANDE`: Cancellation request received
   * - `ANNULATION_REJETE`: Cancellation request rejected
   *
   * @param webhook - Webhook configuration
   * @param webhook.callbackUrl - HTTPS URL to receive notifications (must support mTLS)
   * @param webhook.events - Array of event types to subscribe to
   * @param webhook.alias - Optional: Alias-specific webhook (only notifications for this alias)
   * @returns Created webhook configuration
   * @throws {PiSpiValidationError} If URL is invalid or events array is empty
   *
   * @example
   * ```typescript
   * // Webhook for all payment events
   * await sdk.webhooks.create({
   *   callbackUrl: 'https://business.example.com/api/webhooks/pi-spi',
   *   events: ['PAIEMENT_RECU', 'PAIEMENT_ENVOYE', 'PAIEMENT_REJETE']
   * });
   *
   * // Alias-specific webhook
   * await sdk.webhooks.create({
   *   callbackUrl: 'https://business.example.com/api/webhooks/pi-spi',
   *   events: ['PAIEMENT_RECU'],
   *   alias: '8b1b2499-3e50-435b-b757-ac7a83d8aa7f'
   * });
   * ```
   */
  async create(webhook: { callbackUrl: string; events: string[]; alias?: string }) {
    return this.request<{
      id?: string;
      callbackUrl?: string;
      events?: string[];
    }>('POST', '/webhooks', webhook);
  }

  /**
   * List all configured webhooks
   *
   * @param params - Query parameters for pagination
   * @returns Paginated list of webhooks
   *
   * @example
   * ```typescript
   * const webhooks = await sdk.webhooks.list({ page: 1, size: 20 });
   * ```
   */
  async list(params?: QueryParams) {
    return this.execute(async () => {
      throw new Error('Service not yet generated. Run "pnpm run generate" first.');
    });
  }

  /**
   * Get webhook details by ID
   *
   * @param id - Webhook ID
   * @returns Webhook details
   * @throws {PiSpiNotFoundError} If webhook not found
   */
  async get(id: string) {
    return this.execute(async () => {
      throw new Error('Service not yet generated. Run "pnpm run generate" first.');
    });
  }

  /**
   * Update webhook configuration
   *
   * @param id - Webhook ID
   * @param webhook - Updated webhook configuration
   * @param webhook.callbackUrl - New callback URL (optional)
   * @param webhook.events - New event subscriptions (optional)
   * @param webhook.alias - New alias filter (optional)
   * @returns Updated webhook configuration
   * @throws {PiSpiNotFoundError} If webhook not found
   * @throws {PiSpiValidationError} If update fails validation
   *
   * @example
   * ```typescript
   * await sdk.webhooks.update('webhook-001', {
   *   callbackUrl: 'https://updated-url.com/webhooks/pi-spi',
   *   events: ['PAIEMENT_RECU', 'RTP_RECU']
   * });
   * ```
   */
  async update(
    id: string,
    webhook: {
      callbackUrl?: string;
      events?: string[];
      alias?: string;
    }
  ) {
    return this.execute(async () => {
      throw new Error('Service not yet generated. Run "pnpm run generate" first.');
    });
  }

  /**
   * Delete a webhook configuration
   *
   * @param id - Webhook ID
   * @throws {PiSpiNotFoundError} If webhook not found
   */
  async delete(id: string) {
    return this.execute(async () => {
      throw new Error('Service not yet generated. Run "pnpm run generate" first.');
    });
  }
}
