import { ACCOUNTING_BASES, normalizeCompanyConfig } from '../models/company.model.js';

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_PATTERN = /^[+()\d\s.-]{7,25}$/;

export function validateCompanyConfig(input) {
  const raw = input || {};
  const company = normalizeCompanyConfig(raw);
  const errors = {};
  const rawCountry = String(raw.country ?? '').trim();
  const rawCurrency = String(raw.currency ?? '').trim();

  if (!company.tradeName) {
    errors.tradeName = 'El nombre comercial es obligatorio.';
  }

  if (!rawCountry) {
    errors.country = 'El país es obligatorio.';
  }

  if (!rawCurrency) {
    errors.currency = 'La moneda principal es obligatoria.';
  }

  if (!Number.isInteger(company.fiscalYearStartMonth) || company.fiscalYearStartMonth < 1 || company.fiscalYearStartMonth > 12) {
    errors.fiscalYearStartMonth = 'El mes de inicio fiscal debe estar entre 1 y 12.';
  }

  if (!ACCOUNTING_BASES.includes(company.accountingBasis)) {
    errors.accountingBasis = 'La base contable debe ser caja o acumulación.';
  }

  if (company.email && !EMAIL_PATTERN.test(company.email)) {
    errors.email = 'Ingresa un correo electrónico válido.';
  }

  if (company.phone && !PHONE_PATTERN.test(company.phone)) {
    errors.phone = 'Ingresa un teléfono válido con números, espacios o símbolos básicos.';
  }

  if (company.taxId && (company.taxId.length < 4 || company.taxId.length > 30)) {
    errors.taxId = 'La identificación fiscal debe tener entre 4 y 30 caracteres.';
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
    value: company
  };
}
