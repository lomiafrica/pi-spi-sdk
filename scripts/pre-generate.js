#!/usr/bin/env node
/**
 * Pre-generation validation and fix script
 *
 * This script validates the OpenAPI spec and fixes common issues
 * before running the code generator.
 */

import { readFileSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const specPath = join(__dirname, '../openapi.json');
const isObjectRecord = (value) =>
  value !== null && Object(value) === value && !Array.isArray(value);

try {
  console.log('📋 Validating OpenAPI specification...');

  const specContent = readFileSync(specPath, 'utf-8');
  const spec = JSON.parse(specContent);

  if (!spec.openapi) {
    throw new Error('Missing "openapi" field');
  }

  if (!spec.info) {
    throw new Error('Missing "info" field');
  }

  if (!isObjectRecord(spec.paths)) {
    throw new Error('Missing or invalid "paths" field');
  }

  if (!isObjectRecord(spec.components)) {
    throw new Error('Missing or invalid "components" field');
  }

  // Ensure tags array exists (even if empty)
  if (!spec.tags || !Array.isArray(spec.tags)) {
    console.log('⚠️  Tags array missing or invalid, creating empty array...');
    spec.tags = [];
  }

  // Ensure each path operation has tags and remove null operations
  let fixedPaths = 0;
  let removedNullOps = 0;
  const httpMethods = ['get', 'post', 'put', 'delete', 'patch', 'options', 'head'];

  for (const [path, pathItem] of Object.entries(spec.paths)) {
    if (isObjectRecord(pathItem)) {
      for (const [key, value] of Object.entries(pathItem)) {
        // Check if this is an HTTP method
        if (httpMethods.includes(key.toLowerCase())) {
          // Remove null operations (sometimes used to indicate method not available)
          if (value === null || value === undefined) {
            console.log(`⚠️  Removing null operation ${key.toUpperCase()} ${path}`);
            delete pathItem[key];
            removedNullOps++;
            continue;
          }

          // Ensure the operation object exists and has tags
          if (!isObjectRecord(value)) {
            console.log(`⚠️  Skipping invalid operation ${key.toUpperCase()} ${path}`);
            continue;
          }

          // Ensure tags array exists
          if (!value.tags || !Array.isArray(value.tags) || value.tags.length === 0) {
            console.log(`⚠️  Adding default tag to ${key.toUpperCase()} ${path}`);
            value.tags = ['Default'];
            fixedPaths++;
          }

          // Ensure operationId exists (required by some generators)
          if (!value.operationId) {
            // Generate a default operationId from method and path
            const pathParts = path.split('/').filter((p) => p && !p.startsWith('{'));
            const operationId =
              key.toLowerCase() +
              pathParts.map((p) => p.charAt(0).toUpperCase() + p.slice(1)).join('');
            value.operationId = operationId;
            console.log(`⚠️  Added operationId "${operationId}" to ${key.toUpperCase()} ${path}`);
          }
        }
      }
    }
  }

  if (removedNullOps > 0) {
    console.log(`✅ Removed ${removedNullOps} null operations`);
  }

  if (fixedPaths > 0) {
    console.log(`✅ Fixed ${fixedPaths} path operations`);
  }

  // Write back the fixed spec
  writeFileSync(specPath, JSON.stringify(spec, null, 2), 'utf-8');
  console.log('✅ OpenAPI specification validated and fixed');
} catch (error) {
  console.error('❌ Error validating OpenAPI spec:', error);
  process.exit(1);
}
