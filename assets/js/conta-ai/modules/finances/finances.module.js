import { renderDashboardView } from './views/dashboard.view.js';
import { renderConfiguracionView } from './views/configuracion.view.js';
import { renderCatalogosView } from './views/catalogos.view.js';
import { renderMovimientosView } from './views/movimientos.view.js';
import { renderFlujoCajaView } from './views/flujo-caja.view.js';
import { renderPresupuestoView } from './views/presupuesto.view.js';
import { renderEstadosFinancierosView } from './views/estados-financieros.view.js';
import { renderIndicadoresView } from './views/indicadores.view.js';
import { renderReporteIaView } from './views/reporte-ia.view.js';

const views = {
  dashboard: renderDashboardView,
  configuracion: renderConfiguracionView,
  catalogos: renderCatalogosView,
  movimientos: renderMovimientosView,
  'flujo-caja': renderFlujoCajaView,
  presupuesto: renderPresupuestoView,
  'estados-financieros': renderEstadosFinancierosView,
  indicadores: renderIndicadoresView,
  'reporte-ia': renderReporteIaView
};

export function renderFinanceView(region, hash) {
  const render = views[hash];

  if (!render) {
    region.innerHTML = `
      <div class="notice" role="alert">
        <strong>Vista no encontrada.</strong>
        <p class="muted">La ruta solicitada no existe en el MVP de ContaAI Finanzas. Puedes volver al Dashboard de forma segura.</p>
        <div class="card-actions"><a class="btn btn-secondary" href="#dashboard">Volver al Dashboard</a></div>
      </div>
    `;
    return;
  }

  region.innerHTML = render();
}
