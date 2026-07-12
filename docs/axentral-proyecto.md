# Axentral — Documento general del proyecto

## 1. Resumen ejecutivo

Axentral es una plataforma financiera y contable para emprendedores, personas y PyMES de Latinoamérica. La visión es reunir en un mismo ecosistema plantillas Excel, apps financieras, Conta AI, un portal privado de clientes y recursos gratuitos para ayudar a los usuarios a ordenar, calcular, comprar, pagar y tomar mejores decisiones.

El proyecto ya evolucionó de una landing estática a una estructura multi-página con assets compartidos, modo claro/oscuro, catálogo inicial, páginas individuales de apps y documentación de decisiones.

## 2. Propósito de Axentral

El propósito de Axentral es hacer que la tecnología financiera trabaje para el usuario, no al revés. La plataforma busca reducir la confusión administrativa y dar herramientas simples para controlar gastos, inventarios, precios, facturas, pagos y reportes.

## 3. Público objetivo

- Emprendedores pequeños.
- PyMES.
- Personas que quieren ordenar sus finanzas.
- Negocios que necesitan calcular precios, controlar inventarios y registrar gastos.
- Clientes interesados en herramientas contables más simples y con soporte digital.

## 4. Estructura actual del repositorio

```text
axentral-app/
├── index.html
├── assets/
│   ├── css/
│   │   └── styles.css
│   └── js/
│       └── main.js
├── servicios-y-apps/
│   ├── index.html
│   ├── control-inventarios.html
│   ├── calculadora-precios-iva.html
│   ├── control-compras-gastos.html
│   └── escaner-facturas.html
├── conta-ai/
│   └── index.html
├── portal/
│   └── index.html
├── contacto/
│   └── index.html
├── docs/
│   ├── decisiones-producto.md
│   ├── axentral-proyecto.md
│   └── axentral-proyecto.rtf
├── netlify.toml
└── netlify/
    ├── ReadMe_keep_alive.md
    └── functions/
        ├── keep-alive.js
        ├── keep-alive-scheduled.js
        └── lib/
            └── supabase-keep-alive.js
```

## 5. Navegación aprobada

La navegación principal aprobada para Axentral es:

```text
Inicio | Servicios y Apps | Conta AI | Portal | Contacto
```

### Inicio

La página de inicio explica qué es Axentral, su misión, visión y propósito. También presenta las categorías principales, recursos gratuitos futuros y enlaces hacia Servicios y Apps, Conta AI y Portal.

### Servicios y Apps

Es el catálogo principal de productos, herramientas y apps. Cada elemento se muestra en formato mosaico/lista con estado, descripción corta, precio o lista de espera, y botón para ver más información.

### Conta AI

Conta AI será una sección separada, como producto independiente. Contendrá información del programa, cómo se usará, detalles funcionales, próximas actualizaciones, roadmap, lista de espera y acceso futuro.

### Portal

El portal será la zona privada donde el cliente podrá crear cuenta, iniciar sesión, comprar, revisar productos, facturas, pagos, estados de cuenta y datos privados.

### Contacto

La página de contacto concentra consultas, soporte, orientación y lista de espera para Conta AI o futuras apps.

## 6. Productos y apps iniciales

Las primeras cuatro apps/herramientas aprobadas son:

1. Control de inventarios.
2. Calculadora de precios, ganancia e IVA.
3. Control de compras y gastos personales o PyME.
4. Escáner de facturas.

La app tipo datáfono o cobro con tarjeta queda fuera de esta etapa inicial por complejidad técnica, financiera y regulatoria.

## 7. Estados de productos

Cada producto, app o servicio debe mostrar un estado visible para dar claridad al usuario.

Estados sugeridos:

- Disponible.
- En actualización.
- Próximamente.
- En desarrollo.
- No disponible temporalmente.

## 8. Flujo esperado de compra

El flujo propuesto para compra y acceso es:

1. El cliente visita Servicios y Apps.
2. Abre la página individual de un producto o app.
3. Revisa qué es, para qué sirve, cómo se usa, video, precio y estado.
4. Decide comprar o solicitar acceso.
5. Se redirige al Portal.
6. Crea cuenta o inicia sesión.
7. Agrega el producto al carrito.
8. Procesa la compra con datos privados.
9. Accede a productos, facturas, pagos y registros desde su cuenta.

## 9. Conta AI

Conta AI será el programa contable inteligente de Axentral. Su enfoque inicial es organizar gastos, compras, inventarios, precios, facturas y reportes para emprendedores y PyMES.

Fases sugeridas:

- Fase 1: lista de espera y explicación del producto.
- Fase 2: módulos iniciales de gastos, precios e inventario.
- Fase 3: análisis inteligente y reportes automatizados.

## 10. Portal Axentral

El portal será la zona privada para el cliente. Su objetivo será dar orden y privacidad al proceso de compra y administración.

Funciones futuras:

- Crear cuenta.
- Iniciar sesión.
- Comprar productos.
- Ver productos comprados.
- Ver facturas pendientes y pagadas.
- Ver estados de cuenta.
- Ver pagos asociados a productos.
- Gestionar datos privados.

## 11. Diseño visual

El diseño aprobado es un estilo fintech profesional con soporte para dos temas:

- Modo oscuro.
- Modo claro.

La razón es permitir que los usuarios elijan la experiencia de lectura que prefieran.

## 12. Tecnología actual

- Sitio estático HTML.
- CSS compartido en `assets/css/styles.css`.
- JavaScript compartido en `assets/js/main.js`.
- Modo claro/oscuro con `localStorage`.
- Despliegue en Netlify desde la raíz del repositorio.
- Netlify Functions en `netlify/functions`.
- Supabase keep-alive programado cada hora.

## 13. Supabase keep-alive

El proyecto incluye una función manual y una función programada para mantener activo Supabase.

- Endpoint manual: `/keep-alive`.
- Función programada: `keep-alive-scheduled`.
- Frecuencia: `0 * * * *`, cada hora en el minuto 0.
- Variables necesarias: `SUPABASE_URL` y `SUPABASE_ANON_KEY`.

## 14. Estado actual del proyecto

El proyecto ya cuenta con:

- Página de inicio como plataforma.
- Catálogo de Servicios y Apps.
- Páginas individuales iniciales.
- Página de Conta AI.
- Página de Portal.
- Página de Contacto.
- Modo claro y oscuro.
- Documentación de decisiones de producto.
- Documento general compatible con Word en formato RTF no binario.
- Configuración Netlify.
- Keep-alive de Supabase.

## 15. Riesgos o pendientes importantes

- Formatear HTML y CSS para que sea más fácil de mantener.
- Agregar formularios reales para contacto y lista de espera.
- Agregar imágenes, mockups o videos explicativos.
- Definir precios reales.
- Crear el primer prototipo funcional de la calculadora de precios e IVA.
- Diseñar la base de datos futura para portal, clientes, compras, facturas y pagos.
- Revisar requisitos legales y técnicos antes de cualquier funcionalidad tipo cobro con tarjeta o datáfono.

## 16. Próximos pasos recomendados

1. Formatear y limpiar HTML/CSS.
2. Mejorar accesibilidad básica.
3. Crear formularios de contacto y lista de espera.
4. Desarrollar la calculadora de precios e IVA como primera app funcional.
5. Preparar estructura de datos del portal.
6. Agregar contenido visual real.
7. Definir precios y flujo comercial.
8. Seguir documentando decisiones del proyecto.
