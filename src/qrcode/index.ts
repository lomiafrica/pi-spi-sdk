export { DEFAULT_PISPI_LOGO_DATA_URL, PISPI_AMBER_LOGO_DATA_URL, PISPI_QRCODE_LOGO_DATA_URL } from './logo';
import { DEFAULT_PISPI_LOGO_DATA_URL } from './logo';

export type QrType = 'STATIC' | 'DYNAMIC';

export interface QrPayloadInput {
    alias: string;
    countryCode: string;
    qrType: QrType;
    referenceLabel: string;
    amount?: number | string;
}

export interface AdditionalDataOverrides {
    merchantChannel?: string;
    purposeOfTransaction?: string;
    /**
     * Free form additional data embedded inside template 62 (id => value)
     * Keys must be 2-digit strings according to EMV specification.
     */
    custom?: Record<string, string>;
}

export interface QrPayloadOptions {
    /**
     * Override default Additional Data tags.
     */
    additionalData?: AdditionalDataOverrides;
}

export interface QrPayloadResult {
    payload: string;
}

export interface QrValidationResult {
    valid: boolean;
    errors: string[];
    data?: QrPayloadInput;
}

export interface QrCodeSvgOptions {
    size?: number;
    margin?: number;
    logoDataUrl?: string;
    logoSizeRatio?: number;
    logoPaddingRatio?: number;
    logoBackgroundColor?: string;
    logoBorderRadiusRatio?: number;
    dotColor?: string;
    backgroundColor?: string;
}

type QRCodeModule = typeof import('qrcode');

let cachedQrCodeModule: QRCodeModule | null = null;

function resolveQrCodeModule(module: any): QRCodeModule {
    if (module?.create) {
        return module;
    }
    if (module?.default?.create) {
        return module.default;
    }
    throw new Error('Le module "qrcode" n\'expose pas l\'API attendue.');
}

async function getQrCodeModule(): Promise<QRCodeModule> {
    if (cachedQrCodeModule) {
        return cachedQrCodeModule;
    }

    // Dans le navigateur, utiliser QRCode global si disponible (depuis qrcode/build/qrcode.min.js)
    // @ts-ignore
    if (typeof window !== 'undefined' && window.QRCode) {
        // @ts-ignore
        const resolved = resolveQrCodeModule(window.QRCode);
        cachedQrCodeModule = resolved;
        return resolved;
    }

    // Dans Node.js ou si QRCode global n'est pas disponible, utiliser l'import dynamique
    const module = await import('qrcode');
    const resolved = resolveQrCodeModule(module);
    cachedQrCodeModule = resolved;
    return resolved;
}

const DEFAULT_MERCHANT_CATEGORY_CODE = '0000';
const DEFAULT_CURRENCY = '952'; // XOF
const DEFAULT_MERCHANT_NAME = 'X';
const DEFAULT_MERCHANT_CITY = 'X';
const DEFAULT_REFERENCE_LABEL_TAG = '05';
const DEFAULT_MERCHANT_CHANNEL_TAG = '11';
const DEFAULT_LOGO_SIZE_RATIO = 0.18;
const DEFAULT_LOGO_PADDING_RATIO = 0;
const DEFAULT_LOGO_BORDER_RADIUS_RATIO = 0.5;
const DEFAULT_MARGIN = 0;
const DEFAULT_SVG_SIZE = 400;
const DEFAULT_DOT_COLOR = '#1A1A1A';
const DEFAULT_BACKGROUND_COLOR = '#FFFFFF';
const DOT_RADIUS_RATIO = 0.44;
const FINDER_CORNER_RADIUS = 0.8;

/**
 * Génère la payload EMV conforme PI-SPI pour un QR Code.
 */
