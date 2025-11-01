# @lomi/pi-spi-sdk

Command line interface for the PI-SPI SDK - Built by lomi. for the West African fintech community.

## Installation

```bash
npm install -g @lomi/pi-spi-sdk
# or
pnpm add -g @lomi/pi-spi-sdk
```

## Commands

### `lomi. pi-spi`

Initialize a new PI-SPI project with example code.

**Usage:**

```bash
lomi. pi-spi
```

**Process:**
1. Prompts for your PI-SPI access token, environment (Sandbox/Production), and language (TypeScript/JavaScript).
2. Creates:
   * `lib/pi-spi/client.(ts|js)`: SDK client setup.
   * `examples/get-account-balance.(ts|js)`: Example for fetching account balance.
   * `examples/create-payment.(ts|js)`: Example for creating payments.
   * `.env`: Stores `PI_SPI_ACCESS_TOKEN` and `PI_SPI_BASE_URL`.
3. Runs `pnpm init` if no `package.json` exists.
4. Installs `@lomi/pi-spi-sdk` and `dotenv` dependencies.

## About

This CLI is part of the [PI-SPI SDK](https://github.com/lomiafrica/pi-spi-sdk) project, built by [lomi.](https://lomi.africa) to help fintechs in West Africa integrate with BCEAO's payment interoperability platform.

## License

MIT

