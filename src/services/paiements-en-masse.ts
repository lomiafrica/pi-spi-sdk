/**
 * Bulk Payments (Paiements en Masse) service wrapper
 *
 * Provides methods for creating and managing bulk payment operations.
 *
 * **Bulk Payment Features:**
 * - Process multiple payments in a single request
 * - Linked by unique `instructionId`
 * - Can retry failed payments
 * - Supports up to 10,000 transactions per bulk (recommended: 500-5,000)
 *
 * **Transaction Size:**
 * - Max size per transaction: ~310 bytes
 * - Max bulk size: ~3.1 MB for 10,000 transactions
 * - Recommended: 500-5,000 transactions per bulk
 *
 * **Use Cases:**
 * - Salary payments
 * - Vendor payments
 * - Bulk disbursements
 * - Mass refunds
 *
 * @example
 * ```typescript
 * // Create bulk payment
 * const bulkPayment = await sdk.paiementsEnMasse.createBulk({
 *   comptePayeur: 'CIC2344256727788288822',
 *   instructionId: 'BULK-2023-001',
 *   transactions: [
 *     { txId: 'TX001', payeAlias: 'alias1', montant: 100000, motif: 'Salaire' },
 *     { txId: 'TX002', payeAlias: 'alias2', montant: 150000, motif: 'Salaire' }
 *   ]
 * });
 * ```
 */

import { BaseService } from './base';

export class PaiementsEnMasseService extends BaseService {
  /**
   * Create bulk payments
   *
   * **Bulk Processing:**
   * - All transactions share the same `instructionId`
   * - Each transaction needs unique `txId`
   * - Transactions are processed in parallel
   * - Failed transactions can be retried
   *
   * **Performance Considerations:**
   * - Larger bulks take longer to process
   * - May hit HTTP timeout for very large bulks
   * - Recommended: 500-5,000 transactions per bulk
   * - For >10,000 transactions, split into multiple bulks
   *
   * **Response Status:**
   * - `INITIE`: Bulk created, awaiting confirmation
   * - `ENVOYE`: Bulk sent, transactions processing
   * - `IRREVOCABLE`: All transactions completed
   * - `PARTIEL`: Some transactions succeeded, some failed
   * - `REJETE`: Bulk rejected (validation failed)
   *
   * @param payment - Bulk payment creation data
   * @param payment.comptePayeur - Payer account number
   * @param payment.instructionId - Unique bulk instruction ID
   * @param payment.transactions - Array of payment transactions
   * @param payment.transactions[].txId - Unique transaction ID (must be unique within bulk)
   * @param payment.transactions[].payeAlias - Payee alias (SHID, MCOD, or MBNO)
   * @param payment.transactions[].montant - Amount in centimes
   * @param payment.transactions[].motif - Payment reason/description
   * @param payment.transactions[].refDocType - Reference document type (optional)
   * @param payment.transactions[].refDocNumero - Reference document number (optional)
   * @returns Bulk payment response with status and summary
   * @throws {PiSpiValidationError} If bulk fails validation (e.g., duplicate txId, invalid alias)
   * @throws {PiSpiError} If account blocked or insufficient funds
   *
   * @example
   * ```typescript
   * // Create bulk payment for salary disbursement
   * await sdk.paiementsEnMasse.createBulk({
   *   comptePayeur: 'CIC2344256727788288822',
   *   instructionId: 'SALARY-2023-03',
   *   transactions: [
   *     {
   *       txId: 'SAL-001',
   *       payeAlias: '8b1b2499-3e50-435b-b757-ac7a83d8aa7f',
   *       montant: 500000, // 5,000 XOF
   *       motif: 'Salaire mars 2023'
   *     },
   *     {
   *       txId: 'SAL-002',
   *       payeAlias: '4r5ty499-3e50-435b-b757-ac7a83d67juio',
   *       montant: 750000, // 7,500 XOF
   *       motif: 'Salaire mars 2023'
   *     }
   *   ]
   * });
   * ```
   */
  async createBulk(payment: {
    comptePayeur: string;
    instructionId: string;
    transactions: Array<{
      txId: string;
      payeAlias: string;
      montant: number;
      motif: string;
      refDocType?: string;
      refDocNumero?: string;
    }>;
    confirmation?: boolean;
  }) {
    return this.request('POST', '/paiements-groupes', payment);
  }

  /**
   * Get bulk payment details and status
   *
   * **Response Includes:**
   * - Overall bulk status
   * - Transaction counts (total, succeeded, failed)
   * - Individual transaction statuses
   * - Failed transaction details
   *
   * @param instructionId - Bulk instruction ID
   * @returns Bulk payment details with transaction statuses
   * @throws {PiSpiNotFoundError} If bulk payment not found
   *
   * @example
   * ```typescript
   * const bulk = await sdk.paiementsEnMasse.get('SALARY-2023-03');
   * console.log('Status:', bulk.statut); // 'IRREVOCABLE'
   * console.log('Succeeded:', bulk.nombreSuccess); // 98
   * console.log('Failed:', bulk.nombreEchec); // 2
   * ```
   */
  async get(instructionId: string) {
    return this.request(
      'GET',
      `/paiements-groupes/${encodeURIComponent(instructionId)}`
    );
  }

  /**
   * Confirm or retry a bulk payment
   */
  async confirm(instructionId: string, decision: boolean = true) {
    return this.request(
      'PUT',
      `/paiements-groupes/${encodeURIComponent(instructionId)}/confirmations`,
      { decision }
    );
  }

  /**
   * Retry failed payments in a bulk payment
   *
   * **Retry Process:**
   * - Only failed transactions are retried
   * - Successful transactions are not affected
   * - Uses same `instructionId`
   * - Can retry multiple times if needed
   *
   * @param instructionId - Bulk instruction ID
   * @returns Retry response with updated status
   * @throws {PiSpiNotFoundError} If bulk payment not found
   * @throws {PiSpiError} If no failed transactions to retry
   *
   * @example
   * ```typescript
   * // Retry failed transactions
   * await sdk.paiementsEnMasse.retry('SALARY-2023-03');
   * ```
   */
  async retry(instructionId: string) {
    return this.confirm(instructionId, true);
  }
}
