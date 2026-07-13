import { createDefaultCompanyConfig } from '../../../models/company.model.js';
import { validateCompanyConfig } from '../../../validators/company.validator.js';
import { companyRepository } from '../../../data/repository.js';
import {
  bindCompanySettingsView,
  fillCompanySettingsForm,
  renderCompanySettingsView,
  showCompanyErrors,
  showCompanyModuleError,
  showCompanyStatus
} from './company-settings.view.js';

export async function renderCompanySettings(region, dependencies = {}) {
  const repository = dependencies.repository || companyRepository;
  const view = dependencies.view || {
    bindCompanySettingsView,
    fillCompanySettingsForm,
    renderCompanySettingsView,
    showCompanyErrors,
    showCompanyModuleError,
    showCompanyStatus
  };

  try {
    const savedCompany = await repository.getCompany();
    const initialCompany = savedCompany || createDefaultCompanyConfig();
    region.innerHTML = view.renderCompanySettingsView(initialCompany);

    view.bindCompanySettingsView(region, {
      onSave: async (formData) => {
        const result = validateCompanyConfig(formData);
        view.showCompanyErrors(region, result.errors);

        if (!result.valid) {
          view.showCompanyStatus(region, 'Revisa los campos marcados antes de guardar.', 'error');
          return;
        }

        try {
          const saved = await repository.saveCompany(result.value);
          view.fillCompanySettingsForm(region, saved);
          view.showCompanyStatus(region, 'Configuración guardada durante la sesión actual.', 'success');
        } catch (error) {
          console.error('[ContaAI Finanzas] No se pudo guardar Configuración de empresa', error);
          view.showCompanyStatus(region, 'No se pudo guardar la configuración temporal.', 'error');
        }
      },
      onReset: () => {
        const defaults = createDefaultCompanyConfig();
        view.fillCompanySettingsForm(region, defaults);
        view.showCompanyErrors(region, {});
        view.showCompanyStatus(region, 'Formulario restablecido a los valores iniciales sugeridos.', 'success');
      }
    });
  } catch (error) {
    view.showCompanyModuleError(region, error);
  }
}
