# PI-SPI SDK Improvement Plan

## Current Status ✅

All TypeScript errors have been fixed:
- ✅ Package name corrected: `@lomi/pi-spi-sdk` (was `@lomi./pi-spi-sdk`)
- ✅ Import paths updated throughout codebase
- ✅ Error handling improved with proper type guards
- ✅ Empty type definitions fixed in generated models

## How People Will Import and Use the SDK

### Installation

```bash
# npm
npm install @lomi/pi-spi-sdk

# yarn
yarn add @lomi/pi-spi-sdk

# pnpm
pnpm add @lomi/pi-spi-sdk
```

### Basic Usage

```typescript
import { PiSpiSDK } from '@lomi/pi-spi-sdk';

const sdk = new PiSpiSDK({
  baseUrl: 'https://sandbox.api.pi-bceao.com/piz/v1',
  accessToken: process.env.PI_SPI_ACCESS_TOKEN!,
});

// Use the SDK
const account = await sdk.comptes.getAccount('123456789');
```

## Recommended Improvements for Public Distribution

### 1. **NPM Package Publication** 🚀

**Priority: HIGH**

Make the SDK discoverable on npm:

```json
{
  "name": "@lomi/pi-spi-sdk",
  "version": "1.0.0",
  "publishConfig": {
    "access": "public",
    "registry": "https://registry.npmjs.org/"
  }
}
```

**Action Items:**
- [ ] Set up npm account for `@lomi` scope
- [ ] Add proper npm keywords for discoverability
- [ ] Configure CI/CD for automated publishing
- [ ] Add versioning strategy (semantic versioning)

**Keywords to add:**
```json
{
  "keywords": [
    "pi-spi",
    "spi",
    "bceao",
    "west-africa",
    "uemoa",
    "payment",
    "interoperability",
    "mobile-money",
    "xof",
    "cfa-franc",
    "fintech",
    "sdk",
    "typescript",
    "api-client"
  ]
}
```

### 2. **Enhanced Documentation** 📚

**Priority: HIGH**

**Improvements needed:**

#### a. API Reference Documentation
- Generate comprehensive API docs using TypeDoc
- Add JSDoc comments to all public methods
- Include code examples for each service

#### b. Getting Started Guide
- Step-by-step setup instructions
- Authentication setup guide
- Common use cases and patterns
- Troubleshooting guide

#### c. Migration Guide
- Guide for migrating from direct API calls
- Breaking changes documentation
- Version migration paths

**Action Items:**
- [ ] Add comprehensive JSDoc comments
- [ ] Generate API documentation site
- [ ] Create interactive examples
- [ ] Add troubleshooting section

### 3. **CLI Tool** 🛠️

**Priority: MEDIUM**

Create a CLI tool for:
- Quick SDK setup and initialization
- Code generation from OpenAPI spec
- Testing API endpoints
- Managing credentials

**Proposed CLI Structure:**

```bash
# Install CLI globally
npm install -g @lomi/pi-spi-sdk

# Initialize SDK in project
pi-spi-sdk init

# Test API connection
pi-spi-sdk test

# Generate types from OpenAPI spec
pi-spi-sdk generate

# List available endpoints
pi-spi-sdk endpoints

# Make test API calls
pi-spi-sdk call GET /comptes/{numero}
```

**Benefits:**
- Easier onboarding for new developers
- Quick testing without writing code
- Consistent setup across projects
- Better developer experience

**Action Items:**
- [ ] Create `@lomi/pi-spi-sdk` package
- [ ] Implement init command
- [ ] Add test command
- [ ] Build interactive CLI interface

### 4. **Type Safety Improvements** 🔒

**Priority: HIGH**

**Current Issues:**
- Some generated types have empty definitions
- Service methods need proper return types
- Error types need better discrimination

**Improvements:**

#### a. Fix Generated Types
- Ensure OpenAPI spec completeness
- Add fallback types for missing definitions
- Validate generated code

#### b. Service Method Types
```typescript
// Current (problematic)
async getAccount(numero: string) {
  return this.execute(async () => {
    throw new Error('Not implemented');
  });
}

// Improved
async getAccount(numero: string): Promise<CompteSolde> {
  return this.execute(async () => {
    const { ComptesService } = await import('./generated/services/ComptesService');
    return await ComptesService.compteSoldeConsulter({ numero });
  });
}
```

