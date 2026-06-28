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

  let parsed: unknown;
  try {
    parsed = JSON.parse(trimmed);
  } catch {
    return null;
  }

  if (typeof parsed !== 'object' || parsed === null) {
    return null;
  }

  const record = parsed as Record<string, unknown>;
  if (record.t !== 'lomi.cust' || record.v !== 1) {
    return null;
  }

  const alias = record.alias;
  if (typeof alias !== 'string' || alias.trim().length === 0) {
    return null;
  }

  const aliasType = record.aliasType;
  if (
    typeof aliasType !== 'string' ||
    !ALIAS_TYPES.includes(aliasType as LomiCustomerAliasType)
  ) {
    return null;
  }

  return {
    t: 'lomi.cust',
    v: 1,
    alias: alias.trim(),
    aliasType: aliasType as LomiCustomerAliasType,
  };
}
