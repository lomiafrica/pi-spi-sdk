# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.1.0] - 2024-12-28

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
  - Fund returns (Retours Fonds)
  - Cancellation requests (Demandes Annulation)

### Fixed
- Empty type definitions in generated models
- Type safety improvements for error handling
- Package name corrected to `@lomi/pi-spi-sdk`

### Documentation
- Comprehensive README with examples
- API reference documentation
- Setup guide for developers

[0.1.0]: https://github.com/lomiafrica/lomi./releases/tag/pi-spi-sdk-v0.1.0