**Action Items:**
- [ ] Fix OpenAPI schema issues
- [ ] Add proper return types to all service methods
- [ ] Implement proper error type discrimination
- [ ] Add runtime type validation

### 5. **Developer Experience Enhancements** ✨

**Priority: MEDIUM**

#### a. Better Error Messages
```typescript
// Current
throw new Error('Validation error');

// Improved
throw new PiSpiValidationError(
  'Invalid account number format',
  400,
  'Bad Request',
  {
    numero: ['Account number must be 9 digits']
  }
);
```

#### b. Request/Response Logging
```typescript
const sdk = new PiSpiSDK({
  baseUrl: 'https://sandbox.api.pi-bceao.com/piz/v1',
  accessToken: process.env.PI_SPI_ACCESS_TOKEN!,
  logger: {
    level: 'debug', // 'none' | 'error' | 'warn' | 'info' | 'debug'
    format: 'json' // 'json' | 'pretty'
  }
});
```

#### c. Retry Logic
```typescript
const sdk = new PiSpiSDK({
  baseUrl: 'https://sandbox.api.pi-bceao.com/piz/v1',
  accessToken: process.env.PI_SPI_ACCESS_TOKEN!,
  retry: {
    attempts: 3,
    delay: 1000,
    onRetry: (error, attempt) => {
      console.log(`Retry attempt ${attempt}: ${error.message}`);
    }
  }
});
```

**Action Items:**
- [ ] Add configurable logging
- [ ] Implement retry logic with exponential backoff
- [ ] Add request/response interceptors
- [ ] Create debugging utilities

### 6. **Testing Infrastructure** 🧪

**Priority: HIGH**

**Improvements:**

#### a. Unit Tests
- Test all service methods
- Test error handling
- Test query builder
- Test type validations

#### b. Integration Tests
- Test against sandbox API
- Test authentication flows
- Test all endpoints
- Test error scenarios

#### c. Mock Server
```typescript
import { PiSpiMockServer } from '@lomi/pi-spi-sdk/mock';

const server = new PiSpiMockServer();
server.start();

// Use in tests
const sdk = new PiSpiSDK({
  baseUrl: server.url,
  accessToken: 'test-token'
});
```

**Action Items:**
- [ ] Add Vitest test suite
- [ ] Create mock server package
- [ ] Add integration test suite
- [ ] Set up test coverage reporting

### 7. **Package Structure Improvements** 📦

**Priority: MEDIUM**

**Current Structure:**
```
pi-spi-sdk/
├── src/
│   ├── generated/
│   ├── services/
│   ├── errors.ts
│   └── index.ts
└── dist/
```

**Improved Structure:**
```
pi-spi-sdk/
├── src/
│   ├── generated/       # Auto-generated from OpenAPI
│   ├── services/       # Service wrappers
│   ├── errors.ts       # Error classes
│   ├── query-builder.ts # Query utilities
│   ├── config.ts       # Configuration types
│   └── index.ts        # Main entry point
├── dist/               # Compiled output
├── docs/               # Documentation
├── examples/           # Usage examples
│   ├── basic-usage.ts
│   ├── error-handling.ts
│   └── webhooks.ts
├── tests/              # Test files
└── mock/               # Mock server (optional package)
```

**Action Items:**
- [ ] Reorganize package structure
- [ ] Add example files
- [ ] Separate mock server into optional package
- [ ] Add proper exports in package.json

### 8. **Package.json Enhancements** 📋

**Priority: MEDIUM**

```json
{
  "name": "@lomi/pi-spi-sdk",
  "version": "1.0.0",
  "description": "Official TypeScript SDK for PI-SPI (Plateforme d'Interopérabilité) API",
  "main": "dist/index.js",
  "types": "dist/index.d.ts",
  "exports": {
    ".": {
      "import": "./dist/index.js",
      "require": "./dist/index.cjs",
      "types": "./dist/index.d.ts"
    },
    "./mock": {
      "import": "./dist/mock/index.js",
      "types": "./dist/mock/index.d.ts"
    }
  },
  "files": [
    "dist",
    "README.md",
    "LICENSE",
    "CHANGELOG.md"
  ],
  "repository": {
    "type": "git",
    "url": "https://github.com/lomiafrica/lomi.git",
    "directory": "apps/pi-spi-sdk"
  },
  "bugs": {
    "url": "https://github.com/lomiafrica/lomi/issues"
  },
  "homepage": "https://github.com/lomiafrica/lomi/tree/main/apps/pi-spi-sdk",
  "keywords": [
    "pi-spi",
    "spi",
    "bceao",
    "west-africa",
    "uemoa",
    "payment",
    "interoperability",
    "mobile-money",
    "xof",
    "cfa-franc",
    "fintech",
    "sdk",
    "typescript",
    "api-client"
  ],
  "scripts": {
    "build": "tsc",
    "dev": "tsc --watch",
    "test": "vitest",
    "test:coverage": "vitest --coverage",
    "test:integration": "vitest --config vitest.integration.config.ts",
    "docs": "typedoc",
    "generate": "node scripts/pre-generate.js && openapi --input ./openapi.json --output ./src/generated --client axios --useOptions && node scripts/post-generate.js",
    "prepublishOnly": "npm run generate && npm run build && npm run test"
  }
}
```

