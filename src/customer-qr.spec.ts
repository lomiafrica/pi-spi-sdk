import { describe, expect, it } from 'vitest';
import {
  buildLomiCustomerQr,
  parseLomiCustomerQr,
  serializeLomiCustomerQr,
} from './customer-qr';

describe('customer-qr', () => {
  it('round-trips a SHID customer QR payload', () => {
    const qr = buildLomiCustomerQr({
      alias: '3497a720-ab11-4973-9619-534e04f263a1',
      aliasType: 'SHID',
    });

    const serialized = serializeLomiCustomerQr(qr);
    const parsed = parseLomiCustomerQr(serialized);

    expect(parsed).toEqual(qr);
  });

  it('rejects EMV merchant payloads', () => {
    expect(parseLomiCustomerQr('000201010211')).toBeNull();
  });

  it('rejects invalid JSON payloads', () => {
    expect(parseLomiCustomerQr('not-json')).toBeNull();
  });
});