export function createQrPayload(
    input: QrPayloadInput,
    options: QrPayloadOptions = {}
): QrPayloadResult {
    const {
        alias,
        amount,
        countryCode,
        qrType,
        referenceLabel,
    } = input;

    if (!alias) {
        throw new Error('Le paramètre "alias" est obligatoire.');
    }
    validateAlias(alias);
    if (!countryCode) {
        throw new Error('Le paramètre "countryCode" est obligatoire.');
    }
    validateCountryCode(countryCode);
    if (!qrType) {
        throw new Error('Le paramètre "qrType" est obligatoire.');
    }
    if (!referenceLabel) {
        throw new Error('Le paramètre "referenceLabel" est obligatoire.');
    }
    validateReferenceLabel(referenceLabel);
    if (amount !== undefined && amount !== null && amount !== '') {
        validateAmount(amount);
    }

    const payloadSegments: string[] = [];

    payloadSegments.push(formatDataObject('00', '01'));

    const merchantAccountInformation = [
        formatDataObject('00', 'int.bceao.pi'),
        formatDataObject('01', alias),
    ].join('');

    payloadSegments.push(
        formatDataObject('36', merchantAccountInformation),
        formatDataObject('52', DEFAULT_MERCHANT_CATEGORY_CODE),
        formatDataObject('53', DEFAULT_CURRENCY)
    );

    if (amount !== undefined && amount !== null && amount !== '') {
        payloadSegments.push(
            formatDataObject('54', sanitizeAmount(amount))
        );
    }

    payloadSegments.push(
        formatDataObject('58', countryCode),
        formatDataObject('59', DEFAULT_MERCHANT_NAME),
        formatDataObject('60', DEFAULT_MERCHANT_CITY)
    );

    const normalizedQrType = normalizeQrType(qrType);
    const additionalData = buildAdditionalData(
        normalizedQrType,
        referenceLabel,
        options.additionalData
    );
    if (additionalData) {
        payloadSegments.push(formatDataObject('62', additionalData));
    }

    const payloadWithoutCrc = payloadSegments.join('');
    const crcInput = `${payloadWithoutCrc}6304`;
    const crc = computeCrc16(crcInput);

    return { payload: `${payloadWithoutCrc}6304${crc}` };
}

function buildAdditionalData(
    qrType: QrType,
    referenceLabel: string,
    overrides?: AdditionalDataOverrides
): string | null {
    const segments: string[] = [];

    const referenceLabelTag = formatDataObject(
        DEFAULT_REFERENCE_LABEL_TAG,
        referenceLabel
    );
    segments.push(referenceLabelTag);

    const merchantChannelValue = mapMerchantChannelFromType(qrType);
    segments.push(
        formatDataObject(DEFAULT_MERCHANT_CHANNEL_TAG, merchantChannelValue)
    );

    if (overrides?.purposeOfTransaction) {
        segments.push(formatDataObject('12', overrides.purposeOfTransaction));
    }

    if (overrides?.custom) {
        const entries = Object.entries(overrides.custom).sort(([a], [b]) =>
            a.localeCompare(b)
        );
        for (const [tag, value] of entries) {
            validateSubTag(tag);
            segments.push(formatDataObject(tag, value));
        }
    }

    return segments.join('');
}

function mapMerchantChannelFromType(value: QrType): string {
    return value === 'DYNAMIC' ? '400' : '000';
}

function mapQrTypeFromChannel(channel: string | undefined): QrType {
    const normalized = channel?.trim().toUpperCase();
    if (normalized === '400') {
        return 'DYNAMIC';
    }

    return 'STATIC';
}

function formatDataObject(id: string, value: string): string {
    const length = value.length.toString().padStart(2, '0');
    return `${id}${length}${value}`;
}

function sanitizeAmount(value: string | number): string {
    return typeof value === 'number' ? value.toString() : value.trim();
}

function validateSubTag(tag: string): void {
    if (!/^[0-9A-Za-z]{2}$/.test(tag)) {
        throw new Error(
            `Le sous-tag additional data "${tag}" doit contenir exactement 2 caractères alphanumériques.`
        );
    }
}

function validateAlias(alias: string): void {
    const uuidV4Regex = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    if (!uuidV4Regex.test(alias)) {
        throw new Error('L\'alias doit être un UUID v4 valide.');
    }
}

function validateReferenceLabel(reference: string): void {
    if (reference.length > 25) {
        throw new Error('Le referenceLabel ne doit pas dépasser 25 caractères.');
    }
}

