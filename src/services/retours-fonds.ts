/**
 * Fund Returns (Retours de Fonds) service wrapper
 *
 * Provides methods for returning funds from received payments.
 *
 * **Return Rules:**
 * - Can only return funds from payments received
 * - Must be initiated within 90 days of original payment
 * - After 90 days, returns are no longer possible
 * - Returns are processed instantly when sent
 *
 * **Use Cases:**
 * - Refunds for returned goods
 * - Cancellation of services
 * - Error corrections
 * - Customer disputes
 *
 * @example
 * ```typescript
 * // Return funds from a received payment
 * const returnFunds = await sdk.retoursFonds.create({
 *   comptePaye: 'CIC2344256727788288822',
 *   txId: '23552722', // Original payment transaction ID
 *   montant: 150000, // Amount to return (1,500 XOF)
 *   motif: 'CUST' // Customer request reason code
 * });
 * ```
 */

import { BaseService } from './base';
import type { QueryParams } from '../query-builder';

export class RetoursFondsService extends BaseService {
  /**
   * Create a fund return
   *
   * **Return Process:**
   * 1. Business identifies original payment transaction
   * 2. Creates return request (must be within 90 days)
   * 3. Return is processed immediately
   * 4. Funds are returned to original payer
   *
   * **Status Values:**
   * - `ENVOYE`: Return sent successfully
   * - `IRREVOCABLE`: Return confirmed and cannot be reversed
   * - `REJETE`: Return rejected (check `statutRaison` for error code)
   *
   * **Rejection Reasons:**
   * - `AM04`: Insufficient guarantee funds
   * - `AM09`: Wrong amount
   * - `AC06`: Blocked account
   * - `FR01`: Fraud suspicion
   * - `RR04`: Regulatory reason
   *
   * @param returnRequest - Fund return request data
   * @param returnRequest.comptePaye - Business account number (original payee)
   * @param returnRequest.txId - Original payment transaction ID
   * @param returnRequest.montant - Amount to return in centimes (e.g., 150000 = 1,500 XOF)
   * @param returnRequest.motif - Return reason code (e.g., 'CUST' for customer request)
   * @returns Fund return response
   * @throws {PiSpiValidationError} If return fails validation (e.g., > 90 days, invalid txId)
   * @throws {PiSpiError} If account blocked or insufficient funds
   *
   * @example
   * ```typescript
   * // Return full payment amount
   * await sdk.retoursFonds.create({
   *   comptePaye: 'CIC2344256727788288822',
   *   txId: '23552722', // Original payment ID
   *   montant: 150000, // 1,500 XOF
   *   motif: 'CUST' // Customer request
   * });
   * ```
   */
  async create(returnRequest: {
    comptePaye?: string;
    txId?: string;
    end2endId?: string;
    montant?: number;
    motif?: string;
  }) {
    const end2endId = returnRequest.end2endId ?? returnRequest.txId;
    if (!end2endId) {
      throw new Error('end2endId or txId is required for fund returns');
    }

    return this.request(
      'PUT',
      `/paiements/${encodeURIComponent(end2endId)}/retours`
    );
  }

  /**
   * Get fund return details by end-to-end ID
   */
  async get(end2endId: string) {
    return this.request(
      'GET',
      `/paiements/${encodeURIComponent(end2endId)}/statuts`
    );
  }

  /**
   * List payments with fund return status filter
   */
  async list(params?: QueryParams & { retourStatut?: string }) {
    return this.request('GET', '/paiements', undefined, params);
  }
}
