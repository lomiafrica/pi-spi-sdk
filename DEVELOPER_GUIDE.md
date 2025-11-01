# PI-SPI SDK - Developer Guide

## About PI-SPI

**PI-SPI (Plateforme d'Interopérabilité)** is a payment interoperability platform developed by **BCEAO (Banque Centrale des États de l'Afrique de l'Ouest)**. It enables seamless payment transactions across participating financial institutions in West Africa.

### Cross-Border Transactions

**Yes, PI-SPI enables cross-border transactions**, but with important nuances:

#### Current Scope
- **Regional interoperability**: PI-SPI connects financial institutions within the **West African Economic and Monetary Union (UEMOA)** member countries:
  - Benin
  - Burkina Faso
  - Côte d'Ivoire
  - Guinea-Bissau
  - Mali
  - Niger
  - Senegal
  - Togo

#### How It Works
1. **Within UEMOA**: Transactions between accounts in different UEMOA countries are facilitated through the PI-SPI platform
2. **Inter-bank transfers**: Users can send payments to accounts in other UEMOA countries seamlessly
3. **Alias-based payments**: The alias system allows users to receive payments without sharing account numbers across borders

#### Limitations
- **Currency**: All transactions are in **XOF (West African CFA Franc)**
- **Geographic scope**: Limited to UEMOA member countries
- **Not global**: Does not support transactions outside the UEMOA region

#### Benefits for Developers
- **Single API**: One integration for payments across multiple countries
- **Standardized**: Consistent API regardless of destination country
- **Real-time**: Instant payment processing
- **Secure**: OAuth2 + mTLS authentication

## Why Use This SDK?

This SDK, **powered by lomi.**, makes integrating with PI-SPI effortless:

✅ **Developer-friendly**: Clean, intuitive API design  
✅ **Type-safe**: Full TypeScript support with autocomplete  
✅ **Well-documented**: Comprehensive examples and guides  
✅ **Production-ready**: Built-in error handling and retry logic  
✅ **Maintained**: Regularly updated and supported by the lomi. team  

## Getting Started

### Installation

```bash
npm install @lomi./pi-spi-sdk
# or
pnpm add @lomi./pi-spi-sdk
# or
yarn add @lomi./pi-spi-sdk
```

### Quick Example

```typescript
import { PiSpiSDK } from '@lomi./pi-spi-sdk';

const sdk = new PiSpiSDK({
  baseUrl: 'https://sandbox.api.pi-bceao.com/piz/v1',
  accessToken: 'your-oauth2-token',
});

// Send a payment across borders (within UEMOA)
const payment = await sdk.paiements.create({
  comptePayeur: 'CI123456789',      // Account in Côte d'Ivoire
  payeAlias: 'user@example.com',     // User in Senegal (via alias)
  montant: 50000,
  motif: 'Cross-border payment',
});
```

## Integration with lomi.

If you're using **lomi.** as your payment orchestration platform, you can integrate PI-SPI as a provider:

```typescript
import { PiSpiSDK } from '@lomi./pi-spi-sdk';
import { LomiSDK } from '@lomi./sdk';

// Initialize lomi. SDK
const lomi = LomiSDK.init({
  baseUrl: 'https://api.lomi.africa/v1',
  apiKey: 'your-lomi-api-key',
});

// Initialize PI-SPI SDK
const piSpi = new PiSpiSDK({
  baseUrl: process.env.PI_SPI_BASE_URL,
  accessToken: process.env.PI_SPI_ACCESS_TOKEN,
});

// Use PI-SPI for specific payment flows
async function processPaymentViaPiSpi(amount: number, recipient: string) {
  return await piSpi.paiements.create({
    comptePayeur: process.env.PI_SPI_ACCOUNT,
    payeAlias: recipient,
    montant: amount,
    motif: 'Payment via lomi.',
  });
}
```

## Resources

- **PI-SPI Documentation**: https://developers.pi-bceao.com
- **BCEAO Website**: https://www.bceao.int
- **lomi. Platform**: https://lomi.africa
- **SDK Support**: hello@lomi.africa

## License

MIT License - See [LICENSE](LICENSE) file for details.

---

**Made with ❤️ by [lomi.](https://lomi.africa)** - Simplifying payments across Africa

