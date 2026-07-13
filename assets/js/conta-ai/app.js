import { renderShell, getViewRegion, setActiveRoute, renderViewError } from './ui/shell.js';
import { DEFAULT_ROUTE, getCurrentHash, isKnownFinanceRoute } from './routes.js';
import { renderFinanceView } from './modules/finances/finances.module.js';

const root = document.querySelector('[data-conta-ai-app]');

if (!root) {
  throw new Error('No se encontró el contenedor de ContaAI Finanzas.');
}

renderShell(root);
window.AxentralTheme?.init(root);

const region = getViewRegion(root);

function navigate() {
  const hash = getCurrentHash();

  if (!window.location.hash) {
    window.history.replaceState(null, '', `#${DEFAULT_ROUTE}`);
  }

  const route = isKnownFinanceRoute(hash) ? hash : DEFAULT_ROUTE;
  setActiveRoute(root, route);

  try {
    renderFinanceView(region, hash);
  } catch (error) {
    renderViewError(region, hash, error);
  }
}

window.addEventListener('hashchange', navigate);
navigate();
