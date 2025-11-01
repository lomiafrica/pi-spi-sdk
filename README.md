# @lomi/pi-spi-sdk

> **Powered by [lomi.](https://lomi.africa)** - The open-source payment processing platform powering francophone West African businesses

Official TypeScript SDK for PI-SPI (La Plateforme d'Interopérabilité du Service de Paiement Instantané) API - a payment interoperability platform by the BCEAO (Banque Centrale des États de l'Afrique de l'Ouest).

**Built with ❤️ by the lomi. team** to make integrating with PI-SPI seamless and developer-friendly for fellow fintechs.

## About SPI

**PI-SPI enables cross-border transactions within the West African Economic and Monetary Union (UEMOA)**:

- ✅ **8 countries**: Benin, Burkina Faso, Côte d'Ivoire, Guinea-Bissau, Mali, Niger, Senegal, Togo
- ✅ **Single currency**: XOF (West African CFA Franc)
- ✅ **Seamless transfers**: Send payments across borders using aliases
- ✅ **Real-time processing**: Instant payment confirmation


---

## Installation

### Option 1: Using the lomi. CLI (Recommended)

Get started quickly with our CLI tool:

```bash
# Install the CLI globally
npm install -g @lomi/pi-spi-sdk

# Initialize a new PI-SPI project
lomi. pi-spi init
```

This will:
- Create a project structure with examples
- Install `@lomi/pi-spi-sdk` and dependencies
- Set up environment variables
- Generate TypeScript/JavaScript examples

### Option 2: Manual Installation

```bash
# Using pnpm (recommended)
pnpm add @lomi/pi-spi-sdk

# Using npm
npm install @lomi/pi-spi-sdk

# Using yarn
yarn add @lomi/pi-spi-sdk
```

## Quick Start

```typescript
import { PiSpiSDK } from '@lomi/pi-spi-sdk';

// Initialize the SDK
const sdk = new PiSpiSDK({
  baseUrl: 'https://sandbox.api.pi-bceao.com/piz/v1',
  accessToken: 'your-oauth2-access-token',
  // For mTLS, provide certificate paths (if required)
  // clientCert: '/path/to/client.crt',
  // clientKey: '/path/to/client.key',
});

// Get account balance
const account = await sdk.comptes.getAccount('123456789');
console.log('Account balance:', account.solde);

// List account operations
const operations = await sdk.comptes.listOperations({
  comptePayeur: '123456789',
  page: 1,
  size: 20,
});

// Create a payment
const payment = await sdk.paiements.create({
  comptePayeur: '123456789',
  payeAlias: 'user@example.com',
  montant: 10000,
  motif: 'Payment for services',
});
```

## Features

- ✅ **Type-safe**: Full TypeScript support with generated types from OpenAPI spec
- ✅ **OAuth2 + mTLS**: Secure authentication support
- ✅ **Comprehensive API coverage**: All PI-SPI endpoints available
- ✅ **Pagination & Filtering**: Built-in helpers for querying data
- ✅ **Error handling**: Custom error classes with detailed messages
- ✅ **Auto-generated**: Code generated from official OpenAPI specification

## API Reference

### Authentication

The PI-SPI API uses OAuth2 with mTLS for authentication. Configure your credentials:

```typescript
const sdk = new PiSpiSDK({
  baseUrl: 'https://sandbox.api.pi-bceao.com/piz/v1',
  accessToken: process.env.PI_SPI_ACCESS_TOKEN,
  // Optional: Configure mTLS certificates
  // clientCert: process.env.PI_SPI_CLIENT_CERT,
  // clientKey: process.env.PI_SPI_CLIENT_KEY,
  // caCert: process.env.PI_SPI_CA_CERT,
});
```

### Services

#### Accounts (Comptes)

```typescript
// Get account details
const account = await sdk.comptes.getAccount('123456789');

// List account operations
const operations = await sdk.comptes.listOperations({
  comptePayeur: '123456789',
  statut: 'IRREVOCABLE',
  page: 1,
  size: 20,
});

// Transfer between accounts
const transfer = await sdk.comptes.transfer({
  comptePayeur: '123456789',
  comptePaye: '987654321',
  montant: 50000,
  motif: 'Internal transfer',
});
```

#### Aliases

```typescript
// Create an alias
const alias = await sdk.alias.create({
  compte: '123456789',
  alias: 'merchant@example.com',
  type: 'EMAIL',
});

// List aliases
const aliases = await sdk.alias.list({
  compte: '123456789',
  page: 1,
  size: 20,
});

// Delete an alias
await sdk.alias.delete('merchant@example.com');
```

#### Payments (Paiements)

```typescript
// Create immediate payment
const payment = await sdk.paiements.create({
  comptePayeur: '123456789',
  payeAlias: 'customer@example.com',
  montant: 10000,
  motif: 'Payment for order #123',
});

// Get payment details
const paymentDetails = await sdk.paiements.get(payment.txId);

// List payments
const payments = await sdk.paiements.list({
  comptePayeur: '123456789',
  statut: 'IRREVOCABLE',
  page: 1,
  size: 20,
});

// Bulk payments
const bulkPayment = await sdk.paiements.createBulk({
  comptePayeur: '123456789',
  transactions: [
    { txId: 'tx1', payeAlias: 'user1@example.com', montant: 1000 },
    { txId: 'tx2', payeAlias: 'user2@example.com', montant: 2000 },
  ],
});
```

#### Payment Requests (Demandes de Paiement)

```typescript
// Create payment request
const request = await sdk.demandesPaiement.create({
  comptePaye: '123456789',
  payeurAlias: 'customer@example.com',
  montant: 5000,
  motif: 'Invoice #456',
  dateLimitePaiement: '2024-12-31T23:59:59Z',
});

// Accept payment request
await sdk.demandesPaiement.accept(request.idDemandePaiement);

// Reject payment request
await sdk.demandesPaiement.reject(request.idDemandePaiement);
```

#### Webhooks (Notifications)

```typescript
// Register a webhook
const webhook = await sdk.webhooks.create({
  url: 'https://your-domain.com/webhooks/pi-spi',
  events: ['PAIEMENT_RECU', 'PAIEMENT_ENVOYE'],
});

// List webhooks
const webhooks = await sdk.webhooks.list();

// Update webhook
await sdk.webhooks.update(webhook.id, {
  url: 'https://your-domain.com/webhooks/pi-spi-updated',
  events: ['PAIEMENT_RECU', 'PAIEMENT_ENVOYE', 'PAIEMENT_REJETE'],
});

// Delete webhook
await sdk.webhooks.delete(webhook.id);
```

### Error Handling

The SDK provides custom error classes for different error types:

```typescript
import { PiSpiError, PiSpiValidationError, PiSpiAuthError } from '@lomi/pi-spi-sdk';

try {
  await sdk.paiements.create({ ... });
} catch (error) {
  if (error instanceof PiSpiValidationError) {
    console.error('Validation error:', error.errors);
  } else if (error instanceof PiSpiAuthError) {
    console.error('Authentication error:', error.message);
  } else if (error instanceof PiSpiError) {
    console.error('API error:', error.message, error.statusCode);
  }
}
```

### Pagination & Filtering

The SDK provides helpers for building query parameters:

```typescript
import { QueryBuilder } from '@lomi/pi-spi-sdk';

const query = new QueryBuilder()
  .filter('statut', 'eq', 'IRREVOCABLE')
  .filter('montant', 'gte', 10000)
  .filter('dateCreation', 'gte', '2024-01-01T00:00:00Z')
  .sort('-dateCreation')
  .page(1)
  .size(50)
  .build();

const payments = await sdk.paiements.list(query);
```

### Supported Filter Operators

- `eq` - Equal to
- `ne` - Not equal to
- `gt` - Greater than
- `gte` - Greater than or equal
- `lt` - Less than
- `lte` - Less than or equal
- `in` - In list
- `contains` - Contains value
- `notContains` - Does not contain value
- `beginsWith` - Begins with value
- `endsWith` - Ends with value
- `exists` - Field exists

## Contributing

Please refer to the main [CONTRIBUTING.md](https://github.com/lomiafrica/lomi./blob/master/CONTRIBUTING.md) in the monorepo.

## Support

For PI-SPI API support, contact: [pisfn-sandbox@bceao.int](mailto:pisfn-sandbox@bceao.int)

For SDK support, contact: [hello@lomi.africa](mailto:hello@lomi.africa)

## License

This project is licensed under the [MIT License](LICENSE).

## Links

- [PI-SPI Developer Documentation](https://developers.pi-bceao.com)
- [BCEAO Official Website](https://www.bceao.int)
- [lomi. Official Website](https://lomi.africa)
