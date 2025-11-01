/**
 * Main entry point for PI-SPI SDK
 * 
 * @module @lomi/pi-spi-sdk
 */

// Export main SDK class
export { PiSpiSDK } from './sdk';

// Export configuration types
export type { PiSpiConfig } from './config';

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

// Re-export generated types and services (available after running generate)
// These will be available once the OpenAPI codegen is run
export * from './generated';

