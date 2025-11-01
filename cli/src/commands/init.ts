import { Command } from "commander";
import inquirer from "inquirer";
import chalk from "chalk";
import ora from "ora";
import { writeFile, mkdir, access } from "fs/promises";
import { join } from "path";
import { execSync } from "child_process";

const command = new Command("init");

const getClientTemplate = (isTypeScript: boolean) => `\
${
  isTypeScript
    ? `import { PiSpiSDK } from '@lomi/pi-spi-sdk';
import 'dotenv/config';`
    : `const { PiSpiSDK } = require('@lomi/pi-spi-sdk');
require('dotenv').config();`
}

// Load configuration from environment variables
const baseUrl = process.env.PI_SPI_BASE_URL || 'https://sandbox.api.pi-bceao.com/piz/v1';
const accessToken = process.env.PI_SPI_ACCESS_TOKEN;

if (!accessToken) {
  console.error('Error: PI_SPI_ACCESS_TOKEN not found in environment variables. Please check your .env file.');
  process.exit(1);
}

// Initialize the PI-SPI SDK
${isTypeScript ? 'export const' : 'const'} piSpi = new PiSpiSDK({
  baseUrl: baseUrl,
  accessToken: accessToken,
});

${isTypeScript ? 'export default piSpi;' : 'module.exports = { piSpi };'}
`;

const getAccountBalanceExample = (isTypeScript: boolean) => {
  const fileExtension = isTypeScript ? "ts" : "js";
  return `\
${
  isTypeScript
    ? `import { piSpi } from '../lib/pi-spi/client.${fileExtension}';
import 'dotenv/config';`
    : `const { piSpi } = require('../lib/pi-spi/client.${fileExtension}');
require('dotenv').config();`
}

async function getAccountBalance() {
  try {
    console.log('Fetching account balance...');
    
    // Replace with your actual account number
    const accountNumber = '123456789';
    
    const account = await piSpi.comptes.getAccount(accountNumber);
    
    // @ts-expect-error - Service implementation pending code generation
    console.log('Account Number:', account?.numero);
    // @ts-expect-error - Service implementation pending code generation
    console.log('Balance:', account?.solde ?? 'N/A');
    // @ts-expect-error - Service implementation pending code generation
    console.log('Status:', account?.statut);
    
  } catch (error) {
    console.error('Error fetching account balance:');
    if (error instanceof Error) {
      console.error(error.message);
    } else {
      console.error('An unknown error occurred:', error);
    }
  }
}

getAccountBalance();
`;
};

const getPaymentExample = (isTypeScript: boolean) => {
  const fileExtension = isTypeScript ? "ts" : "js";
  return `\
${
  isTypeScript
    ? `import { piSpi } from '../lib/pi-spi/client.${fileExtension}';
import type { PiSpiError, PiSpiValidationError, PiSpiAuthError } from '@lomi/pi-spi-sdk';
import 'dotenv/config';`
    : `const { piSpi } = require('../lib/pi-spi/client.${fileExtension}');
require('dotenv').config();`
}

async function createPayment() {
  try {
    console.log('Creating payment...');
    
    // Replace with your actual values
    const payment = await piSpi.paiements.create({
      comptePayeur: '123456789', // Your account number
      payeAlias: 'customer@example.com', // Recipient alias
      montant: 10000, // Amount in XOF (100 XOF = 1 unit)
      motif: 'Payment for services',
    });
    
    console.log('Payment created successfully!');
    console.log('Transaction ID:', payment.txId);
    console.log('Status:', payment.statut);
    
  } catch (error) {
    console.error('Error creating payment:');
    
    if (error instanceof Error) {
      // Check for specific error types
      if (error.name === 'PiSpiValidationError') {
        console.error('Validation error:', (error as any).errors);
      } else if (error.name === 'PiSpiAuthError') {
        console.error('Authentication error:', error.message);
      } else if (error.name === 'PiSpiError') {
        console.error('API error:', error.message);
      } else {
        console.error(error.message);
      }
    } else {
      console.error('An unknown error occurred:', error);
    }
  }
}

createPayment();
`;
};

const envTemplate = `# PI-SPI API Configuration
# Get your access token from your PSP (Payment Service Provider)
PI_SPI_ACCESS_TOKEN=your_access_token_here

# API Base URL (defaults to sandbox)
# Production: https://api.pi-bceao.com/piz/v1
# Sandbox: https://sandbox.api.pi-bceao.com/piz/v1
PI_SPI_BASE_URL=https://sandbox.api.pi-bceao.com/piz/v1
`;

