#!/usr/bin/env node
/**
 * Post-generation script
 *
 * This script runs after OpenAPI code generation to set up the SDK properly.
 * It updates the OpenAPI base URL, fixes empty types, and ensures proper exports.
 */

import { readFileSync, writeFileSync, readdirSync, statSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const rootDir = join(__dirname, '..');
const generatedOpenAPIPath = join(rootDir, 'src/generated/core/OpenAPI.ts');
const modelsDir = join(rootDir, 'src/generated/models');

// Known empty types and their proper definitions
const emptyTypeFixes = {
  CompteTransfertIntraRequest: `{
    txId: string;
    montant: number;
    motif?: string;
    payeurNumero?: string;
    payeNumero?: string;
    payeurAlias?: string;
    payeAlias?: string;
}`,
  WebhookModificationRequest: `{
    callbackUrl?: string;
    alias?: string;
}`,
  remise: `{
    montant?: number;
    taux?: number;
}`,
};

/**
 * Fix empty type definitions in generated files
 */
function fixEmptyTypes() {
  try {
    const files = readdirSync(modelsDir);
    let fixedCount = 0;

    for (const file of files) {
      if (!file.endsWith('.ts')) continue;

      const filePath = join(modelsDir, file);
      let content = readFileSync(filePath, 'utf-8');

      // Fix empty type definitions
      // Pattern: export type TypeName = ;
      const emptyTypePattern = /export type (\w+) = \s*;/g;
      let match;
      let modified = false;

      while ((match = emptyTypePattern.exec(content)) !== null) {
        const typeName = match[1];

        if (emptyTypeFixes[typeName]) {
          content = content.replace(
            `export type ${typeName} = ;`,
            `export type ${typeName} = ${emptyTypeFixes[typeName]};`
          );
          fixedCount++;
          modified = true;
          console.log(`  ✅ Fixed empty type: ${typeName}`);
        }
      }

      // Fix inline empty remise types
      // Pattern: remise?: ; or remise: ;
      const remisePattern = /(\s+)(remise)\??:\s*;/g;
      if (remisePattern.test(content)) {
        content = content.replace(remisePattern, `$1$2?: ${emptyTypeFixes['remise']}`);
        fixedCount++;
        modified = true;
        console.log(`  ✅ Fixed remise type in: ${file}`);
      }

      // Fix standalone remise type definitions
      if (content.includes('remise: ;')) {
        content = content.replace(/remise:\s*;/g, `remise: ${emptyTypeFixes['remise']}`);
        fixedCount++;
        modified = true;
        console.log(`  ✅ Fixed remise type definition in: ${file}`);
      }

      if (modified) {
        writeFileSync(filePath, content, 'utf-8');
      }
    }

    if (fixedCount > 0) {
      console.log(`✅ Fixed ${fixedCount} empty type definition(s)`);
    } else {
      console.log('✅ No empty types found to fix');
    }
  } catch (error) {
    console.warn('⚠️  Could not fix empty types:', error.message);
  }
}

try {
  let content = readFileSync(generatedOpenAPIPath, 'utf-8');

  content = content.replace(/BASE: '.*'/, "BASE: 'https://sandbox.api.pi-bceao.com/piz/v1'");

  content = content.replace(/VERSION: '.*'/, "VERSION: '1.0.0'");

  writeFileSync(generatedOpenAPIPath, content, 'utf-8');
  console.log('✅ Updated OpenAPI configuration');
} catch (error) {
  console.warn('⚠️  Could not update OpenAPI.ts:', error.message);
  console.log("   This is okay if the file doesn't exist yet.");
}

// Fix empty types
console.log('🔧 Fixing empty type definitions...');
fixEmptyTypes();

console.log('✅ Post-generation setup complete');
