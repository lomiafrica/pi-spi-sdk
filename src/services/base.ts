/**
 * Base service class with common error handling and HTTP request capability
 */

import {
  GeneratedApiError,
  handleApiError,
  parseGeneratedErrorBody,
} from '../error-handler';
import type { JsonValue } from "@lomi./shared";

export interface ApiHeaders {
  [name: string]: string;
}

export interface RequestBody {}

export interface RequestParams {
  [name: string]: string | number | boolean | null | undefined;
}

export interface ApiConfig {
  BASE: string;
  TOKEN?: string;
  HEADERS?: ApiHeaders;
  dispatcher?: RequestInit['dispatcher'];
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
      throw handleApiError(
        error instanceof Error ? error : new Error('Unexpected request error'),
      );
    }
  }

  /**
   * Make an HTTP request
   */
  protected async request<T>(
    method: string,
    path: string,
    body?: RequestBody,
    params?: RequestParams,
  ): Promise<T> {
    return this.execute(async () => {
      const url = new URL(`${this.config.BASE}${path}`);
      
      if (params) {
        Object.entries(params).forEach(([key, value]) => {
          if (value !== undefined && value !== null) {
            url.searchParams.append(key, String(value));
          }
        });
      }

      const headers: ApiHeaders = {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        ...this.config.HEADERS,
      };

      if (this.config.TOKEN) {
        headers['Authorization'] = `Bearer ${this.config.TOKEN}`;
      }

      const fetchOptions: RequestInit = {
        method,
        headers,
        body: body ? JSON.stringify(body) : undefined,
      };

      if (this.config.dispatcher) {
        fetchOptions.dispatcher = this.config.dispatcher;
      }

      const response = await fetch(url.toString(), fetchOptions);

      if (!response.ok) {
        // Try to parse error body
        let errorBody;
        try {
          // SAFETY: response.json is the HTTP boundary; the parser validates fields.
          const parsedBody = (await response.json()) as JsonValue;
          errorBody = parseGeneratedErrorBody(parsedBody);
        } catch {
          errorBody = {};
        }
        throw new GeneratedApiError(
          url.toString(),
          response.status,
          response.statusText,
          errorBody,
        );
      }

      if (response.status === 204) {
        // SAFETY: Callers requesting an empty response bind T to their endpoint type.
        return {} as T;
      }

      // SAFETY: Service methods bind T to the documented endpoint response schema.
      return (await response.json()) as T;
    });
  }
}
