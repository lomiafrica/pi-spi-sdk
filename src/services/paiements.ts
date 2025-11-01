/**
 * Payments (Paiements) service wrapper
 */

import { BaseService } from './base';
import type { QueryParams } from '../query-builder';

export class PaiementsService extends BaseService {
  /**
   * Create an immediate payment
   */
  async create(payment: {
    comptePayeur: string;
    payeAlias: string;
    montant: number;
    motif: string;
    reference?: string;
  }) {
    return this.execute(async () => {
      throw new Error('Service not yet generated. Run "npm run generate" first.');
    });
  }

  /**
   * Get payment details
   */
  async get(txId: string) {
    return this.execute(async () => {
      throw new Error('Service not yet generated. Run "npm run generate" first.');
    });
  }

  /**
   * List payments
   */
  async list(params?: QueryParams) {
    return this.execute(async () => {
      throw new Error('Service not yet generated. Run "npm run generate" first.');
    });
  }
}