### 9. **GitHub Repository Setup** 🐙

**Priority: HIGH**

**Repository Structure:**
```
lomi/
└── apps/
    └── pi-spi-sdk/
        ├── README.md (main documentation)
        ├── SETUP.md (development setup)
        ├── IMPROVEMENTS.md (this file)
        ├── CHANGELOG.md (version history)
        ├── CONTRIBUTING.md (contribution guidelines)
        └── .github/
            ├── ISSUE_TEMPLATE/
            │   ├── bug_report.md
            │   └── feature_request.md
            └── workflows/
                ├── ci.yml
                ├── release.yml
                └── publish.yml
```

**Action Items:**
- [ ] Create comprehensive README
- [ ] Add CONTRIBUTING.md
- [ ] Set up GitHub Actions for CI/CD
- [ ] Add issue templates
- [ ] Create release workflow

### 10. **Community & Support** 💬

**Priority: MEDIUM**

**Channels:**
- GitHub Discussions for Q&A
- Discord/Slack community
- Stack Overflow tag: `@lomi/pi-spi-sdk`
- Documentation site with search

**Action Items:**
- [ ] Set up GitHub Discussions
- [ ] Create community Discord/Slack
- [ ] Add badges to README
- [ ] Create support documentation

## Implementation Priority

### Phase 1: Foundation (Week 1-2)
1. ✅ Fix all TypeScript errors
2. ✅ Update package name
3. Fix generated types
4. Add proper return types
5. Set up npm publishing

### Phase 2: Documentation (Week 3)
1. Enhance README
2. Add JSDoc comments
3. Create API documentation
4. Add examples

### Phase 3: Developer Experience (Week 4)
1. Add logging
2. Implement retry logic
3. Improve error messages
4. Add request/response interceptors

### Phase 4: Testing & CLI (Week 5-6)
1. Set up test suite
2. Create mock server
3. Build CLI tool
4. Add integration tests

### Phase 5: Community (Ongoing)
1. Set up GitHub Discussions
2. Create community channels
3. Write blog posts
4. Engage with fintech community

## Discoverability Strategy

### 1. **NPM Package**
- Use descriptive keywords
- Write compelling package description
- Add proper tags

### 2. **GitHub**
- Optimize README for search
- Add topics/tags
- Create GitHub Discussions
- Share in fintech communities

### 3. **Documentation Site**
- Create dedicated docs site (using VitePress or Docusaurus)
- SEO optimization
- Add to search engines

### 4. **Community Engagement**
- Share on Twitter/X
- Post on LinkedIn
- Write blog posts
- Present at fintech meetups
- Engage with BCEAO developer community

### 5. **Partnerships**
- Partner with BCEAO for official SDK status
- Work with fintech associations
- Collaborate with other payment providers

## Quick Win Checklist

- [x] Fix package name
- [x] Fix TypeScript errors
- [ ] Publish to npm
- [ ] Add comprehensive README
- [ ] Create GitHub Discussions
- [ ] Add npm badges
- [ ] Write getting started blog post
- [ ] Share on social media

## Long-term Vision

**Goal:** Make `@lomi/pi-spi-sdk` the go-to SDK for PI-SPI integration in West Africa.

**Success Metrics:**
- 100+ npm downloads/week
- 50+ GitHub stars
- Active community discussions
- Used by 10+ fintech companies
- Featured in BCEAO documentation
- Official SDK status

---

**Last Updated:** 2024-12-28
**Next Review:** After Phase 1 completion