command
  .description("Initialize a new PI-SPI project with example code")
  .action(async () => {
    console.log();
    console.log(chalk.blue.bold("🚀 PI-SPI SDK Setup"));
    console.log(chalk.gray("Powered by lomi. - For the West African fintech community\n"));

    const answers = await inquirer.prompt([
      {
        type: "password",
        name: "accessToken",
        message: `Enter your ${chalk.yellow("PI-SPI access token")} (from your PSP):`,
        mask: "*",
        validate: (input: string) =>
          input.length > 0 || "Access token cannot be empty",
      },
      {
        type: "list",
        name: "environment",
        message: "Which environment should the examples use?",
        choices: [
          { name: "Sandbox (for testing)", value: "sandbox" },
          { name: "Production (live transactions)", value: "production" },
        ],
        default: "sandbox",
      },
      {
        type: "list",
        name: "language",
        message: "Generate example code in:",
        choices: ["TypeScript", "JavaScript"],
        default: "TypeScript",
      },
    ]);

    const isTypeScript = answers.language === "TypeScript";
    const fileExtension = isTypeScript ? "ts" : "js";
    const spinner = ora("Setting up your PI-SPI project...").start();

    try {
      const projectDir = process.cwd();

      spinner.text = "Creating directories...";
      const clientLibDir = join(projectDir, "lib", "pi-spi");
      const examplesDir = join(projectDir, "examples");
      await mkdir(clientLibDir, { recursive: true });
      await mkdir(examplesDir, { recursive: true });

      spinner.text = `Generating ${answers.language} files...`;
      
      // Create lib/pi-spi/client file
      const clientFilePath = join(clientLibDir, `client.${fileExtension}`);
      await writeFile(clientFilePath, getClientTemplate(isTypeScript));

      // Create example files
      const accountExamplePath = join(examplesDir, `get-account-balance.${fileExtension}`);
      await writeFile(accountExamplePath, getAccountBalanceExample(isTypeScript));

      const paymentExamplePath = join(examplesDir, `create-payment.${fileExtension}`);
      await writeFile(paymentExamplePath, getPaymentExample(isTypeScript));

      // Create .env file
      spinner.text = "Creating .env file...";
      const envPath = join(projectDir, ".env");
      let envContent = envTemplate.replace("your_access_token_here", answers.accessToken);
      
      if (answers.environment === "production") {
        envContent = envContent.replace(
          "https://sandbox.api.pi-bceao.com/piz/v1",
          "https://api.pi-bceao.com/piz/v1"
        );
      }
      
      try {
        await writeFile(envPath, envContent, { flag: "wx" });
        spinner.info(chalk.gray("Created .env file with your access token."));
      } catch (error) {
        if ((error as NodeJS.ErrnoException).code === "EEXIST") {
          spinner.warn(
            chalk.yellow(
              ".env file already exists. Access token not added automatically. Please update manually."
            )
          );
        } else {
          throw error;
        }
      }

      // Check for package.json
      let canInstallDeps = true;
      try {
        await access(join(projectDir, "package.json"));
      } catch (error) {
        spinner.stopAndPersist({
          symbol: chalk.yellow("!"),
          text: chalk.yellow("No `package.json` found."),
        });
        spinner.start("Running `pnpm init`...");
        try {
          execSync("pnpm init", { cwd: projectDir, stdio: "ignore" });
          spinner.succeed("`pnpm init` completed.");
          canInstallDeps = true;
        } catch (initError) {
          spinner.fail(chalk.red("Failed to run `pnpm init`."));
          console.error(chalk.yellow("Could not automatically initialize the project."));
          console.warn(
            chalk.gray(
              "Please run `pnpm init` (or equivalent) in your project directory manually,"
            )
          );
          console.warn(chalk.gray("and then run `pnpm add @lomi/pi-spi-sdk dotenv`."));
          canInstallDeps = false;
        }
      }

      // Install dependencies
      if (canInstallDeps) {
        spinner.text = "Installing dependencies (@lomi/pi-spi-sdk, dotenv)...";
        try {
          execSync("pnpm add @lomi/pi-spi-sdk dotenv", { cwd: projectDir });
          spinner.info("Installed dependencies: @lomi/pi-spi-sdk, dotenv");
        } catch (installError) {
          spinner.fail(chalk.red("Dependency installation failed."));
          console.error(chalk.yellow("Could not run `pnpm add @lomi/pi-spi-sdk dotenv`."));
          console.warn(
            chalk.gray("You may need to run `pnpm add @lomi/pi-spi-sdk dotenv` manually.")
          );
        }
      }

      spinner.succeed(chalk.green("PI-SPI project initialized successfully!"));

      console.log(chalk.bold("\nCreated the following files:"));
      console.log(
        chalk.cyan(`- lib/pi-spi/client.${fileExtension}`),
        "- PI-SPI SDK client setup"
      );
      console.log(
        chalk.cyan(`- examples/get-account-balance.${fileExtension}`),
        "- Example: Get account balance"
      );
      console.log(
        chalk.cyan(`- examples/create-payment.${fileExtension}`),
        "- Example: Create a payment"
      );
      console.log(
        chalk.cyan("- .env"),
        `- Environment variables (access token set, ${answers.environment} environment)`
      );

      console.log(chalk.bold("\n🚀 Quick Start:"));
      console.log(
        chalk.blue("1."),
        `Update placeholder values in the example files (account numbers, aliases, etc.).`
      );
      console.log(chalk.blue("2."), "Run the examples:");
      if (isTypeScript) {
        console.log(
          chalk.gray("  (Ensure you have ts-node installed: pnpm add -g ts-node)")
        );
        console.log(
          `   ${chalk.green("ts-node")} examples/get-account-balance.ts`
        );
        console.log(`   ${chalk.green("ts-node")} examples/create-payment.ts`);
      } else {
        console.log(`   ${chalk.green("node")} examples/get-account-balance.js`);
        console.log(`   ${chalk.green("node")} examples/create-payment.js`);
      }
      console.log(
        "\n📚 Documentation:",
        chalk.blueBright("https://github.com/lomiafrica/pi-spi-sdk")
      );
      console.log(
        "\n💡 Need help?",
        chalk.blueBright("https://github.com/lomiafrica/pi-spi-sdk/issues")
      );
      console.log(
        "\n❤️  Built with love by",
        chalk.blueBright("lomi.")
      );
    } catch (error) {
      spinner.fail("Failed to initialize project");
      console.error(
        chalk.red(
          error instanceof Error ? error.message : "An unknown error occurred"
        )
      );
      process.exit(1);
    }
  });

export default command;

