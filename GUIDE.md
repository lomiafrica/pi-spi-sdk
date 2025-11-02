# Developer guide

For developers contributing to the SDK or using it in advanced scenarios.

## Architecture

The SDK uses a service-based architecture with auto-generated code from OpenAPI:

```
 ┌───────────────────────────────────────────────┐
 │                Application Code               │
 └───────────────────────┬───────────────────────┘
                         │
 ┌───────────────────────▼───────────────────────┐
 │              PiSpiSDK (Main Class)            │
 │   - Configuration management                  │
 │   - Error handling                            │
 │   - Service orchestration                     │
 └──────┬──────────┬──────────┬──────────┬───────┘
        │          │          │          │
   ┌────▼────┐ ┌───▼───┐ ┌────▼────┐ ┌───▼─────┐
   │ Comptes │ │ Alias │ │Paiements│ │ Webhooks│
   │ Service │ │Service│ │ Service │ │ Service │
   └────┬────┘ └───┬───┘ └────┬────┘ └───┬─────┘
        │          │          │          │
   ┌────▼──────────▼──────────▼──────────▼────┐
   │         Generated Services Layer         │
   └─────────────────────┬────────────────────┘
                         │
   ┌─────────────────────▼────────────────────┐
   │              PI-SPI REST API             │
   │      (OAuth2 + mTLS Authentication)      │
   └──────────────────────────────────────────┘
```

### Key components

1. **SDK Class** (`src/sdk.ts`): Main entry point, manages configuration and service instances
2. **Service Wrappers** (`src/services/`): High-level service classes that wrap generated services
3. **Generated Code** (`src/generated/`): Auto-generated from OpenAPI spec
4. **Error Handling** (`src/errors.ts`, `src/error-handler.ts`): Custom error classes and handlers
5. **Query Builder** (`src/query-builder.ts`): Helper for building complex filter queries

## Setup

### Prerequisites

- Node.js >= 18.0.0
- pnpm (recommended) or npm
- PI-SPI API credentials

```bash
pnpm install
pnpm run generate
pnpm run build
```

### Development mode

```bash
pnpm run dev
```

## Code gen

The SDK uses [OpenAPI TypeScript Code Generator](https://github.com/ferdikoomen/openapi-typescript-codegen) to generate types and services from `openapi.json`.

**Process**:

1. `scripts/pre-generate.js` - Validates OpenAPI spec
2. `openapi --input ./openapi.json --output ./src/generated` - Generates code
3. `scripts/post-generate.js` - Fixes empty types and configures defaults

**To regenerate**:

```bash
pnpm run generate
```

## Adding a new Service Method

1. Ensure OpenAPI spec includes the endpoint
2. Run `pnpm run generate`
3. Update service wrapper in `src/services/[service-name].ts`:

```typescript
async newMethod(params: NewMethodParams): Promise<NewMethodResponse> {
  return this.execute(async () => {
    const { DefaultService } = await import('../generated');
    return await DefaultService.newMethodEndpoint({ ...params });
  });
}
```

4. Build: `pnpm run build`

## Structure

```
apps/pi-spi-sdk/
├── src/
│   ├── services/          # Service wrapper classes
│   ├── generated/         # Auto-generated (do not edit)
│   ├── sdk.ts             # Main SDK class
│   ├── errors.ts          # Error classes
│   └── query-builder.ts   # Query builder
├── scripts/
│   ├── pre-generate.js    # Pre-generation setup
│   └── post-generate.js   # Post-generation fixes
├── cli/                    # CLI tool
└── package.json
```

## Contributing

### Before contributing

1. Read main [CONTRIBUTING.md](https://github.com/lomiafrica/lomi./blob/master/CONTRIBUTING.md)
2. Set up development environment
3. Run `pnpm run generate` if OpenAPI spec changed

### Guidelines

- Use interfaces over types
- Avoid enums; use const objects or discriminated unions
- Wrap generated calls in `this.execute()`
- Add JSDoc comments for public methods
- Use custom error classes from `src/errors.ts`

### Pull request process

1. Create feature branch
2. Make changes following guidelines
3. Generate code if OpenAPI spec changed: `pnpm run generate`
4. Build: `pnpm run build`
5. Update documentation if needed
6. Update CHANGELOG.md
7. Submit PR

## Resources

- [PI-SPI Documentation](https://developers.pi-bceao.com)
- [lomi.](https://lomi.africa)
