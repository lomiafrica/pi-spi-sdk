# PI-SPI SDK Setup Guide

## Prerequisites

- Node.js >= 18.0.0
- npm, pnpm, or yarn
- Access to PI-SPI API credentials (OAuth2 access token)

## Installation

```bash
cd apps/pi-spi-sdk
pnpm install
```

## Generating the SDK

The SDK uses OpenAPI TypeScript Code Generator to generate TypeScript types and service classes from the OpenAPI specification.

### Step 1: Generate Code

```bash
npm run generate
```

This command will:
1. Read the OpenAPI specification from `../../openapi.json`
2. Generate TypeScript types and services in `src/generated/`
3. Run the post-generation script to configure defaults

### Step 2: Update Service Implementations

After generation, you'll need to update the service wrapper classes to use the generated services. The service files in `src/services/` currently have placeholder implementations that throw errors.

**Example: Updating ComptesService**

```typescript
// Before (placeholder)
async getAccount(numero: string) {
  return this.execute(async () => {
    throw new Error('Service not yet generated. Run "npm run generate" first.');
  });
}

// After (using generated service)
import { DefaultService } from '../generated';
import type { CompteSolde } from '../generated';

async getAccount(numero: string): Promise<CompteSolde> {
  return this.execute(async () => {
    return await DefaultService.compteSoldeConsulter({ numero });
  });
}
```

### Step 3: Build the SDK

```bash
npm run build
```

## Development

Run the TypeScript compiler in watch mode:

```bash
npm run dev
```

## Project Structure

```
apps/pi-spi-sdk/
├── src/
│   ├── config.ts              # SDK configuration types
│   ├── errors.ts              # Custom error classes
│   ├── error-handler.ts       # Error handling utilities
│   ├── query-builder.ts       # Query builder for filtering/pagination
│   ├── sdk.ts                 # Main SDK class
│   ├── index.ts               # Public API exports
│   ├── services/              # Service wrapper classes
│   │   ├── base.ts
│   │   ├── comptes.ts
│   │   ├── alias.ts
│   │   ├── webhooks.ts
│   │   ├── paiements.ts
│   │   └── ...
│   └── generated/             # Generated code (after npm run generate)
│       ├── core/
│       ├── models/
│       └── services/
├── scripts/
│   └── post-generate.js       # Post-generation configuration script
├── package.json
├── tsconfig.json
└── README.md
```

## Next Steps

1. **Generate the SDK**: Run `npm run generate`
2. **Update Service Implementations**: Replace placeholder code in service files with actual generated service calls
3. **Test**: Write tests for your SDK usage
4. **Build**: Run `npm run build` to compile TypeScript
5. **Use**: Import and use the SDK in your lomi. application

## Integration with lomi.

Once the SDK is built, you can use it in your lomi. application:

```typescript
import { PiSpiSDK } from '@lomi./pi-spi-sdk';

const piSpi = new PiSpiSDK({
  baseUrl: process.env.PI_SPI_BASE_URL,
  accessToken: process.env.PI_SPI_ACCESS_TOKEN,
});

// Use in your payment provider integration
```

## Notes

- The generated code should not be edited manually - it will be overwritten on each generation
- All custom logic should be in the service wrapper classes (`src/services/`)
- The error handler automatically converts API errors to SDK-specific error types
- The QueryBuilder utility helps construct complex filter queries

