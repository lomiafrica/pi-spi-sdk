import { describe, expect, it, vi, afterEach } from 'vitest';
import {
    createQrPayload,
    computeCrc16,
    isValidPispiQrPayload,
    buildPayloadString,
    generateQrCodeSvg,
    DEFAULT_PISPI_LOGO_DATA_URL,
    QrType,
} from './index';

type SegmentMap = Record<string, string>;

type SegmentEntry = {
    tag: string;
    value: string;
};

const BASE_ALIAS = '3497a720-ab11-4973-9619-534e04f263a1';
const REFERENCE_CAISSE = 'CAISSE_A01'; // 10 caractères
const REFERENCE_PRODUIT = 'Produit-ABC-123654';  // 18 caractères
const REFERENCE_TX = 'Tx-20251112-055052-001'; // 22 caractères
const BASE_COUNTRY = 'CI';

function decodeSegments(data: string): SegmentMap {
    const segments: SegmentMap = {};
    let cursor = 0;

    while (cursor < data.length) {
        const tag = data.slice(cursor, cursor + 2);
        const lengthStr = data.slice(cursor + 2, cursor + 4);
        const length = Number.parseInt(lengthStr, 10);

        if (Number.isNaN(length) || length < 0) {
            throw new Error(`Longueur invalide pour le tag ${tag}`);
        }

        const valueStart = cursor + 4;
        const valueEnd = valueStart + length;
        const value = data.slice(valueStart, valueEnd);

        segments[tag] = value;
        cursor = valueEnd;
    }

    return segments;
}

function decodeSegmentEntries(data: string): SegmentEntry[] {
    const entries: SegmentEntry[] = [];
    let cursor = 0;

    while (cursor < data.length) {
        const tag = data.slice(cursor, cursor + 2);
        const lengthStr = data.slice(cursor + 2, cursor + 4);
        const length = Number.parseInt(lengthStr, 10);

        if (Number.isNaN(length) || length < 0) {
            throw new Error(`Longueur invalide pour le tag ${tag}`);
        }

        const valueStart = cursor + 4;
        const valueEnd = valueStart + length;
        const value = data.slice(valueStart, valueEnd);

        entries.push({ tag, value });
        cursor = valueEnd;
    }

    return entries;
}

function encodeSimpleSegments(entries: SegmentEntry[]): string {
    return entries
        .map(({ tag, value }) => `${tag}${value.length.toString().padStart(2, '0')}${value}`)
        .join('');
}

function rebuildPayload(entries: SegmentEntry[]): string {
    const filtered = entries.filter((entry) => entry.tag !== '63');
    const base = encodeSimpleSegments(filtered);
    const crc = computeCrc16(`${base}6304`);
    return `${base}6304${crc}`;
}

function updateSegment(entries: SegmentEntry[], tag: string, value: string): void {
    const index = entries.findIndex((entry) => entry.tag === tag);
    if (index === -1) {
        entries.push({ tag, value });
    } else {
        entries[index] = { tag, value };
    }
}

function removeSegment(entries: SegmentEntry[], tag: string): void {
    const index = entries.findIndex((entry) => entry.tag === tag);
    if (index !== -1) {
        entries.splice(index, 1);
    }
}

function decodeAdditional(raw: string): SegmentEntry[] {
    return decodeSegmentEntries(raw);
}

function encodeAdditional(entries: SegmentEntry[]): string {
    return encodeSimpleSegments(entries);
}

function expectValidCrc(payload: string, segments: SegmentMap): void {
    const crc = segments['63'];
    expect(crc).toBeDefined();
    const withoutCrc = payload.slice(0, -4);
    expect(crc).toBe(computeCrc16(withoutCrc));
}

