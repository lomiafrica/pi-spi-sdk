/**
 * Usage Examples for PI-SPI SDK
 * 
 * See SETUP.md for instructions on generating and using the SDK.
 */

import { PiSpiSDK, QueryBuilder } from './index';

// Initialize the SDK
const sdk = new PiSpiSDK({
  baseUrl: 'https://sandbox.api.pi-bceao.com/piz/v1',
  accessToken: process.env.PI_SPI_ACCESS_TOKEN!,
});

// Example: Get account balance
// Note: This example assumes the service is fully implemented.
// The actual return type will be CompteSolde once code generation is complete.
async function getAccountBalance() {
  const account = await sdk.comptes.getAccount('123456789');
  // @ts-expect-error - Service implementation pending code generation
  console.log('Account balance:', account?.solde ?? 'N/A');
}

// Example: Query builder usage
async function queryExample() {
  const query = new QueryBuilder()
    .filter('statut', 'eq', 'IRREVOCABLE')
    .filter('montant', 'gte', 10000)
    .sort('-dateCreation')
    .page(1)
    .size(50)
    .build();

  const payments = await sdk.paiements.list(query);
}

// Example: Error handling
import {
  PiSpiError,
  PiSpiValidationError,
  PiSpiAuthError,
} from './index';

async function errorHandlingExample() {
  try {
    await sdk.paiements.create({
      comptePayeur: '123456789',
      payeAlias: 'customer@example.com',
      montant: 10000,
      motif: 'Test payment',
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