function normalizeQrType(type: string): QrType {
    const normalized = type.trim().toUpperCase();
    if (normalized === 'STATIC' || normalized === 'DYNAMIC') {
        return normalized;
    }
    throw new Error('Le paramètre "qrType" doit être "STATIC" ou "DYNAMIC".');
}

const UEMOA_COUNTRIES = new Set(['BJ', 'BF', 'CI', 'ML', 'NE', 'SN', 'TG', 'GW']);

function validateCountryCode(code: string): void {
    if (!UEMOA_COUNTRIES.has(code.toUpperCase())) {
        throw new Error("Le countryCode doit être l'un des codes ISO2 de l'UEMOA (BJ, BF, CI, ML, NE, SN, TG, GW).");
    }
}

function validateAmount(amount: string | number): void {
    const normalized = typeof amount === 'number' ? amount.toString() : amount.trim();
    if (!/^\d+$/.test(normalized)) {
        throw new Error('Le montant doit contenir uniquement des chiffres.');
    }
    if (normalized.length > 13) {
        throw new Error('Le montant ne doit pas dépasser 13 chiffres.');
    }
}

export function computeCrc16(input: string): string {
    let crc = 0xffff;
    const polynomial = 0x1021;

    for (let i = 0; i < input.length; i += 1) {
        crc ^= (input.codePointAt(i) ?? 0) << 8;
        for (let j = 0; j < 8; j += 1) {
            const hasHighBit = (crc & 0x8000) === 0;
            crc = hasHighBit ? crc << 1 : (crc << 1) ^ polynomial;
            crc &= 0xffff;
        }
    }

    return crc.toString(16).toUpperCase().padStart(4, '0');
}

export function buildPayloadString(params: QrPayloadInput, options?: QrPayloadOptions): string {
    return createQrPayload(params, options).payload;
}

export async function generateQrCodeSvg(
    input: QrPayloadInput,
    options: QrCodeSvgOptions = {}
): Promise<string> {
    const { payload } = createQrPayload(input);
    const size = options.size ?? DEFAULT_SVG_SIZE;
    const margin = options.margin ?? DEFAULT_MARGIN;
    const module = await getQrCodeModule();
    const qr = module.create(payload, {
        errorCorrectionLevel: 'M',
    });

    const dotColor = options.dotColor ?? DEFAULT_DOT_COLOR;
    const backgroundColor = options.backgroundColor ?? DEFAULT_BACKGROUND_COLOR;

    return buildDotPatternSvg(qr, {
        size,
        margin,
        dotColor,
        backgroundColor,
        logo: {
            dataUrl: options.logoDataUrl ?? DEFAULT_PISPI_LOGO_DATA_URL,
            sizeRatio: options.logoSizeRatio ?? DEFAULT_LOGO_SIZE_RATIO,
            paddingRatio: options.logoPaddingRatio ?? DEFAULT_LOGO_PADDING_RATIO,
            borderRadiusRatio: options.logoBorderRadiusRatio ?? DEFAULT_LOGO_BORDER_RADIUS_RATIO,
            backgroundColor: options.logoBackgroundColor ?? DEFAULT_BACKGROUND_COLOR,
        },
    });
}

function clamp(value: number, min: number, max: number): number {
    return Math.min(Math.max(value, min), max);
}

function formatSvgNumber(value: number): string {
    const normalized = Number.parseFloat(value.toFixed(3));
    if (Number.isNaN(normalized)) {
        return '0';
    }
    return normalized.toString();
}

export const QRCode = {
    // Original methods
    createQrPayload,
    buildPayloadString,
    computeCrc16,
    generateQrCodeSvg,
    isValidPispiQrPayload,

    // Simplified aliases
    payload: buildPayloadString,
    svg: generateQrCodeSvg,
    validate: isValidPispiQrPayload,
    raw: createQrPayload, // For when you need the object wrapper
};


