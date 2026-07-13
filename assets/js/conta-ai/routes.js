export const DEFAULT_ROUTE = 'dashboard';

export const financeRoutes = [
  { hash: 'dashboard', label: 'Dashboard' },
  { hash: 'configuracion', label: 'Configuración' },
  { hash: 'catalogos', label: 'Catálogos' },
  { hash: 'movimientos', label: 'Movimientos' },
  { hash: 'flujo-caja', label: 'Flujo de caja' },
  { hash: 'presupuesto', label: 'Presupuesto' },
  { hash: 'estados-financieros', label: 'Estados financieros' },
  { hash: 'indicadores', label: 'Indicadores' },
  { hash: 'reporte-ia', label: 'Reporte IA' }
];

export const moduleRoutes = [
  { label: 'Finanzas', status: 'Disponible', available: true, href: '/conta-ai/finanzas/' },
  { label: 'Ventas', status: 'Próximamente', available: false },
  { label: 'Compras', status: 'Próximamente', available: false },
  { label: 'Inventario', status: 'Próximamente', available: false },
  { label: 'IA', status: 'Próximamente', available: false }
];

export function getCurrentHash() {
  return window.location.hash.replace('#', '') || DEFAULT_ROUTE;
}

export function isKnownFinanceRoute(hash) {
  return financeRoutes.some((route) => route.hash === hash);
}
