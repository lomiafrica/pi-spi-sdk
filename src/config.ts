/**
 * PI-SPI SDK Configuration
 */

export interface PiSpiConfig {
  /**
   * Base URL for the PI-SPI API
   * @default 'https://sandbox.api.pi-bceao.com/piz/v1'
   */
  baseUrl?: string;

  /**
   * OAuth2 access token for authentication
   */
  accessToken: string;

  /**
   * Optional: Client certificate path for mTLS
   */
  clientCert?: string;

  /**
   * Optional: Client key path for mTLS
   */
  clientKey?: string;

  /**
   * Optional: CA certificate path for mTLS
   */
  caCert?: string;

  /**
   * Optional: Additional headers to include in requests
   */
  headers?: Record<string, string>;

  /**
   * Optional: Request timeout in milliseconds
   * @default 30000
   */
  timeout?: number;
}