export function isValidPispiQrPayload(value: string): QrValidationResult {
    const basicErrors = validatePayloadBasics(value);
    if (basicErrors.length > 0) {
        return { valid: false, errors: basicErrors };
    }

    const { segments, errors: parseErrors } = parseEmvSegments(value);
    if (parseErrors.length > 0) {
        return { valid: false, errors: parseErrors };
    }

    const segmentValidation = validateSegmentContent(segments, value);
    if (segmentValidation.errors.length > 0) {
        return { valid: false, errors: segmentValidation.errors };
    }

    const data = buildValidationData(segments, segmentValidation);

    return {
        valid: true,
        errors: [],
        data,
    };
}

interface SegmentValidationResult {
    errors: string[];
    merchantInfo: Record<string, string> | null;
    referenceLabel?: string;
    merchantChannel?: string;
    countryCode?: string;
}

function validatePayloadBasics(value: string): string[] {
    if (!value) {
        return ['La payload doit être une chaîne non vide.'];
    }

    if (value.length < 12) {
        return ['Payload trop courte pour contenir des segments EMV.'];
    }

    return [];
}

function parseEmvSegments(value: string): { segments: Record<string, string>; errors: string[] } {
    const segments: Record<string, string> = {};
    const errors: string[] = [];
    let cursor = 0;

    try {
        while (cursor < value.length) {
            const tag = value.slice(cursor, cursor + 2);
            const lengthStr = value.slice(cursor + 2, cursor + 4);
            const length = Number.parseInt(lengthStr, 10);

            if (Number.isNaN(length) || length < 0) {
                errors.push(`Longueur invalide pour le tag ${tag}.`);
                break;
            }

            const valueStart = cursor + 4;
            const valueEnd = valueStart + length;

            if (valueEnd > value.length) {
                errors.push(`Segment ${tag} tronqué.`);
                break;
            }

            segments[tag] = value.slice(valueStart, valueEnd);
            cursor = valueEnd;
        }
    } catch (error: any) {
        errors.push(`Erreur lors de l'analyse de la payload: ${error?.message ?? error}`);
    }

    return { segments, errors };
}

function validateSegmentContent(
    segments: Record<string, string>,
    rawValue: string
): SegmentValidationResult {
    const errors: string[] = [];

    const formatErrors = validateFormatIndicator(segments['00']);
    const merchantInfoResult = extractMerchantInfo(segments['36']);
    const countryCodeResult = validateCountryCodeSegment(segments['58']);
    const additionalDataResult = extractAdditionalData(segments['62']);
    const crcErrors = validateCrcSegment(segments['63'], rawValue);

    errors.push(
        ...formatErrors,
        ...merchantInfoResult.errors,
        ...countryCodeResult.errors,
        ...additionalDataResult.errors,
        ...crcErrors
    );

    return {
        errors,
        merchantInfo: merchantInfoResult.merchantInfo,
        referenceLabel: additionalDataResult.referenceLabel,
        merchantChannel: additionalDataResult.merchantChannel,
        countryCode: countryCodeResult.countryCode,
    };
}

function validateFormatIndicator(formatIndicator: string | undefined): string[] {
    if (!formatIndicator) {
        return ['Tag 00 (format indicator) manquant.'];
    }

    if (formatIndicator !== '01') {
        return ['Tag 00 invalide (doit être 01).'];
    }

    return [];
}

function extractMerchantInfo(segment: string | undefined): {
    merchantInfo: Record<string, string> | null;
    errors: string[];
} {
    if (!segment) {
        return {
            merchantInfo: null,
            errors: ['Tag 36 (Merchant Account Information) manquant.'],
        };
    }

    try {
        const merchantInfo = parseSubFields(segment);
        const errors: string[] = [];

        if (!merchantInfo['01']) {
            errors.push('Alias manquant dans les informations marchand (tag 36).');
        }

        return { merchantInfo, errors };
    } catch (error: any) {
        return {
            merchantInfo: null,
            errors: [`Erreur lors de l'analyse des informations marchand: ${error?.message ?? error}`],
        };
    }
}

function validateCountryCodeSegment(countryCode: string | undefined): {
    countryCode?: string;
    errors: string[];
} {
    if (!countryCode) {
        return {
            errors: ['Tag 58 (Country Code) manquant.'],
        };
    }

    return {
        countryCode,
        errors: [],
    };
}

