/**
 * Custom error classes for PI-SPI SDK
 */

export class PiSpiError extends Error {
  public readonly statusCode: number;
  public readonly statusText: string;
  public readonly type?: string;
  public readonly detail?: string;
  public readonly instance?: string;

  constructor(
    message: string,
    statusCode: number,
    statusText: string,
    type?: string,
    detail?: string,
    instance?: string
  ) {
    super(message);
    this.name = 'PiSpiError';
    this.statusCode = statusCode;
    this.statusText = statusText;
    this.type = type;
    this.detail = detail;
    this.instance = instance;
  }
}

export class PiSpiValidationError extends PiSpiError {
  public readonly errors?: Record<string, string[]>;

  constructor(
    message: string,
    statusCode: number,
    statusText: string,
    errors?: Record<string, string[]>,
    type?: string,
    detail?: string
  ) {
    super(message, statusCode, statusText, type, detail);
    this.name = 'PiSpiValidationError';
    this.errors = errors;
  }
}

export class PiSpiAuthError extends PiSpiError {
  constructor(message: string, statusCode: number, statusText: string) {
    super(message, statusCode, statusText);
    this.name = 'PiSpiAuthError';
  }
}

export class PiSpiNotFoundError extends PiSpiError {
  constructor(message: string, statusCode: number, statusText: string) {
    super(message, statusCode, statusText);
    this.name = 'PiSpiNotFoundError';
  }
}

export class PiSpiRateLimitError extends PiSpiError {
  public readonly retryAfter?: number;

  constructor(
    message: string,
    statusCode: number,
    statusText: string,
    retryAfter?: number
  ) {
    super(message, statusCode, statusText);
    this.name = 'PiSpiRateLimitError';
    this.retryAfter = retryAfter;
  }
}

