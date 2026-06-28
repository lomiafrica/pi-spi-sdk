/**
 * Payment Requests (Demandes de Paiement) service wrapper
 *
 * Provides methods for creating and managing payment requests (bills, invoices, etc.).
 *
 * **Payment Request Types:**
 * - **E-commerce** (`categorie: 521`): Online payment requests with 3-minute expiry
 * - **Point of Sale** (`categorie: 500`): Physical store payment requests
 * - **Invoice/Bill** (`categorie: 401`): Invoice payment requests with due dates
 * - **PICO**: Purchase with cash withdrawal (combined purchase + cashback)
 * - **PICASH**: Cash withdrawal only
 *
 * **Payment Request Flow:**
 * 1. Business creates payment request
 * 2. Customer receives request (via alias)
 * 3. Customer can: Accept & Pay Now, Accept & Pay Later, Reject, or Ignore
 * 4. If accepted, payment is processed automatically
 *
 * @example
 * ```typescript
 * // Create invoice payment request
 * const request = await sdk.demandesPaiement.create({
 *   comptePaye: 'CIC2344256727788288822',
 *   payeurAlias: '9b1b3499-3e50-435b-b757-ac7a83d8aa96',
 *   montant: 150000,
 *   categorie: '401',
 *   dateLimitePaiement: '2023-12-31T23:59:59.999Z',
 *   motif: 'Facture électricité mars 2023'
 * });
 * ```
 */

import { BaseService } from './base';
import type { QueryParams } from '../query-builder';

export class DemandesPaiementService extends BaseService {
  /**
   * Create a payment request
   *
   * **Request Types:**
   * - **E-commerce** (`categorie: 521`): Max 3 minutes validity
   * - **POS** (`categorie: 500`): Max 24 hours validity
   * - **Invoice** (`categorie: 401`): Custom due date (up to 90 days)
   *
   * **Confirmation Options:**
   * - `confirmation: false`: Request sent immediately (default for POS)
   * - `confirmation: true`: Returns payer info for verification before sending
   *
   * **Customer Actions:**
   * - Accept & Pay Now: Payment processed immediately
   * - Accept & Pay Later: Payment scheduled (if dateLimiteReponse > 24h)
   * - Reject: Request rejected with reason
   * - Ignore: Request expires after dateLimiteReponse
   *
   * @param request - Payment request creation data
   * @param request.comptePaye - Business account number (payee)
   * @param request.payeurAlias - Customer alias (payer)
   * @param request.montant - Amount in centimes (e.g., 150000 = 1,500 XOF)
   * @param request.categorie - Request category: '500' (POS), '521' (E-commerce), '401' (Invoice)
   * @param request.motif - Payment reason/description
   * @param request.txId - Unique transaction ID (optional)
   * @param request.dateLimitePaiement - Payment due date (required for e-commerce and invoices)
   * @param request.dateLimiteReponse - Response deadline (default: 90 days from creation)
   * @param request.confirmation - Whether to require confirmation (default: false for POS, true for invoices)
   * @param request.refDocType - Reference document type (e.g., 'CINV' for invoice)
   * @param request.refDocNumero - Reference document number (e.g., invoice number)
   * @returns Payment request response
   * @throws {PiSpiValidationError} If request fails validation
   *
   * @example
   * ```typescript
   * // E-commerce payment request (3-minute expiry)
   * await sdk.demandesPaiement.create({
   *   comptePaye: 'CIC2344256727788288822',
   *   payeurAlias: '9b1b3499-3e50-435b-b757-ac7a83d8aa96',
   *   montant: 25000, // 250 XOF
   *   categorie: '521',
   *   dateLimitePaiement: '2023-02-21T15:37:00.000Z', // 3 minutes from now
   *   motif: 'Paiement du livre Manuel des écritures comptables'
   * });
   *
   * // Invoice payment request
   * await sdk.demandesPaiement.create({
   *   comptePaye: 'CIC2344256727788288822',
   *   payeurAlias: '9b1b3499-3e50-435b-b757-ac7a83d8aa96',
   *   montant: 150000, // 1,500 XOF
   *   categorie: '401',
   *   dateLimitePaiement: '2023-12-31T23:59:59.999Z',
   *   motif: 'Facture électricité mars 2023',
   *   refDocType: 'CINV',
   *   refDocNumero: 'FACT-ELEC-202303',
   *   confirmation: true
   * });
   * ```
   */
  async create(request: {
    comptePaye: string;
    payeurAlias: string;
    montant: number;
    categorie: string;
    motif: string;
    txId?: string;
    dateLimitePaiement?: string;
    dateLimiteReponse?: string;
    confirmation?: boolean;
    refDocType?: string;
    refDocNumero?: string;
  }) {
    return this.request<{
      statut?: string;
      txId?: string;
      dateLimiteReponse?: string;
    }>('POST', '/demandes-paiements', request);
  }

  /**
   * List payment requests with filtering and pagination
   *
   * @param params - Query parameters for filtering and pagination
   * @returns Paginated list of payment requests
   */
  async list(params?: QueryParams) {
    return this.execute(async () => {
      throw new Error('Service not yet generated. Run "pnpm run generate" first.');
    });
  }

  /**
   * Get payment request details
   *
   * @param id - Payment request transaction ID
   * @returns Payment request details
   * @throws {PiSpiNotFoundError} If request not found
   */
  async get(id: string) {
    return this.request<{
      statut?: string;
      txId?: string;
      montant?: number;
      dateEnvoi?: string;
      dateIrrevocabilite?: string;
      dateRejet?: string;
      dateLimiteReponse?: string;
    }>('GET', `/demandes-paiements/${encodeURIComponent(id)}`);
  }

  /**
   * Accept a payment request
   *
   * **Note:** This is typically called by the customer's payment app, not the business.
   * The business receives notification when customer accepts.
   *
   * @param id - Payment request transaction ID
   * @param immediate - Whether to pay immediately (true) or schedule payment (false)
   * @returns Payment confirmation response
   */
  async accept(id: string, immediate: boolean = true) {
    return this.execute(async () => {
      throw new Error('Service not yet generated. Run "pnpm run generate" first.');
    });
  }

  /**
   * Reject a payment request
   *
   * **Note:** This is typically called by the customer's payment app, not the business.
   * The business receives notification when customer rejects.
   *
   * @param id - Payment request transaction ID
   * @param reason - Rejection reason code (optional)
   * @returns Rejection confirmation response
   */
  async reject(id: string, reason?: string) {
    return this.execute(async () => {
      throw new Error('Service not yet generated. Run "pnpm run generate" first.');
    });
  }
}
