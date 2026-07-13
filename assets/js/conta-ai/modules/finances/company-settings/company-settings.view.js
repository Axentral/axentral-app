import { COUNTRY_OPTIONS, CURRENCY_OPTIONS, TIMEZONE_OPTIONS } from '../../../models/company.model.js';

const MONTHS = [
  ['1', 'Enero'], ['2', 'Febrero'], ['3', 'Marzo'], ['4', 'Abril'],
  ['5', 'Mayo'], ['6', 'Junio'], ['7', 'Julio'], ['8', 'Agosto'],
  ['9', 'Septiembre'], ['10', 'Octubre'], ['11', 'Noviembre'], ['12', 'Diciembre']
];

export function renderCompanySettingsView(company) {
  return `
    <div class="eyebrow">Configuración</div>
    <h2>Configuración de empresa</h2>
    <p class="muted">Define los datos base que usará ContaAI Finanzas en próximas fases. Esta pantalla todavía no activa cálculos, catálogos ni movimientos.</p>
    <div class="notice" data-company-persistence-notice>La configuración se conserva solo durante la sesión actual del navegador. Si recargas la página, puede perderse.</div>
    <div class="notice" data-company-status role="status" hidden></div>
    <form data-company-form novalidate>
      <div class="grid two">
        ${field('tradeName', 'Nombre comercial', 'text', company.tradeName, true)}
        ${field('legalName', 'Razón social', 'text', company.legalName)}
        ${field('taxId', 'Identificación fiscal', 'text', company.taxId)}
        ${selectField('country', 'País', company.country, COUNTRY_OPTIONS, true)}
        ${selectField('currency', 'Moneda principal', company.currency, CURRENCY_OPTIONS, true)}
        ${selectField('timezone', 'Zona horaria', company.timezone, TIMEZONE_OPTIONS)}
        ${selectField('fiscalYearStartMonth', 'Mes de inicio del periodo fiscal', String(company.fiscalYearStartMonth), MONTHS.map(([value,label]) => ({ value, label })), true)}
      </div>

      <div class="panel">
        <h3>Base contable</h3>
        <p class="muted">Esta elección se guardará como referencia. Los cálculos diferenciados se implementarán en fases posteriores.</p>
        <label><input type="radio" name="accountingBasis" value="cash" ${company.accountingBasis === 'cash' ? 'checked' : ''}> Caja — registra cuando entra o sale dinero.</label>
        <label><input type="radio" name="accountingBasis" value="accrual" ${company.accountingBasis === 'accrual' ? 'checked' : ''}> Acumulación — registra cuando nace el derecho u obligación.</label>
        <p class="muted" data-error-for="accountingBasis"></p>
      </div>

      <div class="grid two">
        ${field('email', 'Correo', 'email', company.email)}
        ${field('phone', 'Teléfono', 'tel', company.phone)}
      </div>

      <div class="panel">
        <label for="company-address">Dirección</label>
        <textarea id="company-address" name="address" rows="3">${escapeHtml(company.address)}</textarea>
        <p class="muted" data-error-for="address"></p>
      </div>

      <div class="notice">Logo de empresa: próximamente. Esta fase no almacena archivos ni imágenes.</div>

      <div class="card-actions">
        <button class="btn btn-primary" type="submit">Guardar configuración</button>
        <button class="btn btn-secondary" type="button" data-reset-company-form>Restablecer formulario</button>
      </div>
    </form>
  `;
}

export function bindCompanySettingsView(region, handlers) {
  const form = region.querySelector('[data-company-form]');
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    handlers.onSave(readCompanyForm(form));
  });
  region.querySelector('[data-reset-company-form]').addEventListener('click', handlers.onReset);
}

export function fillCompanySettingsForm(region, company) {
  const form = region.querySelector('[data-company-form]');
  Object.entries(company).forEach(([name, value]) => {
    const field = form.elements[name];
    if (!field) return;
    if (field instanceof RadioNodeList) {
      [...field].forEach((radio) => { radio.checked = radio.value === String(value); });
    } else {
      field.value = value;
    }
  });
}

export function showCompanyErrors(region, errors) {
  region.querySelectorAll('[data-error-for]').forEach((node) => { node.textContent = ''; });
  Object.entries(errors).forEach(([fieldName, message]) => {
    const errorNode = region.querySelector(`[data-error-for="${fieldName}"]`);
    if (errorNode) errorNode.textContent = message;
  });
}

export function showCompanyStatus(region, message, type = 'success') {
  const status = region.querySelector('[data-company-status]');
  status.hidden = false;
  status.textContent = message;
  status.dataset.status = type;
}

export function showCompanyModuleError(region, error) {
  console.error('[ContaAI Finanzas] Error en Configuración de empresa', error);
  region.innerHTML = `<div class="notice" role="alert"><strong>No se pudo cargar Configuración de empresa.</strong><p class="muted">La navegación general sigue disponible. Puedes cambiar a otra vista y volver a intentarlo.</p></div>`;
}

function readCompanyForm(form) {
  return Object.fromEntries(new FormData(form).entries());
}

function field(name, label, type, value, required = false) {
  const id = `company-${name}`;
  return `<div class="panel"><label for="${id}">${label}</label><input id="${id}" name="${name}" type="${type}" value="${escapeHtml(value)}" ${required ? 'required' : ''}><p class="muted" data-error-for="${name}"></p></div>`;
}

function selectField(name, label, value, options, required = false) {
  const id = `company-${name}`;
  return `<div class="panel"><label for="${id}">${label}</label><select id="${id}" name="${name}" ${required ? 'required' : ''}>${options.map((option) => `<option value="${escapeHtml(option.value)}" ${String(option.value) === String(value) ? 'selected' : ''}>${escapeHtml(option.label)}</option>`).join('')}</select><p class="muted" data-error-for="${name}"></p></div>`;
}

function escapeHtml(value) {
  return String(value ?? '').replace(/[&<>"]/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[char]));
}
