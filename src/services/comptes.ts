/**
 * Accounts (Comptes) service wrapper
 *
 * Provides methods for managing accounts, viewing balances,
 * listing operations, and performing intra-account transfers.
 *
 * @example
 * ```typescript
 * // Get account balance and details
 * const account = await sdk.comptes.getAccount('CIC2344256727788288822');
 * console.log('Balance:', account.solde); // Amount in centimes
 * console.log('Status:', account.statut); // 'OUVERT', 'BLOQUE', or 'CLOTURE'
 *
 * // List operations with pagination
 * const operations = await sdk.comptes.listOperations({
 *   comptePayeur: 'CIC2344256727788288822',
 *   page: 1,
 *   size: 20
 * });
 * ```
 */

import { BaseService } from './base';
import { handleApiError } from '../error-handler';
import type { QueryParams } from '../query-builder';

// Import generated types and services
// These will be available after running the generate script
// import { CompteSolde, CompteTransfertIntraRequest, CompteTransfertIntraReponse } from '../generated';
// import { DefaultService } from '../generated/services/DefaultService';

export class ComptesService extends BaseService {
  /**
   * Get account details and balance
   *
   * **Returns:**
   * - Account type (CACC, SVGS, etc.)
   * - Account number
   * - Current balance (`solde` in centimes)
   * - Account status (OUVERT, BLOQUE, CLOTURE)
   * - Opening date
   * - Pre-confirmation indicator
   *
   * @param numero - Account number (e.g., 'CIC2344256727788288822')
   * @returns Account details including balance
   * @throws {PiSpiNotFoundError} If account not found
   * @throws {PiSpiAuthError} If authentication fails
   *
   * @example
   * ```typescript
   * const account = await sdk.comptes.getAccount('CIC2344256727788288822');
   * // Returns: {
   * //   type: 'CACC',
   * //   numero: 'CIC2344256727788288822',
   * //   solde: 150000000, // 1,500,000 XOF in centimes
   * //   statut: 'OUVERT',
   * //   dateOuverture: '2023-02-21T15:30:01.250Z'
   * // }
   * ```
   */
  async getAccount(numero: string) {
    return this.request<{
      type?: string;
      numero?: string;
      solde?: number;
      balance?: number;
      statut?: string;
      dateOuverture?: string;
    }>('GET', `/comptes/${encodeURIComponent(numero)}`);
  }

  /**
   * List account operations (transactions)
   *
   * **Filtering Options:**
   * - Filter by account number (`comptePayeur`, `comptePaye`)
   * - Filter by status (`statut`: INITIE, ENVOYE, IRREVOCABLE, REJETE)
   * - Filter by dates (`dateEnvoi`, `dateIrrevocabilite`)
   * - Use QueryBuilder for advanced filtering
   *
   * @param params - Query parameters for filtering and pagination
   * @param params.comptePayeur - Filter by payer account number
   * @param params.comptePaye - Filter by payee account number
   * @param params.statut - Filter by transaction status
   * @param params.dateEnvoi - Filter by send date
   * @param params.dateIrrevocabilite - Filter by irrevocability date
   * @param params.page - Page number (default: 1)
   * @param params.size - Page size (default: 20, max: 100)
   * @returns Paginated list of operations
   *
   * @example
   * ```typescript
   * // List all operations for an account
   * const operations = await sdk.comptes.listOperations({
   *   comptePayeur: 'CIC2344256727788288822',
   *   page: 1,
   *   size: 20
   * });
   *
   * // Filter by status
   * const completed = await sdk.comptes.listOperations({
   *   comptePayeur: 'CIC2344256727788288822',
   *   statut: 'IRREVOCABLE'
   * });
   * ```
   */
  async listOperations(
    params?: QueryParams & {
      comptePayeur?: string;
      comptePaye?: string;
      statut?: string;
      dateEnvoi?: string;
      dateIrrevocabilite?: string;
    }
  ) {
    return this.execute(async () => {
      // This will call the generated service after codegen
      // return await DefaultService.compteTransfertIntraLister(params);
      throw new Error('Service not yet generated. Run "pnpm run generate" first.');
    });
  }

  /**
   * Transfer funds between accounts owned by the same client
   *
   * **Intra-Account Transfer:**
   * - Transfers between accounts owned by the same legal entity
   * - Accounts must be at the same financial institution
   * - Can use account numbers or aliases
   *
   * **Transfer Methods:**
   * - Using account numbers: `comptePayeur` and `comptePaye`
   * - Using aliases: `payeurAlias` and `payeAlias`
   *
   * @param transfer - Transfer request details
   * @param transfer.comptePayeur - Payer account number (if using account numbers)
   * @param transfer.comptePaye - Payee account number (if using account numbers)
   * @param transfer.payeurAlias - Payer alias (if using aliases)
   * @param transfer.payeAlias - Payee alias (if using aliases)
   * @param transfer.montant - Amount in centimes (e.g., 150000 = 1,500 XOF)
   * @param transfer.motif - Transfer reason/description
   * @param transfer.txId - Unique transaction ID (optional, auto-generated if not provided)
   * @returns Transfer response with status
   * @throws {PiSpiValidationError} If transfer fails validation
   * @throws {PiSpiError} If account blocked or insufficient funds
   *
   * @example
   * ```typescript
   * // Transfer using account numbers
   * await sdk.comptes.transfer({
   *   comptePayeur: 'CIC2344256727788288822',
   *   comptePaye: 'SNC2344256727788288822',
   *   montant: 150000, // 1,500 XOF
   *   motif: 'Transfert de fonds',
   *   txId: '23511722'
   * });
   *
   * // Transfer using aliases
   * await sdk.comptes.transfer({
   *   payeurAlias: '8b1b2499-3e50-435b-b757-ac7a83d8aa7f',
   *   payeAlias: '4r5ty499-3e50-435b-b757-ac7a83d67juio',
   *   montant: 150000,
   *   motif: 'Transfert entre comptes'
   * });
   * ```
   */
  async transfer(transfer: {
    comptePayeur?: string;
    comptePaye?: string;
    payeurAlias?: string;
    payeAlias?: string;
    montant: number;
    motif?: string;
    txId?: string;
  }) {
    return this.execute(async () => {
      // This will call the generated service after codegen
      // return await DefaultService.compteTransfertIntraCreer({
      //   requestBody: transfer
      // });
      throw new Error('Service not yet generated. Run "pnpm run generate" first.');
    });
  }
}
