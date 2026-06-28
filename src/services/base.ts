/**
 * Base service class with common error handling and HTTP request capability
 */

import { handleApiError } from '../error-handler';

export interface ApiConfig {
  BASE: string;
  TOKEN?: string;
  HEADERS?: Record<string, string>;
  dispatcher?: unknown;
}

export abstract class BaseService {
  protected config: ApiConfig;

  constructor(config: ApiConfig) {
    this.config = config;
  }

  /**
   * Wrap an async operation with error handling
   */
  protected async execute<T>(operation: () => Promise<T>): Promise<T> {
    try {
      return await operation();
    } catch (error) {
      throw handleApiError(error);
    }
  }

  /**
   * Make an HTTP request
   */
  protected async request<T>(method: string, path: string, body?: any, params?: Record<string, any>): Promise<T> {
    return this.execute(async () => {
      const url = new URL(`${this.config.BASE}${path}`);
      
      if (params) {
        Object.entries(params).forEach(([key, value]) => {
          if (value !== undefined && value !== null) {
            url.searchParams.append(key, String(value));
          }
        });
      }

      const headers: Record<string, string> = {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        ...this.config.HEADERS,
      };

      if (this.config.TOKEN) {
        headers['Authorization'] = `Bearer ${this.config.TOKEN}`;
      }

      const fetchOptions: Record<string, unknown> = {
        method,
        headers,
        body: body ? JSON.stringify(body) : undefined,
      };

      if (this.config.dispatcher) {
        fetchOptions.dispatcher = this.config.dispatcher;
      }

      const response = await fetch(url.toString(), fetchOptions as RequestInit);

      if (!response.ok) {
        // Try to parse error body
        let errorBody: Record<string, unknown>;
        try {
          const parsed = (await response.json()) as Record<string, unknown>;
          errorBody = {
            ...parsed,
            status: response.status,
            statusText: response.statusText,
          };
        } catch {
          errorBody = {
            status: response.status,
            statusText: response.statusText,
          };
        }
        throw errorBody; // Will be caught by execute/handleApiError
      }

      if (response.status === 204) {
        return {} as T;
      }

      return (await response.json()) as T;
    });
  }
}
