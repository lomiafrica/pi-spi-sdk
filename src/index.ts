/**
 * Main entry point for PI-SPI SDK
 *
 * @module pi-spi-sdk
 */

// Export main SDK class
export { PiSpiSDK } from './sdk';

// Export configuration types
export type { PiSpiConfig } from './config';

// Export QR Code types and utilities
export * from './qrcode';


// Export error classes
export {
  PiSpiError,
  PiSpiValidationError,
  PiSpiAuthError,
  PiSpiNotFoundError,
  PiSpiRateLimitError,
} from './errors';

// Export query builder
export { QueryBuilder, type QueryParams, type FilterOperator } from './query-builder';

// Export error handler for advanced use cases
export { handleApiError } from './error-handler';

// Export alias types and utilities
export {
  AliasType,
  ALIAS_TYPES,
  isValidAliasType,
  getAvailableAliasTypes,
  type AliasType as AliasTypeType,
} from './types/alias';

// Export utility functions
export {
  formatAmount,
  xofToCentimes,
  centimesToXof,
  isValidAccountNumber,
  isValidShidAlias,
  isValidPhoneNumber,
  getCountryFromAccount,
  sleep,
  retryWithBackoff,
} from './utils';

// Export constants
export {
  PI_SPI_ENDPOINTS,
  PAYMENT_STATUS,
  ACCOUNT_STATUS,
  ACCOUNT_TYPE,
  CLIENT_TYPE,
  UEMOA_COUNTRIES,
  CURRENCY,
  DEFAULT_LIMITS,
  WEBHOOK_EVENTS,
} from './utils/constants';
// Note: ALIAS_TYPES is exported from './types/alias' above

// Re-export generated types and services (available after running generate)
// These will be available once the OpenAPI codegen is run
export * from './generated';
