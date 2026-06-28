# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.1.5] - 2026-06-27

### Added

- `paiements.create`, `paiements.get`, and `demandesPaiement.get` HTTP implementations
- `comptes.getAccount` HTTP implementation
- `buildLomiCustomerQr`, `serializeLomiCustomerQr`, and `parseLomiCustomerQr` for consumer-presented (CPM) flows

### Changed

- `paiements.create` accepts `payeurAlias` or legacy `comptePayeur` alias field

## [0.1.4] - 2026-06-27

### Added

- Optional `dispatcher` on `PiSpiConfig` / `ApiConfig` for undici mTLS `Agent` injection in Node.js
- `webhooks.create` implemented via the HTTP request layer (no longer a stub)

### Fixed

- API error responses from `fetch` now include `status` / `statusText` for proper `PiSpiAuthError` mapping

## [0.1.3] - 2026-06-26

### Fixed

- Publish a CommonJS build so Node.js apps (e.g. NestJS) can `require('pi-spi-sdk')` without `ERR_PACKAGE_PATH_NOT_EXPORTED`
- Add dual `import` / `require` package exports for bundlers and Node runtimes
- Wire alias and payment-request service wrappers to the PI-SPI HTTP API instead of throwing placeholder errors
- Include generated OpenAPI client code in the TypeScript build output

## [0.1.0] - 2024-12-28

[0.1.0]: https://github.com/lomiafrica/lomi./releases/tag/pi-spi-sdk-v0.1.0

### Added

- Initial release of PI-SPI SDK
- Full TypeScript support with generated types from OpenAPI spec
- OAuth2 + mTLS authentication support
- Comprehensive API coverage for all PI-SPI endpoints
- Query builder utility for filtering, pagination, and sorting
- Custom error classes (`PiSpiError`, `PiSpiValidationError`, `PiSpiAuthError`, etc.)
- Support for all PI-SPI services:
  - Accounts (Comptes)
  - Aliases
  - Webhooks
  - Payment requests (Demandes de Paiement)
  - Bulk payment requests
  - Immediate payments (Paiements)
  - Bulk payments
  - Fund returns (Retours de Fonds)
  - Cancellation requests (Demandes Annulation)

### Fixed

- Empty type definitions in generated models
- Type safety improvements for error handling
