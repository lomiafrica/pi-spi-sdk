/**
 * Main PI-SPI SDK class
 * 
 * This is the entry point for interacting with the PI-SPI API.
 * Provides organized access to all API services.
 */

import { handleApiError } from './error-handler';
import type { PiSpiConfig } from './config';
import { ComptesService } from './services/comptes';
import { AliasService } from './services/alias';
import { WebhooksService } from './services/webhooks';
import { DemandesPaiementService } from './services/demandes-paiement';
import { DemandesPaiementEnMasseService } from './services/demandes-paiement-en-masse';
import { PaiementsService } from './services/paiements';
import { PaiementsEnMasseService } from './services/paiements-en-masse';
import { RetoursFondsService } from './services/retours-fonds';
import { DemandesAnnulationService } from './services/demandes-annulation';

// OpenAPI will be imported from generated code after running npm run generate
// For now, we'll use a dynamic import approach
let OpenAPI: any;

// Try to import generated OpenAPI config
async function loadOpenAPI() {
  try {
    const generated = await import('./generated');
    return generated.OpenAPI;
  } catch {
    // Return placeholder if not generated yet
    return {
      BASE: 'https://sandbox.api.pi-bceao.com/piz/v1',
      TOKEN: undefined,
      HEADERS: undefined,
    };
  }
}

export class PiSpiSDK {
  /**
   * Accounts service
   * Handles account-related operations: balance, operations, transfers
   */
  public readonly comptes: ComptesService;

  /**
   * Aliases service
   * Handles account alias management
   */
  public readonly alias: AliasService;

  /**
   * Webhooks service
   * Handles webhook configuration and management
   */
  public readonly webhooks: WebhooksService;

  /**
   * Payment requests service
   * Handles payment request creation and management
   */
  public readonly demandesPaiement: DemandesPaiementService;

  /**
   * Bulk payment requests service
   * Handles bulk payment request operations
   */
  public readonly demandesPaiementEnMasse: DemandesPaiementEnMasseService;

  /**
   * Payments service
   * Handles immediate payment operations
   */
  public readonly paiements: PaiementsService;

  /**
   * Bulk payments service
   * Handles bulk payment operations
   */
  public readonly paiementsEnMasse: PaiementsEnMasseService;

  /**
   * Fund returns service
   * Handles fund return operations
   */
  public readonly retoursFonds: RetoursFondsService;

  /**
   * Cancellation requests service
   * Handles payment cancellation requests
   */
  public readonly demandesAnnulation: DemandesAnnulationService;

  /**
   * Initialize the PI-SPI SDK
   * 
   * @param config - SDK configuration
   * 
   * @example
   * ```typescript
   * const sdk = new PiSpiSDK({
   *   baseUrl: 'https://sandbox.api.pi-bceao.com/piz/v1',
   *   accessToken: 'your-oauth2-token',
   * });
   * ```
   */
  constructor(config: PiSpiConfig) {
    // Initialize OpenAPI configuration synchronously
    // Note: This will work better after code generation when OpenAPI is properly exported
    try {
      // In a real scenario, we'd import this properly
      // For now, we'll set it up directly
      OpenAPI = {
        BASE: config.baseUrl || 'https://sandbox.api.pi-bceao.com/piz/v1',
        TOKEN: config.accessToken,
        HEADERS: {
          ...config.headers,
          'Authorization': `Bearer ${config.accessToken}`,
        },
      };
    } catch {
      // Fallback configuration
      OpenAPI = {
        BASE: config.baseUrl || 'https://sandbox.api.pi-bceao.com/piz/v1',
        TOKEN: config.accessToken,
        HEADERS: {
          ...config.headers,
          'Authorization': `Bearer ${config.accessToken}`,
        },
      };
    }

    // Initialize services
    this.comptes = new ComptesService();
    this.alias = new AliasService();
    this.webhooks = new WebhooksService();
    this.demandesPaiement = new DemandesPaiementService();
    this.demandesPaiementEnMasse = new DemandesPaiementEnMasseService();
    this.paiements = new PaiementsService();
    this.paiementsEnMasse = new PaiementsEnMasseService();
    this.retoursFonds = new RetoursFondsService();
    this.demandesAnnulation = new DemandesAnnulationService();
  }

  /**
   * Update the access token
   * Useful when tokens are refreshed
   */
  setAccessToken(token: string): void {
    if (OpenAPI) {
      OpenAPI.TOKEN = token;
      OpenAPI.HEADERS = {
        ...OpenAPI.HEADERS,
        'Authorization': `Bearer ${token}`,
      };
    }
  }

  /**
   * Get the current base URL
   */
  getBaseUrl(): string {
    return OpenAPI?.BASE || 'https://sandbox.api.pi-bceao.com/piz/v1';
  }
}

// Export error handler for advanced use cases
export { handleApiError };

