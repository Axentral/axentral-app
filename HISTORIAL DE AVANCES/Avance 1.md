# Avance 1 — Respaldo de memoria del proyecto Axentral

Fecha de respaldo: 2026-07-12

## 1. Contexto general

Este archivo resume el avance conversado y realizado hasta este punto para el proyecto Axentral. Su propósito es servir como memoria histórica del chat y como referencia para continuar el trabajo sin perder decisiones importantes.

## 2. Objetivo central definido

Axentral se definió como una plataforma financiera y contable para emprendedores, personas y PyMES de Latinoamérica.

La visión aprobada es construir un ecosistema que incluya:

- Plantillas Excel.
- Apps financieras.
- Conta AI.
- Portal privado de clientes.
- Recursos gratuitos.
- Catálogo de productos y herramientas.
- Futuro flujo de compra con cuenta privada.

## 3. Estructura aprobada de navegación

La navegación principal aprobada fue:

```text
Inicio | Servicios y Apps | Conta AI | Portal | Contacto
```

### Inicio

Debe explicar la empresa, misión, visión, propósito y motivar al cliente a explorar Servicios y Apps.

### Servicios y Apps

Será el catálogo principal de productos, plantillas y apps. Cada elemento tendrá mini descripción, estado visible, precio o lista de espera, botón de más información y página individual.

### Conta AI

Será una sección independiente para el programa contable inteligente, con información, roadmap, lista de espera y acceso futuro.

### Portal

Será la zona privada donde el cliente podrá crear cuenta, iniciar sesión, comprar, revisar productos, facturas, pagos, estados de cuenta y datos personales.

### Contacto

Será el canal para consultas, soporte, orientación y lista de espera.

## 4. Decisiones de diseño aprobadas

Se aprobó una combinación de:

- Páginas individuales por producto, app o servicio.
- Categorías visuales tipo mosaico/lista.
- Página principal como plataforma tipo SaaS/ecosistema.
- Estilo fintech profesional.
- Soporte para modo claro y modo oscuro.

## 5. Apps iniciales aprobadas

Las primeras cuatro apps/herramientas aprobadas fueron:

1. Control de inventarios.
2. Calculadora de precios, ganancia e IVA.
3. Control de compras y gastos personales o PyME.
4. Escáner de facturas.

La app tipo datáfono o cobro con tarjeta se decidió dejar fuera de esta etapa inicial porque es demasiado pronto y requiere mayor revisión técnica, financiera y regulatoria.

## 6. Estados de productos definidos

Se definió que cada producto o app debe mostrar un estado claro para dar confianza al usuario.

Estados sugeridos:

- Disponible.
- En actualización.
- Próximamente.
- En desarrollo.
- No disponible temporalmente.

## 7. Flujo de compra propuesto

El flujo de compra acordado fue:

1. El cliente visita Servicios y Apps.
2. Abre la página individual de un producto o app.
3. Revisa qué es, para qué sirve, cómo se usa, video, precio y estado.
4. Decide comprar o solicitar acceso.
5. Se redirige al Portal.
6. Crea cuenta o inicia sesión.
7. Agrega el producto al carrito.
8. Procesa la compra con datos privados.
9. Accede a productos, facturas, pagos y registros desde su cuenta.

## 8. Cambios realizados en el repositorio

Hasta este avance se realizaron estos cambios principales:

- Se transformó la landing inicial en una estructura multi-página.
- Se creó `assets/css/styles.css` para estilos compartidos.
- Se creó `assets/js/main.js` para comportamiento compartido y cambio de tema.
- Se rediseñó `index.html` como página de inicio de plataforma.
- Se creó la carpeta `servicios-y-apps/` con catálogo y páginas individuales.
- Se creó `conta-ai/index.html`.
- Se creó `portal/index.html`.
- Se creó `contacto/index.html`.
- Se creó `docs/decisiones-producto.md`.
- Se creó `docs/axentral-proyecto.md`.
- Se creó `docs/axentral-proyecto.rtf` como documento compatible con Word en formato no binario.
- Se actualizó `README.md` con la nueva estructura y documentación.
- Se actualizó `netlify.toml` para mantener Supabase con keep-alive programado cada hora.
- Se actualizó `netlify/ReadMe_keep_alive.md` para explicar el cron horario.

## 9. Supabase keep-alive

Se acordó dejar el keep-alive de Supabase con frecuencia horaria.

Configuración acordada:

```text
0 * * * *
```

Esto significa que la función corre cada hora en el minuto 0.

Elementos clave:

- Endpoint manual: `/keep-alive`.
- Función programada: `keep-alive-scheduled`.
- Variables requeridas: `SUPABASE_URL` y `SUPABASE_ANON_KEY`.

## 10. Documento compatible con Word creado

Se creó un archivo compatible con Word en formato RTF no binario con la información general del proyecto:

```text
docs/axentral-proyecto.rtf
```

También se dejó una versión editable en Markdown:

```text
docs/axentral-proyecto.md
```

## 11. Cambio por compatibilidad de PR

El archivo binario `.docx` fue reemplazado por `docs/axentral-proyecto.rtf`, que es un formato de texto compatible con Word y más adecuado para repositorios donde los binarios no son compatibles.

## 12. Estado actual del proyecto

El proyecto ya cuenta con:

- Página de inicio como plataforma.
- Catálogo de Servicios y Apps.
- Páginas individuales iniciales.
- Página de Conta AI.
- Página de Portal.
- Página de Contacto.
- Modo claro y oscuro.
- Documentación de decisiones de producto.
- Documento general compatible con Word en formato RTF.
- Configuración Netlify.
- Keep-alive de Supabase.

## 13. Pendientes importantes

Se identificaron estos pendientes antes de seguir creciendo:

- Formatear HTML y CSS para que sea más fácil de mantener.
- Mejorar accesibilidad básica.
- Agregar formularios reales para contacto y lista de espera.
- Agregar imágenes, mockups o videos explicativos.
- Definir precios reales.
- Crear el primer prototipo funcional de la calculadora de precios e IVA.
- Diseñar la futura base de datos del portal.
- Revisar aspectos legales y técnicos antes de cualquier funcionalidad tipo datáfono o cobro con tarjeta.

## 14. Próximo paso recomendado

El próximo paso recomendado es realizar un PR de limpieza y mantenibilidad:

- Formatear HTML.
- Formatear CSS.
- Mantener la funcionalidad actual.
- Mejorar estructura visual del código.
- Preparar el proyecto para agregar formularios y la primera app funcional.

## 15. Nota final

Este archivo corresponde al respaldo de memoria llamado **Avance 1** dentro de la carpeta **HISTORIAL DE AVANCES**. Debe servir como punto de referencia para continuar el desarrollo de Axentral sin perder el contexto de las decisiones ya tomadas.