describe('createQrPayload', () => {
    it('génère un QR statique sans montant', () => {
        const result = createQrPayload({
            alias: BASE_ALIAS,
            countryCode: BASE_COUNTRY,
            qrType: 'STATIC',
            referenceLabel: REFERENCE_CAISSE,
        });
        console.log("QR statique sans montant", result.payload);
        const segments = decodeSegments(result.payload);
        expect(segments['62']).toBeDefined();
        const additionalRaw = segments['62'];
        expect(additionalRaw).toBeDefined();
        const additional = decodeSegments(additionalRaw);

        expect(segments['00']).toBe('01');
        expect(segments['36']).toContain(BASE_ALIAS);
        expect(segments['54']).toBeUndefined();
        expect(segments['58']).toBe(BASE_COUNTRY);
        expect(segments['59']).toBe('X');
        expect(segments['60']).toBe('X');

        expect(additional['05']).toBe(REFERENCE_CAISSE);
        expect(additional['11']).toBe('000');

        expectValidCrc(result.payload, segments);
    });

    it('génère un QR statique avec montant', () => {
        const amount = 1500;
        const result = createQrPayload({
            alias: BASE_ALIAS,
            countryCode: BASE_COUNTRY,
            qrType: 'STATIC',
            referenceLabel: REFERENCE_PRODUIT,
            amount,
        });
        console.log("QR statique avec montant", result.payload);
        const segments = decodeSegments(result.payload);
        const additionalRaw = segments['62'];
        expect(additionalRaw).toBeDefined();
        const additional = decodeSegments(additionalRaw);

        expect(segments['54']).toBe(String(amount));
        expect(additional['05']).toBe(REFERENCE_PRODUIT);
        expect(additional['11']).toBe('000');

        expectValidCrc(result.payload, segments);
    });

    it('génère un QR dynamique sans montant', () => {
        const result = createQrPayload({
            alias: BASE_ALIAS,
            countryCode: BASE_COUNTRY,
            qrType: 'DYNAMIC',
            referenceLabel: REFERENCE_TX,
        });
        console.log("QR dynamique sans montant", result.payload);
        const segments = decodeSegments(result.payload);
        const additionalRaw = segments['62'];
        expect(additionalRaw).toBeDefined();
        const additional = decodeSegments(additionalRaw);

        expect(segments['54']).toBeUndefined();
        expect(additional['05']).toBe(REFERENCE_TX);
        expect(additional['11']).toBe('400');

        expectValidCrc(result.payload, segments);
    });

    it('génère un QR dynamique avec montant', () => {
        const amount = 82500;
        const result = createQrPayload({
            alias: BASE_ALIAS,
            countryCode: BASE_COUNTRY,
            qrType: 'DYNAMIC',
            referenceLabel: REFERENCE_TX,
            amount,
        });
        console.log("QR dynamique avec montant", result.payload);
        const segments = decodeSegments(result.payload);
        const additionalRaw = segments['62'];
        expect(additionalRaw).toBeDefined();
        const additional = decodeSegments(additionalRaw);

        expect(segments['54']).toBe(String(amount));
        expect(additional['05']).toBe(REFERENCE_TX);
        expect(additional['11']).toBe('400');

        expectValidCrc(result.payload, segments);
    });

    it('rejette un sous-tag additionnel invalide', () => {
        expect(() =>
            createQrPayload(
                {
                    alias: BASE_ALIAS,
                    countryCode: BASE_COUNTRY,
                    qrType: 'STATIC',
                    referenceLabel: REFERENCE_CAISSE,
                },
                {
                    additionalData: {
                        custom: {
                            '0@': 'INVALID',
                        },
                    },
                }
            )
        ).toThrow('Le sous-tag additional data "0@" doit contenir exactement 2 caractères alphanumériques.');
    });

    it('rejette un type de QR inconnu', () => {
        expect(() =>
            createQrPayload({
                alias: BASE_ALIAS,
                countryCode: BASE_COUNTRY,
                qrType: 'UNKNOWN' as QrType,
                referenceLabel: REFERENCE_CAISSE,
            })
        ).toThrow('Le paramètre "qrType" doit être "STATIC" ou "DYNAMIC".');
    });

    it('accepte un montant fourni en chaîne de caractères', () => {
        const result = createQrPayload({
            alias: BASE_ALIAS,
            countryCode: BASE_COUNTRY,
            qrType: 'STATIC',
            referenceLabel: REFERENCE_CAISSE,
            amount: '000123',
        });

        const segments = decodeSegments(result.payload);
        expect(segments['54']).toBe('000123');
    });

    it('autorise les données additionnelles personnalisées', () => {
        const result = createQrPayload(
            {
                alias: BASE_ALIAS,
                countryCode: BASE_COUNTRY,
                qrType: 'STATIC',
                referenceLabel: REFERENCE_CAISSE,
            },
            {
                additionalData: {
                    purposeOfTransaction: 'FACTURE',
                    custom: {
                        AA: 'VALEUR1',
                        AB: 'VALEUR2',
                    },
                },
            }
        );

        const segments = decodeSegments(result.payload);
        const additional = decodeSegments(segments['62']);
        expect(additional['12']).toBe('FACTURE');
        expect(additional['AA']).toBe('VALEUR1');
        expect(additional['AB']).toBe('VALEUR2');
    });

    it('rejette un montant numérique non entier', () => {
        expect(() =>
            createQrPayload({
                alias: BASE_ALIAS,
                countryCode: BASE_COUNTRY,
                qrType: 'STATIC',
                referenceLabel: REFERENCE_CAISSE,
                amount: 12.5,
            })
        ).toThrow('Le montant doit contenir uniquement des chiffres.');
    });

    it('rejette un type de QR manquant', () => {
        expect(() =>
            createQrPayload({
                alias: BASE_ALIAS,
                countryCode: BASE_COUNTRY,
                qrType: undefined,
                referenceLabel: REFERENCE_CAISSE,
            } as unknown as any)
        ).toThrow('Le paramètre "qrType" est obligatoire.');
    });

    it('rejette un referenceLabel manquant', () => {
        expect(() =>
            createQrPayload({
                alias: BASE_ALIAS,
                countryCode: BASE_COUNTRY,
                qrType: 'STATIC',
                referenceLabel: '',
            } as unknown as any)
        ).toThrow('Le paramètre "referenceLabel" est obligatoire.');
    });

    it('rejette un alias manquant', () => {
        expect(() =>
            createQrPayload({
                alias: '',
                countryCode: BASE_COUNTRY,
                qrType: 'STATIC',
                referenceLabel: REFERENCE_CAISSE,
            } as unknown as any)
        ).toThrow('Le paramètre "alias" est obligatoire.');
    });

    it('rejette un countryCode manquant', () => {
        expect(() =>
            createQrPayload({
                alias: BASE_ALIAS,
                countryCode: '',
                qrType: 'STATIC',
                referenceLabel: REFERENCE_CAISSE,
            } as unknown as any)
        ).toThrow('Le paramètre "countryCode" est obligatoire.');
    });
});

