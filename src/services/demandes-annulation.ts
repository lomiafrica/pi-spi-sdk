/**
 * Cancellation Requests (Demandes d'Annulation) service wrapper
 */

import { BaseService } from './base';
import type { QueryParams } from '../query-builder';

export class DemandesAnnulationService extends BaseService {
  /**
   * Create a cancellation request
   */
  async create(request: {
    comptePayeur: string;
    txId: string;
    motif: string;
  }) {
    return this.execute(async () => {
      throw new Error('Service not yet generated. Run "npm run generate" first.');
    });
  }

  /**
   * Get cancellation request details
   */
  async get(id: string) {
    return this.execute(async () => {
      throw new Error('Service not yet generated. Run "npm run generate" first.');
    });
  }

  /**
   * List cancellation requests
   */
  async list(params?: QueryParams) {
    return this.execute(async () => {
      throw new Error('Service not yet generated. Run "npm run generate" first.');
    });
  }
}

