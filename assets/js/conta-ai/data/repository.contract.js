export const COMPANY_REPOSITORY_METHODS = ['getCompany', 'saveCompany'];

export function assertCompanyRepositoryContract(repository) {
  COMPANY_REPOSITORY_METHODS.forEach((method) => {
    if (typeof repository?.[method] !== 'function') {
      throw new Error(`El repositorio de empresa debe implementar ${method}().`);
    }
  });
}