describe('isValidPispiQrPayload', () => {
    it('valide une payload générée par le SDK', () => {
        const payload = buildPayloadString({
            alias: BASE_ALIAS,
            countryCode: BASE_COUNTRY,
            qrType: 'STATIC',
            referenceLabel: REFERENCE_CAISSE,
            amount: 1000,
        });

        const result = isValidPispiQrPayload(payload);
        expect(result.valid).toBe(true);
        expect(result.errors).toEqual([]);
        expect(result.data).toEqual({
            alias: BASE_ALIAS,
            countryCode: BASE_COUNTRY,
            qrType: 'STATIC',
            referenceLabel: REFERENCE_CAISSE,
            amount: '1000',
        });
    });

    it('détecte un CRC invalide', () => {
        const payload = buildPayloadString({
            alias: BASE_ALIAS,
            countryCode: BASE_COUNTRY,
            qrType: 'STATIC',
            referenceLabel: REFERENCE_CAISSE,
        });

        const corrupted = `${payload.slice(0, -1)}Z`;
        const result = isValidPispiQrPayload(corrupted);
        expect(result.valid).toBe(false);
        expect(result.errors).toContain('CRC invalide.');
        expect(result.data).toBeUndefined();
    });

    it('détecte un champ obligatoire manquant', () => {
        const invalidPayload = '0002010102126304BEEF';
        const result = isValidPispiQrPayload(invalidPayload);
        expect(result.valid).toBe(false);
        expect(result.errors).toContain('Tag 36 (Merchant Account Information) manquant.');
        expect(result.data).toBeUndefined();
    });

    it("rejette un alias qui n'est pas un UUID v4", () => {
        expect(() =>
            createQrPayload({
                alias: 'not-an-uuid',
                countryCode: BASE_COUNTRY,
                qrType: 'STATIC',
                referenceLabel: REFERENCE_CAISSE,
            })
        ).toThrow('L\'alias doit être un UUID v4 valide.');
    });

    it('rejette un referenceLabel trop long', () => {
        expect(() =>
            createQrPayload({
                alias: BASE_ALIAS,
                countryCode: BASE_COUNTRY,
                qrType: 'STATIC',
                referenceLabel: 'A'.repeat(26),
            })
        ).toThrow('Le referenceLabel ne doit pas dépasser 25 caractères.');
    });

    it('rejette un pays hors UEMOA', () => {
        expect(() =>
            createQrPayload({
                alias: BASE_ALIAS,
                countryCode: 'FR',
                qrType: 'STATIC',
                referenceLabel: REFERENCE_CAISSE,
            })
        ).toThrow("Le countryCode doit être l'un des codes ISO2 de l'UEMOA (BJ, BF, CI, ML, NE, SN, TG, GW).");
    });

    it('rejette un montant supérieur à 13 chiffres', () => {
        expect(() =>
            createQrPayload({
                alias: BASE_ALIAS,
                countryCode: BASE_COUNTRY,
                qrType: 'STATIC',
                referenceLabel: REFERENCE_CAISSE,
                amount: '12345678901234',
            })
        ).toThrow('Le montant ne doit pas dépasser 13 chiffres.');
    });

    it('rejette un montant qui contient des séparateurs', () => {
        expect(() =>
            createQrPayload({
                alias: BASE_ALIAS,
                countryCode: BASE_COUNTRY,
                qrType: 'STATIC',
                referenceLabel: REFERENCE_CAISSE,
                amount: '12,50',
            })
        ).toThrow('Le montant doit contenir uniquement des chiffres.');
        expect(() =>
            createQrPayload({
                alias: BASE_ALIAS,
                countryCode: BASE_COUNTRY,
                qrType: 'STATIC',
                referenceLabel: REFERENCE_CAISSE,
                amount: '15.00',
            })
        ).toThrow('Le montant doit contenir uniquement des chiffres.');
    });
});