function extractAdditionalData(segment: string | undefined): {
    referenceLabel?: string;
    merchantChannel?: string;
    errors: string[];
} {
    if (!segment) {
        return {
            errors: ['Tag 62 (Additional Data Field) manquant.'],
        };
    }

    try {
        const additionalSegments = parseSubFields(segment);
        const referenceLabel = additionalSegments['05'];
        const merchantChannel = additionalSegments[DEFAULT_MERCHANT_CHANNEL_TAG];
        const errors: string[] = [];

        if (!referenceLabel) {
            errors.push('Tag 05 (Reference Label) manquant dans les données additionnelles.');
        }

        if (!merchantChannel) {
            errors.push('Tag 11 (Merchant Channel) manquant dans les données additionnelles.');
        }

        return {
            referenceLabel,
            merchantChannel,
            errors,
        };
    } catch (error: any) {
        return {
            errors: [`Erreur lors de l'analyse des données additionnelles: ${error?.message ?? error}`],
        };
    }
}

function validateCrcSegment(crc: string | undefined, rawValue: string): string[] {
    if (!crc) {
        return ['Tag 63 (CRC) manquant.'];
    }

    const payloadWithoutCrc = rawValue.slice(0, -4);
    const computedCrc = computeCrc16(payloadWithoutCrc);

    if (crc !== computedCrc) {
        return ['CRC invalide.'];
    }

    return [];
}

function buildValidationData(
    segments: Record<string, string>,
    context: SegmentValidationResult
): QrPayloadInput {
    const amountValue = segments['54'];
    const data: QrPayloadInput = {
        alias: context.merchantInfo?.['01'] ?? '',
        countryCode: context.countryCode ?? '',
        qrType: mapQrTypeFromChannel(context.merchantChannel),
        referenceLabel: context.referenceLabel ?? '',
    };

    if (amountValue !== undefined) {
        data.amount = amountValue;
    }

    return data;
}

function parseSubFields(data: string): Record<string, string> {
    const segments: Record<string, string> = {};
    let cursor = 0;

    while (cursor < data.length) {
        const tag = data.slice(cursor, cursor + 2);
        const lengthStr = data.slice(cursor + 2, cursor + 4);
        const length = Number.parseInt(lengthStr, 10);

        if (Number.isNaN(length) || length < 0) {
            throw new Error(`Longueur invalide pour le sous-tag ${tag}`);
        }

        const valueStart = cursor + 4;
        const valueEnd = valueStart + length;
        if (valueEnd > data.length) {
            throw new Error(`Sous-segment ${tag} tronqué`);
        }

        const segmentValue = data.slice(valueStart, valueEnd);
        segments[tag] = segmentValue;
        cursor = valueEnd;
    }

    return segments;
}

function buildDotPatternSvg(
    qr: { modules: any },
    options: {
        size: number;
        margin: number;
        dotColor: string;
        backgroundColor: string;
        logo: {
            dataUrl: string;
            sizeRatio: number;
            paddingRatio: number;
            borderRadiusRatio: number;
            backgroundColor: string;
        };
    }
): string {
    const modules = qr.modules;
    const moduleCount: number = typeof modules?.size === 'number' ? modules.size : modules.length;

    if (typeof moduleCount !== 'number' || Number.isNaN(moduleCount)) {
        throw new TypeError('Format du QR Code inattendu: impossible de déterminer la taille de la matrice.');
    }

    const svgSize = options.size;
    const margin = options.margin;
    const drawableSize = svgSize - margin * 2;
    const cellSize = drawableSize / moduleCount;

    const dotRadius = cellSize * DOT_RADIUS_RATIO;
    const finderRadius = cellSize * FINDER_CORNER_RADIUS;

    const paths: string[] = [];
    const backgroundRect = `<rect fill="${options.backgroundColor}" width="${svgSize}" height="${svgSize}" rx="${formatSvgNumber(
        finderRadius
    )}" />`;

    for (let row = 0; row < moduleCount; row += 1) {
        for (let col = 0; col < moduleCount; col += 1) {
            if (!isDarkModule(modules, moduleCount, row, col)) {
                continue;
            }

            const x = margin + col * cellSize + cellSize / 2;
            const y = margin + row * cellSize + cellSize / 2;

            if (isFinderPattern(moduleCount, row, col)) {
                paths.push(
                    generateFinderPatternPath(
                        x,
                        y,
                        cellSize,
                        finderRadius,
                        options.dotColor
                    )
                );
            } else {
                paths.push(
                    `<circle cx="${formatSvgNumber(x)}" cy="${formatSvgNumber(y)}" r="${formatSvgNumber(
                        dotRadius
                    )}" fill="${options.dotColor}" />`
                );
            }
        }
    }

    const logoSvg = generateLogoOverlay(
        svgSize,
        margin,
        moduleCount,
        cellSize,
        options.logo
    );

    return [
        `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 ${svgSize} ${svgSize}" shape-rendering="geometricPrecision">`,
        backgroundRect,
        ...paths,
        logoSvg,
        '</svg>',
    ].join('');
}

