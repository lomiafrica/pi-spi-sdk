/**
 * Fund Returns (Retours de Fonds) service wrapper
 */

import { BaseService } from './base';
import type { QueryParams } from '../query-builder';

export class RetoursFondsService extends BaseService {
  /**
   * Create a fund return
   */
  async create(returnRequest: {
    comptePaye: string;
    txId: string;
    montant: number;
    motif: string;
  }) {
    return this.execute(async () => {
      throw new Error('Service not yet generated. Run "npm run generate" first.');
    });
  }

  /**
   * Get fund return details
   */
  async get(id: string) {
    return this.execute(async () => {
      throw new Error('Service not yet generated. Run "npm run generate" first.');
    });
  }

  /**
   * List fund returns
   */
  async list(params?: QueryParams) {
    return this.execute(async () => {
      throw new Error('Service not yet generated. Run "npm run generate" first.');
    });
  }
}