describe('isValidPispiQrPayload diagnostics', () => {
    const basePayload = (): string =>
        buildPayloadString({
            alias: BASE_ALIAS,
            countryCode: BASE_COUNTRY,
            qrType: 'STATIC',
            referenceLabel: REFERENCE_CAISSE,
        });

    it('signale un indicateur de format invalide', () => {
        const entries = decodeSegmentEntries(basePayload());
        updateSegment(entries, '00', '02');
        const mutated = rebuildPayload(entries);
        const result = isValidPispiQrPayload(mutated);
        expect(result.valid).toBe(false);
        expect(result.errors).toContain('Tag 00 invalide (doit être 01).');
    });

    it('signale un indicateur de format manquant', () => {
        const entries = decodeSegmentEntries(basePayload());
        removeSegment(entries, '00');
        const mutated = rebuildPayload(entries);
        const result = isValidPispiQrPayload(mutated);
        expect(result.valid).toBe(false);
        expect(result.errors).toContain('Tag 00 (format indicator) manquant.');
    });

    it("signale l'absence d'alias dans les informations marchand", () => {
        const entries = decodeSegmentEntries(basePayload());
        const merchant = entries.find((entry) => entry.tag === '36');
        expect(merchant).toBeDefined();
        const merchantEntries = decodeAdditional(merchant!.value).filter((entry) => entry.tag !== '01');
        merchant!.value = encodeAdditional(merchantEntries);
        const mutated = rebuildPayload(entries);
        const result = isValidPispiQrPayload(mutated);
        expect(result.valid).toBe(false);
        expect(result.errors).toContain('Alias manquant dans les informations marchand (tag 36).');
    });

    it('signale une erreur lors du décodage des informations marchand', () => {
        const entries = decodeSegmentEntries(basePayload());
        const merchant = entries.find((entry) => entry.tag === '36');
        expect(merchant).toBeDefined();
        merchant!.value = '0004AB';
        const mutated = rebuildPayload(entries);
        const result = isValidPispiQrPayload(mutated);
        expect(result.valid).toBe(false);
        expect(result.errors.some((error) => error.includes('Erreur lors de l\'analyse des informations marchand'))).toBe(true);
    });

    it('signale un referenceLabel manquant dans les données additionnelles', () => {
        const entries = decodeSegmentEntries(basePayload());
        const additional = entries.find((entry) => entry.tag === '62');
        expect(additional).toBeDefined();
        const additionalEntries = decodeAdditional(additional!.value).filter((entry) => entry.tag !== '05');
        additional!.value = encodeAdditional(additionalEntries);
        const mutated = rebuildPayload(entries);
        const result = isValidPispiQrPayload(mutated);
        expect(result.valid).toBe(false);
        expect(result.errors).toContain('Tag 05 (Reference Label) manquant dans les données additionnelles.');
    });

    it('signale un merchantChannel manquant dans les données additionnelles', () => {
        const entries = decodeSegmentEntries(basePayload());
        const additional = entries.find((entry) => entry.tag === '62');
        expect(additional).toBeDefined();
        const additionalEntries = decodeAdditional(additional!.value).filter((entry) => entry.tag !== '11');
        additional!.value = encodeAdditional(additionalEntries);
        const mutated = rebuildPayload(entries);
        const result = isValidPispiQrPayload(mutated);
        expect(result.valid).toBe(false);
        expect(result.errors).toContain('Tag 11 (Merchant Channel) manquant dans les données additionnelles.');
    });

    it('signale une erreur lors du décodage des données additionnelles', () => {
        const entries = decodeSegmentEntries(basePayload());
        const additional = entries.find((entry) => entry.tag === '62');
        expect(additional).toBeDefined();
        additional!.value = '00AATEST';
        const mutated = rebuildPayload(entries);
        const result = isValidPispiQrPayload(mutated);
        expect(result.valid).toBe(false);
        expect(result.errors.some((error) => error.includes('Erreur lors de l\'analyse des données additionnelles'))).toBe(true);
    });

    it('signale une CRC manquante', () => {
        const entries = decodeSegmentEntries(basePayload());
        removeSegment(entries, '63');
        const withoutCrc = encodeSimpleSegments(entries);
        const result = isValidPispiQrPayload(withoutCrc);
        expect(result.valid).toBe(false);
        expect(result.errors).toContain('Tag 63 (CRC) manquant.');
    });

    it('capture une exception inattendue lors du décodage', () => {
        const spy = vi.spyOn(Number, 'parseInt').mockImplementation(() => {
            throw new Error('panic');
        });

        const result = isValidPispiQrPayload(basePayload());
        expect(result.valid).toBe(false);
        expect(result.errors.some((error) => error.includes('Erreur lors de l\'analyse de la payload'))).toBe(true);

        spy.mockRestore();
    });

    it('signale une longueur invalide pour un segment', () => {
        const payload = basePayload();
        const index = payload.indexOf('36');
        const mutated = `${payload.slice(0, index + 2)}AA${payload.slice(index + 4)}`;
        const result = isValidPispiQrPayload(mutated);
        expect(result.valid).toBe(false);
        expect(result.errors).toContain('Longueur invalide pour le tag 36.');
    });

    it('signale un segment tronqué', () => {
        const payload = basePayload();
        const index = payload.indexOf('36');
        const valueStart = index + 4;
        const truncated = payload.slice(0, valueStart + 10); // 10 < longueur attendue (56)
        const result = isValidPispiQrPayload(truncated);
        expect(result.valid).toBe(false);
        expect(result.errors).toContain('Segment 36 tronqué.');
    });

    it('rejette une payload vide', () => {
        const result = isValidPispiQrPayload('');
        expect(result.valid).toBe(false);
        expect(result.errors).toContain('La payload doit être une chaîne non vide.');
    });

    it('rejette une payload trop courte', () => {
        const result = isValidPispiQrPayload('000201');
        expect(result.valid).toBe(false);
        expect(result.errors).toContain('Payload trop courte pour contenir des segments EMV.');
    });

    it('retourne STATIC pour un merchant channel inconnu', () => {
        const entries = decodeSegmentEntries(basePayload());
        const additional = entries.find((entry) => entry.tag === '62');
        expect(additional).toBeDefined();
        const additionalEntries = decodeAdditional(additional!.value);
        const channel = additionalEntries.find((entry) => entry.tag === '11');
        expect(channel).toBeDefined();
        channel!.value = '999';
        additional!.value = encodeAdditional(additionalEntries);
        const mutated = rebuildPayload(entries);
        const result = isValidPispiQrPayload(mutated);
        expect(result.valid).toBe(true);
        expect(result.data?.qrType).toBe('STATIC');
    });

    it('retourne DYNAMIC pour un merchant channel 400', () => {
        const payload = buildPayloadString({
            alias: BASE_ALIAS,
            countryCode: BASE_COUNTRY,
            qrType: 'DYNAMIC',
            referenceLabel: REFERENCE_TX,
        });

        const result = isValidPispiQrPayload(payload);
        expect(result.valid).toBe(true);
        expect(result.data?.qrType).toBe('DYNAMIC');
    });
});

