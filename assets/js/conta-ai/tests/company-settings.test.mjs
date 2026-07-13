import assert from 'node:assert/strict';
import { createDefaultCompanyConfig, normalizeCompanyConfig } from '../models/company.model.js';
import { validateCompanyConfig } from '../validators/company.validator.js';
import { companyRepository, resetTemporaryCompanyRepository, simulateTemporaryCompanyRepositoryError } from '../data/repository.js';
import { renderCompanySettings } from '../modules/finances/company-settings/company-settings.controller.js';
import { renderFinanceView } from '../modules/finances/finances.module.js';

const validCompany = {
  tradeName: '  Tienda  Central  ',
  legalName: 'Tienda Central S.A.',
  taxId: '  3-101-123456  ',
  country: 'CR',
  currency: 'CRC',
  timezone: 'America/Costa_Rica',
  fiscalYearStartMonth: 1,
  accountingBasis: 'cash',
  email: 'hola@tienda.test',
  phone: '+506 8888-8888',
  address: 'San José'
};

assert.equal(validateCompanyConfig(validCompany).valid, true, 'configuración válida');
assert.equal(validateCompanyConfig({ ...validCompany, tradeName: '   ' }).errors.tradeName, 'El nombre comercial es obligatorio.');
assert.equal(validateCompanyConfig({ ...validCompany, country: '   ' }).errors.country, 'El país es obligatorio.');
assert.equal(validateCompanyConfig({ ...validCompany, currency: '' }).errors.currency, 'La moneda principal es obligatoria.');
assert.equal(validateCompanyConfig({ ...validCompany, fiscalYearStartMonth: 0 }).errors.fiscalYearStartMonth, 'El mes de inicio fiscal debe estar entre 1 y 12.');
assert.equal(validateCompanyConfig({ ...validCompany, fiscalYearStartMonth: 13 }).errors.fiscalYearStartMonth, 'El mes de inicio fiscal debe estar entre 1 y 12.');
assert.equal(validateCompanyConfig({ ...validCompany, accountingBasis: 'other' }).errors.accountingBasis, 'La base contable debe ser caja o acumulación.');
assert.equal(validateCompanyConfig({ ...validCompany, email: '' }).valid, true, 'correo vacío permitido');
assert.equal(validateCompanyConfig({ ...validCompany, email: 'correo-invalido' }).errors.email, 'Ingresa un correo electrónico válido.');
assert.equal(normalizeCompanyConfig(validCompany).tradeName, 'Tienda Central', 'normaliza espacios');

resetTemporaryCompanyRepository();
await companyRepository.saveCompany(validCompany);
assert.equal((await companyRepository.getCompany()).tradeName, 'Tienda Central', 'guardado y lectura en memoria');
simulateTemporaryCompanyRepositoryError(true);
await assert.rejects(() => companyRepository.getCompany(), /Repositorio temporal no disponible/, 'error simulado del repositorio');
resetTemporaryCompanyRepository();

const events = [];
const fakeRegion = { innerHTML: '' };
const fakeView = {
  renderCompanySettingsView: () => '<form></form>',
  bindCompanySettingsView: (region, handlers) => {
    events.push('bound');
    handlers.onReset();
  },
  fillCompanySettingsForm: (region, company) => { events.push(`reset:${company.country}:${company.currency}`); },
  showCompanyErrors: () => { events.push('errors-cleared'); },
  showCompanyStatus: (region, message) => { events.push(message); },
  showCompanyModuleError: (region) => { region.innerHTML = 'error'; }
};
await renderCompanySettings(fakeRegion, { repository: companyRepository, view: fakeView });
assert.ok(events.includes('reset:CR:CRC'), 'restablecimiento del formulario');

const failingRegion = { innerHTML: '' };
await renderCompanySettings(failingRegion, {
  repository: { getCompany: async () => { throw new Error('fallo controlado'); }, saveCompany: async () => null },
  view: { ...fakeView, showCompanyModuleError: (region) => { region.innerHTML = '<div>Error configuración</div>'; } }
});
assert.match(failingRegion.innerHTML, /Error configuración/, 'error de Configuración contenido');
const otherRegion = { innerHTML: '' };
renderFinanceView(otherRegion, 'dashboard');
assert.match(otherRegion.innerHTML, /Resumen de ContaAI Finanzas/, 'otra vista sigue renderizando');

assert.deepEqual(createDefaultCompanyConfig().country, 'CR');
console.log('Pruebas de Configuración de empresa completadas.');
