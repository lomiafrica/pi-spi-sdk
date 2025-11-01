/**
 * Error handler utility for converting API errors to SDK errors
 */

// ApiError will be available after code generation
// The structure matches openapi-typescript-codegen's ApiError class
interface GeneratedApiError extends Error {
  url: string;
  status: number;
  statusText: string;
  body: any;
  request: any;
}
import {
  PiSpiError,
  PiSpiValidationError,
  PiSpiAuthError,
  PiSpiNotFoundError,
  PiSpiRateLimitError,
} from './errors';

/**
 * Convert a generated API error to a SDK error
 */
export function handleApiError(error: unknown): never {
  // Check if it's an ApiError-like object (from generated code)
  const isApiError =
    error &&
    typeof error === 'object' &&
    'status' in error &&
    'statusText' in error &&
    'body' in error;

  if (isApiError) {
    const apiError = error as GeneratedApiError;
    const status = apiError.status;
    const body = apiError.body;

    // Extract error details from RFC 7807 Problem format
    const type = body?.type;
    const title = body?.title || apiError.statusText;
    const detail = body?.detail || apiError.message;
    const instance = body?.instance;

    // Handle validation errors (400)
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

    // Handle authentication errors (401)
    if (status === 401) {
      throw new PiSpiAuthError(
        detail || title || 'Authentication failed',
        status,
        apiError.statusText
      );
    }

    // Handle forbidden errors (403)
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

    // Handle not found errors (404)
    if (status === 404) {
      throw new PiSpiNotFoundError(
        detail || title || 'Resource not found',
        status,
        apiError.statusText
      );
    }

    // Handle rate limit errors (429)
    if (status === 429) {
      // Retry-After header would be in the response, but ApiError doesn't expose it
      // This can be enhanced if needed
      throw new PiSpiRateLimitError(
        detail || title || 'Rate limit exceeded',
        status,
        apiError.statusText
      );
    }

    // Handle other errors
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