describe('generateQrCodeSvg', () => {
    it('génère un SVG avec le logo PI-SPI centré', async () => {
        const svg = await generateQrCodeSvg({
            alias: BASE_ALIAS,
            countryCode: BASE_COUNTRY,
            qrType: 'STATIC',
            referenceLabel: REFERENCE_CAISSE,
        });

        expect(svg).toContain('<svg');
        expect(svg).toContain('class="pispi-logo"');

        const imageMatch = /<image[^>]+href="([^"]+)"/.exec(svg);
        expect(imageMatch?.[1]).toBe(DEFAULT_PISPI_LOGO_DATA_URL);

        const xlinkMatch = /xlink:href="([^"]+)"/.exec(svg);
        expect(xlinkMatch?.[1]).toBe(DEFAULT_PISPI_LOGO_DATA_URL);
    });

    it('permet de générer un SVG sans logo', async () => {
        const svg = await generateQrCodeSvg(
            {
                alias: BASE_ALIAS,
                countryCode: BASE_COUNTRY,
                qrType: 'STATIC',
                referenceLabel: REFERENCE_CAISSE,
            },
            { logoDataUrl: '' }
        );

        expect(svg).toContain('<svg');
        expect(svg).not.toContain('class="pispi-logo"');
        expect(svg).not.toContain('data:image/png');
    });

    it('normalise les ratios invalides pour le logo', async () => {
        const svg = await generateQrCodeSvg(
            {
                alias: BASE_ALIAS,
                countryCode: BASE_COUNTRY,
                qrType: 'STATIC',
                referenceLabel: REFERENCE_CAISSE,
            },
            {
                logoSizeRatio: Number.NaN,
                logoPaddingRatio: Number.NaN,
                logoBorderRadiusRatio: Number.NaN,
            }
        );

        expect(svg).toContain('width="0"');
        expect(svg).toContain('height="0"');
    });
});

