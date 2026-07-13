import { financeRoutes, moduleRoutes } from '../routes.js';

export function renderShell(root) {
  root.innerHTML = `
    <header class="site-header">
      <div class="container nav">
        <a class="logo" href="/">AX<span>ENTRAL</span></a>
        <ul class="nav-links">
          <li><a href="/">Inicio</a></li>
          <li><a href="/servicios-y-apps/">Servicios y Apps</a></li>
          <li><a class="active" href="/conta-ai/">Conta AI</a></li>
          <li><a href="/portal/">Portal</a></li>
          <li><a href="/contacto/">Contacto</a></li>
        </ul>
        <div class="nav-actions">
          <button class="theme-toggle" data-theme-toggle>☀️ Modo claro</button>
          <a class="btn btn-secondary" href="/portal/">Iniciar sesión</a>
        </div>
      </div>
    </header>

    <main>
      <section class="page-title">
        <div class="container">
          <span class="status progress">MVP Finanzas</span>
          <div class="eyebrow">ContaAI</div>
          <h1>ContaAI Finanzas</h1>
          <p>Shell modular inicial para organizar la futura aplicación financiera sin persistencia, cálculos reales ni datos sensibles en esta fase.</p>
          <div class="hero-actions">
            <a class="btn btn-secondary" href="/conta-ai/">Volver a ContaAI</a>
          </div>
        </div>
      </section>

      <section class="section">
        <div class="container">
          <div class="panel">
            <div class="eyebrow">Módulos ContaAI</div>
            <nav class="card-actions" data-module-nav aria-label="Módulos de ContaAI">${renderModuleNav()}</nav>
          </div>
        </div>
      </section>

      <section class="section">
        <div class="container detail-layout">
          <aside class="panel" aria-label="Navegación interna de Finanzas">
            <div class="eyebrow">Finanzas</div>
            <h2>Vistas del MVP</h2>
            <nav class="card-actions" data-finance-nav aria-label="Vistas de ContaAI Finanzas">${renderFinanceNav()}</nav>
          </aside>
          <section class="panel" data-view-region aria-live="polite" aria-label="Contenido de ContaAI Finanzas"></section>
        </div>
      </section>
    </main>

    <footer class="footer">
      <div class="container footer-grid"><strong>AXENTRAL</strong><span>ContaAI Finanzas · Shell MVP</span><a href="/contacto/">Contacto</a></div>
    </footer>
  `;
}

export function getViewRegion(root) {
  return root.querySelector('[data-view-region]');
}

export function setActiveRoute(root, activeHash) {
  root.querySelectorAll('[data-finance-route]').forEach((link) => {
    const isActive = link.dataset.financeRoute === activeHash;
    link.classList.toggle('btn-primary', isActive);
    link.classList.toggle('btn-secondary', !isActive);
    if (isActive) {
      link.setAttribute('aria-current', 'page');
    } else {
      link.removeAttribute('aria-current');
    }
  });
}

export function renderViewError(region, hash, error) {
  console.error(`[ContaAI Finanzas] Error renderizando vista "${hash}"`, error);
  region.innerHTML = `
    <div class="notice" role="alert">
      <strong>No se pudo cargar esta vista.</strong>
      <p class="muted">El shell y la navegación siguen disponibles. Intenta volver al Dashboard o revisar la consola para más detalles.</p>
      <div class="card-actions"><a class="btn btn-secondary" href="#dashboard">Volver al Dashboard</a></div>
    </div>
  `;
}

function renderModuleNav() {
  return moduleRoutes.map((module) => {
    const statusClass = module.available ? 'available' : 'soon';
    const label = `<span>${module.label}</span> <span class="status ${statusClass}">${module.status}</span>`;
    return module.available
      ? `<a class="btn btn-primary" href="${module.href}" aria-current="page">${label}</a>`
      : `<span class="btn btn-secondary" aria-disabled="true">${label}</span>`;
  }).join('');
}

function renderFinanceNav() {
  return financeRoutes.map((route) => (
    `<a class="btn btn-secondary" href="#${route.hash}" data-finance-route="${route.hash}">${route.label}</a>`
  )).join('');
}
