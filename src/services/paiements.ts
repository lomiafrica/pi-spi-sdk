/**
 * Payments (Paiements) service wrapper
 *
 * Provides methods for creating and managing immediate payments.
 *
 * **Payment Types Supported:**
 * - **Bank-to-Bank**: Payments between bank accounts via API (`categorie: 733`)
 * - **Bank-to-Wallet**: Payments from bank accounts to mobile wallets
 * - **Wallet-to-Wallet**: Payments between mobile wallets
 * - **Wallet-to-Bank**: Payments from mobile wallets to bank accounts
 *
 * All payment types are interoperable across the UEMOA region (8 countries).
 *
 * @example
 * ```typescript
 * // Create immediate payment
 * const payment = await sdk.paiements.create({
 *   comptePayeur: 'CIC2344256727788288822',
 *   payeAlias: '8b1b2499-3e50-435b-b757-ac7a83d8aa7f',
 *   montant: 150000, // 1,500 XOF
 *   motif: 'Paiement de services'
 * });
 * ```
 */

import { BaseService } from './base';
import type { QueryParams } from '../query-builder';

export class PaiementsService extends BaseService {
  /**
   * Create an immediate payment
   *
   * **Payment Flow:**
   * - If `confirmation: false`: Payment is sent immediately (default)
   * - If `confirmation: true`: Payment is initiated, returns payee info for confirmation
   *
   * **Supported Transaction Types:**
   * - Bank-to-Bank (`categorie: 733`)
   * - Bank-to-Wallet (via alias lookup)
   * - Wallet-to-Wallet (via alias lookup)
   * - Wallet-to-Bank (via alias lookup)
   *
   * **Status Values:**
   * - `INITIE`: Waiting for confirmation (if confirmation: true)
   * - `ENVOYE`: Payment sent successfully
   * - `IRREVOCABLE`: Payment confirmed and cannot be reversed
   * - `REJETE`: Payment rejected (check `statutRaison` for error code)
   *
   * @param payment - Payment creation data
   * @param payment.comptePayeur - Payer account number (e.g., 'CIC2344256727788288822')
   * @param payment.payeAlias - Payee alias (SHID, MCOD, or MBNO format)
   * @param payment.montant - Amount in centimes (e.g., 150000 = 1,500 XOF)
   * @param payment.motif - Payment reason/description
   * @param payment.txId - Unique transaction ID (optional, auto-generated if not provided)
   * @param payment.confirmation - Whether to require confirmation before sending (default: false)
   * @param payment.categorie - Payment category/canal (default: 733 for API Business)
   * @returns Payment response with status
   * @throws {PiSpiValidationError} If payment fails validation (e.g., invalid alias, duplicate txId)
   * @throws {PiSpiError} If account blocked or insufficient funds
   *
   * @example
   * ```typescript
   * // Immediate payment (no confirmation)
   * const payment = await sdk.paiements.create({
   *   comptePayeur: 'CIC2344256727788288822',
   *   payeAlias: '8b1b2499-3e50-435b-b757-ac7a83d8aa7f', // SHID alias
   *   montant: 150000, // 1,500 XOF
   *   motif: 'Paiement de services',
   *   txId: '23552722'
   * });
   *
   * // Payment with confirmation (returns payee info)
   * const paymentWithConfirmation = await sdk.paiements.create({
   *   comptePayeur: 'CIC2344256727788288822',
   *   payeAlias: '8b1b2499-3e50-435b-b757-ac7a83d8aa7f',
   *   montant: 3000000, // 30,000 XOF
   *   confirmation: true
   * });
   * ```
   */
  async create(payment: {
    comptePayeur?: string;
    payeurAlias?: string;
    payeAlias: string;
    comptePaye?: string;
    montant: number;
    motif: string;
    txId?: string;
    confirmation?: boolean;
    categorie?: string;
  }) {
    const txId =
      payment.txId ??
      `PAY-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;

    const payeurAlias = payment.payeurAlias ?? payment.comptePayeur;
    if (!payeurAlias) {
      throw new Error('payeurAlias or comptePayeur is required for SPI payouts');
    }

    return this.request<{
      statut?: string;
      txId?: string;
      statutRaison?: string;
    }>('POST', '/paiements', {
      txId,
      payeurAlias,
      payeAlias: payment.payeAlias,
      montant: payment.montant,
      motif: payment.motif,
      confirmation: payment.confirmation ?? false,
    });
  }

  /**
   * Get payment details by transaction ID
   *
   * @param txId - Transaction ID
   * @returns Payment details including status and history
   * @throws {PiSpiNotFoundError} If payment not found
   *
   * @example
   * ```typescript
   * const payment = await sdk.paiements.get('23552722');
   * console.log('Status:', payment.statut); // 'IRREVOCABLE'
   * console.log('Amount:', payment.montant); // 150000
   * ```
   */
  async get(txId: string) {
    return this.request<{
      statut?: string;
      txId?: string;
      montant?: number;
      dateEnvoi?: string;
      dateIrrevocabilite?: string;
      dateRejet?: string;
    }>('GET', `/paiements/${encodeURIComponent(txId)}`);
  }

  /**
   * List payments with filtering and pagination
   *
   * **Filter Options:**
   * - Filter by account: `comptePayeur`
   * - Filter by status: `statut` (INITIE, ENVOYE, IRREVOCABLE, REJETE)
   * - Filter by dates: `dateEnvoi`, `dateIrrevocabilite`
   * - Use QueryBuilder for advanced filtering
   *
   * @param params - Query parameters for filtering and pagination
   * @returns Paginated list of payments
   *
   * @example
   * ```typescript
   * // List all payments for an account
   * const payments = await sdk.paiements.list({
   *   comptePayeur: 'CIC2344256727788288822',
   *   page: 1,
   *   size: 20
   * });
   *
   * // Filter by status
   * const completed = await sdk.paiements.list({
   *   comptePayeur: 'CIC2344256727788288822',
   *   statut: 'IRREVOCABLE'
   * });
   * ```
   */
  async list(
    params?: QueryParams & {
      comptePayeur?: string;
      statut?: string;
    }
  ) {
    return this.execute(async () => {
      throw new Error('Service not yet generated. Run "pnpm run generate" first.');
    });
  }
}
