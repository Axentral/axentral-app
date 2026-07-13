export function renderDashboardView() {
  return `
    <div class="eyebrow">Dashboard</div>
    <h2>Resumen de ContaAI Finanzas</h2>
    <p class="muted">Vista inicial para reunir el estado de Configuración, Catálogos, Movimientos, Presupuesto, Flujo de caja, Estados financieros, Indicadores y Reporte IA.</p>
    <span class="status soon">Pendiente de implementación</span>
    <div class="notice">Esta fase solo muestra el shell modular. Todavía no guarda, calcula ni procesa información financiera.</div>
    <div class="grid two">
      <article class="card"><h3>Base de datos</h3><p>No hay persistencia financiera conectada en esta fase.</p></article>
      <article class="card"><h3>Cálculos</h3><p>No se muestran montos ni reportes reales hasta implementar la lógica financiera.</p></article>
      <article class="card"><h3>IA</h3><p>El reporte IA solo tendrá contexto preparado en una fase futura.</p></article>
      <article class="card"><h3>Aislamiento</h3><p>Cada vista se renderiza desde su propio módulo para reducir acoplamiento.</p></article>
    </div>
  `;
}
