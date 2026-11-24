/**
 * Error handler utility for converting API errors to SDK errors
 */

import {
  PiSpiError,
  PiSpiValidationError,
  PiSpiAuthError,
  PiSpiNotFoundError,
  PiSpiRateLimitError,
  type ValidationErrors,
} from './errors';
import { isJsonObject, isString, readString, type JsonValue } from '@lomi./shared';

export interface GeneratedErrorBody {
  type?: string;
  title?: string;
  detail?: string;
  instance?: string;
  invalidParams?: ValidationErrors;
  errors?: ValidationErrors;
}

export class GeneratedApiError extends Error {
  constructor(
    public readonly url: string,
    public readonly status: number,
    public readonly statusText: string,
    public readonly body: GeneratedErrorBody
  ) {
    super(body.detail ?? body.title ?? statusText);
    this.name = 'GeneratedApiError';
  }
}

export function parseGeneratedErrorBody(value: JsonValue): GeneratedErrorBody {
  if (!isJsonObject(value)) return {};
  return {
    type: readString(value, 'type'),
    title: readString(value, 'title'),
    detail: readString(value, 'detail'),
    instance: readString(value, 'instance'),
    invalidParams: readValidationErrors(value['invalidParams']),
    errors: readValidationErrors(value['errors']),
  };
}

function readValidationErrors(value: JsonValue | undefined): ValidationErrors | undefined {
  if (value === undefined || !isJsonObject(value)) return undefined;
  const result: ValidationErrors = {};
  for (const [field, messages] of Object.entries(value)) {
    if (Array.isArray(messages) && messages.every(isString)) {
      result[field] = messages;
    }
  }
  return result;
}

/**
 * Convert a generated API error to a SDK error
 */
export function handleApiError(error: Error): never {
  if (error instanceof GeneratedApiError) {
    const apiError = error;
    const status = apiError.status;
    const body = apiError.body;

    // Extract error details from RFC 7807 Problem format
    const type = body?.type;
    const title = body?.title || apiError.statusText;
    const detail = body?.detail || apiError.message;
    const instance = body?.instance;

    if (status === 400) {
      const invalidParams = body?.invalidParams || body?.errors;
      throw new PiSpiValidationError(
        detail || title || 'Validation error',
        status,
        apiError.statusText,
        invalidParams,
        type,
        detail
      );
    }

    if (status === 401) {
      throw new PiSpiAuthError(
        detail || title || 'Authentication failed',
        status,
        apiError.statusText
      );
    }

    if (status === 403) {
      throw new PiSpiError(
        detail || title || 'Forbidden',
        status,
        apiError.statusText,
        type,
        detail,
        instance
      );
    }

    if (status === 404) {
      throw new PiSpiNotFoundError(
        detail || title || 'Resource not found',
        status,
        apiError.statusText
      );
    }

    if (status === 429) {
      // Retry-After header would be in the response, but ApiError doesn't expose it
      // This can be enhanced if needed
      throw new PiSpiRateLimitError(
        detail || title || 'Rate limit exceeded',
        status,
        apiError.statusText
      );
    }

    throw new PiSpiError(
      detail || title || apiError.message || 'API error',
      status,
      apiError.statusText,
      type,
      detail,
      instance
    );
  }

  // Re-throw if it's not an API error
  throw error;
}
