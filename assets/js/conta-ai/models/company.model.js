export const ACCOUNTING_BASES = ['cash', 'accrual'];

export const COUNTRY_OPTIONS = [
  { value: 'CR', label: 'Costa Rica' },
  { value: 'MX', label: 'México' },
  { value: 'CO', label: 'Colombia' },
  { value: 'PA', label: 'Panamá' },
  { value: 'GT', label: 'Guatemala' },
  { value: 'SV', label: 'El Salvador' },
  { value: 'HN', label: 'Honduras' },
  { value: 'NI', label: 'Nicaragua' },
  { value: 'DO', label: 'República Dominicana' },
  { value: 'OTHER', label: 'Otro' }
];

export const CURRENCY_OPTIONS = [
  { value: 'CRC', label: 'CRC — Colón costarricense' },
  { value: 'USD', label: 'USD — Dólar estadounidense' },
  { value: 'MXN', label: 'MXN — Peso mexicano' },
  { value: 'COP', label: 'COP — Peso colombiano' },
  { value: 'PAB', label: 'PAB — Balboa panameño' },
  { value: 'GTQ', label: 'GTQ — Quetzal guatemalteco' },
  { value: 'DOP', label: 'DOP — Peso dominicano' },
  { value: 'OTHER', label: 'Otro' }
];

export const TIMEZONE_OPTIONS = [
  { value: 'America/Costa_Rica', label: 'America/Costa_Rica' },
  { value: 'America/Mexico_City', label: 'America/Mexico_City' },
  { value: 'America/Bogota', label: 'America/Bogota' },
  { value: 'America/Panama', label: 'America/Panama' },
  { value: 'America/Guatemala', label: 'America/Guatemala' },
  { value: 'America/Santo_Domingo', label: 'America/Santo_Domingo' },
  { value: 'OTHER', label: 'Otro' }
];

export function createDefaultCompanyConfig() {
  return {
    tradeName: '',
    legalName: '',
    taxId: '',
    country: 'CR',
    currency: 'CRC',
    timezone: 'America/Costa_Rica',
    fiscalYearStartMonth: 1,
    accountingBasis: 'cash',
    email: '',
    phone: '',
    address: ''
  };
}

export function normalizeCompanyConfig(input = {}) {
  const defaults = createDefaultCompanyConfig();
  const normalized = { ...defaults, ...input };

  return {
    tradeName: normalizeText(normalized.tradeName),
    legalName: normalizeText(normalized.legalName),
    taxId: normalizeText(normalized.taxId),
    country: normalizeText(normalized.country) || defaults.country,
    currency: normalizeText(normalized.currency) || defaults.currency,
    timezone: normalizeText(normalized.timezone) || defaults.timezone,
    fiscalYearStartMonth: Number(normalized.fiscalYearStartMonth),
    accountingBasis: normalizeText(normalized.accountingBasis) || defaults.accountingBasis,
    email: normalizeText(normalized.email),
    phone: normalizeText(normalized.phone),
    address: normalizeText(normalized.address)
  };
}

function normalizeText(value) {
  return String(value ?? '').trim().replace(/\s+/g, ' ');
}