describe('generateQrCodeSvg mocked matrices', () => {
    afterEach(() => {
        vi.resetModules();
        vi.doUnmock('qrcode');
    });

    const input = {
        alias: BASE_ALIAS,
        countryCode: BASE_COUNTRY,
        qrType: 'STATIC' as const,
        referenceLabel: REFERENCE_CAISSE,
    };

    it('lève un TypeError lorsque la matrice est invalide', async () => {
        vi.resetModules();
        vi.doMock('qrcode', () => ({
            create: () => ({ modules: {} }),
        }));

        const module = await import('./index');
        await expect(module.generateQrCodeSvg(input)).rejects.toBeInstanceOf(TypeError);
    });

    it('génère un SVG avec une matrice basée sur get()', async () => {
        vi.resetModules();
        vi.doMock('qrcode', () => ({
            create: () => ({
                modules: {
                    size: 2,
                    get: (row: number, col: number) => row === col,
                },
            }),
        }));

        const module = await import('./index');
        const svg = await module.generateQrCodeSvg(input, { logoDataUrl: '' });
        expect(svg).toContain('<svg');
        expect(svg).toContain('<circle');
    });

    it('génère un SVG avec une matrice sous forme de tableau', async () => {
        vi.resetModules();
        vi.doMock('qrcode', () => ({
            create: () => ({
                modules: [
                    [1, 0],
                    [0, 1],
                ],
            }),
        }));

        const module = await import('./index');
        const svg = await module.generateQrCodeSvg(input, { logoDataUrl: '' });
        expect(svg).toContain('<svg');
        expect(svg).toContain('<circle');
    });

    it('génère un SVG avec une matrice à données linéaires', async () => {
        vi.resetModules();
        vi.doMock('qrcode', () => ({
            create: () => ({
                modules: {
                    size: 2,
                    data: [1, 0, 0, 1],
                },
            }),
        }));

        const module = await import('./index');
        const svg = await module.generateQrCodeSvg(input, { logoDataUrl: '' });
        expect(svg).toContain('<svg');
        expect(svg).toContain('<circle');
    });

    it('ignore les modules non reconnus', async () => {
        vi.resetModules();
        vi.doMock('qrcode', () => ({
            create: () => ({
                modules: {
                    size: 1,
                },
            }),
        }));

        const module = await import('./index');
        const svg = await module.generateQrCodeSvg(input, { logoDataUrl: '' });
        expect(svg).toContain('<svg');
    });

    it('accepte un module exporté via default', async () => {
        vi.resetModules();
        vi.doMock('qrcode', () => ({
            create: undefined,
            __esModule: true,
            default: {
                create: () => ({
                    modules: {
                        size: 1,
                        data: [1],
                    },
                }),
            },
        }));

        const module = await import('./index');
        const svg = await module.generateQrCodeSvg(input, { logoDataUrl: '' });
        expect(svg).toContain('<svg');
    });

    it('lève une erreur si le module qrcode est invalide', async () => {
        vi.resetModules();
        vi.doMock('qrcode', () => ({
            __esModule: true,
            create: undefined,
            default: {},
        }));

        const module = await import('./index');
        await expect(module.generateQrCodeSvg(input)).rejects.toThrow(
            'Le module "qrcode" n\'expose pas l\'API attendue.'
        );
    });
});
