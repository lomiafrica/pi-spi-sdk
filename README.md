# pi-spi-sdk

> **This repository is a contribution from open-source payment processing company [lomi.](https://lomi.africa)**

The Interoperable Platform for the Instant Payment System (π-SPI) is a regional payment infrastructure designed and operated by the Central Bank of West African States (BCEAO).

It enables instant fund transfers between different financial institutions across the region, including banks, electronic money issuers, microfinance institutions, and payment service providers.

## Installation

```bash
pnpm add pi-spi-sdk
# or
npm install pi-spi-sdk
# or
yarn add pi-spi-sdk
```

π-SPI operates on a single currency, the XOF (West African CFA Franc), and processes payments in real-time with instant confirmation. It also enables **cross-border transactions** within the West African Economic and Monetary Union (UEMOA), which spans eight countries: Benin, Burkina Faso, Côte d'Ivoire, Guinea-Bissau, Mali, Niger, Senegal, and Togo. 

Payments can flow between traditional bank accounts across UEMOA countries, from bank accounts to mobile money wallets like MTN, Orange Money, and Moov, from mobile wallets back to bank accounts, and even between mobile money wallets regardless of which provider each person uses.

To use this SDK in a production ready application, you need to be connected to a certified PI-SPI participant or PSP.

## Usage example

```typescript
import { PiSpiSDK } from 'pi-spi-sdk';

const sdk = new PiSpiSDK({
  baseUrl: 'https://sandbox.api.pi-spi.bceao.int/piz/v1',
  accessToken: 'your-oauth2-access-token',
});

// Get account balance
const account = await sdk.comptes.getAccount('CIC2344256727788288822');

// Create a payment
const payment = await sdk.paiements.create({
  comptePayeur: 'CIC2344256727788288822',
  payeAlias: '8b1b2499-3e50-435b-b757-ac7a83d8aa7f', // SHID alias
  montant: 150000, // 1,500 XOF (amounts are in centimes)
  motif: 'Paiement de services',
});
```

## Features

This SDK provides full TypeScript support with types generated from the official OpenAPI specification, ensuring type safety throughout your integration. It includes secure authentication through OAuth2 and mTLS, comprehensive coverage of all SPI endpoints, and custom error classes with detailed messages for easier debugging. The codebase also includes developer-friendly utilities and constants to streamline your implementation.

## Utilities & Constants

### Utilities

```typescript
import { formatAmount, xofToCentimes, isValidAccountNumber } from 'pi-spi-sdk';

// Format amounts for display
const displayAmount = formatAmount(150000); // "1 500 XOF"

// Convert XOF to centimes
const centimes = xofToCentimes(1500); // 150000

// Validate inputs
if (isValidAccountNumber(accountNumber)) {
  // Valid account number
}
```

### Constants

```typescript
import { PI_SPI_ENDPOINTS, PAYMENT_STATUS, CURRENCY } from 'pi-spi-sdk';

// Use constants instead of magic strings
const baseUrl = PI_SPI_ENDPOINTS.SANDBOX;
if (payment.statut === PAYMENT_STATUS.IRREVOCABLE) {
  // Payment is confirmed
}
```

## Reference

### Authentication

```typescript
const sdk = new PiSpiSDK({
  baseUrl: process.env.PI_SPI_BASE_URL,
  accessToken: process.env.PI_SPI_ACCESS_TOKEN,
  // Optional: mTLS certificates
  // clientCert: process.env.PI_SPI_CLIENT_CERT,
  // clientKey: process.env.PI_SPI_CLIENT_KEY,
});
```

### Services

#### Accounts

```typescript
// Get account balance and details
// Endpoint: GET /comptes/{numero}
const account = await sdk.comptes.getAccount('CIC2344256727788288822');
// Returns: {
//   type: 'CACC', // Account type (CACC = Current Account)
//   numero: 'CIC2344256727788288822',
//   solde: 150000000, // Balance in centimes (1,500,000 XOF)
//   statut: 'OUVERT', // Status: OUVERT, BLOQUE, or CLOTURE
//   dateOuverture: '2023-02-21T15:30:01.250Z'
// }

// List operations with pagination
await sdk.comptes.listOperations({
  comptePayeur: 'CIC2344256727788288822',
  page: 1,
  size: 20,
});

// Transfer between accounts (using account numbers)
await sdk.comptes.transfer({
  comptePayeur: 'CIC2344256727788288822',
  comptePaye: 'SNC2344256727788288822',
  montant: 150000, // 1,500 XOF
});

// Transfer using aliases
await sdk.comptes.transfer({
  payeurAlias: '8b1b2499-3e50-435b-b757-ac7a83d8aa7f',
  payeAlias: '4r5ty499-3e50-435b-b757-ac7a83d67juio',
  montant: 150000,
});
```

#### Payments

```typescript
// Create immediate payment (no confirmation)
await sdk.paiements.create({
  comptePayeur: 'CIC2344256727788288822',
  payeAlias: '9b1b2499-3e50-435b-b757-ac7a83d8aa8c', // SHID alias
  montant: 150000, // 1,500 XOF
  motif: 'Paiement de services',
});

// Create payment with confirmation
await sdk.paiements.create({
  comptePayeur: 'CIC2344256727788288822',
  payeAlias: '8b1b2499-3e50-435b-b757-ac7a83d8aa7f',
  montant: 3000000, // 30,000 XOF
  confirmation: true,
});

// Get payment details
await sdk.paiements.get('23552722');

// List payments with filters
await sdk.paiements.list({
  comptePayeur: 'CIC2344256727788288822',
  statut: 'IRREVOCABLE',
});
```

#### QR Codes

Generate EMV-compliant QR codes directly from the SDK.

```typescript
// Generate raw payload string
const payload = sdk.qr.payload({
  alias: '3497a720-ab11-4973-9619-534e04f263a1',
  countryCode: 'CI',
  qrType: 'STATIC',
  referenceLabel: 'MA_BOUTIQUE_01',
});

// Generate SVG with official PI-SPI logo
const svg = await sdk.qr.svg({
  alias: '3497a720-ab11-4973-9619-534e04f263a1',
  countryCode: 'CI',
  qrType: 'DYNAMIC',
  referenceLabel: 'TX-12345',
  amount: 5000
}, { size: 300 });

// Validate external QR code content
const check = sdk.qr.validate(someQrString);
if (check.valid) {
  console.log("Valid QR for:", check.data?.alias);
}
```


#### Aliases

```typescript
import { AliasType } from 'pi-spi-sdk';

// Create SHID alias (available for all client types: P, C, B, G)
// SHID is a system-generated UUID (36 characters)
const shidAlias = await sdk.alias.create({
  compte: 'CIC2344256727788288822',
  type: AliasType.SHID,
});
// Returns: { cle: '8b1b2499-3e50-435b-b757-ac7a83d8aa7f', type: 'SHID', ... }

// Create MCOD alias (business clients only: C, B, G)
// MCOD is a merchant code for USSD payments
const mcodAlias = await sdk.alias.create({
  compte: 'SNC2344256727788288822',
  type: AliasType.MCOD,
});
// Returns: { cle: 'SNF00_2E4TY', type: 'MCOD', ... }

// List all aliases for an account
await sdk.alias.list('CIC2344256727788288822');

// Delete an alias
await sdk.alias.delete('8b1b2499-3e50-435b-b757-ac7a83d8aa7f');
```

#### Payment requests

```typescript
// Create payment request (bill/invoice)
await sdk.demandesPaiement.create({
  comptePaye: 'CIC2344256727788288822',
  payeurAlias: '9b1b3499-3e50-435b-b757-ac7a83d8aa96', // Customer's alias
  montant: 150000, // 1,500 XOF
  categorie: '401', // Invoice category
  dateLimitePaiement: '2023-12-31T23:59:59.999Z',
  motif: 'Facture électricité mars 2023',
  refDocType: 'CINV',
  refDocNumero: 'FACT-ELEC-202303',
});

// Accept a payment request
await sdk.demandesPaiement.accept('RTP-2023-001');

// Reject a payment request
await sdk.demandesPaiement.reject('RTP-2023-001');
```

#### Webhooks

```typescript
await sdk.webhooks.create({
  url: 'https://your-domain.com/webhooks/pi-spi',
  events: ['PAIEMENT_RECU'],
});
await sdk.webhooks.list();
await sdk.webhooks.update(webhookId, { url: 'https://updated-url.com' });
await sdk.webhooks.delete(webhookId);
```

### Error handling

```typescript
import { PiSpiError, PiSpiValidationError, PiSpiAuthError } from 'pi-spi-sdk';

try {
  await sdk.paiements.create({ ... });
} catch (error) {
  if (error instanceof PiSpiValidationError) {
    console.error('Validation error:', error.errors);
  } else if (error instanceof PiSpiAuthError) {
    console.error('Authentication error:', error.message);
  }
}
```

### Filtering & pagination

The SDK includes a QueryBuilder that allows you to construct complex queries with multiple filters, sorting, and pagination. You can chain filter conditions using various operators, sort results in ascending or descending order (use `-` prefix for descending), and control pagination with page number and size parameters.

```typescript
import { QueryBuilder } from 'pi-spi-sdk';

const query = new QueryBuilder()
  .filter('statut', 'eq', 'IRREVOCABLE')
  .filter('montant', 'gte', 10000)
  .sort('-dateCreation')
  .page(1)
  .size(50)
  .build();

const payments = await sdk.paiements.list(query);
```

The QueryBuilder supports these operators: `eq` (equals), `ne` (not equals), `gt` (greater than), `gte` (greater than or equal), `lt` (less than), `lte` (less than or equal), `in` (in array), `contains`, `notContains`, `beginsWith`, `endsWith`, and `exists`.

## Alias types

The SPI supports three types of account aliases that allow users to send and receive payments without sharing their full account numbers:

**SHID (System-Hosted Identifier)** is a system-generated UUID (36 characters, such as `8b1b2499-3e50-435b-b757-ac7a83d8aa7f`) available for all client types and serves as a general-purpose payment address.

**MCOD (Merchant Code)** is an alphanumeric code (like `SNF00_2E4TY`) that's system-generated and available exclusively for business clients (C, B, G), primarily used for USSD payment support.

**MBNO (Mobile Number)** uses phone number format and is available only for individual clients (P), designed specifically for mobile money integration.

**Example:**

```typescript
import { AliasType, getAvailableAliasTypes, isValidAliasType } from 'pi-spi-sdk';

// Get available alias types for a business client
const businessAliasTypes = getAvailableAliasTypes('B'); // Returns: ['SHID', 'MCOD']

// Check if a string is a valid alias type
if (isValidAliasType('SHID')) {
  // Valid alias type
}
```

## Documentation

- **[Developer Guide](./DEVELOPER_GUIDE.md)** - For contributors and advanced usage
- **[Changelog](./CHANGELOG.md)** - Version history

## Support

- **π-SPI API**: [pisfn-sandbox@bceao.int](mailto:pisfn-sandbox@bceao.int)
- **SDK Support**: [hello@lomi.africa](mailto:hello@lomi.africa)
- **Documentation**: [https://developers.pi-bceao.com](https://developers.pi-bceao.com)

## License

MIT