function isFinderPattern(moduleCount: number, row: number, col: number): boolean {
    const patternSize = 7;
    const inTop = row < patternSize;
    const inBottom = row >= moduleCount - patternSize;
    const inLeft = col < patternSize;
    const inRight = col >= moduleCount - patternSize;

    return (inTop && inLeft) || (inTop && inRight) || (inBottom && inLeft);
}

function generateFinderPatternPath(
    x: number,
    y: number,
    cellSize: number,
    radius: number,
    color: string
): string {
    const centerX = formatSvgNumber(x);
    const centerY = formatSvgNumber(y);
    const radiusSvg = formatSvgNumber(radius);

    return `<circle cx="${centerX}" cy="${centerY}" r="${radiusSvg}" fill="${color}" />`;
}

function generateLogoOverlay(
    svgSize: number,
    margin: number,
    moduleCount: number,
    cellSize: number,
    logo: {
        dataUrl: string;
        sizeRatio: number;
        paddingRatio: number;
        borderRadiusRatio: number;
        backgroundColor: string;
    }
): string {
    if (!logo.dataUrl) {
        return '';
    }

    const qrDrawableSize = moduleCount * cellSize;
    const logoSize = qrDrawableSize * clamp(logo.sizeRatio, 0.05, 0.5);
    const logoPadding = logoSize * clamp(logo.paddingRatio, 0, 0.25);
    const backgroundSize = logoSize + logoPadding * 2;
    const logoBorderRadius = clamp(logo.borderRadiusRatio, 0, 0.5) * backgroundSize;

    const originX = margin + (qrDrawableSize - backgroundSize) / 2;
    const originY = margin + (qrDrawableSize - backgroundSize) / 2;

    return [
        `<g class="pispi-logo" transform="translate(${formatSvgNumber(originX)}, ${formatSvgNumber(originY)})" pointer-events="none">`,
        `<rect width="${formatSvgNumber(backgroundSize)}" height="${formatSvgNumber(backgroundSize)}" rx="${formatSvgNumber(
            logoBorderRadius
        )}" fill="${logo.backgroundColor}" opacity="0.95"/>`,
        `<image x="${formatSvgNumber(logoPadding)}" y="${formatSvgNumber(logoPadding)}" width="${formatSvgNumber(
            logoSize
        )}" height="${formatSvgNumber(logoSize)}" href="${logo.dataUrl}" xlink:href="${logo.dataUrl}" preserveAspectRatio="xMidYMid meet"/>`,
        '</g>',
    ].join('');
}

function isDarkModule(modules: any, moduleCount: number, row: number, col: number): boolean {
    if (modules?.data && Array.isArray(modules.data)) {
        const index = row * moduleCount + col;
        return Boolean(modules.data[index]);
    }

    if (typeof modules?.get === 'function') {
        return Boolean(modules.get(row, col));
    }

    if (Array.isArray(modules[row])) {
        return Boolean(modules[row][col]);
    }

    return false;
}
