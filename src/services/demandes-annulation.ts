/**
 * Cancellation Requests (Demandes d'Annulation) service wrapper
 *
 * Provides methods for requesting cancellation of sent payments.
 *
 * **Cancellation Rules:**
 * - Can only request cancellation of payments sent by the business
 * - Must be requested within 90 days of original payment
 * - Payee must accept the cancellation for funds to be returned
 * - Payee can reject the cancellation request
 * - Multiple cancellation requests can be sent for the same payment
 *
 * **Cancellation Flow:**
 * 1. Business requests cancellation of a sent payment
 * 2. Payee receives cancellation request
 * 3. Payee can accept (triggers fund return) or reject
 * 4. Business receives notification of payee's decision
 *
 * **Use Cases:**
 * - Payment sent to wrong recipient
 * - Duplicate payment
 * - Service cancellation
 * - Agreement cancellation
 *
 * @example
 * ```typescript
 * // Request cancellation of a sent payment
 * const cancellation = await sdk.demandesAnnulation.create({
 *   comptePayeur: 'CIC2344256727788288822',
 *   txId: '23552722', // Original payment transaction ID
 *   motif: 'CUST' // Cancellation reason code
 * });
 * ```
 */

import { BaseService } from './base';
import type { QueryParams } from '../query-builder';

export class DemandesAnnulationService extends BaseService {
  /**
   * Create a cancellation request
   *
   * **Cancellation Process:**
   * 1. Business identifies payment to cancel
   * 2. Creates cancellation request (must be within 90 days)
   * 3. Payee receives cancellation request
   * 4. Payee accepts or rejects
   * 5. If accepted, funds are returned via fund return mechanism
   *
   * **Status Values:**
   * - `INITIE`: Cancellation request sent, awaiting payee response
   * - `ACCEPTE`: Payee accepted cancellation (funds returned)
   * - `REJETE`: Payee rejected cancellation request
   *
   * **Rejection Reasons:**
   * - `CUST`: Customer rejection (payee refuses cancellation)
   * - `AM09`: Wrong amount
   * - `AC06`: Blocked account
   * - `FR01`: Fraud suspicion
   *
   * @param request - Cancellation request data
   * @param request.comptePayeur - Business account number (original payer)
   * @param request.txId - Original payment transaction ID to cancel
   * @param request.motif - Cancellation reason code (e.g., 'CUST' for customer request)
   * @returns Cancellation request response
   * @throws {PiSpiValidationError} If cancellation fails validation (e.g., > 90 days, invalid txId)
   * @throws {PiSpiNotFoundError} If payment not found
   *
   * @example
   * ```typescript
   * // Request cancellation
   * await sdk.demandesAnnulation.create({
   *   comptePayeur: 'CIC2344256727788288822',
   *   txId: '23552722', // Payment to cancel
   *   motif: 'CUST' // Customer request
   * });
   * ```
   */
  async create(request: {
    comptePayeur?: string;
    txId?: string;
    end2endId?: string;
    motif: string;
  }) {
    const end2endId = request.end2endId ?? request.txId;
    if (!end2endId) {
      throw new Error('end2endId or txId is required for cancellation requests');
    }

    return this.request(
      'POST',
      `/paiements/${encodeURIComponent(end2endId)}/annulations`,
      { raison: request.motif }
    );
  }

  /**
   * Get cancellation request details by end-to-end ID
   */
  async get(end2endId: string) {
    return this.request(
      'GET',
      `/paiements/${encodeURIComponent(end2endId)}/statuts`
    );
  }

  /**
   * List payments with cancellation status filter
   */
  async list(params?: QueryParams & { annulationStatut?: string }) {
    return this.request('GET', '/paiements', undefined, params);
  }

  /**
   * Respond to a cancellation request (accept or reject)
   */
  async respond(end2endId: string, decision: boolean) {
    return this.request(
      'PUT',
      `/paiements/${encodeURIComponent(end2endId)}/annulations/reponses`,
      { decision }
    );
  }
}
