import { afterEach, describe, expect, it, vi } from 'vitest';
import { WebhooksService } from './services/webhooks';

describe('BaseService.request', () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('sends Authorization header and parses JSON responses', async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      status: 200,
      json: async () => ({ id: 'wh-1', callbackUrl: 'https://example.com/hook' }),
    });
    vi.stubGlobal('fetch', fetchMock);

    const service = new WebhooksService({
      BASE: 'https://sandbox.api.pi-bceao.com/piz/v1',
      TOKEN: 'test-token',
    });

    const result = await service.get('wh-1');

    expect(fetchMock).toHaveBeenCalledOnce();
    expect(fetchMock).toHaveBeenCalledWith(
      'https://sandbox.api.pi-bceao.com/piz/v1/webhooks/wh-1',
      expect.objectContaining({
        headers: expect.objectContaining({
          Authorization: 'Bearer test-token',
        }),
      }),
    );
    expect(result).toEqual({ id: 'wh-1', callbackUrl: 'https://example.com/hook' });
  });

  it('maps non-2xx responses to thrown error bodies', async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: false,
      status: 401,
      statusText: 'Unauthorized',
      json: async () => ({ title: 'Unauthorized' }),
    });
    vi.stubGlobal('fetch', fetchMock);

    const service = new WebhooksService({
      BASE: 'https://sandbox.api.pi-bceao.com/piz/v1',
      TOKEN: 'bad-token',
    });

    await expect(service.list()).rejects.toMatchObject({
      statusCode: 401,
      message: 'Unauthorized',
    });
  });
});
