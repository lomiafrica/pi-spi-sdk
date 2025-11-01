#!/usr/bin/env node

import { Command } from "commander";
import chalk from "chalk";
import { createRequire } from "module";

// Import commands
import initCommand from "./commands/init.js";

// Helper to read JSON files in ES module scope
const require = createRequire(import.meta.url);
const pkg = require("../package.json");

const program = new Command();

program
  .name("lomi.")
  .description("CLI for PI-SPI SDK - Built by lomi. for the West African fintech community")
  .version(pkg.version);

// Create pi-spi subcommand
const piSpiCommand = new Command("pi-spi")
  .description("PI-SPI SDK commands");

// Add init as a subcommand of pi-spi
piSpiCommand.addCommand(initCommand);

// Register pi-spi command
program.addCommand(piSpiCommand);

// Error handling
program.on("command:*", () => {
  console.error(chalk.red("Invalid command"));
  console.log(`See ${chalk.blue("--help")} for a list of available commands.`);
  process.exit(1);
});

program.parse();

