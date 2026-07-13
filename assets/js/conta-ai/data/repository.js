import { normalizeCompanyConfig } from '../models/company.model.js';
import { assertCompanyRepositoryContract } from './repository.contract.js';

let sessionCompany = null;
let shouldFail = false;

export const companyRepository = {
  async getCompany() {
    if (shouldFail) throw new Error('Repositorio temporal no disponible.');
    return sessionCompany ? { ...sessionCompany } : null;
  },

  async saveCompany(company) {
    if (shouldFail) throw new Error('No se pudo guardar la configuración temporal.');
    sessionCompany = normalizeCompanyConfig(company);
    return { ...sessionCompany };
  }
};

assertCompanyRepositoryContract(companyRepository);

export function resetTemporaryCompanyRepository() {
  sessionCompany = null;
  shouldFail = false;
}

export function simulateTemporaryCompanyRepositoryError(enabled = true) {
  shouldFail = enabled;
}
