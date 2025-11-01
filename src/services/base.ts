/**
 * Base service class with common error handling
 */

import { handleApiError } from '../error-handler';

export abstract class BaseService {
  /**
   * Wrap an async operation with error handling
   */
  protected async execute<T>(
    operation: () => Promise<T>
  ): Promise<T> {
    try {
      return await operation();
    } catch (error) {
      handleApiError(error);
    }
  }
}

