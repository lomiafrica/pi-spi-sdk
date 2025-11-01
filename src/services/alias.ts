/**
 * Aliases service wrapper
 * 
 * Provides methods for managing account aliases.
 */

import { BaseService } from './base';
import type { QueryParams } from '../query-builder';

export class AliasService extends BaseService {
  /**
   * Create an account alias
   * 
   * @param alias - Alias creation data
   * @returns Created alias
   */
  async create(alias: {
    compte: string;
    alias: string;
    type: string;
  }) {
    return this.execute(async () => {
      // This will call the generated service after codegen
      throw new Error('Service not yet generated. Run "npm run generate" first.');
    });
  }

  /**
   * List aliases for an account
   * 
   * @param compte - Account number
   * @param params - Query parameters for pagination
   * @returns Paginated list of aliases
   */
  async list(compte: string, params?: QueryParams) {
    return this.execute(async () => {
      // This will call the generated service after codegen
      throw new Error('Service not yet generated. Run "npm run generate" first.');
    });
  }

  /**
   * Delete an alias
   * 
   * @param alias - Alias identifier
   */
  async delete(alias: string) {
    return this.execute(async () => {
      // This will call the generated service after codegen
      throw new Error('Service not yet generated. Run "npm run generate" first.');
    });
  }
}

