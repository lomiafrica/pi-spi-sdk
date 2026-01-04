/**
 * Bulk Payment Requests (Demandes de Paiement en Masse) service wrapper
 *
 * Provides methods for creating and managing bulk payment requests.
 */

import { BaseService } from './base';

export class DemandesPaiementEnMasseService extends BaseService {
  /**
   * Create bulk payment requests
   */
  async create(request: {
    comptePaye: string;
    transactions: Array<{
      txId: string;
      payeurAlias: string;
      montant: number;
      motif: string;
      categorie?: string;
      dateLimitePaiement?: string;
      refDocType?: string;
      refDocNumero?: string;
    }>;
    confirmation?: boolean;
  }) {
    // Ensure default category is 401 if not provided
    const transactions = request.transactions.map(t => ({
        ...t,
        categorie: t.categorie || '401'
    }));

    // The SDK payload might need "transactions" but usually it's "demandesPaiement" or simply the body IS the object.
    // Based on REFERENCE.md, POST /demandes-paiements-groupes
    // It doesn't explicitly show the wrapper field name for transactions, let's assume it matches the input structure.
    
    // Based on SDK patterns, we usually wrap it.
    
    return this.request('POST', '/demandes-paiements-groupes', {
      ...request,
      transactions // Use the mapped transactions with defaults
    });
  }

  /**
   * Get bulk payment request details and status
   */
  async get(instructionId: string) {
    return this.request('GET', `/demandes-paiements-groupes/${instructionId}`);
  }

  /**
   * Confirm and send bulk payment requests
   */
  async confirm(instructionId: string) {
    return this.request('PUT', `/demandes-paiements-groupes/${instructionId}/confirmations`, {
        decision: true
    });
  }
}
