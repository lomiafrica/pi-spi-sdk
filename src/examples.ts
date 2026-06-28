/**
 * Usage Examples for PI-SPI SDK
 *
 * These examples use production-like data from the PI-SPI OpenAPI specification.
 *
 * @see {@link https://developers.pi-bceao.com} Official PI-SPI Documentation
 */

import { PiSpiSDK, QueryBuilder, AliasType } from './index';

// Initialize the SDK
const sdk = new PiSpiSDK({
  baseUrl: 'https://sandbox.api.pi-bceao.com/piz/v1',
  accessToken: process.env.PI_SPI_ACCESS_TOKEN!,
});

// Example: Get account balance
// Account numbers follow format: [CountryCode][AccountNumber]
// Examples: 'CIC2344256727788288822' (Côte d'Ivoire), 'SNC2344256727788288822' (Senegal)
async function getAccountBalance() {
  const account = await sdk.comptes.getAccount('CIC2344256727788288822');
  console.log('Account balance:', account?.solde ?? 'N/A');
  console.log('Account status:', account?.statut);
}

// Example: Create alias
// SHID: System-generated UUID (36 chars) - available for all client types
// MCOD: Merchant code for USSD - business clients only (C, B, G)
// MBNO: Mobile number - individuals only (P)
async function createAliasExample() {
  // Create SHID alias (available for all client types)
  const shidAlias = await sdk.alias.create({
    compte: 'CIC2344256727788288822',
    type: AliasType.SHID,
  });
  // Returns: { cle: '8b1b2499-3e50-435b-b757-ac7a83d8aa7f', type: 'SHID', ... }

  // Create MCOD alias (business clients only)
  const mcodAlias = await sdk.alias.create({
    compte: 'SNC2344256727788288822',
    type: AliasType.MCOD,
  });
  // Returns: { cle: 'SNF00_2E4TY', type: 'MCOD', ... }
}

// Example: Query builder usage
async function queryExample() {
  const query = new QueryBuilder()
    .filter('statut', 'eq', 'IRREVOCABLE')
    .filter('montant', 'gte', 150000) // 1,500 XOF minimum
    .sort('-dateCreation')
    .page(1)
    .size(50)
    .build();

  const payments = await sdk.paiements.list(query);
}

// Example: Create payment with realistic data
async function createPaymentExample() {
  const payment = await sdk.paiements.create({
    comptePayeur: 'CIC2344256727788288822',
    payeAlias: '8b1b2499-3e50-435b-b757-ac7a83d8aa7f', // SHID alias (UUID format)
    montant: 150000, // 1,500 XOF (amounts are in centimes)
    motif: 'Paiement de services',
    txId: '23552722', // Unique transaction ID
  });
}

// Example: Error handling
import { PiSpiError, PiSpiValidationError, PiSpiAuthError } from './index';

async function errorHandlingExample() {
  try {
    await sdk.paiements.create({
      comptePayeur: 'CIC2344256727788288822',
      payeAlias: '9b1b2499-3e50-435b-b757-ac7a83d8aa8c', // SHID alias
      montant: 150000, // 1,500 XOF
      motif: 'Paiement de test',
    });
  } catch (error) {
    if (error instanceof PiSpiValidationError) {
      console.error('Validation error:', error.errors);
    } else if (error instanceof PiSpiAuthError) {
      console.error('Authentication error:', error.message);
    } else if (error instanceof PiSpiError) {
      console.error('API error:', error.message, error.statusCode);
    } else if (error instanceof Error) {
      console.error('Unexpected error:', error.message);
    } else {
      console.error('Unknown error:', error);
    }
  }
}
