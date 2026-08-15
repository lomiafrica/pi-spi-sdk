import {
  isJsonObject,
  isString,
  type JsonValue,
} from "@lomi./shared";

export type LomiCustomerAliasType = 'SHID' | 'MBNO' | 'MCOD';

export type LomiCustomerQr = {
  t: 'lomi.cust';
  v: 1;
  alias: string;
  aliasType: LomiCustomerAliasType;
};

const ALIAS_TYPES: readonly LomiCustomerAliasType[] = ['SHID', 'MBNO', 'MCOD'];

export function buildLomiCustomerQr(input: {
  alias: string;
  aliasType?: LomiCustomerAliasType;
}): LomiCustomerQr {
  const alias = input.alias.trim();
  if (!alias) {
    throw new Error('alias is required');
  }

  const aliasType = input.aliasType ?? 'SHID';
  if (!ALIAS_TYPES.includes(aliasType)) {
    throw new Error(`Invalid aliasType: ${aliasType}`);
  }

  return {
    t: 'lomi.cust',
    v: 1,
    alias,
    aliasType,
  };
}

export function serializeLomiCustomerQr(qr: LomiCustomerQr): string {
  return JSON.stringify(qr);
}

export function parseLomiCustomerQr(raw: string): LomiCustomerQr | null {
  const trimmed = raw.trim();
  if (!trimmed || trimmed.startsWith('000201')) {
    return null;
  }

  let parsed: JsonValue;
  try {
    parsed = JSON.parse(trimmed);
  } catch {
    return null;
  }

  if (!isJsonObject(parsed)) {
    return null;
  }

  if (parsed['t'] !== 'lomi.cust' || parsed['v'] !== 1) {
    return null;
  }

  const alias = parsed['alias'];
  if (!isString(alias) || alias.trim().length === 0) {
    return null;
  }

  const aliasType = parsed['aliasType'];
  if (!isAliasType(aliasType)) {
    return null;
  }

  return {
    t: 'lomi.cust',
    v: 1,
    alias: alias.trim(),
    aliasType,
  };
}

function isAliasType(
  value: JsonValue | undefined,
): value is LomiCustomerAliasType {
  return isString(value) && ALIAS_TYPES.some((aliasType) => aliasType === value);
}
